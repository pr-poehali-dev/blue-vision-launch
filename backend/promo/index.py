import os
import json
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p30360196_blue_vision_launch')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Получение баннера, сохранение баннера, статистика заявок."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')

    if method == 'GET' and path == '/stats':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"""
            SELECT
                COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day') AS today,
                COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS week,
                COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS month,
                COUNT(*) AS total
            FROM {SCHEMA}.requests
        """)
        row = cur.fetchone()
        cur.execute(f"""
            SELECT name, phone, duct_type, created_at AT TIME ZONE 'Europe/Moscow'
            FROM {SCHEMA}.requests
            ORDER BY created_at DESC
            LIMIT 10
        """)
        recent = cur.fetchall()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'today': row[0],
                'week': row[1],
                'month': row[2],
                'total': row[3],
                'recent': [
                    {'name': r[0], 'phone': r[1], 'type': r[2], 'date': r[3].strftime('%d.%m %H:%M')}
                    for r in recent
                ]
            })
        }

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT title, price, old_price, image_url, is_active FROM {SCHEMA}.promo_banner ORDER BY id DESC LIMIT 1')
        row = cur.fetchone()
        conn.close()
        if not row:
            return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'not found'})}
        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'title': row[0],
                'price': row[1],
                'old_price': row[2],
                'image_url': row[3],
                'is_active': row[4],
            })
        }

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        title = body.get('title', '')
        price = body.get('price', '')
        old_price = body.get('old_price', '')
        image_url = body.get('image_url', '')
        is_active = body.get('is_active', True)

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'UPDATE {SCHEMA}.promo_banner SET title=%s, price=%s, old_price=%s, image_url=%s, is_active=%s, updated_at=NOW() WHERE id=(SELECT id FROM {SCHEMA}.promo_banner ORDER BY id DESC LIMIT 1)',
            (title, price, old_price, image_url, is_active)
        )
        conn.commit()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'method not allowed'})}
