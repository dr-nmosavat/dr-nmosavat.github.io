import os
import time
import requests
from db import Store
from parse import transcribe, extract_expenses, normalize_digits

TOKEN = os.environ["BALE_TOKEN"]
API = f"https://tapi.bale.ai/bot{TOKEN}"
FILE_API = f"https://tapi.bale.ai/file/bot{TOKEN}"
ALLOWED = {int(x) for x in os.environ.get("ALLOWED_USER_IDS", "").split(",") if x.strip()}
store = Store(os.environ.get("DB_PATH", "expenses.db"))

HELP = (
    "سلام! 👋\n"
    "ویس بفرست و خرج‌هات رو بگو (مثلاً «پنجاه هزار تومن ناهار و بیست هزار تاکسی»)، من ثبت می‌کنم و از موجودی کم می‌کنم.\n\n"
    "دستورها:\n"
    "/setbalance 5000000 ← تعیین موجودی (تومان)\n"
    "/balance ← موجودی فعلی\n"
    "/list ← آخرین خرج‌ها با تاریخ\n"
    "/undo ← حذف آخرین خرج و برگشت مبلغ"
)

def money(n):
    return f"{n:,} تومان"

def send(chat_id, text):
    requests.post(f"{API}/sendMessage", json={"chat_id": chat_id, "text": text}, timeout=30)

def download_voice(file_id):
    info = requests.get(f"{API}/getFile", params={"file_id": file_id}, timeout=30).json()
    path = info["result"]["file_path"]
    return requests.get(f"{FILE_API}/{path}", timeout=60).content

def record(uid, chat_id, text):
    items = extract_expenses(text)
    if not items:
        send(chat_id, f"خرجی پیدا نکردم 🤔\nمتن: «{text}»")
        return
    lines, bal = [], None
    for amount, title in items:
        bal = store.add_expense(uid, amount, title)
        lines.append(f"➖ {title}: {money(amount)}")
    send(chat_id, f"✅ ثبت شد:\n" + "\n".join(lines) + f"\n\n💰 موجودی: {money(bal)}")

def handle_command(uid, chat_id, text):
    cmd, _, arg = text.partition(" ")
    cmd = cmd.split("@")[0]
    if cmd in ("/start", "/help"):
        send(chat_id, HELP)
    elif cmd == "/setbalance":
        digits = normalize_digits(arg).strip()
        if not digits.isdigit():
            return send(chat_id, "مثال: /setbalance 5000000")
        store.set_balance(uid, int(digits))
        send(chat_id, f"💰 موجودی شد {money(int(digits))}")
    elif cmd == "/balance":
        send(chat_id, f"💰 موجودی: {money(store.balance(uid))}")
    elif cmd == "/list":
        rows = store.list_expenses(uid)
        if not rows:
            return send(chat_id, "هنوز خرجی ثبت نشده.")
        body = "\n".join(f"{r[3].replace('T', ' ')} | {r[2]} | {money(r[1])}" for r in rows)
        send(chat_id, f"📋 آخرین خرج‌ها:\n{body}\n\n💰 موجودی: {money(store.balance(uid))}")
    elif cmd == "/undo":
        row = store.undo_last(uid)
        send(chat_id, "چیزی برای حذف نیست." if not row
             else f"↩️ حذف شد: {row[2]} ({money(row[1])})\n💰 موجودی: {money(store.balance(uid))}")
    else:
        send(chat_id, HELP)

def handle(msg):
    uid, chat_id = msg["from"]["id"], msg["chat"]["id"]
    if ALLOWED and uid not in ALLOWED:
        return send(chat_id, "شما اجازه استفاده از این بات را ندارید.")
    text = msg.get("text")
    if text and text.startswith("/"):
        return handle_command(uid, chat_id, text)
    if msg.get("voice") or msg.get("audio"):
        send(chat_id, "🎧 در حال گوش دادن...")
        file_id = (msg.get("voice") or msg["audio"])["file_id"]
        text = transcribe(download_voice(file_id))
        send(chat_id, f"🗣 شنیدم: «{text}»")
    if text:
        record(uid, chat_id, text)

def main():
    offset = None
    print("bot started")
    while True:
        try:
            r = requests.get(f"{API}/getUpdates", params={"timeout": 30, "offset": offset}, timeout=40).json()
            for u in r.get("result", []):
                offset = u["update_id"] + 1
                if "message" in u:
                    try:
                        handle(u["message"])
                    except Exception as e:
                        print("error:", e)
                        send(u["message"]["chat"]["id"], "خطایی پیش آمد، دوباره تلاش کن.")
        except requests.RequestException as e:
            print("network:", e)
            time.sleep(5)

if __name__ == "__main__":
    main()
