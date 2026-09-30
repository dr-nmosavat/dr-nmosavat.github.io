import os, tempfile
from db import Store
from parse import normalize_digits

s = Store(os.path.join(tempfile.mkdtemp(), "t.db"))
s.set_balance(1, 1_000_000)
assert s.add_expense(1, 15_000, "نان") == 985_000
assert s.add_expense(1, 85_000, "تاکسی") == 900_000
assert [r[2] for r in s.list_expenses(1)] == ["تاکسی", "نان"]
assert s.undo_last(1)[2] == "تاکسی" and s.balance(1) == 985_000
assert s.balance(2) == 0 and s.undo_last(2) is None
assert normalize_digits("۱۲٬۰۰۰") == "12000"
print("ok")
