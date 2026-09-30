#!/data/data/com.termux/files/usr/bin/bash
# Run once inside Termux:  bash termux-setup.sh
set -e
pkg update -y && pkg install -y python git termux-services
pip install -r requirements.txt
[ -f .env ] || cp .env.example .env
termux-wake-lock || true
echo
echo "1) فایل .env را پر کن:  nano .env"
echo "2) اجرا:               bash run.sh"
