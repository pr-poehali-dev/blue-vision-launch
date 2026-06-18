import json
import os
import smtplib  # noqa
import psycopg2
from datetime import datetime, timezone, timedelta

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p30360196_blue_vision_launch')


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту и сохранение в БД"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    duct_type = body.get('duct_type', '')
    dimensions = body.get('dimensions', '')
    area = body.get('area', '')

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    # Сохраняем заявку в БД
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f'INSERT INTO {SCHEMA}.requests (name, phone, duct_type, dimensions, area) VALUES (%s, %s, %s, %s, %s)',
        (name, phone, duct_type, dimensions, area)
    )
    conn.commit()
    conn.close()

    # Отправляем письмо
    smtp_user = 'specpromagregat-vent@yandex.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msk = timezone(timedelta(hours=3))
    now = datetime.now(msk).strftime('%d.%m.%Y %H:%M МСК')

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg['Subject'] = f'Новая заявка — {name} ({now})'

    html = f"""
    <h2>Новая заявка с сайта</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Дата и время</b></td><td style="padding:8px;border:1px solid #ddd">{now}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Имя</b></td><td style="padding:8px;border:1px solid #ddd">{name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Тип заявки</b></td><td style="padding:8px;border:1px solid #ddd">{duct_type}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Описание</b></td><td style="padding:8px;border:1px solid #ddd">{dimensions}</td></tr>
      {'<tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Площадь</b></td><td style="padding:8px;border:1px solid #ddd">' + area + ' м²</td></tr>' if area else ''}
    </table>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
