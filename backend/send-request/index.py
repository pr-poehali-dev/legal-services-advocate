import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    '''Принимает заявку с формы сайта и отправляет её на почту адвоката через Gmail SMTP'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите имя и телефон'}, ensure_ascii=False),
        }

    sender = 'mamedowa789@gmail.com'
    recipient = 'mamedowa789@gmail.com'
    password = os.environ.get('SMTP_PASSWORD', '')

    html = f'''
    <h2>Новая заявка с сайта</h2>
    <p><b>Имя:</b> {name}</p>
    <p><b>Телефон:</b> {phone}</p>
    <p><b>Сообщение:</b><br>{message or '—'}</p>
    '''

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка с сайта — {name}'
    msg['From'] = sender
    msg['To'] = recipient
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'success': True}, ensure_ascii=False),
    }
