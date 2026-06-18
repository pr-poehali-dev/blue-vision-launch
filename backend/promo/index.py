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
    """Получение и сохранение данных рекламного баннера."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')

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
