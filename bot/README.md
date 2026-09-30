# بات بله برای ثبت خرج با ویس

ویس می‌فرستی ← تبدیل به متن (Whisper) ← استخراج مبلغ و شرح (Claude) ← ثبت با تاریخ و کم شدن از موجودی.

## راه‌اندازی
1. در بله به `@botfather` پیام بده، بات بساز و توکن بگیر.
2. کلید OpenAI (برای ویس) و کلید Anthropic (برای فهمیدن خرج‌ها) بگیر.
3. اجرا:
```
cd bot
pip install -r requirements.txt
cp .env.example .env   # مقادیر را پر کن
set -a; . ./.env; set +a
python bot.py
```
بات باید همیشه روشن باشد؛ روی یک سرور/VPS اجرایش کن (مثلاً با `systemd` یا `screen`).

## دستورها
`/setbalance 5000000` · `/balance` · `/list` · `/undo`
