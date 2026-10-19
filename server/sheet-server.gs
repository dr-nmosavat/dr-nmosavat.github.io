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
var PET_COLS = ['code', 'key', 'name', 'en', 'owner', 'guardian', 'species', 'breed', 'breedEn', 'birth', 'plan', 'consent', 'created', 'updated', 'deleted'];
var REC_COLS = ['id', 'code', 'type', 'date', 'name', 'brand', 'serial', 'place', 'extra', 'freq', 'how', 'dur', 'end', 'weight', 'next', 'closed', 'dr', 'created', 'updated', 'deleted'];

function hsheet_(name, cols) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name); sh.appendRow(cols); sh.setFrozenRows(1);
    sh.getRange(1, 1, sh.getMaxRows(), cols.length).setNumberFormat('@');   // متن ساده: تاریخ‌ها خودکار تبدیل نشوند
  }
  return sh;
}
function str_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, CFG.tz, 'yyyy-MM-dd');
  return v === null || v === undefined ? '' : String(v);
}
function readAll_(sh, cols) {
  var v = sh.getDataRange().getValues(), out = [], i, j;
  for (i = 1; i < v.length; i++) { var o = { _row: i + 1 }; for (j = 0; j < cols.length; j++) o[cols[j]] = str_(v[i][j]); out.push(o); }
  return out;
}
function writeRow_(sh, cols, o, row) {
  var arr = cols.map(function (c) { return o[c] === undefined || o[c] === null ? '' : String(o[c]); });
  if (row) sh.getRange(row, 1, 1, cols.length).setValues([arr]); else sh.appendRow(arr);
}
function clip_(v, n) { return String(v === undefined || v === null ? '' : v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').slice(0, n || 100); }
function date_(v) { v = String(v || ''); return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ''; }
function norm_(s) { return String(s || '').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, '').toLowerCase().trim(); }
function rnd_(n) { var s = '', u; while (s.length < n) { u = Utilities.getUuid().replace(/-/g, ''); s += u; } return s.slice(0, n); }
function nowIso_() { return Utilities.formatDate(new Date(), CFG.tz, "yyyy-MM-dd'T'HH:mm:ss"); }

// ---- توکن دکتر ----
function mkToken_(days) {
  var exp = Date.now() + (days || H.tokenDays) * 86400000;
  return exp + '.' + sig16_('dr|' + exp);
}
function sig16_(txt) {
  var raw = Utilities.computeHmacSha256Signature(txt, prop_('SECRET') || 'change-me');
  return raw.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('').slice(0, 24);
}
function okToken_(t) {
  var m = /^(\d{10,16})\.([0-9a-f]{24})$/.exec(String(t || '')); if (!m) return false;
  return Number(m[1]) > Date.now() && sig16_('dr|' + m[1]) === m[2];
}
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
  var o = { code: p.code, name: p.name, en: p.en, owner: p.owner, guardian: p.guardian, species: p.species, breed: p.breed, breedEn: p.breedEn, birth: p.birth, plan: plan, consent: p.consent === '1', updated: p.updated };
  if (withKey) o.key = p.key; return o;
}
function recOut_(r) {
  return { id: r.id, type: r.type, date: r.date, name: r.name, brand: r.brand, serial: r.serial, place: r.place, extra: r.extra, freq: r.freq, how: r.how, dur: r.dur, end: r.end, weight: Number(r.weight) || 0, next: r.next, closed: r.closed === '1', dr: r.dr === '1' };
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
    freq: clip_(b.freq, 40), how: clip_(b.how, 40), dur: clip_(b.dur, 20), end: date_(b.end), weight: w || '', next: date_(b.next), closed: b.closed ? '1' : '', dr: dr ? '1' : '' };
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
  // ---- دکتر ----
  if (!okToken_(b.t)) return { ok: false, err: 'auth' };
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    if (a === 'search') return search_(b);
    if (a === 'get') { var q = findPet_(b.code); if (!q || q.deleted) return { ok: false, err: 'notfound' }; return { ok: true, pet: petOut_(q, true), recs: recsOf_(q.code).map(recOut_) }; }
    if (a === 'savePet') return savePet_(b);
    if (a === 'saveRec') return saveRec_(b);
    if (a === 'delRec') return delRec_(b, true);
    if (a === 'rotate') return rotate_(b);
    if (a === 'deletePet') return deletePet_(b);
    if (a === 'verifyCode') return verifyCode_(b, false);
    if (a === 'useCode') return verifyCode_(b, true);
  } finally { lock.releaseLock(); }
  return { ok: false, err: 'bad' };
}

function drLogin_(b) {
  var cache = CacheService.getScriptCache(), fails = Number(cache.get('drfails') || 0);
  if (fails >= H.maxFails) return { ok: false, err: 'locked' };
  var pass = prop_('DR_PASS');
  if (!pass || String(b.pass || '') !== pass) { cache.put('drfails', String(fails + 1), 600); return { ok: false, err: 'auth' }; }
  cache.remove('drfails');
  return { ok: true, t: mkToken_(b.rem ? 30 : 0) };   // «مرا به خاطر بسپار» = ۳۰ روز
}

function search_(b) {
  var qq = norm_(b.q), pets = readAll_(hsheet_('Pets', PET_COLS), PET_COLS).filter(function (p) { return p.deleted !== '1'; });
  if (qq) pets = pets.filter(function (p) { return norm_([p.code, p.name, p.en, p.owner, p.guardian].join(' ')).indexOf(qq) > -1; });
  pets.sort(function (x, y) { return x.updated < y.updated ? 1 : -1; });
  return { ok: true, pets: pets.slice(0, 30).map(function (p) { return { code: p.code, name: p.name, en: p.en, owner: p.owner, species: p.species, birth: p.birth, updated: p.updated }; }) };
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
  o.breed = clip_(pin.breed, 40); o.breedEn = clip_(pin.breedEn, 40); o.birth = date_(pin.birth); o.plan = JSON.stringify(plan);
  o.consent = pin.consent ? '1' : (cur ? cur.consent : ''); o.updated = nowIso_();
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
  touchPet_(pet);
  return { ok: true, rec: recOut_(r) };
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
  if (p.action === 'spin') return json_(spin_(p));
  if (p.action === 'verify') return verifyPage_(p);
  return json_({ ok: true, service: 'sheet-server', wheel: true, health: true, version: 'v3-keys14-verifycode' });
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
