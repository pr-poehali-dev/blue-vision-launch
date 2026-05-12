import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с калькулятора на почту предприятия"""

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

    smtp_user = 'specpromagregat-vent@yandex.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg['Subject'] = f'Новая заявка с калькулятора — {name}'

    html = f"""
    <h2>Новая заявка с калькулятора воздуховодов</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Имя</b></td><td style="padding:8px;border:1px solid #ddd">{name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Тип воздуховода</b></td><td style="padding:8px;border:1px solid #ddd">{duct_type}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Размеры</b></td><td style="padding:8px;border:1px solid #ddd">{dimensions}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>Площадь поверхности</b></td><td style="padding:8px;border:1px solid #ddd">{area} м²</td></tr>
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
