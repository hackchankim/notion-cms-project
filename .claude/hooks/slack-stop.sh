#!/bin/bash
# Claude Code Stop → Slack 전송 (작업 완료 알림)

[ -z "$SLACK_WEBHOOK_URL" ] && exit 0

INPUT=$(cat)

STOP_ACTIVE=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(str(d.get('stop_hook_active', False)))
except:
    print('False')
" 2>/dev/null || echo "False")

[ "$STOP_ACTIVE" = "True" ] && exit 0

PAYLOAD=$(python3 -c "
import json, os
from datetime import datetime

project = os.path.basename(os.getcwd())
status = '작업 완료'
now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

payload = {
    'text': f'✅ [{project}] Claude Code 작업 완료',
    'blocks': [
        {
            'type': 'section',
            'text': {
                'type': 'mrkdwn',
                'text': '✅ *Claude Code 작업 완료*\n응답이 완료되었습니다. 터미널을 확인해주세요.'
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
