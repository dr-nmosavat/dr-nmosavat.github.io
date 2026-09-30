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

## اجرا روی گوشی اندروید (Termux)
1. **Termux** را از F-Droid نصب کن (نسخه Google Play قدیمی است).
2. داخل Termux:
```
pkg install -y git
git clone <آدرس-ریپو> && cd <ریپو>/bot
git checkout claude/mobile-app-installation-4qjbhe
bash termux-setup.sh
nano .env        # توکن و کلیدها را پر کن
bash run.sh
```
3. برای اینکه اندروید بات را نبندد: Termux را از بهینه‌سازی باتری مستثنی کن (Settings ← Battery ← Unrestricted) و نوتیفیکیشن Termux را نبند. `run.sh` خودش wake-lock می‌گیرد.
4. گوشی باید اینترنت داشته باشد. اگر OpenAI/Anthropic بدون VPN باز نمی‌شوند، VPN گوشی باید روشن بماند.
