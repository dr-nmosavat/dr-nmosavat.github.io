/**
 * سرور مشترک سایت دکتر نیلوفر مساوات — Google Apps Script
 * یک شیت و یک اسکریپت برای:
 *   ۱) چرخ «هدیه به کوچولوها»  (شیت Spins)
 *   ۲) شناسنامهٔ سلامت پت‌ها  (شیت‌های Pets و Records)
 *
 * پیش از استفاده در Project Settings ← Script Properties این سه مقدار را بسازید:
 *   SECRET     یک رمز طولانی و تصادفی (امضای کدها و توکن دکتر)
 *   ADMIN_KEY  رمزی که فقط شما بدانید (صفحهٔ بررسی کد جایزه)
 *   DR_PASS    رمز ورود دکتر به شناسنامه (همان که در سایت «ورود دکتر» می‌زنید)
 */
var CFG = {
  weights: { free: 2, consult: 10, d10: 28, d20: 15, d30: 5, retry: 40 },
  maxFreePerMonth: 3,      // حداکثر ویزیت رایگان در هر ماه
  maxSpinsPerDay: 300,     // حداکثر چرخش در روز از کل سایت
  validDays: 7,            // اعتبار جایزه
  tz: 'Asia/Tehran',
  sheetName: 'Spins'
};
var LABELS = {
  free: 'ویزیت رایگان', consult: 'مشاورهٔ آنلاین رایگان',
  d10: '۱۰٪ تخفیف ویزیت', d20: '۲۰٪ تخفیف ویزیت', d30: '۳۰٪ تخفیف ویزیت', retry: 'یک بار دیگر'
};
var COL = { time: 0, code: 1, prize: 2, exp: 3, dev: 4, used: 5, usedAt: 6 };

function prop_(k) { return PropertiesService.getScriptProperties().getProperty(k); }
function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CFG.sheetName);
  if (!sh) {
    sh = ss.insertSheet(CFG.sheetName);
    sh.appendRow(['زمان', 'کد', 'جایزه', 'انقضا', 'دستگاه', 'استفاده شد؟', 'زمان استفاده']);
    sh.setFrozenRows(1);
    look_(sh, LOOK.Spins);
  }
  return sh;
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function day_(d) { return Utilities.formatDate(d, CFG.tz, 'yyyy-MM-dd'); }
function month_(d) { return Utilities.formatDate(d, CFG.tz, 'yyyy-MM'); }

// امضای کوتاه برای هر کد
function sig_(digits, prize, exp) {
  var raw = Utilities.computeHmacSha256Signature(digits + '|' + prize + '|' + exp, prop_('SECRET') || 'change-me');
  var hex = raw.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
  return hex.slice(0, 4).toUpperCase();
}
function pickPrize_(noRetry, freeLeft) {
  var ids = Object.keys(CFG.weights).filter(function (k) { return !(noRetry && k === 'retry'); });
  var sum = ids.reduce(function (a, k) { return a + CFG.weights[k]; }, 0), r = Math.random() * sum;
  var id = ids[ids.length - 1];
  for (var i = 0; i < ids.length; i++) { r -= CFG.weights[ids[i]]; if (r < 0) { id = ids[i]; break; } }
  if (id === 'free' && freeLeft <= 0) id = 'd20';
  return id;
}


// ======================= شناسنامهٔ سلامت =======================
var H = {
  prefix: 'NM-',                 // پیشوند کد پت
  tokenDays: 3,                  // اعتبار توکن دکتر (بدون «مرا به خاطر بسپار»)
  maxFails: 8,                   // تلاش ناموفق ورود در ۱۰ دقیقه
  ownerTypes: ['ضدانگل داخلی', 'ضدانگل خارجی (کک و کنه)', 'وزن', 'دارو', 'سایر'],   // صاحب پت می‌تواند ثبت کند
  allTypes: ["واکسن", "ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)", "ویزیت", "وزن", "دارو", "عقیم‌سازی", "آزمایش", "سایر"]
};
var PET_COLS = ['code', 'key', 'name', 'en', 'owner', 'guardian', 'species', 'breed', 'breedEn', 'birth', 'plan', 'consent', 'created', 'updated', 'deleted', 'auth', 'sex', 'neut', 'phone', 'smsok'];
var SMS_COLS = ['time', 'to', 'kind', 'text', 'status', 'response', 'raw'];
var PT_COLS = ['id', 'pkey', 'created', 'updated', 'date', 'name', 'species', 'breed', 'owner', 'phone', 'reason', 'note', 'follow', 'code', 'deleted', 'fee', 'paid', 'pay'];
var ACT_COLS = ['day', 'time', 'kind', 'ref', 'name'];
var SV_COLS = ['id', 'name', 'price', 'active', 'sort', 'updated'];
var INV_COLS = ['id', 'created', 'updated', 'date', 'pkey', 'vid', 'name', 'owner', 'phone', 'items', 'sub', 'disc', 'total', 'status', 'paid', 'method', 'paidAt', 'note'];
var Q_COLS = ['id', 'created', 'updated', 'date', 'time', 'pkey', 'name', 'species', 'breed', 'owner', 'phone', 'status', 'src', 'note'];
var AP_COLS = ['id', 'created', 'updated', 'date', 'time', 'name', 'species', 'breed', 'owner', 'phone', 'reason', 'note', 'status', 'pkey', 'deleted', 'rem'];
var REC_COLS = ['id', 'code', 'type', 'date', 'name', 'brand', 'serial', 'place', 'extra', 'freq', 'how', 'dur', 'end', 'weight', 'next', 'closed', 'dr', 'created', 'updated', 'deleted', 'src'];

function hsheet_(name, cols) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name); sh.appendRow(cols); sh.setFrozenRows(1);
    sh.getRange(1, 1, sh.getMaxRows(), cols.length).setNumberFormat('@');   // متن ساده: تاریخ‌ها خودکار تبدیل نشوند
    if (LOOK[name]) look_(sh, LOOK[name]);
    if (MIG[name]) PropertiesService.getScriptProperties().setProperty(MIG[name].key, '1');
  } else if (MIG[name] && !MIGDONE[name]) migCols_(sh, name);
  return sh;
}
// جابه‌جایی یک‌باره: ستون «نژاد» از آخر جدول به بعد از «گونه».
// روش امن: داده‌ها را می‌خواند و با ترتیب جدید بازنویسی می‌کند؛ فقط اگر داده‌ها واقعاً هنوز با ترتیب قدیم باشند (تشخیص از روی ستون تلفن).
var MIG = {
  Patients: { key: 'MIG2_PT', old: ['id', 'pkey', 'created', 'updated', 'date', 'name', 'species', 'owner', 'phone', 'reason', 'note', 'follow', 'code', 'deleted', 'fee', 'paid', 'pay', 'breed'] },
  Appts: { key: 'MIG2_AP', old: ['id', 'created', 'updated', 'date', 'time', 'name', 'species', 'owner', 'phone', 'reason', 'note', 'status', 'pkey', 'deleted', 'rem', 'breed'] }
}, MIGDONE = {};
function migCols_(sh, name) {
  var m = MIG[name], props = PropertiesService.getScriptProperties();
  if (props.getProperty(m.key)) { MIGDONE[name] = 1; return; }
  var lock = LockService.getDocumentLock(); lock.waitLock(20000);
  try {
    if (props.getProperty(m.key)) { MIGDONE[name] = 1; return; }
    var cols = name === 'Patients' ? PT_COLS : AP_COLS, old = m.old, n = sh.getLastRow(), isPh = function (x) { return /^0?9\d{9}$/.test(String(x).replace(/\D/g, '')); };
    if (n > 1) {
      if (sh.getMaxColumns() < old.length) sh.insertColumnsAfter(sh.getMaxColumns(), old.length - sh.getMaxColumns());
      var v = sh.getRange(2, 1, n - 1, old.length).getDisplayValues();
      var oldPh = old.indexOf('phone'), newPh = cols.indexOf('phone'), a = 0, b = 0;
      v.forEach(function (row) { if (isPh(row[oldPh])) a++; if (isPh(row[newPh])) b++; });
      if (a > 0) {   // ردیف‌هایی با ترتیب قدیم پیدا شد → بازنویسی (هر ردیف جداگانه تشخیص داده می‌شود)
        var ss = SpreadsheetApp.getActiveSpreadsheet(), bn = name + ' پشتیبان';
        if (!ss.getSheetByName(bn)) { try { sh.copyTo(ss).setName(bn); } catch (e1) {} }
        var out = v.map(function (row) {
          var po = isPh(row[oldPh]), pn = isPh(row[newPh]), isOld = po && !pn ? true : pn && !po ? false : a >= b;
          return cols.map(function (c, ci) { var k = isOld ? old.indexOf(c) : ci, x = k < 0 ? '' : String(row[k]); if (c === 'phone' && /^9\d{9}$/.test(x)) x = '0' + x; return x; });
        });
        var rg = sh.getRange(2, 1, n - 1, old.length); rg.setNumberFormat('@'); rg.setValues(out);
      }
    }
    if (LOOK[name]) sh.getRange(1, 1, 1, LOOK[name].labels.length).setValues([LOOK[name].labels]);
    props.setProperty(m.key, '1'); MIGDONE[name] = 1;
  } catch (e) { props.setProperty('MIG_ERR', name + ': ' + e); MIGDONE[name] = 1; }
  finally { lock.releaseLock(); }
}
function str_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, CFG.tz, 'yyyy-MM-dd');
  return v === null || v === undefined ? '' : String(v);
}
// ---- تاریخ شمسی در شیت ----
// در شیت شمسی نوشته می‌شود (مثل 1405/09/01 یا 1405/09/01 14:30:00)؛ هنگام خواندن برای محاسبه‌ها به میلادی برمی‌گردد.
var DATE_KEYS = { birth: 1, created: 1, updated: 1, date: 1, follow: 1, next: 1, end: 1, time: 1, day: 1, approved: 1 };
function g2jStr_(v) {
  var m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}:\d{2}(?::\d{2})?))?$/.exec(String(v || '')); if (!m || +m[1] < 1900) return v;
  var j = jalali_(m[1] + '-' + m[2] + '-' + m[3]), p = function (n) { return (n < 10 ? '0' : '') + n; };
  return j[0] + '/' + p(j[1]) + '/' + p(j[2]) + (m[4] ? ' ' + m[4] : '');
}
function j2g_(jy, jm, jd) {
  jy += 1595; var days = -355668 + 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  var gy = 400 * Math.floor(days / 146097); days %= 146097;
  if (days > 36524) { gy += 100 * Math.floor(--days / 36524); days %= 36524; if (days >= 365) days++; }
  gy += 4 * Math.floor(days / 1461); days %= 1461;
  if (days > 365) { gy += Math.floor((days - 1) / 365); days = (days - 1) % 365; }
  var gd = days + 1, sal = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], gm;
  for (gm = 1; gm < 13 && gd > sal[gm]; gm++) gd -= sal[gm];
  return [gy, gm, gd];
}
function j2gStr_(v) {
  var s = String(v || '').replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); });
  var m = /^(1[34]\d\d)\/(\d{1,2})\/(\d{1,2})(?: (\d{2}:\d{2}(?::\d{2})?))?$/.exec(s); if (!m) return v;
  var g = j2g_(+m[1], +m[2], +m[3]), p = function (n) { return (n < 10 ? '0' : '') + n; };
  return g[0] + '-' + p(g[1]) + '-' + p(g[2]) + (m[4] ? 'T' + m[4] : '');
}
// تبدیل یک‌بارهٔ تاریخ‌های میلادی موجود در شیت به شمسی (از منوی «مرتب‌کردن ظاهر»)
function convDates_(name, cols) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); if (!sh) return;
  var n = sh.getLastRow(); if (n < 2) return;
  var idx = []; cols.forEach(function (c, i) { if (DATE_KEYS[c]) idx.push(i); }); if (!idx.length) return;
  idx.forEach(function (i) {
    var rg = sh.getRange(2, i + 1, n - 1, 1), v = rg.getValues();
    var out = v.map(function (r) { var x = r[0]; if (x instanceof Date) x = Utilities.formatDate(x, CFG.tz, (x.getHours() || x.getMinutes() || x.getSeconds()) ? "yyyy-MM-dd'T'HH:mm:ss" : 'yyyy-MM-dd'); return [g2jStr_(String(x === null || x === undefined ? '' : x))]; });
    rg.setNumberFormat('@'); rg.setValues(out);
  });
}
function readAll_(sh, cols) {
  var v = sh.getDataRange().getValues(), out = [], i, j;
  for (i = 1; i < v.length; i++) {
    var o = { _row: i + 1 }; for (j = 0; j < cols.length; j++) o[cols[j]] = str_(v[i][j]);
    if (o.phone && /^9\d{9}$/.test(o.phone)) o.phone = '0' + o.phone;
    for (j = 0; j < cols.length; j++) if (DATE_KEYS[cols[j]] && o[cols[j]]) o[cols[j]] = j2gStr_(o[cols[j]]);   // شیت صفرِ اول را حذف کرده بود
    if (cols === AD_COLS || cols === PR_COLS) o.status = normStatus_(o.status);   // وضعیت ممکن است با آیکون و فارسی نوشته شده باشد
    out.push(o);
  }
  return out;
}
function writeRow_(sh, cols, o, row) {
  var arr = cols.map(function (c) { var x = o[c] === undefined || o[c] === null ? '' : String(o[c]); return DATE_KEYS[c] ? g2jStr_(x) : x; });
  var si = cols === AD_COLS || cols === PR_COLS ? cols.indexOf('status') : -1;
  if (si > -1) arr[si] = statusLabel_(cols === AD_COLS ? AD_LABEL : PR_LABEL, o.status);
  if (!row) row = sh.getLastRow() + 1;
  var rg = sh.getRange(row, 1, 1, cols.length); rg.setNumberFormat('@'); rg.setValues([arr]);   // متن ساده: صفر اول شماره حذف نشود
}
function clip_(v, n) { return String(v === undefined || v === null ? '' : v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').slice(0, n || 100); }
function date_(v) { v = String(v || ''); return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ''; }
function norm_(s) { return String(s || '').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, '').toLowerCase().trim(); }
function rnd_(n) { var s = '', u; while (s.length < n) { u = Utilities.getUuid().replace(/-/g, ''); s += u; } return s.slice(0, n); }
function nowIso_() { return Utilities.formatDate(new Date(), CFG.tz, "yyyy-MM-dd'T'HH:mm:ss"); }

// ---- توکن دکتر ----
function mkToken_(days, role) {
  var exp = Date.now() + (days || H.tokenDays) * 86400000;
  return role === 'sec' ? exp + '.' + sig16_('sec|' + exp) + 's' : role === 'mgr' ? exp + '.' + sig16_('mgr|' + exp) + 'm' : exp + '.' + sig16_('dr|' + exp);
}
function sig16_(txt) {
  var raw = Utilities.computeHmacSha256Signature(txt, prop_('SECRET') || 'change-me');
  return raw.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('').slice(0, 24);
}
function okToken_(t) { return roleOf_(t) === 'dr'; }
// نقش از روی توکن: 'dr' (دکتر) | 'sec' (منشی) | ''
function roleOf_(t) {
  var m = /^(\d{10,16})\.([0-9a-f]{24})([sm]?)$/.exec(String(t || '')); if (!m || Number(m[1]) <= Date.now()) return '';
  if (m[3] === 's') return sig16_('sec|' + m[1]) === m[2] ? 'sec' : '';
  if (m[3] === 'm') return sig16_('mgr|' + m[1]) === m[2] ? 'mgr' : '';
  return sig16_('dr|' + m[1]) === m[2] ? 'dr' : '';
}
// کارهایی که منشی اجازه دارد (فقط نوبت، بیماران و امروز؛ نه شناسنامه و واگذاری)
// مدیر: همه‌چیز را می‌بیند (حتی یادداشت پزشکی)؛ تعرفه و باطل کردن فاکتور مجاز؛ ثبت/تغییر پرونده، نوبت و صف نه
var MGR_NO = { savePet: 1, saveRec: 1, delRec: 1, rotate: 1, deletePet: 1, useCode: 1, patSave: 1, patDel: 1, patPatient: 1, patSms: 1, petRemind: 1, petReqSet: 1, adoptSet: 1, apSave: 1, apSet: 1, apRemind: 1, qAdd: 1, qSet: 1, invSave: 1, invPay: 1, touch: 1 };
var SEC_OK = { svcList: 1, invList: 1, invPay: 1, qList: 1, qAdd: 1, qSet: 1, lookup: 1, apRemind: 1, patList: 1, patSave: 1, patPatient: 1, patSms: 1, touch: 1, todayList: 1, apList: 1, apSave: 1, apSet: 1 };
function ownerOk_(code, key) {
  var pet = findPet_(code); return pet && !pet.deleted && key && pet.key === String(key) ? pet : null;
}
function findPet_(code) {
  code = String(code || '').toUpperCase().trim();
  var all = readAll_(hsheet_('Pets', PET_COLS), PET_COLS);
  for (var i = 0; i < all.length; i++) if (all[i].code === code) return all[i];
  return null;
}
function petOut_(p, withKey) {
  var plan = []; try { plan = JSON.parse(p.plan || '[]'); } catch (e) {}
  var o = { code: p.code, name: p.name, en: p.en, owner: p.owner, guardian: p.guardian, sex: p.sex || '', neut: p.neut || '', species: p.species, breed: p.breed, breedEn: p.breedEn, birth: p.birth, plan: plan, consent: p.consent === '1', updated: p.updated, auth: authCode_(p.code), created: String(p.created || '').slice(0, 10) };
  if (withKey) { o.key = p.key; o.phone = p.phone || ''; o.smsok = p.smsok === '1'; }   // تلفن فقط برای دکتر (withKey) برگردانده می‌شود، هرگز برای صاحب لینک
  return o;
}
function recOut_(r) {
  return { id: r.id, type: r.type, date: r.date, name: r.name, brand: r.brand, serial: r.serial, place: r.place, extra: r.extra, freq: r.freq, how: r.how, dur: r.dur, end: r.end, weight: Number(r.weight) || 0, next: r.next, closed: r.closed === '1', dr: r.dr === '1', src: r.src === 'old' ? 'old' : '' };
}
function recsOf_(code) {
  return readAll_(hsheet_('Records', REC_COLS), REC_COLS).filter(function (r) { return r.code === code && r.deleted !== '1'; });
}
function cleanRec_(b, code, dr) {
  var type = String(b.type || '');
  if (H.allTypes.indexOf(type) < 0) return null;
  var d = date_(b.date); if (!d) return null;
  var w = Number(b.weight) || 0; if (!(w >= 0 && w < 200)) w = 0;
  return { id: /^[A-Za-z0-9]{6,30}$/.test(b.id || '') ? b.id : rnd_(12), code: code, type: type, date: d,
    name: clip_(b.name, 90), brand: clip_(b.brand, 60), serial: clip_(b.serial, 60), place: clip_(b.place, 90), extra: clip_(b.extra, 90),
    freq: clip_(b.freq, 40), how: clip_(b.how, 40), dur: clip_(b.dur, 20), end: date_(b.end), weight: w || '', next: date_(b.next), closed: b.closed ? '1' : '', dr: dr ? '1' : '', src: dr && b.src === 'old' ? 'old' : '' };
}

function health_(b) {
  var a = String(b.a || '');
  if (a === 'drLogin') return drLogin_(b);
  // ---- صاحب پت (با کد و کلید لینک) ----
  if (a === 'getOwner') {
    var p = ownerOk_(b.code, b.key); if (!p) return { ok: false, err: 'auth' };
    return { ok: true, pet: petOut_(p, false), recs: recsOf_(p.code).map(recOut_) };
  }
  if (a === 'ownerAddRec' || a === 'ownerDelRec') return ownerWrite_(a, b);
  // ---- واگذاری پت: ثبت درخواست و فهرست منتشرشده‌ها برای همه ----
  if (a === 'adoptSubmit') return adoptSubmit_(b);
  if (a === 'adoptList') return adoptList_();
  if (a === 'petReqSubmit') return petReqSubmit_(b);
  if (a === 'verifyPublic') return verifyPublic_(b);
  // ---- دکتر ----
  var role0 = roleOf_(b.t); if (!role0 || (role0 === 'sec' && !SEC_OK[a]) || (role0 === 'mgr' && MGR_NO[a])) return { ok: false, err: 'auth' };
  if (role0 === 'sec' && a === 'patSave' && b.v) { b.v.note = ''; b.v.follow = ''; }   // منشی یادداشت درمان و پیگیری ثبت نمی‌کند
  b.role = role0;
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    if (role0 === 'sec' && a === 'patList') { var pl = patList_(); pl.items.forEach(function (x) { x.note = ''; }); return pl; }
    if (a === 'search') return search_(b);
    if (a === 'get') { var q = findPet_(b.code); if (!q || q.deleted) return { ok: false, err: 'notfound' }; return { ok: true, pet: petOut_(q, true), recs: recsOf_(q.code).map(recOut_) }; }
    if (a === 'savePet') return savePet_(b);
    if (a === 'saveRec') return saveRec_(b);
    if (a === 'delRec') return delRec_(b, true);
    if (a === 'rotate') return rotate_(b);
    if (a === 'deletePet') return deletePet_(b);
    if (a === 'verifyCode') return verifyCode_(b, false);
    if (a === 'useCode') return verifyCode_(b, true);
    if (a === 'verifyPet') return verifyPet_(b);
    if (a === 'adoptAdmin') return adoptAdmin_();
    if (a === 'adoptSet') return adoptSet_(b);
    if (a === 'petReqList') return petReqList_();
    if (a === 'petReqSet') return petReqSet_(b);
    if (a === 'patList') return patList_();
    if (a === 'patSave') return patSave_(b);
    if (a === 'patDel') return patDel_(b);
    if (a === 'patPatient') return patPatient_(b);
    if (a === 'patSms') return patSms_(b);
    if (a === 'petRemind') return petRemind_(b);
    if (a === 'touch') return touch_(b);
    if (a === 'todayList') return todayList_();
    if (a === 'apList') return apList_();
    if (a === 'apSave') return apSave_(b);
    if (a === 'apSet') return apSet_(b);
    if (a === 'apRemind') return apRemind_(b);
    if (a === 'lookup') return lookup_(b);
    if (a === 'svcList') return svcList_();
    if (a === 'svcSave') return svcSave_(b);
    if (a === 'invSave') return invSave_(b);
    if (a === 'invList') return invList_(b);
    if (a === 'invPay') return invPay_(b);
    if (a === 'invVoid') return invVoid_(b);
    if (a === 'qList') return qList_();
    if (a === 'qAdd') return qAdd_(b, role0);
    if (a === 'qSet') return qSet_(b);
  } finally { lock.releaseLock(); }
  return { ok: false, err: 'bad' };
}

function drLogin_(b) {
  var cache = CacheService.getScriptCache(), fails = Number(cache.get('drfails') || 0);
  if (fails >= H.maxFails) return { ok: false, err: 'locked' };
  var pass = prop_('DR_PASS'), sp = prop_('SEC_PASS'), mp = prop_('MGR_PASS'), given = String(b.pass || ''), role = '';
  if (pass && given === pass) role = 'dr'; else if (sp && given === sp) role = 'sec'; else if (mp && given === mp) role = 'mgr';   // MGR_PASS: حساب مدیر (اختیاری)
  if (!role) { cache.put('drfails', String(fails + 1), 600); return { ok: false, err: 'auth' }; }
  cache.remove('drfails');
  return { ok: true, role: role, t: mkToken_(b.rem ? 30 : 0, role) };   // «مرا به خاطر بسپار» = ۳۰ روز
}

function search_(b) {
  var qq = norm_(b.q), pets = readAll_(hsheet_('Pets', PET_COLS), PET_COLS).filter(function (p) { return p.deleted !== '1'; });
  if (qq) pets = pets.filter(function (p) { return norm_([p.code, p.name, p.en, p.owner, p.guardian, p.phone].join(' ')).indexOf(qq) > -1; });
  pets.sort(function (x, y) { return x.updated < y.updated ? 1 : -1; });
  return { ok: true, pets: pets.slice(0, 30).map(function (p) { return { code: p.code, name: p.name, en: p.en, owner: p.owner || p.guardian, phone: p.phone || '', species: p.species, birth: p.birth, updated: p.updated }; }) };
}

function newCode_(all) {
  for (var n = 0; n < 50; n++) {
    var c = H.prefix + String(Math.floor(1000 + Math.random() * (n < 30 ? 9000 : 90000)));
    if (!all.some(function (p) { return p.code === c; })) return c;
  }
  return H.prefix + rnd_(6).toUpperCase();
}

function savePet_(b) {
  var sh = hsheet_('Pets', PET_COLS), all = readAll_(sh, PET_COLS), pin = b.pet || {};
  var name = clip_(pin.name, 30); if (!name) return { ok: false, err: 'bad' };
  var species = ['سگ', 'گربه', 'پرنده', 'دیگر'].indexOf(pin.species) > -1 ? pin.species : 'دیگر';
  var plan = []; (Array.isArray(pin.plan) ? pin.plan : []).slice(0, 60).forEach(function (x) { if (x && H.allTypes.indexOf(x.type) > -1 && date_(x.date)) plan.push({ id: /^[A-Za-z0-9]{3,30}$/.test(x.id || '') ? x.id : rnd_(8), type: x.type, date: x.date, label: clip_(x.label, 90), done: !!x.done }); });
  var cur = null, i; if (pin.code) for (i = 0; i < all.length; i++) if (all[i].code === String(pin.code).toUpperCase() && all[i].deleted !== '1') cur = all[i];
  var o = cur || { code: newCode_(all), key: rnd_(14), created: nowIso_(), deleted: '' };
  o.name = name; o.en = clip_(pin.en, 30); o.owner = clip_(pin.owner, 40); o.guardian = clip_(pin.guardian, 40); o.species = species;
  if (pin.phone !== undefined) o.phone = String(pin.phone || '').replace(/[^0-9+]/g, '').slice(0, 16);
  if (pin.smsok !== undefined) o.smsok = pin.smsok ? '1' : '';   // رضایت سرپرست برای پیامک یادآوری
  o.sex = ['نر', 'ماده'].indexOf(pin.sex) > -1 ? pin.sex : ''; o.neut = ['عقیم‌شده', 'عقیم‌نشده'].indexOf(pin.neut) > -1 ? pin.neut : '';
  o.breed = clip_(pin.breed, 40); o.breedEn = clip_(pin.breedEn, 40); o.birth = date_(pin.birth); o.plan = JSON.stringify(plan);
  o.consent = pin.consent ? '1' : (cur ? cur.consent : ''); o.updated = nowIso_(); o.auth = authCode_(o.code);
  writeRow_(sh, PET_COLS, o, cur ? cur._row : 0);
  return { ok: true, pet: petOut_(o, true) };
}

function saveRec_(b) {
  var pet = findPet_(b.code); if (!pet || pet.deleted === '1') return { ok: false, err: 'notfound' };
  var r = cleanRec_(b.rec || {}, pet.code, true); if (!r) return { ok: false, err: 'bad' };
  var sh = hsheet_('Records', REC_COLS), all = readAll_(sh, REC_COLS), cur = null, i;
  for (i = 0; i < all.length; i++) if (all[i].id === r.id && all[i].code === pet.code) cur = all[i];
  r.created = cur ? cur.created : nowIso_(); r.updated = nowIso_(); r.deleted = '';
  writeRow_(sh, REC_COLS, r, cur ? cur._row : 0);
  if (r.type === 'عقیم‌سازی') pet.neut = 'عقیم‌شده';   // ثبت عقیم‌سازی، وضعیت را خودکار «عقیم‌شده» می‌کند
  touchPet_(pet);
  return { ok: true, rec: recOut_(r), pet: petOut_(pet, true) };
}

function ownerWrite_(a, b) {
  var pet = ownerOk_(b.code, b.key); if (!pet) return { ok: false, err: 'auth' };
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    if (a === 'ownerDelRec') return delRec_({ code: pet.code, id: b.id }, false);
    var type = String((b.rec || {}).type || '');
    if (H.ownerTypes.indexOf(type) < 0) return { ok: false, err: 'forbidden' };
    var r = cleanRec_(b.rec, pet.code, false); if (!r) return { ok: false, err: 'bad' };
    var sh = hsheet_('Records', REC_COLS), all = readAll_(sh, REC_COLS), cur = null, i;
    for (i = 0; i < all.length; i++) if (all[i].id === r.id && all[i].code === pet.code) cur = all[i];
    if (cur && cur.dr === '1') return { ok: false, err: 'forbidden' };
    r.created = cur ? cur.created : nowIso_(); r.updated = nowIso_(); r.deleted = '';
    writeRow_(sh, REC_COLS, r, cur ? cur._row : 0);
    touchPet_(pet);
    return { ok: true, rec: recOut_(r) };
  } finally { lock.releaseLock(); }
}

function delRec_(b, asDr) {
  var sh = hsheet_('Records', REC_COLS), all = readAll_(sh, REC_COLS), i;
  for (i = 0; i < all.length; i++) {
    var r = all[i]; if (r.id !== String(b.id) || r.code !== String(b.code).toUpperCase()) continue;
    if (!asDr && r.dr === '1') return { ok: false, err: 'forbidden' };
    r.deleted = '1'; r.updated = nowIso_(); writeRow_(sh, REC_COLS, r, r._row); return { ok: true };
  }
  return { ok: false, err: 'notfound' };
}

function touchPet_(pet) { var sh = hsheet_('Pets', PET_COLS); pet.updated = nowIso_(); writeRow_(sh, PET_COLS, pet, pet._row); }
function rotate_(b) { var p = findPet_(b.code); if (!p || p.deleted === '1') return { ok: false, err: 'notfound' }; p.key = rnd_(14); p.updated = nowIso_(); writeRow_(hsheet_('Pets', PET_COLS), PET_COLS, p, p._row); return { ok: true, pet: petOut_(p, true) }; }
function deletePet_(b) { var p = findPet_(b.code); if (!p) return { ok: false, err: 'notfound' }; p.deleted = '1'; p.updated = nowIso_(); writeRow_(hsheet_('Pets', PET_COLS), PET_COLS, p, p._row); return { ok: true }; }

// ---- بررسی و ثبت «استفاده شد» برای کد جایزهٔ چرخ (از صفحهٔ دکتر) ----
function lookupCode_(code) {
  code = String(code || '').trim().toUpperCase();
  var m = /^DM-(\d{4})-([0-9A-F]{4})$/.exec(code); if (!m) return { status: 'bad' };
  var sh = sheet_(), data = sh.getDataRange().getValues(), i;
  for (i = 1; i < data.length; i++) {
    if (String(data[i][COL.code]).toUpperCase() !== code) continue;
    var prize = data[i][COL.prize], exp = Number(data[i][COL.exp]);
    if (sig_(m[1], prize, exp) !== m[2]) return { status: 'fake' };
    var o = { label: LABELS[prize] || prize, exp: exp, row: i + 1, sh: sh };
    if (data[i][COL.used]) { o.status = 'used'; o.usedAt = data[i][COL.usedAt] ? Utilities.formatDate(new Date(data[i][COL.usedAt]), CFG.tz, 'yyyy/MM/dd HH:mm') : ''; }
    else if (exp < Date.now()) o.status = 'expired';
    else o.status = 'valid';
    return o;
  }
  return { status: 'notfound' };
}
function verifyCode_(b, use) {
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    var r = lookupCode_(b.code), out = { ok: true, status: r.status, label: r.label || '', exp: r.exp || 0, usedAt: r.usedAt || '' };
    if (use) {
      if (r.status !== 'valid') return { ok: false, err: 'notvalid', status: r.status };
      r.sh.getRange(r.row, COL.used + 1, 1, 2).setValues([[true, new Date()]]);
      out.status = 'usedNow';
    }
    return out;
  } finally { lock.releaseLock(); }
}

function doPost(e) {
  var b = {};
  try { b = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (x) { return json_({ ok: false, err: 'bad' }); }
  try { return json_(health_(b)); } catch (err) { return json_({ ok: false, err: 'server', msg: String(err).slice(0, 120) }); }
}
function doGet(e) {
  var p = (e && e.parameter) || {};
  // روش جایگزین برای مرورگرهای قدیمی (آیپد iOS 12): همان درخواست‌ها با GET و پاسخ به شکل callback(...)
  if (p.cb && /^[A-Za-z_$][\w$]{0,40}$/.test(p.cb) && p.d) {
    var out; try { out = health_(JSON.parse(p.d)); } catch (err) { out = { ok: false, err: 'server', msg: String(err).slice(0, 120) }; }
    return ContentService.createTextOutput(p.cb + '(' + JSON.stringify(out) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  if (p.action === 'spin') return json_(spin_(p));
  if (p.action === 'verify') return verifyPage_(p);
  return json_({ ok: true, service: 'sheet-server', wheel: true, health: true, version: 'v30-panel' });
}

// ======================= چرخ هدیه =======================
function spin_(p) {
  var dev = String(p.dev || '').replace(/[^A-Za-z0-9\-]/g, '').slice(0, 40);
  if (!dev) return { ok: false, reason: 'bad' };
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = sheet_(), rows = sh.getDataRange().getValues().slice(1);
    var now = new Date(), today = day_(now), mon = month_(now);
    var mine = [], spinsToday = 0, freeThisMonth = 0;
    rows.forEach(function (r) {
      var t = new Date(r[COL.time]);
      if (day_(t) === today) spinsToday++;
      if (month_(t) === mon && r[COL.prize] === 'free') freeThisMonth++;
      if (String(r[COL.dev]) === dev && day_(t) === today) mine.push(r);
    });
    if (spinsToday >= CFG.maxSpinsPerDay) return { ok: false, reason: 'busy' };
    var real = mine.filter(function (r) { return r[COL.prize] !== 'retry'; });
    if (real.length) {
      var last = real[real.length - 1];
      return { ok: false, reason: 'done', id: last[COL.prize], code: last[COL.code], exp: Number(last[COL.exp]) };
    }
    if (mine.length >= 2) return { ok: false, reason: 'done' };
    var second = mine.length === 1;
    var id = pickPrize_(second, CFG.maxFreePerMonth - freeThisMonth);
    var exp = now.getTime() + CFG.validDays * 86400000;
    var digits = String(Math.floor(1000 + Math.random() * 9000));
    var code = id === 'retry' ? '' : 'DM-' + digits + '-' + sig_(digits, id, exp);
    sh.appendRow([now, code, id, exp, dev, '', '']);
    return { ok: true, id: id, code: code, exp: exp };
  } finally { lock.releaseLock(); }
}

// صفحهٔ بررسی کد برای دکتر:  ...exec?action=verify&key=ADMIN_KEY&code=DM-1234-ABCD
// برای علامت‌گذاری «استفاده شد» همان آدرس را با &use=1 باز کنید.
function verifyPage_(p) {
  var html = function (title, body, color) {
    return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<body style="font-family:Tahoma,sans-serif;direction:rtl;padding:24px;max-width:480px;margin:auto">' +
      '<h2 style="color:' + color + '">' + title + '</h2>' + body + '</body>');
  };
  if (!prop_('ADMIN_KEY') || p.key !== prop_('ADMIN_KEY')) return html('دسترسی ندارید', '<p>کلید نادرست است.</p>', '#b3261e');
  var code = String(p.code || '').trim().toUpperCase();
  var m = /^DM-(\d{4})-([0-9A-F]{4})$/.exec(code);
  if (!m) return html('کد نامعتبر', '<p>قالب کد درست نیست.</p>', '#b3261e');
  var sh = sheet_(), data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][COL.code]).toUpperCase() !== code) continue;
    var prize = data[i][COL.prize], exp = Number(data[i][COL.exp]);
    if (sig_(m[1], prize, exp) !== m[2]) return html('کد جعلی', '<p>امضای کد با سرور نمی‌خواند.</p>', '#b3261e');
    var expText = Utilities.formatDate(new Date(exp), CFG.tz, 'yyyy/MM/dd HH:mm');
    var base = '<p>جایزه: <b>' + LABELS[prize] + '</b></p><p>اعتبار تا: ' + expText + '</p>';
    if (data[i][COL.used]) return html('قبلاً استفاده شده', base + '<p>زمان استفاده: ' + data[i][COL.usedAt] + '</p>', '#b3261e');
    if (exp < Date.now()) return html('منقضی شده', base, '#b3261e');
    if (p.use === '1') {
      sh.getRange(i + 1, COL.used + 1, 1, 2).setValues([[true, new Date()]]);
      return html('ثبت شد: استفاده شد', base, '#1a8f63');
    }
    var link = ScriptApp.getService().getUrl() + '?action=verify&key=' + encodeURIComponent(p.key) + '&code=' + encodeURIComponent(code) + '&use=1';
    return html('کد معتبر است ✓', base + '<p><a href="' + link + '" style="display:inline-block;padding:12px 20px;background:#1a8f63;color:#fff;border-radius:10px;text-decoration:none">ثبت به‌عنوان استفاده‌شده</a></p>', '#1a8f63');
  }
  return html('کد پیدا نشد', '<p>این کد در شیت ثبت نشده است.</p>', '#b3261e');
}


// ======================= واگذاری پت =======================
var AD = { maxPerHour: 20, days: 60, statuses: ['pending', 'approved', 'done', 'rejected', 'deleted'] };
var AD_COLS = ['id', 'created', 'status', 'species', 'name', 'age', 'sex', 'neutered', 'vaccine', 'temper', 'reason', 'city', 'contact', 'photo', 'note', 'approved', 'updated'];
function faDigits_(s) { return String(s || '').replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; }); }
function adoptSubmit_(b) {
  if (b.hp) return { ok: true, id: 'AD-000000' };   // ربات‌ها (فیلد مخفی)
  var cache = CacheService.getScriptCache(), key = 'adn' + Utilities.formatDate(new Date(), CFG.tz, 'yyyyMMddHH'), n = Number(cache.get(key) || 0);
  if (n >= AD.maxPerHour) return { ok: false, err: 'busy' };
  var species = clip_(b.species, 12); if (['سگ', 'گربه', 'پرنده', 'دیگر'].indexOf(species) < 0) return { ok: false, err: 'bad' };
  var name = clip_(b.name, 40).trim(), contact = faDigits_(clip_(b.contact, 30)).replace(/[^0-9+]/g, '');
  if (!name || contact.replace(/\D/g, '').length < 10 || !b.consent) return { ok: false, err: 'bad' };
  var o = { id: 'AD-' + rnd_(6).toUpperCase(), created: nowIso_(), status: 'pending', species: species, name: name, age: clip_(b.age, 30), sex: ['نر', 'ماده', 'نامشخص'].indexOf(b.sex) > -1 ? b.sex : 'نامشخص',
    neutered: ['بله', 'خیر', 'نمی‌دانم'].indexOf(b.neutered) > -1 ? b.neutered : 'نمی‌دانم', vaccine: ['بله', 'خیر', 'نمی‌دانم'].indexOf(b.vaccine) > -1 ? b.vaccine : 'نمی‌دانم',
    temper: clip_(b.temper, 300), reason: clip_(b.reason, 300), city: clip_(b.city, 60), contact: contact, photo: '', note: '', approved: '', updated: nowIso_() };
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try { writeRow_(hsheet_('Adoptions', AD_COLS), AD_COLS, o); } finally { lock.releaseLock(); }
  cache.put(key, String(n + 1), 3600);
  notify_('🏡 درخواست واگذاری پت', 'کد: ' + o.id + '\nنام: ' + o.name + ' (' + o.species + ')\nشهر: ' + (o.city || '—') + '\nتماس: ' + o.contact + '\n\nبرای بررسی: صفحهٔ دکتر ← تب «🏡 واگذاری»');
  return { ok: true, id: o.id };
}
function adoptPub_(r) { return { id: r.id, species: r.species, name: r.name, age: r.age, sex: r.sex, neutered: r.neutered, vaccine: r.vaccine, temper: r.temper, reason: r.reason, city: r.city, photo: r.photo, approved: r.approved }; }
function adoptList_() {
  var lim = Utilities.formatDate(new Date(Date.now() - AD.days * 86400000), CFG.tz, 'yyyy-MM-dd');
  var rows = readAll_(hsheet_('Adoptions', AD_COLS), AD_COLS).filter(function (r) { return r.status === 'approved' && r.approved >= lim; });
  rows.sort(function (x, y) { return x.approved < y.approved ? 1 : -1; });
  return { ok: true, pets: rows.slice(0, 60).map(adoptPub_) };
}
function adoptAdmin_() {
  var rows = readAll_(hsheet_('Adoptions', AD_COLS), AD_COLS).filter(function (r) { return r.status !== 'deleted'; });
  rows.sort(function (x, y) { return x.created < y.created ? 1 : -1; });
  return { ok: true, items: rows.slice(0, 200).map(function (r) { var o = adoptPub_(r); o.status = r.status; o.created = r.created; o.contact = r.contact; o.note = r.note; return o; }) };
}
function adoptSet_(b) {
  var sh = hsheet_('Adoptions', AD_COLS), rows = readAll_(sh, AD_COLS), r = null, i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) { r = rows[i]; break; }
  if (!r) return { ok: false, err: 'notfound' };
  if (b.status !== undefined) {
    if (AD.statuses.indexOf(b.status) < 0) return { ok: false, err: 'bad' };
    if (b.status === 'approved' && r.status !== 'approved') r.approved = day_(new Date());
    r.status = b.status;
  }
  if (b.photo !== undefined) {
    if (b.photo === '') r.photo = '';
    else if (/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(b.photo) && b.photo.length <= 45000) r.photo = b.photo;
    else return { ok: false, err: 'bad' };
  }
  if (b.note !== undefined) r.note = clip_(b.note, 300);
  r.updated = nowIso_(); writeRow_(sh, AD_COLS, r, r._row);
  return { ok: true };
}


// ======================= درخواست شناسنامه (از طرف صاحب پت) =======================
var PR = { maxPerHour: 30, statuses: ['new', 'done', 'rejected', 'deleted'] };
var PR_COLS = ['id', 'created', 'status', 'name', 'species', 'owner', 'contact', 'birth', 'note', 'code', 'updated'];
function petReqSubmit_(b) {
  if (b.hp) return { ok: true, id: 'RQ-000000' };
  var cache = CacheService.getScriptCache(), key = 'prn' + Utilities.formatDate(new Date(), CFG.tz, 'yyyyMMddHH'), n = Number(cache.get(key) || 0);
  if (n >= PR.maxPerHour) return { ok: false, err: 'busy' };
  var species = clip_(b.species, 12); if (['سگ', 'گربه', 'پرنده', 'دیگر'].indexOf(species) < 0) return { ok: false, err: 'bad' };
  var name = clip_(b.name, 40).trim(), owner = clip_(b.owner, 60).trim(), contact = faDigits_(clip_(b.contact, 30)).replace(/[^0-9+]/g, '');
  if (!name || !owner || contact.replace(/\D/g, '').length < 10) return { ok: false, err: 'bad' };
  var o = { id: 'RQ-' + rnd_(6).toUpperCase(), created: nowIso_(), status: 'new', name: name, species: species, owner: owner, contact: contact,
    birth: clip_(b.birth, 30), note: clip_(b.note, 200), code: '', updated: nowIso_() };
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try { writeRow_(hsheet_('PetReqs', PR_COLS), PR_COLS, o); } finally { lock.releaseLock(); }
  cache.put(key, String(n + 1), 3600);
  notify_('📝 درخواست شناسنامه', 'کد: ' + o.id + '\nپت: ' + o.name + ' (' + o.species + ')\nصاحب: ' + o.owner + '\nتماس: ' + o.contact + (o.note ? '\nتوضیح: ' + o.note : '') + '\n\nبرای صدور: صفحهٔ دکتر ← تب «📝 درخواست‌ها»');
  return { ok: true, id: o.id };
}
function petReqList_() {
  var rows = readAll_(hsheet_('PetReqs', PR_COLS), PR_COLS).filter(function (r) { return r.status !== 'deleted'; });
  rows.sort(function (x, y) { return x.created < y.created ? 1 : -1; });
  return { ok: true, items: rows.slice(0, 200).map(function (r) { return { id: r.id, created: r.created, status: r.status, name: r.name, species: r.species, owner: r.owner, contact: r.contact, birth: r.birth, note: r.note, code: r.code }; }) };
}
// ---- پیامک (ملی‌پیامک): تنظیمات در Script Properties — SMS_TOKEN، SMS_FROM، (اختیاری) SMS_URL و SMS_TEXT_NEW ----
function smsPhone_(v) {
  var d = String(v || '').replace(/[^0-9+]/g, '');
  if (/^\+989\d{9}$/.test(d)) d = '0' + d.slice(3); else if (/^989\d{9}$/.test(d)) d = '0' + d.slice(2); else if (/^9\d{9}$/.test(d)) d = '0' + d;
  return /^09\d{9}$/.test(d) ? d : '';
}
function sendSms_(to, text, kind, vars, tplCode) {
  function logFail_(st, why) { try { writeRow_(hsheet_('SMS', SMS_COLS), SMS_COLS, { time: nowIso_(), to: String(to || '').slice(0, 20), kind: kind || '', text: clip_(text, 300), status: '❌ ناموفق', response: why, raw: st }, 0); } catch (e0) {} }
  var token = prop_('SMS_TOKEN'); if (!token) { logFail_('NO_TOKEN', 'SMS_TOKEN در Script Properties ثبت نشده است'); return { ok: false, err: 'sms_off' }; }
  var num = smsPhone_(to); if (!num) { logFail_('BAD_PHONE', 'شمارهٔ موبایل معتبر نیست (باید مثل 09123456789 باشد)'); return { ok: false, err: 'bad_phone' }; }
  var provider = String(prop_('SMS_PROVIDER') || 'ippanel').toLowerCase(), from = String(prop_('SMS_FROM') || '').replace(/\s/g, '');
  var status = '', body = '', ok = false, req;
  if (provider === 'smsir') {
    // sms.ir (API v1) — آدرس و فیلدها از حافظه و SDKهای عمومی؛ با نمونهٔ رسمی پنل تأیید شود
    var key = token.replace(/^(apikey|bearer)\s+/i, ''), tpl = tplCode || prop_('SMS_PATTERN_CODE'), mob = num.slice(1);
    if (tpl && vars) {
      var pv = prop_('SMS_PATTERN_VAR') || 'NAME', plist = [];
      Object.keys(vars).forEach(function (k) { plist.push({ name: (k === 'name' ? pv : String(k).toUpperCase()), value: String(vars[k]) }); });
      req = { url: 'https://api.sms.ir/v1/send/verify', opt: { method: 'post', contentType: 'application/json', headers: { 'X-API-KEY': key, Accept: 'application/json' }, muteHttpExceptions: true, payload: JSON.stringify({ mobile: mob, templateId: Number(tpl), parameters: plist }) } };
    } else {
      req = { url: 'https://api.sms.ir/v1/send/bulk', opt: { method: 'post', contentType: 'application/json', headers: { 'X-API-KEY': key, Accept: 'application/json' }, muteHttpExceptions: true, payload: JSON.stringify({ lineNumber: Number(from.replace(/\D/g, '')), messageText: text, mobiles: [mob] }) } };
    }
  } else if (provider === 'melipayamak') {
    req = { url: prop_('SMS_URL') || ('https://console.melipayamak.com/api/send/simple/' + token), opt: { method: 'post', contentType: 'application/json', muteHttpExceptions: true, payload: JSON.stringify({ from: from, to: num, text: text }) } };
  } else {
    // مدیرپیامک / IPPanel (Edge API): https://ippanelcom.github.io/Edge-Document/docs/send/webservice
    var fromNum = /^\+/.test(from) ? from : (/^98/.test(from) ? '+' + from : (/^0?\d+$/.test(from) ? '+98' + from.replace(/^0/, '') : from));
    var auth = token.replace(/^(apikey|bearer)\s+/i, '');   // آزمایش واقعی: هدر باید فقط خود کلید باشد (بدون پیشوند)، طبق مستندات رسمی
    var e164 = '+98' + num.slice(1), patCode = tplCode || prop_('SMS_PATTERN_CODE'), payload;
    if (patCode && vars) {   // پترن تأییدشده (ارسال لحظه‌ای): docs/send/pattern
      payload = { sending_type: 'pattern', from_number: fromNum, code: patCode, recipients: [e164], params: vars };
    } else {
      payload = { sending_type: 'webservice', from_number: fromNum, message: text, params: { recipients: [e164] } };
    }
    req = { url: prop_('SMS_URL') || 'https://edge.ippanel.com/v1/api/send', opt: { method: 'post', contentType: 'application/json', headers: { Authorization: auth }, muteHttpExceptions: true, payload: JSON.stringify(payload) } };
  }
  var t0 = Date.now(), human = '', provMsg = '', msgId = '';
  try {
    var res = UrlFetchApp.fetch(req.url, req.opt), raw = String(res.getContentText());
    status = String(res.getResponseCode()); ok = res.getResponseCode() >= 200 && res.getResponseCode() < 300;
    body = /<html|<!doctype/i.test(raw) ? 'صفحهٔ خطای HTML از سرور مقصد (' + raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110) + ')' : raw.slice(0, 260);
    try {
      var jb = JSON.parse(raw);
      provMsg = String(jb.message || (jb.meta && jb.meta.message) || '');
      if (jb && jb.meta && jb.meta.status === false) ok = false;
      if (jb && jb.status !== undefined && jb.status !== 1 && jb.status !== true && jb.data !== undefined && jb.meta === undefined) ok = false;   // sms.ir: status=1 یعنی موفق
      var dd = jb.data || {}; msgId = String((dd.messageIds && dd.messageIds[0]) || dd.messageId || (dd.message_outbox_ids && dd.message_outbox_ids[0]) || '');
    } catch (ej) {}
  } catch (e) { status = 'EXC'; body = String(e).slice(0, 260); }
  var ms = Date.now() - t0;
  human = ok ? 'پیامک پذیرفته شد' + (msgId ? ' · شناسهٔ پیام ' + msgId : '') : (provMsg || (status === '502' ? 'سرور مقصد در دسترس نیست (۵۰۲)' : status === '401' || status === '403' ? 'کلید پذیرفته نشد' : 'ارسال انجام نشد')) + ' (کد ' + status + ')';
  body = human;
  try { writeRow_(hsheet_('SMS', SMS_COLS), SMS_COLS, { time: nowIso_(), to: num, kind: kind || '', text: clip_(text, 300), status: ok ? '✅ موفق' : '❌ ناموفق', response: human, raw: 'HTTP ' + status + ' · ' + ms + ' ms · ' + String(typeof raw !== 'undefined' ? raw : body).replace(/\s+/g, ' ').slice(0, 300) }, 0); } catch (e2) {}
  return ok ? { ok: true, status: status } : { ok: false, err: 'fail', msg: human.slice(0, 160) };
}
function patSms_(b) {
  var rows = readAll_(hsheet_('Patients', PT_COLS), PT_COLS).filter(function (r) { return r.pkey === String(b.pkey || '') && r.deleted !== '1'; });
  if (!rows.length) return { ok: false, err: 'notfound' };
  rows.sort(function (x, y) { return x.date < y.date ? 1 : -1; });
  var r = rows[0], cache = CacheService.getScriptCache(), key = 'sms_' + r.pkey;
  if (cache.get(key)) return { ok: false, err: 'rate' };
  var tpl = prop_('SMS_TEXT_NEW') || 'سرپرست گرامی، پروندهٔ {name} در کلینیک دامپزشکی دکتر نیلوفر مساوات ثبت شد. drniloofarmosavat.ir';
  var out = sendSms_(r.phone, tpl.replace(/\{name\}/g, r.name), 'patient:' + r.pkey, { name: r.name });
  if (out.ok) cache.put(key, '1', 600);   // جلوگیری از ارسال تکراری تا ۱۰ دقیقه
  return out;
}
// ---- امروز، فعالیت پنل و نوبت‌دهی ----
function today_() { return Utilities.formatDate(new Date(), CFG.tz, 'yyyy-MM-dd'); }
// زمان‌های ثبت‌شده با nowIso_ از قبل به وقت تهران‌اند (بدون منطقهٔ زمانی)؛ پس مستقیم از متن بریده می‌شوند
function dayOf_(iso) { return String(iso || '').slice(0, 10); }
function hmOf_(iso) { return String(iso || '').slice(11, 16); }
function touch_(b) {
  var kind = b.kind === 'patient' ? 'patient' : b.kind === 'pet' ? 'pet' : ''; var ref = clip_(b.ref, 30); if (!kind || !ref) return { ok: false, err: 'bad' };
  var day = today_(), key = 'act_' + day + '_' + kind + '_' + ref, cache = CacheService.getScriptCache();
  if (cache.get(key)) return { ok: true, dup: true };
  writeRow_(hsheet_('Activity', ACT_COLS), ACT_COLS, { day: day, time: Utilities.formatDate(new Date(), CFG.tz, 'HH:mm'), kind: kind, ref: ref, name: clip_(b.name, 40) }, 0);
  cache.put(key, '1', 21600); return { ok: true };
}
function todayList_() {
  var day = today_(), map = {}, order = [];
  function add(kind, ref, o, tag, time) {
    var k = kind + '|' + ref;
    if (!map[k]) { map[k] = { kind: kind, ref: ref, name: '', owner: '', phone: '', species: '', tags: [], time: '' }; order.push(k); }
    var m = map[k]; ['name', 'owner', 'phone', 'species'].forEach(function (f) { if (!m[f] && o && o[f]) m[f] = o[f]; });
    if (tag && m.tags.indexOf(tag) < 0) m.tags.push(tag); if (time && time > m.time) m.time = time;
  }
  var pets = readAll_(hsheet_('Pets', PET_COLS), PET_COLS).filter(function (p) { return p.deleted !== '1'; }), petBy = {};
  pets.forEach(function (p) { petBy[p.code] = p; if (dayOf_(p.created) === day) add('pet', p.code, p, 'new', hmOf_(p.created)); });
  var pts = readAll_(hsheet_('Patients', PT_COLS), PT_COLS).filter(function (r) { return r.deleted !== '1'; }), ptBy = {};
  pts.sort(function (x, y) { return x.date < y.date ? 1 : -1; });
  pts.forEach(function (r) { if (!ptBy[r.pkey]) ptBy[r.pkey] = r; });
  pts.forEach(function (r) { if (r.date === day) add('patient', r.pkey, r, 'visit', hmOf_(r.created)); else if (dayOf_(r.created) === day) add('patient', r.pkey, r, 'new', hmOf_(r.created)); });
  readAll_(hsheet_('Activity', ACT_COLS), ACT_COLS).forEach(function (a) {
    if (a.day !== day) return; var src = a.kind === 'pet' ? petBy[a.ref] : ptBy[a.ref]; if (!src) return;
    add(a.kind, a.ref, src, 'opened', a.time);
  });
  var out = order.map(function (k) { return map[k]; });
  out.forEach(function (m) { var src = m.kind === 'pet' ? petBy[m.ref] : ptBy[m.ref]; if (src) { m.name = m.name || src.name; m.owner = m.owner || src.owner; m.phone = m.phone || src.phone; m.species = m.species || src.species; } });
  out.sort(function (x, y) { return x.time < y.time ? 1 : -1; });
  return { ok: true, day: day, items: out.slice(0, 200) };
}
function apOut_(r) { return { breed: r.breed || '', id: r.id, date: r.date, time: r.time, name: r.name, species: r.species, owner: r.owner, phone: r.phone, reason: r.reason, note: r.note, status: r.status || 'booked', pkey: r.pkey, rem: r.rem === '1' ? 1 : 0 }; }
function apList_() {
  var from = Utilities.formatDate(new Date(Date.now() - 14 * 86400000), CFG.tz, 'yyyy-MM-dd');
  var rows = readAll_(hsheet_('Appts', AP_COLS), AP_COLS).filter(function (r) { return r.deleted !== '1' && r.date >= from; });
  rows.sort(function (x, y) { return (x.date + x.time) < (y.date + y.time) ? -1 : 1; });
  var sm = smsAtMap_('apr'), items = rows.slice(0, 400).map(apOut_); items.forEach(function (x) { x.smsAt = sm[x.id] || ''; });
  return { ok: true, today: today_(), items: items };
}
function apSave_(b) {
  var sh = hsheet_('Appts', AP_COLS), rows = readAll_(sh, AP_COLS), r = null, i, v = b.v || {};
  var name = clip_(v.name, 40), d = date_(v.date); if (!name || !d) return { ok: false, err: 'bad' };
  if (b.id) for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id)) { r = rows[i]; break; }
  if (b.id && !r) return { ok: false, err: 'notfound' };
  if (!r) r = { id: 'A-' + rnd_(7).toUpperCase(), created: nowIso_(), deleted: '', status: 'booked' };
  r.date = d; r.time = /^\d{2}:\d{2}$/.test(String(v.time || '')) ? v.time : '';
  r.name = name; r.species = ['سگ', 'گربه', 'پرنده', 'دیگر'].indexOf(v.species) > -1 ? v.species : 'دیگر';
  r.owner = clip_(v.owner, 40); r.phone = String(v.phone || '').replace(/[^0-9+]/g, '').slice(0, 16);
  r.reason = clip_(v.reason, 150); r.note = clip_(v.note, 600); r.pkey = /^PT-[A-Z0-9]{5,10}$/.test(String(v.pkey || '')) ? v.pkey : (r.pkey || '');
  r.rem = v.rem ? '1' : ''; r.breed = clip_(v.breed, 40);
  if (!sh.getRange(1, AP_COLS.length).getValue()) sh.getRange(1, AP_COLS.length).setValue('یادآور پیامکی (۱=بله)');
  r.updated = nowIso_(); writeRow_(sh, AP_COLS, r, r._row || 0);
  return { ok: true, item: apOut_(r) };
}
function apSet_(b) {
  var sh = hsheet_('Appts', AP_COLS), rows = readAll_(sh, AP_COLS), i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) {
    if (b.del) rows[i].deleted = '1'; else if (['booked', 'done', 'noshow', 'cancelled'].indexOf(b.status) > -1) rows[i].status = b.status; else return { ok: false, err: 'bad' };
    rows[i].updated = nowIso_(); writeRow_(sh, AP_COLS, rows[i], rows[i]._row); return { ok: true };
  }
  return { ok: false, err: 'notfound' };
}
// ---- یادآور خودکار واکسن و ضدانگل (پیامک با قالب جدا) ----
// Script Properties: SMS_TPL_VAX و SMS_TPL_PAR = شمارهٔ قالب‌های تأییدشده؛ متغیرها NAME و DATE
function jalali_(iso) {
  var a = String(iso).split('-'), gy = +a[0], gm = +a[1], gd = +a[2], g = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var gy2 = gm > 2 ? gy + 1 : gy, days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g[gm - 1];
  var jy = -1595 + 33 * Math.floor(days / 12053); days %= 12053; jy += 4 * Math.floor(days / 1461); days %= 1461;
  if (days > 365) { jy += Math.floor((days - 1) / 365); days = (days - 1) % 365; }
  var jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30), jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}
function faDate_(iso) {
  var j = jalali_(iso), p = function (n) { return (n < 10 ? '0' : '') + n; };
  return (j[0] + '/' + p(j[1]) + '/' + p(j[2])).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; });
}
function addDays_(iso, n) { var d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
function remKind_(type) { return type === 'واکسن' ? 'vax' : (type === 'ضدانگل داخلی' || type === 'ضدانگل خارجی (کک و کنه)') ? 'par' : ''; }
function sendRemindersFor_(recs, petBy, doneKinds, opts) {
  var out = { sent: 0, failed: 0, noPhone: 0, noConsent: 0, noTpl: 0, dup: 0, errs: [] };
  recs.forEach(function (r) {
    var k = remKind_(r.type); if (!k) return;
    var pet = petBy[r.code]; if (!pet || pet.deleted === '1') return;
    if (pet.smsok !== '1') { out.noConsent++; return; }
    if (!smsPhone_(pet.phone)) { out.noPhone++; return; }
    var kind = 'rem:' + r.id + ':' + r.next;
    if (!opts.force && doneKinds[kind]) { out.dup++; return; }
    var tpl = prop_(k === 'vax' ? 'SMS_TPL_VAX' : 'SMS_TPL_PAR'); if (!tpl) { out.noTpl++; return; }
    var res = sendSms_(pet.phone, (k === 'vax' ? 'یادآور واکسن ' : 'یادآور ضدانگل ') + pet.name + ' ' + faDate_(r.next), kind, { name: pet.name, date: faDate_(r.next) }, tpl);
    if (res.ok) { out.sent++; doneKinds[kind] = 1; } else { out.failed++; if (res.msg && out.errs.length < 2) out.errs.push(res.msg); }
  });
  return out;
}
function loadRemData_() {
  var petBy = {}; readAll_(hsheet_('Pets', PET_COLS), PET_COLS).forEach(function (p) { petBy[p.code] = p; });
  var done = {}; readAll_(hsheet_('SMS', SMS_COLS), SMS_COLS).forEach(function (r) { if (/^rem:/.test(r.kind) && /^(✅|2)/.test(r.status)) done[r.kind] = 1; });
  var recs = readAll_(hsheet_('Records', REC_COLS), REC_COLS).filter(function (r) { return r.deleted !== '1' && r.closed !== '1' && /^\d{4}-\d{2}-\d{2}$/.test(r.next || ''); });
  return { petBy: petBy, done: done, recs: recs };
}
// ---- یادآور نوبت: روز قبل از نوبت (Script Property: SMS_TPL_APPT؛ متغیرها NAME، DATE، TIME) ----
function apDone_() { var done = {}; readAll_(hsheet_('SMS', SMS_COLS), SMS_COLS).forEach(function (r) { if (/^apr:/.test(r.kind) && /^(✅|2)/.test(r.status)) done[r.kind] = 1; }); return done; }
function apRemindRows_(rows, done, force) {
  var out = { sent: 0, failed: 0, noPhone: 0, noTpl: 0, dup: 0, errs: [] }, tpl = prop_('SMS_TPL_APPT');
  rows.forEach(function (r) {
    if (!smsPhone_(r.phone)) { out.noPhone++; return; }
    var kind = 'apr:' + r.id + ':' + r.date; if (!force && done[kind]) { out.dup++; return; }
    if (!tpl) { out.noTpl++; return; }
    var res = sendSms_(r.phone, 'یادآور نوبت ' + r.name + ' ' + faDate_(r.date) + ' ' + (r.time || ''), kind, { name: r.name, date: faDate_(r.date), time: r.time || 'طی روز' }, tpl);
    if (res.ok) { out.sent++; done[kind] = 1; } else { out.failed++; if (res.msg && out.errs.length < 2) out.errs.push(res.msg); }
  });
  return out;
}
function apRemind_(b) {
  var rows = readAll_(hsheet_('Appts', AP_COLS), AP_COLS).filter(function (r) { return r.id === String(b.id || '') && r.deleted !== '1'; });
  if (!rows.length) return { ok: false, err: 'notfound' };
  var r = rows[0]; if ((r.status || 'booked') !== 'booked') return { ok: false, err: 'not_booked' };
  if (!smsPhone_(r.phone)) return { ok: false, err: 'no_phone' };
  if (!prop_('SMS_TPL_APPT')) return { ok: false, err: 'no_tpl' };
  var cache = CacheService.getScriptCache(), key = 'apr_' + r.id; if (cache.get(key)) return { ok: false, err: 'rate' };
  var o = apRemindRows_([r], {}, true);
  if (o.sent) { cache.put(key, '1', 600); return { ok: true }; }
  return { ok: false, err: 'fail', msg: o.errs[0] || '' };
}
// اجرای خودکار روزانه: موعد واکسن/ضدانگل ۳ روز دیگر + نوبت‌های فردا
function dailyReminders() {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var d = loadRemData_(), target = addDays_(today_(), 3), out = sendRemindersFor_(d.recs.filter(function (r) { return r.next === target; }), d.petBy, d.done, {});
    var tmr = addDays_(today_(), 1);
    var aps = readAll_(hsheet_('Appts', AP_COLS), AP_COLS).filter(function (r) { return r.deleted !== '1' && (r.status || 'booked') === 'booked' && r.rem === '1' && r.date === tmr; });
    out.ap = apRemindRows_(aps, apDone_(), false);
    return out;
  } finally { lock.releaseLock(); }
}
function setupReminderTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'dailyReminders') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('dailyReminders').timeBased().everyDays(1).atHour(10).inTimezone(CFG.tz).create();
  SpreadsheetApp.getUi().alert('یادآور خودکار فعال شد: هر روز حدود ساعت ۱۰ صبح، برای موعدهای ۳ روز بعد.');
}
function stopReminderTrigger() {
  var n = 0; ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'dailyReminders') { ScriptApp.deleteTrigger(t); n++; } });
  SpreadsheetApp.getUi().alert(n ? 'یادآور خودکار متوقف شد.' : 'یادآور خودکاری فعال نبود.');
}
function runRemindersNow() {
  var o = dailyReminders(); SpreadsheetApp.getUi().alert('یادآورهای موعد ۳ روز دیگر:\nارسال‌شده: ' + o.sent + '\nناموفق: ' + o.failed + '\nبدون رضایت: ' + o.noConsent + '\nبدون شماره: ' + o.noPhone + '\nقالب تنظیم‌نشده: ' + o.noTpl + '\nتکراری (قبلاً رفته): ' + o.dup + (o.ap ? '\n\nنوبت‌های فردا:\nارسال‌شده: ' + o.ap.sent + '\nناموفق: ' + o.ap.failed + '\nبدون شماره: ' + o.ap.noPhone + '\nقالب تنظیم‌نشده: ' + o.ap.noTpl + '\nتکراری: ' + o.ap.dup : '') + (o.errs.length ? '\nخطا: ' + o.errs[0] : ''));
}
// دکمهٔ دستی در پروندهٔ پت: یادآور موعدهای ۶۰ روز آینده
function petRemind_(b) {
  var code = String(b.code || '').toUpperCase(), pet = findPet_(code); if (!pet || pet.deleted === '1') return { ok: false, err: 'notfound' };
  if (pet.smsok !== '1') return { ok: false, err: 'no_consent' };
  if (!smsPhone_(pet.phone)) return { ok: false, err: 'bad_phone' };
  var cache = CacheService.getScriptCache(), key = 'remind_' + code; if (cache.get(key)) return { ok: false, err: 'rate' };
  var d = loadRemData_(), from = today_(), to = addDays_(from, 60);
  var recs = d.recs.filter(function (r) { return r.code === code && r.next >= from && r.next <= to && remKind_(r.type); });
  if (!recs.length) return { ok: false, err: 'none' };
  var o = sendRemindersFor_(recs, d.petBy, d.done, { force: true });
  if (o.sent) cache.put(key, '1', 600);
  if (!o.sent && o.noTpl) return { ok: false, err: 'no_tpl' };
  return o.sent ? { ok: true, sent: o.sent, failed: o.failed } : { ok: false, err: 'fail', msg: o.errs[0] || '' };
}
// ---- دفتر «بیماران من» (فقط دکتر؛ هر ردیف = یک مراجعه) ----
function patOut_(r) { return { breed: r.breed || '', id: r.id, pkey: r.pkey, date: r.date, name: r.name, species: r.species, owner: r.owner, phone: r.phone, reason: r.reason, note: r.note, follow: r.follow, code: r.code, fee: r.fee || '', paid: r.paid === '1', pay: r.pay || '' }; }
// آخرین پیامک موفق برای هر پرونده/نوبت (از شیت SMS)، تا روی همهٔ دستگاه‌ها دیده شود
function smsAtMap_(prefix) {
  var m = {}, re = new RegExp('^' + prefix + ':([^:]+)');
  readAll_(hsheet_('SMS', SMS_COLS), SMS_COLS).forEach(function (r) { var x = re.exec(r.kind); if (x && /^(✅|2)/.test(r.status)) { var d = String(r.time).slice(0, 10); if (!m[x[1]] || d > m[x[1]]) m[x[1]] = d; } });
  return m;
}
// جستجوی شماره تماس (یا نام) در بیماران، شناسنامه‌ها و نوبت‌ها — برای پرکردن خودکار فرم
// شماره بدون صفر/۹۸ اول، برای مقایسه (0912… و 912… و +98912… یکی حساب شوند)
function phN_(v) { var d = String(v || '').replace(/\D/g, ''); if (/^98\d{10}$/.test(d)) d = d.slice(2); return d.replace(/^0+/, ''); }
function lookup_(b) {
  var raw = String(b.q || '').replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); }), byPhone = /^[\s+\d-]+$/.test(raw), qd = phN_(raw), qn = norm_(raw);
  if (byPhone ? qd.length < 3 : qn.length < 2) return { ok: true, items: [] };
  function hit(o) { return byPhone ? phN_(o.phone).indexOf(qd) > -1 : norm_([o.name, o.en, o.owner, o.guardian].join(' ')).indexOf(qn) > -1; }
  var out = [], seen = {};
  function add(o) { var k = phN_(o.phone) + '|' + norm_(o.name); if (seen[k]) return; seen[k] = 1; out.push(o); }
  var pts = readAll_(hsheet_('Patients', PT_COLS), PT_COLS).filter(function (r) { return r.deleted !== '1' && hit(r); });
  pts.sort(function (x, y) { return x.date < y.date ? 1 : -1; });
  pts.forEach(function (r) { add({ kind: 'patient', pkey: r.pkey, name: r.name, species: r.species, breed: r.breed || '', owner: r.owner, phone: r.phone, last: r.date }); });
  readAll_(hsheet_('Pets', PET_COLS), PET_COLS).forEach(function (p) { if (p.deleted !== '1' && hit(p)) add({ kind: 'pet', code: p.code, name: p.name, species: p.species, breed: p.breed || '', owner: p.owner || p.guardian, phone: p.phone }); });
  readAll_(hsheet_('Appts', AP_COLS), AP_COLS).forEach(function (r) { if (r.deleted !== '1' && hit(r)) add({ kind: 'appt', pkey: r.pkey, name: r.name, species: r.species, breed: r.breed || '', owner: r.owner, phone: r.phone, last: r.date }); });
  return { ok: true, items: out.slice(0, 12) };
}
// ======================= تعرفه‌ها، فاکتورها و صف امروز =======================
var SV_SEED = [['ویزیت', 700000], ['واکسن هاری', 950000], ['واکسن سه‌گانه گربه', 2450000], ['واکسن پلی‌والان سگ', 2250000], ['ضدانگل', 250000], ['کیت تشخیصی', 850000], ['تزریق', 200000], ['دارو', 150000], ['خون‌گیری', 250000], ['آزمایش CBC', 850000], ['آزمایش CBT', 1800000]];
function svSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), isNew = !ss.getSheetByName('Services'), sh = hsheet_('Services', SV_COLS);
  if (isNew) SV_SEED.forEach(function (x, i) { writeRow_(sh, SV_COLS, { id: 'S-' + rnd_(5).toUpperCase(), name: x[0], price: String(x[1]), active: '1', sort: String(i + 1), updated: nowIso_() }, 0); });
  return sh;
}
function num_(v) { return Number(String(v === undefined || v === null ? '' : v).replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); }).replace(/[^0-9]/g, '')) || 0; }
function svcList_() {
  var rows = readAll_(svSheet_(), SV_COLS).filter(function (r) { return r.name; });
  rows.sort(function (x, y) { return num_(x.sort) - num_(y.sort); });
  return { ok: true, items: rows.map(function (r) { return { id: r.id, name: r.name, price: num_(r.price), active: r.active !== '0' ? 1 : 0, sort: num_(r.sort) }; }) };
}
function svcSave_(b) {   // فقط دکتر: کل فهرست تعرفه‌ها
  var sh = svSheet_(), rows = readAll_(sh, SV_COLS), byId = {}, seen = {}, list = (b.items || []).slice(0, 200);
  rows.forEach(function (r) { byId[r.id] = r; });
  list.forEach(function (it, i) {
    var name = clip_(it.name, 60); if (!name) return;
    var r = byId[it.id] || { id: 'S-' + rnd_(5).toUpperCase() }; seen[r.id] = 1;
    r.name = name; r.price = String(num_(it.price)); r.active = it.active ? '1' : '0'; r.sort = String(i + 1); r.updated = nowIso_();
    writeRow_(sh, SV_COLS, r, r._row || 0);
  });
  rows.forEach(function (r) { if (!seen[r.id] && r.active !== '0') { r.active = '0'; r.updated = nowIso_(); writeRow_(sh, SV_COLS, r, r._row); } });   // حذف = غیرفعال
  return svcList_();
}
function invOut_(r) { var items = []; try { items = JSON.parse(r.items || '[]'); } catch (e) {} return { id: r.id, date: r.date, pkey: r.pkey, vid: r.vid, name: r.name, owner: r.owner, phone: r.phone, items: items, sub: num_(r.sub), disc: num_(r.disc), total: num_(r.total), status: r.status, paid: num_(r.paid), method: r.method, paidAt: r.paidAt, note: r.note }; }
function invSave_(b) {   // فقط دکتر: صدور/ویرایش فاکتور یک مراجعه
  var sh = hsheet_('Invoices', INV_COLS), rows = readAll_(sh, INV_COLS), v = b.v || {}, r = null, i;
  if (v.id) for (i = 0; i < rows.length; i++) if (rows[i].id === String(v.id)) { r = rows[i]; break; }
  if (!r && v.vid) for (i = 0; i < rows.length; i++) if (rows[i].vid === String(v.vid) && rows[i].status !== 'void') { r = rows[i]; break; }
  if (!r) r = { id: 'F-' + rnd_(6).toUpperCase(), created: nowIso_(), paid: '0' };
  var items = (v.items || []).slice(0, 40).map(function (x) { return { name: clip_(x.name, 60), qty: Math.max(1, Math.min(99, num_(x.qty) || 1)), price: num_(x.price) }; }).filter(function (x) { return x.name; });
  var sub = items.reduce(function (t, x) { return t + x.qty * x.price; }, 0), disc = Math.min(sub, num_(v.disc));
  r.date = date_(v.date) || today_(); r.pkey = /^PT-[A-Z0-9]{5,10}$/.test(String(v.pkey || '')) ? v.pkey : ''; r.vid = clip_(v.vid, 20);
  r.name = clip_(v.name, 40); r.owner = clip_(v.owner, 40); r.phone = String(v.phone || '').replace(/[^0-9+]/g, '').slice(0, 16);
  r.items = JSON.stringify(items); r.sub = String(sub); r.disc = String(disc); r.total = String(v.free ? 0 : sub - disc); r.note = clip_(v.note, 200);
  var paid = num_(r.paid); r.status = v.free ? 'free' : (sub - disc <= 0 ? 'free' : paid >= sub - disc ? 'paid' : paid > 0 ? 'partial' : 'pending');
  r.updated = nowIso_(); writeRow_(sh, INV_COLS, r, r._row || 0);
  return { ok: true, item: invOut_(r) };
}
function invList_(b) {   // امروز + همهٔ پرداخت‌نشده‌ها؛ یا همهٔ فاکتورهای یک بیمار
  var day = today_(), from = date_(b.from) || day, rows = readAll_(hsheet_('Invoices', INV_COLS), INV_COLS).filter(function (r) { return r.status !== 'void'; });
  rows = b.pkey ? rows.filter(function (r) { return r.pkey === String(b.pkey); }) : rows.filter(function (r) { return r.date >= from || r.status === 'pending' || r.status === 'partial'; });
  rows.sort(function (x, y) { return x.created < y.created ? 1 : -1; });
  return { ok: true, today: day, items: rows.slice(0, 500).map(invOut_) };
}
function invPay_(b) {   // دکتر یا منشی: فقط دریافت وجه
  var sh = hsheet_('Invoices', INV_COLS), rows = readAll_(sh, INV_COLS), i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) {
    var r = rows[i], total = num_(r.total), amt = num_(b.amount);
    if (amt <= 0) return { ok: false, err: 'bad' };
    r.paid = String(Math.min(total, num_(r.paid) + amt)); r.method = ['نقد', 'کارت', 'کارت‌به‌کارت'].indexOf(b.method) > -1 ? b.method : 'نقد';
    r.status = num_(r.paid) >= total ? 'paid' : 'partial'; r.paidAt = nowIso_(); r.updated = nowIso_();
    writeRow_(sh, INV_COLS, r, r._row); return { ok: true, item: invOut_(r) };
  }
  return { ok: false, err: 'notfound' };
}
function invVoid_(b) {   // فقط دکتر (در SEC_OK نیست): باطل کردن فاکتور با دلیل
  var sh = hsheet_('Invoices', INV_COLS), rows = readAll_(sh, INV_COLS), i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) {
    var r = rows[i]; r.status = 'void'; r.note = clip_((r.note ? r.note + ' · ' : '') + 'باطل شد: ' + clip_(b.why, 120) + (num_(r.paid) ? ' (پرداختی: ' + num_(r.paid) + ' تومان)' : ''), 400); r.updated = nowIso_();
    writeRow_(sh, INV_COLS, r, r._row); return { ok: true, item: invOut_(r) };
  }
  return { ok: false, err: 'notfound' };
}
function qOut_(r) { return { id: r.id, date: r.date, time: r.time, pkey: r.pkey, name: r.name, species: r.species, breed: r.breed, owner: r.owner, phone: r.phone, status: r.status || 'wait', src: r.src, note: r.note }; }
function qList_() { var day = today_(); return { ok: true, today: day, items: readAll_(hsheet_('Queue', Q_COLS), Q_COLS).filter(function (r) { return r.date === day && r.status !== 'cancelled'; }).map(qOut_) }; }
function qAdd_(b, role) {
  var sh = hsheet_('Queue', Q_COLS), v = b.v || {}, day = today_(), pk = /^PT-[A-Z0-9]{5,10}$/.test(String(v.pkey || '')) ? v.pkey : '';
  if (pk) { var ex = readAll_(sh, Q_COLS).filter(function (r) { return r.date === day && r.pkey === pk && r.status !== 'cancelled'; })[0]; if (ex) return { ok: true, item: qOut_(ex), dup: 1 }; }
  var r = { id: 'Q-' + rnd_(6).toUpperCase(), created: nowIso_(), updated: nowIso_(), date: day, time: Utilities.formatDate(new Date(), CFG.tz, 'HH:mm'), pkey: pk, name: clip_(v.name, 40), species: clip_(v.species, 20), breed: clip_(v.breed, 40), owner: clip_(v.owner, 40), phone: String(v.phone || '').replace(/[^0-9+]/g, '').slice(0, 16), status: v.status === 'done' ? 'done' : 'wait', src: role === 'sec' ? 'پذیرش' : 'دکتر', note: clip_(v.note, 200) };
  if (!r.name) return { ok: false, err: 'bad' };
  writeRow_(sh, Q_COLS, r, 0); return { ok: true, item: qOut_(r) };
}
function qSet_(b) {
  var sh = hsheet_('Queue', Q_COLS), rows = readAll_(sh, Q_COLS), i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) { if (['wait', 'done', 'cancelled'].indexOf(b.status) < 0) return { ok: false, err: 'bad' }; rows[i].status = b.status; rows[i].updated = nowIso_(); writeRow_(sh, Q_COLS, rows[i], rows[i]._row); return { ok: true }; }
  return { ok: false, err: 'notfound' };
}
function qMarkDone_(pt) {   // ویزیت دکتر امروز → در صف «ویزیت شد» (اگر نبود، ساخته می‌شود)
  var sh = hsheet_('Queue', Q_COLS), day = today_(), rows = readAll_(sh, Q_COLS), hit = false;
  rows.forEach(function (r) { if (r.date === day && r.pkey === pt.pkey && r.status === 'wait') { r.status = 'done'; r.updated = nowIso_(); writeRow_(sh, Q_COLS, r, r._row); hit = true; } else if (r.date === day && r.pkey === pt.pkey && r.status === 'done') hit = true; });
  if (!hit) qAdd_({ v: { pkey: pt.pkey, name: pt.name, species: pt.species, breed: pt.breed, owner: pt.owner, phone: pt.phone, status: 'done', note: 'ویزیت دکتر' } }, 'dr');
}
function patList_() {
  var rows = readAll_(hsheet_('Patients', PT_COLS), PT_COLS).filter(function (r) { return r.deleted !== '1'; });
  rows.sort(function (x, y) { return x.date < y.date ? 1 : x.date > y.date ? -1 : (x.created < y.created ? 1 : -1); });
  var sm = smsAtMap_('patient'), items = rows.slice(0, 1500).map(patOut_); items.forEach(function (x) { x.smsAt = sm[x.pkey] || ''; });
  return { ok: true, items: items };
}
function patSave_(b) {
  var sh = hsheet_('Patients', PT_COLS), rows = readAll_(sh, PT_COLS), r = null, i, v = b.v || {};
  var name = clip_(v.name, 40); if (!name) return { ok: false, err: 'bad' };
  if (b.id) for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id)) { r = rows[i]; break; }
  if (b.id && !r) return { ok: false, err: 'notfound' };
  if (!r) r = { id: 'V-' + rnd_(7).toUpperCase(), created: nowIso_(), deleted: '' };
  r.pkey = /^PT-[A-Z0-9]{5,10}$/.test(String(v.pkey || '')) ? v.pkey : (r.pkey || 'PT-' + rnd_(6).toUpperCase());
  r.name = name; r.species = ['سگ', 'گربه', 'پرنده', 'دیگر'].indexOf(v.species) > -1 ? v.species : 'دیگر';
  r.owner = clip_(v.owner, 40); r.phone = String(v.phone || '').replace(/[^0-9+]/g, '').slice(0, 16); r.breed = clip_(v.breed, 40);
  r.date = date_(v.date) || Utilities.formatDate(new Date(), CFG.tz, 'yyyy-MM-dd');
  r.reason = clip_(v.reason, 200); r.note = clip_(v.note, 1500); r.follow = date_(v.follow); r.code = clip_(v.code, 20);
  if (v.fee !== undefined) r.fee = String(v.fee).replace(/[^0-9]/g, '').slice(0, 12);   // زیرساخت هزینه (فعلاً بدون رابط)
  if (v.paid !== undefined) r.paid = v.paid ? '1' : '';
  if (v.pay !== undefined) r.pay = clip_(v.pay, 20);
  r.updated = nowIso_(); writeRow_(sh, PT_COLS, r, r._row || 0);
  if (b.role === 'dr' && r.note && r.date === today_()) { try { qMarkDone_(r); } catch (eq) {} }
  return { ok: true, item: patOut_(r) };
}
function patPatient_(b) {
  var sh = hsheet_('Patients', PT_COLS), rows = readAll_(sh, PT_COLS), v = b.v || {}, n = 0, i;
  var name = clip_(v.name, 40); if (!name || !/^PT-[A-Z0-9]{5,10}$/.test(String(b.pkey || ''))) return { ok: false, err: 'bad' };
  var species = ['سگ', 'گربه', 'پرنده', 'دیگر'].indexOf(v.species) > -1 ? v.species : 'دیگر';
  for (i = 0; i < rows.length; i++) if (rows[i].pkey === b.pkey && rows[i].deleted !== '1') {
    rows[i].name = name; rows[i].species = species; rows[i].owner = clip_(v.owner, 40); rows[i].phone = String(v.phone || '').replace(/[^0-9+]/g, '').slice(0, 16); rows[i].breed = clip_(v.breed, 40);
    rows[i].updated = nowIso_(); writeRow_(sh, PT_COLS, rows[i], rows[i]._row); n++;
  }
  return n ? { ok: true, n: n } : { ok: false, err: 'notfound' };
}
function patDel_(b) {
  var sh = hsheet_('Patients', PT_COLS), rows = readAll_(sh, PT_COLS), i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) { rows[i].deleted = '1'; rows[i].updated = nowIso_(); writeRow_(sh, PT_COLS, rows[i], rows[i]._row); return { ok: true }; }
  return { ok: false, err: 'notfound' };
}
function petReqSet_(b) {
  var sh = hsheet_('PetReqs', PR_COLS), rows = readAll_(sh, PR_COLS), r = null, i;
  for (i = 0; i < rows.length; i++) if (rows[i].id === String(b.id || '')) { r = rows[i]; break; }
  if (!r) return { ok: false, err: 'notfound' };
  if (b.status !== undefined) { if (PR.statuses.indexOf(b.status) < 0) return { ok: false, err: 'bad' }; r.status = b.status; }
  if (b.code !== undefined) r.code = clip_(b.code, 20);
  r.updated = nowIso_(); writeRow_(sh, PR_COLS, r, r._row);
  return { ok: true };
}


// ======================= ظاهر جدول‌ها (رنگ، عنوان فارسی، عرض ستون‌ها) =======================
// عنوان‌ها فقط برچسب‌اند؛ سرور ستون‌ها را با ترتیبشان می‌خواند، پس تغییر عنوان به داده‌ها آسیبی نمی‌زند.
// ردیف اول را عوض نکنید و ستون‌ها را جابه‌جا نکنید.
var lastLookError_ = '';
var STATUS_COLORS = {
  pending: ['#fdf1da', '#8a5a0d'], approved: ['#e2f4ea', '#12684a'], done: ['#e7eefb', '#1f5aa6'], rejected: ['#fde8e6', '#b3382c'],
  'new': ['#fdf1da', '#8a5a0d']
};
var LOOK = {
  Spins: { color: '#d97706', labels: ['زمان', 'کد', 'جایزه', 'انقضا', 'دستگاه', 'استفاده شد؟', 'زمان استفاده'], widths: [150, 120, 190, 110, 130, 100, 150], clip: [5] },
  Pets: { color: '#1f5aa6', labels: ['شمارهٔ شناسنامه (کد پت)', 'کلید لینک (محرمانه)', 'نام', 'نام انگلیسی', 'سرپرست', 'سرپرست دوم (قدیمی)', 'گونه', 'نژاد', 'نژاد (انگلیسی)', 'تاریخ تولد', 'برنامهٔ واکسن (داده)', 'رضایت (۱=بله)', 'ساخته شد', 'ویرایش', 'حذف‌شده؟ (۱=بله)', 'کد اصالت', 'جنسیت', 'وضعیت عقیم‌سازی', 'تلفن سرپرست (محرمانه، فقط آرشیو)', 'رضایت پیامک یادآوری (۱=بله)'],
    widths: [130, 140, 110, 110, 130, 110, 80, 110, 120, 100, 120, 90, 150, 150, 90, 100, 90, 130, 150, 120], clip: [2, 11], gray: [2, 11], green: [1, 16], del: 15 },
  Patients: { color: '#0e7490', labels: ['شناسهٔ مراجعه', 'شناسهٔ بیمار', 'ثبت شد', 'ویرایش', 'تاریخ مراجعه', 'نام پت', 'گونه', 'نژاد', 'سرپرست', 'تلفن (محرمانه)', 'دلیل / تشخیص', 'یادداشت', 'تاریخ پیگیری', 'کد شناسنامه', 'حذف‌شده؟ (۱=بله)', 'هزینه (تومان)', 'پرداخت‌شده؟ (۱=بله)', 'روش پرداخت'],
    widths: [110, 100, 150, 150, 100, 110, 80, 110, 130, 130, 200, 260, 100, 110, 90, 110, 110, 110], clip: [12], gray: [2, 3, 4, 14], del: 15 },
  Activity: { color: '#475569', labels: ['روز', 'ساعت', 'نوع', 'شناسه', 'نام'], widths: [100, 80, 80, 120, 140], gray: [1, 2, 3] },
  Services: { color: '#7c3aed', labels: ['شناسه', 'خدمت', 'قیمت (تومان)', 'فعال؟ (۱=بله)', 'ترتیب', 'ویرایش'], widths: [100, 220, 140, 100, 70, 150], gray: [1, 6] },
  Invoices: { color: '#be123c', labels: ['شناسهٔ فاکتور', 'ثبت شد', 'ویرایش', 'تاریخ', 'شناسهٔ بیمار', 'شناسهٔ مراجعه', 'نام پت', 'سرپرست', 'تلفن', 'ردیف‌ها (JSON)', 'جمع', 'تخفیف', 'مبلغ نهایی', 'وضعیت', 'پرداخت‌شده', 'روش پرداخت', 'زمان پرداخت', 'توضیح'],
    widths: [110, 150, 150, 100, 100, 100, 110, 120, 120, 260, 100, 90, 110, 100, 110, 110, 150, 200], clip: [10], gray: [2, 3, 5, 6] },
  Queue: { color: '#a16207', labels: ['شناسه', 'ثبت شد', 'ویرایش', 'تاریخ', 'ساعت ورود', 'شناسهٔ بیمار', 'نام پت', 'گونه', 'نژاد', 'سرپرست', 'تلفن', 'وضعیت', 'منبع', 'توضیح'],
    widths: [100, 150, 150, 100, 80, 100, 110, 80, 100, 120, 120, 100, 90, 200], gray: [2, 3, 6] },
  Appts: { color: '#0e7490', labels: ['شناسهٔ نوبت', 'ثبت شد', 'ویرایش', 'تاریخ نوبت', 'ساعت', 'نام پت', 'گونه', 'نژاد', 'سرپرست', 'تلفن (محرمانه)', 'دلیل', 'یادداشت', 'وضعیت', 'شناسهٔ بیمار', 'حذف‌شده؟ (۱=بله)', 'یادآور پیامکی (۱=بله)'],
    widths: [110, 150, 150, 100, 70, 110, 80, 110, 130, 130, 180, 240, 100, 100, 90, 90], clip: [12], gray: [2, 3, 14], del: 15 },
  SMS: { color: '#b45309', labels: ['زمان', 'شماره', 'نوع', 'متن', 'نتیجه', 'توضیح', 'جزئیات فنی'], widths: [150, 120, 100, 320, 100, 300, 320], clip: [4, 7], gray: [1, 7] },
  Records: { color: '#0f766e', labels: ['شناسه', 'کد پت', 'نوع', 'تاریخ', 'نام', 'برند', 'سریال', 'محل', 'توضیح', 'تکرار', 'روش', 'مدت', 'پایان', 'وزن', 'نوبت بعدی', 'بسته‌شده؟', 'ثبت دکتر؟', 'ساخته شد', 'ویرایش', 'حذف‌شده؟ (۱=بله)', 'منبع (old=سابقهٔ قبلی)'],
    widths: [110, 90, 130, 100, 150, 110, 110, 110, 140, 90, 90, 80, 100, 70, 100, 80, 80, 150, 150, 90, 110], gray: [1], del: 20 },
  Adoptions: { color: '#b36b00', labels: ['کد', 'زمان ثبت', 'وضعیت', 'گونه', 'نام', 'سن', 'جنس', 'عقیم', 'واکسن', 'رفتار', 'دلیل واگذاری', 'شهر', 'تلفن (محرمانه)', 'عکس (داده)', 'یادداشت', 'تاریخ تأیید', 'ویرایش'],
    widths: [110, 150, 100, 80, 110, 90, 80, 80, 80, 220, 220, 130, 130, 70, 150, 100, 150], clip: [14], gray: [14], status: 3, statusList: 'AD',
    note: 'وضعیت را از لیست کشویی انتخاب کنید. ⏳ pending=در انتظار بررسی · ✅ approved=منتشرشده در سایت · 🎉 done=واگذار شد · ❌ rejected=رد شد · 🗑 deleted=حذف' },
  PetReqs: { color: '#7c3aed', labels: ['کد درخواست', 'زمان ثبت', 'وضعیت', 'نام پت', 'گونه', 'صاحب', 'تلفن (محرمانه)', 'تولد', 'توضیح', 'کد شناسنامه', 'ویرایش'],
    widths: [110, 150, 100, 110, 80, 140, 130, 110, 220, 110, 150], status: 3, statusList: 'PR',
    note: 'وضعیت را از لیست کشویی انتخاب کنید. 🆕 new=جدید · ✅ done=شناسنامه صادر شد · ❌ rejected=رد شد · 🗑 deleted=حذف' }
};
function look_(sh, spec) {
  try {
    var n = spec.labels.length, rows = Math.max(sh.getMaxRows() - 1, 1), i;
    try { sh.setRightToLeft(true); } catch (e0) {}
    try { if (!sh.getBandings().length) sh.getRange(1, 1, Math.max(sh.getMaxRows(), 2), n).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false); } catch (e1) {}
    var h = sh.getRange(1, 1, 1, n);
    h.setValues([spec.labels]).setBackground(spec.color).setFontColor('#ffffff').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('center').setVerticalAlignment('middle');
    sh.setRowHeight(1, 36); sh.setFrozenRows(1);
    for (i = 0; i < n; i++) sh.setColumnWidth(i + 1, spec.widths[i]);
    var body = sh.getRange(2, 1, rows, n);
    body.setVerticalAlignment('middle').setHorizontalAlignment('center').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    (spec.clip || []).forEach(function (c) { sh.getRange(2, c, rows, 1).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP); });
    (spec.gray || []).forEach(function (c) { sh.getRange(2, c, rows, 1).setFontColor('#9aa5b1'); });
    (spec.green || []).forEach(function (c) { sh.getRange(2, c, rows, 1).setFontColor('#12684a').setFontWeight('bold'); });
    var rules = [];
    if (spec.status) {
      var sr = sh.getRange(2, spec.status, rows, 1);
      Object.keys(STATUS_COLORS).forEach(function (k) {
        rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextContains(k).setBackground(STATUS_COLORS[k][0]).setFontColor(STATUS_COLORS[k][1]).setRanges([sr]).build());
      });
      try { sh.getRange(1, spec.status).setNote(spec.note || ''); } catch (e2) {}
      try { if (spec.statusList) sr.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(labelsOf_(spec.statusList === 'AD' ? AD_LABEL : PR_LABEL), true).setAllowInvalid(true).build()); } catch (e3) {}
    }
    if (spec.del) {
      var col = String.fromCharCode(64 + spec.del);
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$' + col + '2="1"').setFontColor('#b3382c').setBackground('#f8f0ef').setRanges([body]).build());
    }
    if (rules.length) sh.setConditionalFormatRules(rules);
    try { if (!sh.getFilter()) sh.getDataRange().createFilter(); } catch (e4) {}
    lastLookError_ = '';
  } catch (e) { lastLookError_ = String(e); }
}
// از منوی «🐾 سایت دکتر» (بالای شیت) یا از ویرایشگر اسکریپت اجرا کنید؛ ظاهر همهٔ جدول‌ها را به‌روز می‌کند
function testSms() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('آزمایش پیامک', 'شمارهٔ موبایل خودتان را بنویسید (مثل 09123456789):', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var out = sendSms_(r.getResponseText(), 'آزمایش پیامک سایت کلینیک دکتر مساوات', 'test', { name: 'آزمایش' });
  ui.alert(out.ok ? 'درخواست ارسال شد (کد ' + out.status + '). اگر پیامک نرسید، شیت «SMS» را ببینید: ستون «پاسخ سرویس‌دهنده» دلیل را می‌نویسد.' : 'ارسال ناموفق: ' + (out.err || '') + ' ' + (out.msg || ''));
}
function formatSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), done = [];
  try { hsheet_('Patients', PT_COLS); hsheet_('SMS', SMS_COLS); hsheet_('Activity', ACT_COLS); hsheet_('Appts', AP_COLS); svSheet_(); hsheet_('Invoices', INV_COLS); hsheet_('Queue', Q_COLS); } catch (ee) { lastLookError_ = 'ensure: ' + String(ee); }   // ساخت تب‌های جدید حتی قبل از اولین استفاده
  try { migrate_(ss); } catch (em) { lastLookError_ = 'migrate: ' + String(em); }
  [['Pets', PET_COLS], ['SMS', SMS_COLS], ['Patients', PT_COLS], ['Activity', ACT_COLS], ['Appts', AP_COLS], ['Invoices', INV_COLS], ['Queue', Q_COLS], ['Records', REC_COLS], ['Adoptions', AD_COLS], ['PetReqs', PR_COLS]].forEach(function (x) { try { convDates_(x[0], x[1]); } catch (ec) { lastLookError_ = 'dates: ' + String(ec); } });
  Object.keys(LOOK).forEach(function (name) {
    var sh = ss.getSheetByName(name);
    if (sh) { look_(sh, LOOK[name]); done.push(name); }
  });
  guideSheet_();
  return done;
}


// ======================= اطلاع‌رسانی به دکتر (ایمیل و ربات بله) =======================
// هر دو اختیاری‌اند؛ اگر مقدارشان در Script Properties نباشد، چیزی ارسال نمی‌شود:
//   NOTIFY_EMAIL  ایمیل دکتر (برای نوتیف در گوشی)
//   BALE_TOKEN    توکن ربات بله (از @botfather در بله)
//   BALE_CHAT     شناسهٔ عددی چت دکتر با ربات
// خطا در ارسال هرگز ثبت درخواست را خراب نمی‌کند.
function notify_(subject, text) {
  var res = { email: false, bale: false, err: '' };
  try {
    var to = prop_('NOTIFY_EMAIL');
    if (to) { MailApp.sendEmail(to, subject, text + '\n\n— سایت دکتر نیلوفر مساوات'); res.email = true; }
  } catch (e1) { res.err += 'email: ' + String(e1).slice(0, 80) + ' '; }
  try {
    var tk = prop_('BALE_TOKEN'), chat = prop_('BALE_CHAT');
    if (tk && chat) {
      var r = UrlFetchApp.fetch('https://tapi.bale.ai/bot' + tk + '/sendMessage', { method: 'post', contentType: 'application/json', payload: JSON.stringify({ chat_id: chat, text: subject + '\n\n' + text }), muteHttpExceptions: true });
      res.bale = r.getResponseCode() === 200;
      if (!res.bale) res.err += 'bale: ' + r.getResponseCode() + ' ';
    }
  } catch (e2) { res.err += 'bale: ' + String(e2).slice(0, 80) + ' '; }
  return res;
}
// یک‌بار از ویرایشگر اسکریپت اجرا کنید: هم اجازهٔ دسترسی به ایمیل را می‌گیرد، هم پیام آزمایشی می‌فرستد
function testNotify() {
  if (!prop_('NOTIFY_EMAIL') && !(prop_('BALE_TOKEN') && prop_('BALE_CHAT'))) throw new Error('اول NOTIFY_EMAIL (یا BALE_TOKEN و BALE_CHAT) را در Script Properties بسازید.');
  var r = notify_('✅ آزمایش اطلاع‌رسانی', 'اگر این پیام را می‌بینید، اطلاع‌رسانی درست کار می‌کند.');
  Logger.log(JSON.stringify(r));
  return r;
}


// ======================= اصالت شناسنامه =======================
// کد اصالت: شش نویسه که فقط با رمز سرور (SECRET) از روی کد پت ساخته می‌شود؛ روی شناسنامه چاپ می‌شود و دکتر می‌تواند راستی‌آزمایی کند.
// این کد محرمانه نیست؛ «کلید لینک» محرمانه است و هرگز نباید روی شناسنامه بیاید.
var AUTH_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function authCode_(code) {
  var raw = Utilities.computeHmacSha256Signature('auth|' + String(code || '').toUpperCase(), prop_('SECRET') || 'change-me'), out = '', i;
  for (i = 0; i < 6; i++) out += AUTH_ABC.charAt((raw[i] & 0xff) % 32);
  return out;
}
function verifyPet_(b) {
  var p = findPet_(b.code), auth = String(b.auth || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!p || p.deleted === '1') return { ok: true, valid: false, reason: 'notfound' };
  if (auth !== authCode_(p.code)) return { ok: true, valid: false, reason: 'mismatch' };
  return { ok: true, valid: true, pet: { code: p.code, name: p.name, species: p.species, owner: p.owner, created: String(p.created || '').slice(0, 10) } };
}

// ======================= منوی شیت =======================
function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu('🐾 سایت دکتر')
      .addItem('📖 راهنمای جدول‌ها', 'openGuide')
      .addItem('📊 خلاصهٔ امروز', 'showSummary')
      .addSeparator()
      .addItem('📝 درخواست‌های شناسنامهٔ جدید', 'goPetReqs')
      .addItem('🏡 واگذاری‌های در انتظار', 'goAdoptions')
      .addItem('🔄 نمایش همهٔ ردیف‌ها', 'clearFilters')
      .addItem('🔎 بررسی اصالت یک شناسنامه', 'checkAuthPrompt')
      .addItem('🌐 باز کردن صفحهٔ دکتر در سایت', 'openDoctorPage')
      .addItem('🔑 نمایش رمز ورود دکتر', 'showDrPass')
      .addSeparator()
      .addItem('🎨 زیباسازی جدول‌ها', 'formatSheets')
      .addItem('💾 گرفتن پشتیبان', 'backupNow')
      .addItem('🔔 آزمایش اطلاع‌رسانی', 'testNotify')
      .addItem('📩 آزمایش پیامک', 'testSms')
      .addItem('⏰ فعال‌سازی یادآور خودکار (۱۰ صبح)', 'setupReminderTrigger')
      .addItem('⏹ توقف یادآور خودکار', 'stopReminderTrigger')
      .addItem('📨 ارسال یادآورهای ۳ روز آینده (همین حالا)', 'runRemindersNow')
      .addToUi();
  } catch (e) {}
}
function ui_() { try { return SpreadsheetApp.getUi(); } catch (e) { return null; } }
function say_(title, text) { var u = ui_(); if (u) u.alert(title, text, u.ButtonSet.OK); return text; }
function goSheet_(name, status, emptyMsg) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) return say_('هنوز چیزی نیست', emptyMsg);
  ss.setActiveSheet(sh);
  try {
    var f = sh.getFilter() || sh.getDataRange().createFilter();
    f.setColumnFilterCriteria(3, SpreadsheetApp.newFilterCriteria().whenTextContains(status).build());
  } catch (e) {}
  return name;
}
function goPetReqs() { return goSheet_('PetReqs', 'new', 'هنوز درخواست شناسنامه‌ای ثبت نشده است.'); }
function goAdoptions() { return goSheet_('Adoptions', 'pending', 'هنوز درخواست واگذاری‌ای ثبت نشده است.'); }
function clearFilters() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), n = 0;
  Object.keys(LOOK).forEach(function (name) {
    var sh = ss.getSheetByName(name);
    try { var f = sh && sh.getFilter(); if (f) { for (var c = 1; c <= LOOK[name].labels.length; c++) f.removeColumnFilterCriteria(c); n++; } } catch (e) {}
  });
  return n;
}
function countRows_(name, cols, test) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) return 0;
  return readAll_(sh, cols).filter(test).length;
}
function summary_() {
  var today = day_(new Date());
  var spins = 0, ss = SpreadsheetApp.getActiveSpreadsheet(), sp = ss.getSheetByName(CFG.sheetName);
  if (sp) { var v = sp.getDataRange().getValues(); for (var i = 1; i < v.length; i++) { try { if (day_(new Date(v[i][COL.time])) === today) spins++; } catch (e) {} } }
  return {
    petReqsNew: countRows_('PetReqs', PR_COLS, function (r) { return r.status === 'new'; }),
    adoptPending: countRows_('Adoptions', AD_COLS, function (r) { return r.status === 'pending'; }),
    adoptLive: countRows_('Adoptions', AD_COLS, function (r) { return r.status === 'approved'; }),
    pets: countRows_('Pets', PET_COLS, function (r) { return r.deleted !== '1'; }),
    recs: countRows_('Records', REC_COLS, function (r) { return r.deleted !== '1'; }),
    spinsToday: spins
  };
}
function showSummary() {
  var m = summary_();
  say_('📊 خلاصهٔ امروز', '📝 درخواست شناسنامهٔ جدید: ' + m.petReqsNew + '\n🏡 واگذاری در انتظار تأیید: ' + m.adoptPending + '\n🏡 واگذاری منتشرشده: ' + m.adoptLive + '\n📒 شناسنامه‌های فعال: ' + m.pets + '\n💉 ثبت‌های دفترچه: ' + m.recs + '\n🎁 چرخش چرخ امروز: ' + m.spinsToday);
  return m;
}
function checkAuthPrompt() {
  var u = ui_(); if (!u) return '';
  var a = u.prompt('بررسی اصالت شناسنامه', 'کد پت را بنویسید (مثل NM-1234):', u.ButtonSet.OK_CANCEL);
  if (a.getSelectedButton() !== u.Button.OK) return '';
  var b = u.prompt('بررسی اصالت شناسنامه', 'کد اصالت روی شناسنامه را بنویسید (۶ نویسه):', u.ButtonSet.OK_CANCEL);
  if (b.getSelectedButton() !== u.Button.OK) return '';
  var r = verifyPet_({ code: a.getResponseText(), auth: b.getResponseText() });
  if (r.valid) return say_('✅ شناسنامه معتبر است', 'نام پت: ' + r.pet.name + ' (' + r.pet.species + ')\nصاحب: ' + (r.pet.owner || '—') + '\nتاریخ صدور: ' + (r.pet.created || '—'));
  return say_('❌ معتبر نیست', r.reason === 'notfound' ? 'شناسنامه‌ای با این کد پیدا نشد.' : 'کد اصالت با این شناسنامه نمی‌خواند؛ اشتباه تایپی یا شناسنامهٔ تقلبی.');
}
function backupNow() {
  var name = 'پشتیبان سایت دکتر — ' + day_(new Date());
  var f = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).makeCopy(name);
  say_('💾 پشتیبان ساخته شد', 'نام فایل در Google Drive:\n' + name);
  return f.getUrl();
}

// ======================= برگهٔ راهنما =======================
var GUIDE = [
  ['📖 راهنمای شیت سایت دکتر نیلوفر مساوات', 'این شیت پایگاه‌دادهٔ سایت است. بیشتر چیزها خودکار پر می‌شوند و لازم نیست دستی ویرایش کنید. کارهای روزانه را از صفحهٔ دکتر در سایت (drniloofarmosavat.ir/dr) انجام دهید و این شیت را بیشتر برای دیدن و پشتیبان‌گیری به کار ببرید.'],
  ['⚠️ چهار قانون مهم', '۱) ردیف اول (عنوان ستون‌ها) و ترتیب ستون‌ها را عوض نکنید.\n۲) ستون‌های خاکستری (کلید، داده‌های فنی) را دستی ویرایش نکنید.\n۳) برای حذف یک ردیف، آن را از صفحهٔ دکتر در سایت حذف کنید؛ ردیف را پاک نکنید.\n۴) مقدار SECRET را در Script properties عوض نکنید؛ با عوض‌شدنش همهٔ کدهای اصالتِ چاپ‌شدهٔ قبلی بی‌اعتبار می‌شود.'],
  ['Pets — شناسنامه‌ها', 'هر ردیف یک پت است. ستون اول («شمارهٔ شناسنامه») همان کد پت است، مثل NM-1234، و ستون آخر (سبز) «کد اصالت» شش‌نویسه‌ای است که روی شناسنامه چاپ می‌شود. «کلید لینک» محرمانه است و مثل رمز عمل می‌کند؛ به کسی نشان ندهید. «رضایت» یعنی صاحب پت اجازهٔ ذخیرهٔ اطلاعات را داده است. ردیف قرمز کم‌رنگ یعنی حذف‌شده.'],
  ['Records — ثبت‌های دفترچه', 'واکسن، ضدانگل، ویزیت، وزن و بقیه. هر ردیف به یک «کد پت» وصل است. «نوبت بعدی» یادآوری را می‌سازد. «ثبت دکتر؟» اگر ۱ باشد، فقط دکتر می‌تواند آن را عوض کند. «منبع» اگر old باشد، یعنی سابقهٔ قبلی است (از گفتهٔ صاحب یا دفترچهٔ کاغذی) و در سایت با برچسب «سابقهٔ قبلی» دیده می‌شود.'],
  ['PetReqs — درخواست‌های شناسنامه', 'درخواستی که صاحب پت از سایت فرستاده. وضعیت را می‌شود از لیست کشویی عوض کرد: 🆕 جدید · ✅ شناسنامه صادر شد · ❌ رد شد. صدور از صفحهٔ دکتر ← تب «📝 درخواست‌ها» انجام می‌شود. شمارهٔ تماس فقط دکتر می‌بیند.'],
  ['Adoptions — واگذاری‌ها', 'درخواست واگذاری پت. وضعیت را می‌شود از لیست کشویی عوض کرد: ⏳ در انتظار بررسی · ✅ منتشرشده در سایت · 🎉 واگذار شد · ❌ رد شد. تأیید و عکس از صفحهٔ دکتر ← تب «🏡 واگذاری» انجام می‌شود. آگهی ۶۰ روز بعد از تأیید از سایت پنهان می‌شود.'],
  ['Spins — چرخ هدیه', 'نتیجهٔ چرخش‌ها و کد جایزه‌ها (مثل DM-1234-ABCD). برای استفاده از یک کد، از صفحهٔ دکتر ← تب «🔎 بررسی کد» استفاده کنید.'],
  ['🔎 اصالت شناسنامه', 'روی هر شناسنامه یک «کد اصالت» شش‌نویسه (مثل A7K2Q9) چاپ می‌شود. برای راستی‌آزمایی: منوی «🐾 سایت دکتر ← بررسی اصالت یک شناسنامه»، صفحهٔ دکتر ← تب «🔎 بررسی کد»، یا صفحهٔ عمومی drniloofarmosavat.ir/verify.html (برای مراجعین و دیگران؛ فقط نام و گونهٔ پت را نشان می‌دهد). کد فقط با رمز سرور ساخته می‌شود و نمی‌شود برایش کد جعلی ساخت. اگر نام پت با نام روی شناسنامه نخواند، شناسنامه جعلی است.'],
  ['🎨 رنگ‌ها', 'سبز = منتشرشده · زرد = در انتظار/جدید · آبی = انجام‌شده · قرمز = ردشده یا حذف‌شده.'],
  ['🐾 منوی «سایت دکتر»', 'بالای شیت: راهنما، خلاصهٔ امروز، رفتن به درخواست‌ها و واگذاری‌های جدید، بررسی اصالت، باز کردن صفحهٔ دکتر، نمایش رمز ورود دکتر، زیباسازی جدول‌ها، گرفتن پشتیبان و آزمایش اطلاع‌رسانی. اگر منو دیده نشد، صفحه را یک بار ببندید و باز کنید.']
];
function guideSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName('📖 راهنما');
  if (!sh) sh = ss.insertSheet('📖 راهنما', 0);
  try {
    sh.clear();
    var rows = GUIDE.map(function (g) { return [g[0], g[1]]; });
    sh.getRange(1, 1, rows.length, 2).setValues(rows);
    sh.setRightToLeft(true); sh.setColumnWidth(1, 240); sh.setColumnWidth(2, 640);
    var all = sh.getRange(1, 1, rows.length, 2);
    all.setVerticalAlignment('top').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setFontSize(11);
    sh.getRange(1, 1, rows.length, 1).setFontWeight('bold').setBackground('#eef4fb').setFontColor('#1f5aa6');
    sh.getRange(1, 1, 1, 2).setBackground('#1f5aa6').setFontColor('#ffffff').setFontSize(13);
    sh.getRange(2, 1, 1, 2).setBackground('#fff4de');
    sh.getRange(rows.length + 2, 1).setValue('🌐 صفحهٔ دکتر');
    sh.getRange(rows.length + 2, 2).setFormula('=HYPERLINK("' + SITE + '/dr","باز کردن صفحهٔ دکتر در سایت")');
    sh.getRange(rows.length + 3, 1).setValue('🌐 سایت');
    sh.getRange(rows.length + 3, 2).setFormula('=HYPERLINK("' + SITE + '","' + SITE + '")');
    sh.getRange(rows.length + 2, 1, 2, 1).setFontWeight('bold').setFontColor('#1f5aa6');
    for (var i = 1; i <= rows.length; i++) sh.setRowHeight(i, i === 1 ? 70 : 96);
    sh.setTabColor('#1f5aa6');
  } catch (e) { lastLookError_ = 'guide: ' + String(e); }
  return sh;
}
function openGuide() { var sh = guideSheet_(); try { SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sh); } catch (e) {} return sh.getName(); }

var SITE = 'https://drniloofarmosavat.ir';
// پنجرهٔ کوچک با لینک؛ شیت نمی‌تواند خودش مرورگر را باز کند، پس لینک نشان می‌دهد
function openDoctorPage() {
  var u = ui_(); if (!u) return SITE + '/dr';
  var html = HtmlService.createHtmlOutput('<div style="font:15px sans-serif;direction:rtl;text-align:right;padding:6px"><p>صفحهٔ دکتر (ثبت شناسنامه، درخواست‌ها، واگذاری‌ها):</p><p><a href="' + SITE + '/dr" target="_blank" style="font-size:17px">باز کردن صفحهٔ دکتر</a></p><p>سایت: <a href="' + SITE + '" target="_blank">' + SITE + '</a></p></div>').setWidth(380).setHeight(190);
  u.showModalDialog(html, '🌐 سایت دکتر');
  return SITE + '/dr';
}


// ======================= اصالت‌سنجی عمومی (بدون ورود) =======================
// هر کس با کد پت و کد اصالت چاپ‌شده روی شناسنامه می‌تواند بپرسد «این شناسنامه واقعی است؟».
// فقط نام و گونهٔ پت و تاریخ صدور برمی‌گردد؛ نام صاحب و تلفن هرگز.
// محافظ حدس‌زدن: بعد از ۵ تلاش اشتباه برای یک کد، همان کد یک ساعت قفل می‌شود؛ و کل سایت ساعتی ۱۲۰ بررسی.
function verifyPublic_(b) {
  var cache = CacheService.getScriptCache(), code = String(b.code || '').toUpperCase().replace(/[^A-Z0-9\-]/g, '').slice(0, 12);
  var hk = 'vph' + Utilities.formatDate(new Date(), CFG.tz, 'yyyyMMddHH'), hn = Number(cache.get(hk) || 0);
  if (hn >= 120) return { ok: false, err: 'busy' };
  var ck = 'vpc' + code, cn = Number(cache.get(ck) || 0);
  if (cn >= 5) return { ok: false, err: 'locked' };
  cache.put(hk, String(hn + 1), 3600);
  var r = verifyPet_({ code: code, auth: b.auth });
  if (!r.valid) { cache.put(ck, String(cn + 1), 3600); return { ok: true, valid: false }; }
  cache.remove(ck);
  return { ok: true, valid: true, pet: { name: r.pet.name, species: r.pet.species, created: r.pet.created } };
}

// رمز ورود دکتر را روی شیت نمی‌نویسیم (نسخهٔ پشتیبان و اشتراک‌گذاری شیت آن را لو می‌دهد)؛ فقط با این گزینه نشان داده می‌شود.
function showDrPass() {
  var pw = prop_('DR_PASS');
  if (!pw) return say_('🔑 رمز ورود دکتر', 'هنوز رمزی تعیین نشده است. در Project Settings ← Script properties مقدار DR_PASS را بسازید.');
  return say_('🔑 رمز ورود دکتر', 'آدرس: ' + SITE + '/dr\nرمز: ' + pw + '\n\nبرای عوض‌کردن رمز: Project Settings ← Script properties ← DR_PASS');
}


// ======================= وضعیت با آیکون و فارسی =======================
// داخل سلول مثلاً «⏳ در انتظار · pending» نوشته می‌شود؛ سرور فقط کلمهٔ انگلیسی را می‌شناسد، پس آیکون و فارسی آزادند.
var AD_LABEL = { pending: '⏳ در انتظار · pending', approved: '✅ منتشرشده · approved', done: '🎉 واگذار شد · done', rejected: '❌ رد شد · rejected', deleted: '🗑 حذف‌شده · deleted' };
var PR_LABEL = { 'new': '🆕 جدید · new', done: '✅ شناسنامه صادر شد · done', rejected: '❌ رد شد · rejected', deleted: '🗑 حذف‌شده · deleted' };
function normStatus_(v) { var m = /(pending|approved|done|rejected|deleted|new)/.exec(String(v || '')); return m ? m[1] : String(v || ''); }
function statusLabel_(map, st) { return map[st] || String(st || ''); }
function labelsOf_(map) { return Object.keys(map).map(function (k) { return map[k]; }); }
// یک‌بار اجرا می‌شود (در زیباسازی): وضعیت‌های قدیمی را به شکل جدید درمی‌آورد و برای پت‌های قدیمی کد اصالت را پر می‌کند
function migrate_(ss) {
  var sh = ss.getSheetByName('Adoptions'), i, v, n;
  [['Adoptions', AD_COLS, AD_LABEL], ['PetReqs', PR_COLS, PR_LABEL]].forEach(function (x) {
    var s2 = ss.getSheetByName(x[0]); if (!s2) return;
    n = s2.getLastRow() - 1; if (n < 1) return;
    var rng = s2.getRange(2, 3, n, 1); v = rng.getValues();
    rng.setValues(v.map(function (r) { return [statusLabel_(x[2], normStatus_(r[0]))]; }));
  });
  var ps = ss.getSheetByName('Pets');
  if (ps) {
    n = ps.getLastRow() - 1;
    if (n >= 1) {
      var codes = ps.getRange(2, 1, n, 1).getValues(), crng = ps.getRange(2, 16, n, 1);
      crng.setValues(codes.map(function (r) { return [r[0] ? authCode_(r[0]) : '']; }));
    }
    // پت‌هایی که سابقهٔ عقیم‌سازی دارند و وضعیتشان خالی است، «عقیم‌شده» می‌شوند
    try {
      var recs = readAll_(hsheet_('Records', REC_COLS), REC_COLS), done = {};
      recs.forEach(function (r) { if (r.type === 'عقیم‌سازی' && r.deleted !== '1') done[r.code] = 1; });
      var allp = readAll_(ps, PET_COLS);
      allp.forEach(function (p2) { if (p2.deleted !== '1' && !p2.neut && done[p2.code]) { p2.neut = 'عقیم‌شده'; writeRow_(ps, PET_COLS, p2, p2._row); } });
    } catch (en) { lastLookError_ = 'neut: ' + String(en); }
  }
}
