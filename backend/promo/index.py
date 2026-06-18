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
    """Баннер, статистика и список всех заявок с фильтрацией."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    params = event.get('queryStringParameters') or {}

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

    if method == 'GET' and path == '/requests':
        duct_filter = params.get('type', '')
        conn = get_conn()
        cur = conn.cursor()
        if duct_filter:
            cur.execute(f"""
                SELECT id, name, phone, duct_type, dimensions, area, created_at AT TIME ZONE 'Europe/Moscow'
                FROM {SCHEMA}.requests
                WHERE duct_type ILIKE %s
                ORDER BY created_at DESC
            """, (f'%{duct_filter}%',))
        else:
            cur.execute(f"""
                SELECT id, name, phone, duct_type, dimensions, area, created_at AT TIME ZONE 'Europe/Moscow'
                FROM {SCHEMA}.requests
                ORDER BY created_at DESC
            """)
        rows = cur.fetchall()
        cur.execute(f"SELECT DISTINCT duct_type FROM {SCHEMA}.requests WHERE duct_type != '' ORDER BY duct_type")
        types = [r[0] for r in cur.fetchall()]
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'requests': [
                    {
                        'id': r[0], 'name': r[1], 'phone': r[2],
                        'type': r[3], 'dimensions': r[4], 'area': r[5],
                        'date': r[6].strftime('%d.%m.%Y %H:%M')
                    }
                    for r in rows
                ],
                'types': types
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
                'title': row[0], 'price': row[1], 'old_price': row[2],
                'image_url': row[3], 'is_active': row[4],
            })
        }

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'UPDATE {SCHEMA}.promo_banner SET title=%s, price=%s, old_price=%s, image_url=%s, is_active=%s, updated_at=NOW() WHERE id=(SELECT id FROM {SCHEMA}.promo_banner ORDER BY id DESC LIMIT 1)',
            (body.get('title', ''), body.get('price', ''), body.get('old_price', ''), body.get('image_url', ''), body.get('is_active', True))
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'method not allowed'})}
