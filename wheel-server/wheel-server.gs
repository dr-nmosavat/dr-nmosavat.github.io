/**
 * سرور چرخ «هدیه به کوچولوها» — Google Apps Script
 * نتیجهٔ چرخ و کد جایزه در همین‌جا ساخته و در شیت ثبت می‌شود؛
 * پس مشتری نمی‌تواند خودش کد بسازد یا نتیجه را عوض کند.
 *
 * پیش از استفاده در Project Settings ← Script Properties دو مقدار بسازید:
 *   SECRET     یک رمز طولانی و تصادفی (فقط برای امضای کدها)
 *   ADMIN_KEY  رمزی که فقط خود شما بدانید (برای صفحهٔ بررسی کد)
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

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'spin') return json_(spin_(p));
  if (p.action === 'verify') return verifyPage_(p);
  return json_({ ok: true, service: 'wheel' });
}

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
