import sqlite3
from datetime import datetime

class Store:
    """Per-user balance + expense list, kept in SQLite."""

    def __init__(self, path="expenses.db"):
        self.db = sqlite3.connect(path)
        self.db.executescript("""
            CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, balance INTEGER NOT NULL DEFAULT 0);
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                title TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
        """)

    def balance(self, uid):
        row = self.db.execute("SELECT balance FROM users WHERE user_id=?", (uid,)).fetchone()
        return row[0] if row else 0

    def set_balance(self, uid, amount):
        self.db.execute(
            "INSERT INTO users(user_id, balance) VALUES(?,?) "
            "ON CONFLICT(user_id) DO UPDATE SET balance=excluded.balance", (uid, amount))
        self.db.commit()

    def add_expense(self, uid, amount, title, when=None):
        when = when or datetime.now()
        self.set_balance(uid, self.balance(uid) - amount)
        self.db.execute(
            "INSERT INTO expenses(user_id, amount, title, created_at) VALUES(?,?,?,?)",
            (uid, amount, title, when.isoformat(timespec="minutes")))
        self.db.commit()
        return self.balance(uid)

    def list_expenses(self, uid, limit=20):
        return self.db.execute(
            "SELECT id, amount, title, created_at FROM expenses WHERE user_id=? "
            "ORDER BY id DESC LIMIT ?", (uid, limit)).fetchall()

    def undo_last(self, uid):
        row = self.db.execute(
            "SELECT id, amount, title FROM expenses WHERE user_id=? ORDER BY id DESC LIMIT 1",
            (uid,)).fetchone()
        if not row:
            return None
        self.db.execute("DELETE FROM expenses WHERE id=?", (row[0],))
        self.set_balance(uid, self.balance(uid) + row[1])
        return row
