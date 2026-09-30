import json
import os
import re
import requests

_DIGITS = str.maketrans("۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩", "01234567890123456789")

def normalize_digits(s):
    return s.translate(_DIGITS).replace("٬", "").replace(",", "").replace("،", "")

def transcribe(audio_bytes):
    """Persian speech-to-text via OpenAI Whisper."""
    r = requests.post(
        "https://api.openai.com/v1/audio/transcriptions",
        headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
        files={"file": ("voice.ogg", audio_bytes, "audio/ogg")},
        data={"model": "whisper-1", "language": "fa"},
        timeout=120,
    )
    r.raise_for_status()
    return r.json()["text"].strip()

PROMPT = """متن زیر را کاربر درباره خرج‌هایش گفته (فارسی، مبلغ‌ها به تومان).
همه خرج‌های ذکرشده را استخراج کن و فقط یک آرایه JSON برگردان، بدون هیچ توضیح دیگر:
[{"amount": <عدد صحیح به تومان>, "title": "<شرح کوتاه>"}]
مثال: «پونزده هزار تومن نون و دو میلیون و سیصد اجاره» -> [{"amount":15000,"title":"نان"},{"amount":2300000,"title":"اجاره"}]
اگر خرجی در متن نبود، [] برگردان.

متن: """

def extract_expenses(text):
    text = normalize_digits(text)
    r = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
        },
        json={
            "model": "claude-haiku-4-5-20251001",
            "max_tokens": 500,
            "messages": [{"role": "user", "content": PROMPT + text}],
        },
        timeout=60,
    )
    r.raise_for_status()
    out = r.json()["content"][0]["text"]
    m = re.search(r"\[.*\]", out, re.S)
    items = json.loads(m.group(0)) if m else []
    return [(int(i["amount"]), str(i["title"])) for i in items if int(i["amount"]) > 0]
