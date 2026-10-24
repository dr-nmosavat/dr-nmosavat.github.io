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
var PET_COLS = ['code', 'key', 'name', 'en', 'owner', 'guardian', 'species', 'breed', 'breedEn', 'birth', 'plan', 'consent', 'created', 'updated', 'deleted'];
var REC_COLS = ['id', 'code', 'type', 'date', 'name', 'brand', 'serial', 'place', 'extra', 'freq', 'how', 'dur', 'end', 'weight', 'next', 'closed', 'dr', 'created', 'updated', 'deleted', 'src'];

function hsheet_(name, cols) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name); sh.appendRow(cols); sh.setFrozenRows(1);
    sh.getRange(1, 1, sh.getMaxRows(), cols.length).setNumberFormat('@');   // متن ساده: تاریخ‌ها خودکار تبدیل نشوند
    if (LOOK[name]) look_(sh, LOOK[name]);
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
  var o = { code: p.code, name: p.name, en: p.en, owner: p.owner, guardian: p.guardian, species: p.species, breed: p.breed, breedEn: p.breedEn, birth: p.birth, plan: plan, consent: p.consent === '1', updated: p.updated, auth: authCode_(p.code), created: String(p.created || '').slice(0, 10) };
  if (withKey) o.key = p.key; return o;
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
    if (a === 'verifyPet') return verifyPet_(b);
    if (a === 'adoptAdmin') return adoptAdmin_();
    if (a === 'adoptSet') return adoptSet_(b);
    if (a === 'petReqList') return petReqList_();
    if (a === 'petReqSet') return petReqSet_(b);
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
  return json_({ ok: true, service: 'sheet-server', wheel: true, health: true, version: 'v8-auth' });
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
  Pets: { color: '#1f5aa6', labels: ['کد پت', 'کلید لینک (محرمانه)', 'نام', 'نام انگلیسی', 'صاحب', 'سرپرست', 'گونه', 'نژاد', 'نژاد (انگلیسی)', 'تاریخ تولد', 'برنامهٔ واکسن (داده)', 'رضایت (۱=بله)', 'ساخته شد', 'ویرایش', 'حذف‌شده؟ (۱=بله)'],
    widths: [90, 140, 110, 110, 130, 110, 80, 110, 120, 100, 120, 90, 150, 150, 90], clip: [2, 11], gray: [2, 11], del: 15 },
  Records: { color: '#0f766e', labels: ['شناسه', 'کد پت', 'نوع', 'تاریخ', 'نام', 'برند', 'سریال', 'محل', 'توضیح', 'تکرار', 'روش', 'مدت', 'پایان', 'وزن', 'نوبت بعدی', 'بسته‌شده؟', 'ثبت دکتر؟', 'ساخته شد', 'ویرایش', 'حذف‌شده؟ (۱=بله)', 'منبع (old=سابقهٔ قبلی)'],
    widths: [110, 90, 130, 100, 150, 110, 110, 110, 140, 90, 90, 80, 100, 70, 100, 80, 80, 150, 150, 90, 110], gray: [1], del: 20 },
  Adoptions: { color: '#b36b00', labels: ['کد', 'زمان ثبت', 'وضعیت', 'گونه', 'نام', 'سن', 'جنس', 'عقیم', 'واکسن', 'رفتار', 'دلیل واگذاری', 'شهر', 'تلفن (محرمانه)', 'عکس (داده)', 'یادداشت', 'تاریخ تأیید', 'ویرایش'],
    widths: [110, 150, 100, 80, 110, 90, 80, 80, 80, 220, 220, 130, 130, 70, 150, 100, 150], clip: [14], gray: [14], status: 3, statusList: ['pending', 'approved', 'done', 'rejected', 'deleted'],
    note: 'وضعیت: pending=در انتظار بررسی · approved=منتشرشده · done=واگذار شد · rejected=ردشده · deleted=حذف' },
  PetReqs: { color: '#7c3aed', labels: ['کد درخواست', 'زمان ثبت', 'وضعیت', 'نام پت', 'گونه', 'صاحب', 'تلفن (محرمانه)', 'تولد', 'توضیح', 'کد شناسنامه', 'ویرایش'],
    widths: [110, 150, 100, 110, 80, 140, 130, 110, 220, 110, 150], status: 3, statusList: ['new', 'done', 'rejected', 'deleted'],
    note: 'وضعیت: new=جدید · done=شناسنامه صادر شد · rejected=ردشده · deleted=حذف' }
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
    body.setVerticalAlignment('top').setHorizontalAlignment('right').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    (spec.clip || []).forEach(function (c) { sh.getRange(2, c, rows, 1).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP); });
    (spec.gray || []).forEach(function (c) { sh.getRange(2, c, rows, 1).setFontColor('#9aa5b1'); });
    var rules = [];
    if (spec.status) {
      var sr = sh.getRange(2, spec.status, rows, 1);
      Object.keys(STATUS_COLORS).forEach(function (k) {
        rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(k).setBackground(STATUS_COLORS[k][0]).setFontColor(STATUS_COLORS[k][1]).setRanges([sr]).build());
      });
      try { sh.getRange(1, spec.status).setNote(spec.note || ''); } catch (e2) {}
      try { if (spec.statusList) sr.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(spec.statusList, true).setAllowInvalid(false).build()); } catch (e3) {}
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
function formatSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), done = [];
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
      .addSeparator()
      .addItem('🎨 زیباسازی جدول‌ها', 'formatSheets')
      .addItem('💾 گرفتن پشتیبان', 'backupNow')
      .addItem('🔔 آزمایش اطلاع‌رسانی', 'testNotify')
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
    f.setColumnFilterCriteria(3, SpreadsheetApp.newFilterCriteria().whenTextEqualTo(status).build());
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
  ['⚠️ سه قانون مهم', '۱) ردیف اول (عنوان ستون‌ها) و ترتیب ستون‌ها را عوض نکنید.\n۲) ستون‌های خاکستری (کلید، داده‌های فنی) را دستی ویرایش نکنید.\n۳) برای حذف یک ردیف، آن را از صفحهٔ دکتر در سایت حذف کنید؛ ردیف را پاک نکنید.'],
  ['Pets — شناسنامه‌ها', 'هر ردیف یک پت است. «کد پت» مثل NM-1234 است. «کلید لینک» محرمانه است و مثل رمز عمل می‌کند؛ به کسی نشان ندهید. «رضایت» یعنی صاحب پت اجازهٔ ذخیرهٔ اطلاعات را داده است. ردیف قرمز کم‌رنگ یعنی حذف‌شده.'],
  ['Records — ثبت‌های دفترچه', 'واکسن، ضدانگل، ویزیت، وزن و بقیه. هر ردیف به یک «کد پت» وصل است. «نوبت بعدی» یادآوری را می‌سازد. «ثبت دکتر؟» اگر ۱ باشد، فقط دکتر می‌تواند آن را عوض کند. «منبع» اگر old باشد، یعنی سابقهٔ قبلی است (از گفتهٔ صاحب یا دفترچهٔ کاغذی) و در سایت با برچسب «سابقهٔ قبلی» دیده می‌شود.'],
  ['PetReqs — درخواست‌های شناسنامه', 'درخواستی که صاحب پت از سایت فرستاده. وضعیت: new = جدید · done = شناسنامه صادر شد · rejected = رد شده. صدور از صفحهٔ دکتر ← تب «📝 درخواست‌ها» انجام می‌شود. شمارهٔ تماس فقط دکتر می‌بیند.'],
  ['Adoptions — واگذاری‌ها', 'درخواست واگذاری پت. وضعیت: pending = در انتظار بررسی · approved = منتشرشده در سایت · done = واگذار شد · rejected = رد شد. تأیید و عکس از صفحهٔ دکتر ← تب «🏡 واگذاری» انجام می‌شود. آگهی ۶۰ روز بعد از تأیید از سایت پنهان می‌شود.'],
  ['Spins — چرخ هدیه', 'نتیجهٔ چرخش‌ها و کد جایزه‌ها (مثل DM-1234-ABCD). برای استفاده از یک کد، از صفحهٔ دکتر ← تب «🔎 بررسی کد» استفاده کنید.'],
  ['🔎 اصالت شناسنامه', 'روی هر شناسنامه یک «کد اصالت» شش‌نویسه (مثل A7K2Q9) چاپ می‌شود. برای راستی‌آزمایی: منوی «🐾 سایت دکتر ← بررسی اصالت یک شناسنامه» یا صفحهٔ دکتر ← تب «🔎 بررسی کد». کد فقط با رمز سرور ساخته می‌شود و نمی‌شود برایش کد جعلی ساخت.'],
  ['🎨 رنگ‌ها', 'سبز = منتشرشده · زرد = در انتظار/جدید · آبی = انجام‌شده · قرمز = ردشده یا حذف‌شده.'],
  ['🐾 منوی «سایت دکتر»', 'بالای شیت: راهنما، خلاصهٔ امروز، رفتن به درخواست‌ها و واگذاری‌های جدید، بررسی اصالت، زیباسازی جدول‌ها، گرفتن پشتیبان و آزمایش اطلاع‌رسانی. اگر منو دیده نشد، صفحه را یک بار ببندید و باز کنید.']
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
    for (var i = 1; i <= rows.length; i++) sh.setRowHeight(i, i === 1 ? 70 : 96);
    sh.setTabColor('#1f5aa6');
  } catch (e) { lastLookError_ = 'guide: ' + String(e); }
  return sh;
}
function openGuide() { var sh = guideSheet_(); try { SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sh); } catch (e) {} return sh.getName(); }
