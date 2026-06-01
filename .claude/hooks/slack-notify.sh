#!/bin/bash
# Claude Code Notification → Slack 전송 (권한 요청 알림)

[ -z "$SLACK_WEBHOOK_URL" ] && exit 0

INPUT=$(cat)

PAYLOAD=$(echo "$INPUT" | python3 -c "
import sys, json, os
from datetime import datetime

try:
    d = json.load(sys.stdin)
    msg = d.get('message', 'Claude가 응답을 기다리고 있습니다.')[:500]
except:
    msg = 'Claude가 응답을 기다리고 있습니다.'

project = os.path.basename(os.getcwd())
status = '권한 요청'
now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

payload = {
    'text': f'🔐 [{project}] Claude Code 권한 요청',
    'blocks': [
        {
            'type': 'section',
            'text': {
                'type': 'mrkdwn',
                'text': f'🔐 *Claude Code 권한 요청*\n{msg}'
            }
        },
        {
            'type': 'context',
            'elements': [
                {'type': 'mrkdwn', 'text': f'📁 *프로젝트:* {project}\n🔖 *상태:* {status}\n🕐 *알림시각:* {now}'}
            ]
        }
    ]
}
print(json.dumps(payload))
" 2>/dev/null)

[ -z "$PAYLOAD" ] && exit 0

curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  -d "$PAYLOAD" \
  >/dev/null 2>&1

exit 0
