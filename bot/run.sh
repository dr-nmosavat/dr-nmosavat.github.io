#!/usr/bin/env bash
# Loads .env and keeps the bot running (restarts on crash).
cd "$(dirname "$0")"
set -a; . ./.env; set +a
command -v termux-wake-lock >/dev/null && termux-wake-lock
while true; do python bot.py; echo "bot stopped, restarting in 5s"; sleep 5; done
