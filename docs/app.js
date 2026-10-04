// اطلاعات تماس. مقدار خالی یعنی آن ردیف نمایش داده نمی‌شود.
var INFO = {
  clinic: "مرکز تخصصی دامپزشکی ونک",
  phone: "",
  whatsapp: "989057392125",
  instagram: "Dr.niloofarmosavat",
  bale: "dr_niloofar_mosavat",
  hours: "۱۱:۰۰ تا ۲۱:۰۰",
  address: "ونک، شیخ بهایی شمالی، برج مرمر، طبقه اول",
  neshan: "",
  balad: ""
};
var mapQuery = "مرکز تخصصی دامپزشکی ونک، شیخ بهایی شمالی، برج مرمر";
var gmaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapQuery);
var waText = encodeURIComponent("سلام، برای گرفتن نوبت پیام می‌دم.");
var waLink = INFO.whatsapp ? "https://wa.me/" + INFO.whatsapp + "?text=" + waText : "";

document.querySelectorAll("[data-book]").forEach(function (a) {
  if (waLink) { a.href = waLink; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go"); }
});

var host = document.getElementById("contact-rows");
if (host) {
  var rows = [
    { label: "کلینیک", key: "clinic" },
    { label: "نشانی", key: "address" },
    { label: "ساعت کاری کلینیک", key: "hours" },
    { label: "مسیریابی", key: "gmaps", value: gmaps, link: function (v) { return v; }, text: function () { return "باز کردن در گوگل مپ"; } },
    { label: "نشان", key: "neshan", link: function (v) { return v; }, text: function () { return "مسیریابی در نشان"; } },
    { label: "بلد", key: "balad", link: function (v) { return v; }, text: function () { return "مسیریابی در بلد"; } },
    { label: "تلفن", key: "phone", link: function (v) { return "tel:" + v; } }
  ];
  rows.forEach(function (r) {
    var v = r.value || INFO[r.key];
    if (!v) return;
    var el = document.createElement("div");
    el.className = "row";
    var small = document.createElement("small");
    small.textContent = r.label;
    el.appendChild(small);
    var val;
    if (r.link) {
      val = document.createElement("a");
      val.href = r.link(v);
      val.target = "_blank";
      val.rel = "noopener";
      val.textContent = r.text ? r.text(v) : v;
    } else {
      val = document.createElement("span");
      val.textContent = v;
    }
    val.className = "val";
    if (r.ltr) { val.dir = "ltr"; val.style.textAlign = "right"; }
    el.appendChild(val);
    host.appendChild(el);
  });
}

// تاریخ و ساعت برای فرم‌ها (تاریخ شمسی، ۱۴ روز آینده). ساعت شروع هر روز از برنامهٔ کلینیک می‌آید.
var WHEN = (function () {
  var fmt;
  try { fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { weekday: "long", day: "numeric", month: "long" }); }
  catch (e) { fmt = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long" }); }
  var nf = new Intl.NumberFormat("fa-IR", { useGrouping: false, minimumIntegerDigits: 2 });
  var wd = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  var KEY = { Sat: "sat", Sun: "sun", Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri" };
  function days() {
    var out = [], d = new Date();
    if (d.getHours() >= 20) d.setDate(d.getDate() + 1);
    for (var k = 0; k < 14; k++) {
      var x = new Date(d.getTime()); x.setDate(d.getDate() + k);
      var pp = {}; fmt.formatToParts(x).forEach(function (q) { pp[q.type] = q.value; });
      out.push({ label: [pp.weekday, pp.day, pp.month].filter(Boolean).join(" "), key: KEY[wd.format(x)] });
    }
    return out;
  }
  function t(h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return nf.format(hh) + ":" + nf.format(mm); }
  function hours(from) { var out = []; for (var h = from; h <= 20.5; h += 0.5) out.push(t(h)); return out; }
  function put(sel, list, first) {
    if (!sel) return;
    sel.innerHTML = "";
    var o0 = document.createElement("option"); o0.value = ""; o0.textContent = first; sel.appendChild(o0);
    list.forEach(function (it) {
      var o = document.createElement("option");
      var label = typeof it === "string" ? it : it.label;
      o.value = label; o.textContent = label;
      if (it.key) o.setAttribute("data-key", it.key);
      sel.appendChild(o);
    });
  }
  // ساعت شروع ویزیت در هر روز (روزهای حضور دکتر از SCHEDULE)
  function startFor(key) {
    var r = typeof SCHEDULE !== "undefined" ? SCHEDULE.inperson[key] : null;
    return (Array.isArray(r) && r.length && r[0][0]) || 11;
  }
  function hintFor(key) {
    var r = typeof SCHEDULE !== "undefined" ? SCHEDULE.inperson[key] : null;
    if (Array.isArray(r) && r.length) return "این روز دکتر در کلینیک حضور دارد: از " + t(r[0][0]) + " تا " + t(r[r.length - 1][1]) + ".";
    return "این روز ویزیت فقط با وقت قبلی (حضوری یا آنلاین) انجام می‌شود.";
  }
  function link(dateSel, hourSel, hintEl) {
    if (!dateSel || !hourSel) return;
    put(dateSel, days(), "انتخاب تاریخ");
    put(hourSel, hours(11), "انتخاب ساعت");
    dateSel.addEventListener("change", function () {
      var o = dateSel.options[dateSel.selectedIndex], k = o && o.getAttribute("data-key");
      put(hourSel, hours(k ? startFor(k) : 11), "انتخاب ساعت");
      if (hintEl) hintEl.textContent = k ? hintFor(k) : "";
    });
  }
  return { link: link };
})();
WHEN.link(document.getElementById("bk-date"), document.getElementById("bk-hour"), document.getElementById("bk-hint"));
WHEN.link(document.getElementById("sh-date"), document.getElementById("sh-hour"), null);

// فرم نوبت: ساخت پیام آماده برای واتساپ
var bk = document.getElementById("bk-form");
if (bk) {
  var send = document.getElementById("bk-send");
  var val = function (id) { return (document.getElementById(id).value || "").trim(); };
  var build = function () {
    var lines = ["سلام دکتر مساوات، می‌خوام نوبت بگیرم."];
    if (val("bk-name")) lines.push("نام: " + val("bk-name"));
    var pet = [val("bk-type"), val("bk-pet")].filter(Boolean).join(" - ");
    if (pet) lines.push("پت: " + pet);
    if (val("bk-service")) lines.push("خدمت: " + val("bk-service"));
    if (val("bk-date")) lines.push("تاریخ پیشنهادی: " + val("bk-date") + (val("bk-hour") ? "، ساعت " + val("bk-hour") : ""));
    else if (val("bk-hour")) lines.push("ساعت پیشنهادی: " + val("bk-hour"));
    if (val("bk-note")) lines.push("توضیح: " + val("bk-note"));
    if (INFO.whatsapp) send.href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
  };
  bk.addEventListener("input", build);
  bk.addEventListener("change", build);
  build();
}

// نمایش بزرگ عکس‌ها
(function () {
  var lb = document.getElementById("lb");
  if (!lb) return;
  var body = lb.querySelector(".lb-body");
  var items = [], idx = -1, lastFocus = null;

  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".ph video").forEach(function (v) { v.removeAttribute("autoplay"); try { v.pause(); } catch (e) {} });
  }

  function render() {
    var a = items[idx], el;
    body.innerHTML = "";
    if (a.getAttribute("data-type") === "video") {
      el = document.createElement("video");
      el.src = a.getAttribute("data-src");
      el.poster = a.getAttribute("data-poster") || "";
      el.muted = true; el.loop = true; el.autoplay = true; el.playsInline = true;
      el.setAttribute("playsinline", ""); el.setAttribute("muted", "");
      var p = el.play(); if (p && p.catch) p.catch(function () {});
    } else {
      el = document.createElement("img");
      el.src = a.getAttribute("href");
    }
    el.setAttribute("alt", a.getAttribute("data-alt") || "");
    body.appendChild(el);
    lb.setAttribute("data-single", items.length > 1 ? "0" : "1");
  }
  function open(a) {
    items = [].slice.call(document.querySelectorAll('.ph[data-group="' + a.getAttribute("data-group") + '"]'));
    idx = items.indexOf(a);
    lastFocus = document.activeElement;
    render();
    lb.hidden = false;
    document.body.classList.add("lb-open");
    lb.querySelector(".lb-x").focus();
  }
  function close() {
    lb.hidden = true; body.innerHTML = "";
    document.body.classList.remove("lb-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) { if (items.length < 2) return; idx = (idx + d + items.length) % items.length; render(); }

  document.addEventListener("click", function (e) {
    var t = e.target;
    var a = t.closest ? t.closest(".ph") : null;
    if (a) { e.preventDefault(); open(a); return; }
    if (lb.hidden) return;
    if (t.closest(".lb-x") || t === lb || t === body) close();
    else if (t.closest(".lb-prev")) step(-1);
    else if (t.closest(".lb-next")) step(1);
  });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(-1);
    else if (e.key === "ArrowLeft") step(1);
  });
})();

// پرسیدن سؤال دربارهٔ یک موضوع در واتساپ
document.querySelectorAll("[data-ask]").forEach(function (a) {
  if (!INFO.whatsapp) return;
  var topic = a.getAttribute("data-ask");
  var text = "سلام دکتر مساوات، دربارهٔ «" + topic + "» سؤال دارم.";
  a.href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(text);
  a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go");
});

// لینک‌های پایین صفحه
document.querySelectorAll("[data-ig]").forEach(function (a) {
  if (INFO.instagram) { a.href = "https://instagram.com/" + INFO.instagram; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go"); }
});
document.querySelectorAll("[data-map]").forEach(function (a) {
  a.href = gmaps; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go");
});

document.querySelectorAll("[data-bale]").forEach(function (a) {
  if (INFO.bale) { a.href = "https://ble.ir/" + INFO.bale; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go"); }
  else { a.hidden = true; }
});

// اسلایدر عکس‌ها (عکس وسط واضح، بقیه محو)
(function () {
  var s = document.getElementById("slider");
  if (!s) return;
  var vp = s.querySelector(".viewport"), track = s.querySelector(".track");
  var slides = [].slice.call(s.querySelectorAll(".slide")), dots = [].slice.call(s.querySelectorAll(".dot"));
  var i = 0, timer = null, startX = null, dx = 0, moved = false;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function layout() {
    var sw = slides[0].offsetWidth, gap = parseFloat(getComputedStyle(track).columnGap) || 12;
    var total = slides.length * sw + (slides.length - 1) * gap, vw = vp.clientWidth;
    var tx = vw / 2 - (i * (sw + gap) + sw / 2);
    if (total <= vw) tx = (vw - total) / 2;
    else tx = Math.min(0, Math.max(vw - total, tx));
    track.style.transform = "translateX(" + tx + "px)";
  }
  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (sl, k) {
      sl.classList.toggle("is-active", k === i);
      var v = sl.querySelector("video");
      if (v) { if (k === i) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { try { v.pause(); } catch (e) {} } }
    });
    dots.forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
    layout();
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() { stop(); if (!reduce) timer = setInterval(function () { var lb = document.getElementById("lb"); if (lb && !lb.hidden) return; go(i + 1); }, 4500); }
  s.querySelector(".s-prev").addEventListener("click", function () { go(i - 1); start(); });
  s.querySelector(".s-next").addEventListener("click", function () { go(i + 1); start(); });
  dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); start(); }); });
  vp.addEventListener("pointerdown", function (e) { startX = e.clientX; dx = 0; moved = false; stop(); });
  vp.addEventListener("pointermove", function (e) { if (startX === null) return; dx = e.clientX - startX; if (Math.abs(dx) > 8) moved = true; });
  function end() { if (startX === null) return; if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1); startX = null; start(); }
  vp.addEventListener("pointerup", end);
  vp.addEventListener("pointercancel", end);
  vp.addEventListener("pointerleave", function () { if (startX !== null) end(); });
  vp.addEventListener("click", function (e) {
    var sl = e.target.closest ? e.target.closest(".slide") : null;
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
    if (sl && !sl.classList.contains("is-active")) { e.preventDefault(); e.stopPropagation(); go(slides.indexOf(sl)); start(); }
  }, true);
  s.addEventListener("mouseenter", stop);
  s.addEventListener("mouseleave", start);
  s.addEventListener("focusin", stop);
  s.addEventListener("focusout", start);
  window.addEventListener("resize", layout);
  window.addEventListener("load", layout);
  go(0); start();
})();

// ویزیت آنلاین: انتخاب پیام‌رسان
(function () {
  var sh = document.getElementById("sheet");
  if (!sh) return;
  var list = sh.querySelector(".sheet-list");
  var baseMsg = "سلام دکتر مساوات، می‌خوام ویزیت آنلاین بگیرم.";
  function msgNow() {
    var d = (document.getElementById("sh-date") || {}).value, h = (document.getElementById("sh-hour") || {}).value;
    if (!d && !h) return baseMsg;
    return baseMsg + "\nزمان پیشنهادی: " + (d || "") + (h ? "، ساعت " + h : "");
  }
  var msg = baseMsg;
  var opts = [];
  if (INFO.whatsapp) opts.push({ t: "واتساپ", wa: true, u: "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(msg), n: "پیام آماده می‌شود" });
  if (INFO.bale) opts.push({ t: "بله", u: "https://ble.ir/" + INFO.bale, n: "پیام را خودتان بنویسید", alt: true });
  if (INFO.instagram) opts.push({ t: "اینستاگرام", u: "https://ig.me/m/" + INFO.instagram, n: "پیام مستقیم", alt: true });
  opts.forEach(function (o) {
    var a = document.createElement("a");
    a.className = "sheet-opt" + (o.alt ? " alt" : "");
    a.href = o.u; a.target = "_blank"; a.rel = "noopener";
    var b = document.createElement("span"); b.textContent = o.t;
    var sm = document.createElement("small"); sm.textContent = o.n;
    a.appendChild(b); a.appendChild(sm); list.appendChild(a);
    if (o.wa) o.el = a;
  });
  function refreshWa() {
    opts.forEach(function (o) { if (o.wa && o.el) o.el.href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(msgNow()); });
  }
  ["sh-date", "sh-hour"].forEach(function (id) { var el = document.getElementById(id); if (el) el.addEventListener("change", refreshWa); });
  function open() { sh.hidden = false; document.body.classList.add("lb-open"); }
  function close() { sh.hidden = true; document.body.classList.remove("lb-open"); }
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest && t.closest("[data-online]")) { e.preventDefault(); open(); return; }
    if (!sh.hidden && (t === sh || (t.closest && t.closest(".sheet-x")))) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sh.hidden) close(); });
})();

// فرم نظر: ساخت پیام آماده برای واتساپ
(function () {
  var sh = document.getElementById("rsheet");
  if (!sh) return;
  var stars = [].slice.call(sh.querySelectorAll("#rv-stars button"));
  var rating = 5;
  var fa = ["۱", "۲", "۳", "۴", "۵"];
  function paint() { stars.forEach(function (b) { b.classList.toggle("on", parseInt(b.getAttribute("data-v"), 10) <= rating); }); }
  function build() {
    var name = document.getElementById("rv-name").value.trim();
    var who = document.getElementById("rv-who").value;
    var text = document.getElementById("rv-text").value.trim();
    var ok = document.getElementById("rv-ok").checked;
    var lines = ["سلام، می‌خوام نظرم رو دربارهٔ دکتر مساوات بنویسم."];
    lines.push("امتیاز: " + fa[rating - 1] + " از ۵");
    if (name) lines.push("نام: " + name);
    if (who) lines.push("پت: " + who);
    if (text) lines.push("نظر: " + text);
    lines.push(ok ? "اجازه می‌دهم نظرم با اسم کوچک در سایت نمایش داده شود." : "لطفاً نظرم در سایت نمایش داده نشود.");
    if (INFO.whatsapp) document.getElementById("rv-send").href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
  }
  function open() { sh.hidden = false; document.body.classList.add("lb-open"); build(); }
  function close() { sh.hidden = true; document.body.classList.remove("lb-open"); }
  stars.forEach(function (b) { b.addEventListener("click", function () { rating = parseInt(b.getAttribute("data-v"), 10); paint(); build(); }); });
  sh.addEventListener("input", build);
  sh.addEventListener("change", build);
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest && t.closest("[data-review]")) { e.preventDefault(); open(); return; }
    if (!sh.hidden && (t === sh || (t.closest && t.closest(".sheet-x") && sh.contains(t)))) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sh.hidden) close(); });
  paint();
})();

// نیاز به مشاوره: انتخاب پیام‌رسان
(function () {
  var sh = document.getElementById("csheet");
  if (!sh) return;
  var list = sh.querySelector(".sheet-list");
  var opts = [];
  if (INFO.whatsapp) opts.push({ t: "واتساپ", u: "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent("سلام، نیاز به مشاوره دارم."), n: "پیام آماده می‌شود" });
  if (INFO.bale) opts.push({ t: "بله", u: "https://ble.ir/" + INFO.bale, n: "پیام را خودتان بنویسید", alt: true });
  if (INFO.instagram) opts.push({ t: "اینستاگرام", u: "https://ig.me/m/" + INFO.instagram, n: "پیام مستقیم", alt: true });
  opts.forEach(function (o) {
    var a = document.createElement("a");
    a.className = "sheet-opt" + (o.alt ? " alt" : "");
    a.href = o.u; a.target = "_blank"; a.rel = "noopener";
    var b = document.createElement("span"); b.textContent = o.t;
    var sm = document.createElement("small"); sm.textContent = o.n;
    a.appendChild(b); a.appendChild(sm); list.appendChild(a);
  });
  function open() { sh.hidden = false; document.body.classList.add("lb-open"); }
  function close() { sh.hidden = true; document.body.classList.remove("lb-open"); }
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest && t.closest("[data-consult]")) { e.preventDefault(); open(); return; }
    if (!sh.hidden && (t === sh || (t.closest && t.closest(".sheet-x") && sh.contains(t)))) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sh.hidden) close(); });
})();

// برنامهٔ ساعت ویزیت. ساعت‌ها به‌صورت [شروع، پایان] و ۲۴ ساعته نوشته می‌شود (مثلاً [15, 21] یا [16.5, 20]).
// هر روز می‌تواند چند بازه داشته باشد: [[9, 12], [16, 20]].
// مقدارهای ویژه: "appt" یعنی فقط با وقت قبلی، "auto" یعنی با هماهنگی در پیام، null یعنی نیست.
var SCHEDULE = {
  inperson: { sat: "appt", sun: [[11, 21]], mon: "appt", tue: [[15, 21]], wed: "appt", thu: "appt", fri: [[15, 21]] },
  online:   { sat: "appt", sun: "auto", mon: "appt", tue: "auto", wed: "appt", thu: "appt", fri: "auto" }
};
var DAY_ORDER = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
var DAY_NAME = { sat: "شنبه", sun: "یکشنبه", mon: "دوشنبه", tue: "سه‌شنبه", wed: "چهارشنبه", thu: "پنجشنبه", fri: "جمعه" };

(function () {
  var cards = document.querySelectorAll(".today-card");
  if (!cards.length) return;
  var tz = "Asia/Tehran", df, nf;
  try {
    df = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" });
    nf = new Intl.NumberFormat("fa-IR", { useGrouping: false, minimumIntegerDigits: 2 });
  } catch (e) { return; }
  var wdFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" });
  var hmFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "numeric", hour12: false });
  var KEY = { Sat: "sat", Sun: "sun", Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri" };

  function t(h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return nf.format(hh) + ":" + nf.format(mm); }
  function ranges(r) { return r.map(function (x) { return "از " + t(x[0]) + " تا " + t(x[1]); }).join(" و "); }
  function now() {
    var d = new Date(), p = {};
    hmFmt.formatToParts(d).forEach(function (x) { p[x.type] = x.value; });
    return { date: d, key: KEY[wdFmt.format(d)], h: (parseInt(p.hour, 10) % 24) + parseInt(p.minute, 10) / 60 };
  }
  function isOpen(r, h) { return Array.isArray(r) && r.some(function (x) { return h >= x[0] && h < x[1]; }); }
  function inText(v, today) {
    if (Array.isArray(v)) return (today ? "امروز " : "") + ranges(v);
    if (v === "appt") return today ? "امروز فقط با وقت قبلی" : "با وقت قبلی";
    return today ? "امروز ویزیت حضوری ندارد" : "تعطیل";
  }
  function onText(v, today) {
    if (Array.isArray(v)) return (today ? "امروز " : "") + ranges(v);
    if (v === "auto") return today ? "با هماهنگی در پیام" : "با هماهنگی";
    if (v === "appt") return today ? "امروز آنلاین، با وقت قبلی" : "با وقت قبلی";
    return today ? "امروز ویزیت آنلاین ندارد" : "—";
  }

  function render() {
    var n = now();
    var inV = SCHEDULE.inperson[n.key], onV = SCHEDULE.online[n.key];
    var parts = {}; df.formatToParts(n.date).forEach(function (x) { parts[x.type] = x.value; });
    var dateText = [parts.weekday, parts.day, parts.month, parts.year].filter(Boolean).join(" ");
    cards.forEach(function (c) {
      c.querySelector(".tc-date").textContent = dateText;
      c.querySelector(".tc-in").textContent = inText(inV, true);
      c.querySelector(".tc-on").textContent = onText(onV, true);
      var open = isOpen(inV, n.h);
      var st = c.querySelector(".tc-state");
      if (open) st.textContent = "اکنون در کلینیک هستند";
      else if (Array.isArray(inV)) st.textContent = "اکنون خارج از شیفت";
      else st.textContent = "امروز با وقت قبلی";
      c.classList.toggle("is-open", open);
      var tb = c.querySelector(".tc-table tbody");
      if (tb && !tb.children.length) {
        DAY_ORDER.forEach(function (k) {
          var tr = document.createElement("tr"); tr.setAttribute("data-day", k);
          [DAY_NAME[k], inText(SCHEDULE.inperson[k], false), onText(SCHEDULE.online[k], false)].forEach(function (txt) {
            var td = document.createElement("td"); td.textContent = txt; tr.appendChild(td);
          });
          tb.appendChild(tr);
        });
      }
      if (tb) [].forEach.call(tb.children, function (tr) { tr.classList.toggle("is-today", tr.getAttribute("data-day") === n.key); });
    });
  }
  render();
  setInterval(render, 30000);
})();

// تاریخ و روز امروز در نوار زیر منو
(function () {
  var els = document.querySelectorAll(".db-date");
  if (!els.length) return;
  var df;
  try { df = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: "Asia/Tehran", weekday: "long", day: "numeric", month: "long", year: "numeric" }); }
  catch (e) { [].forEach.call(document.querySelectorAll(".datebar"), function (b) { b.hidden = true; }); return; }
  function tick() {
    var p = {}; df.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var t = [p.weekday, p.day, p.month, p.year].filter(Boolean).join(" ");
    [].forEach.call(els, function (e) { e.textContent = t; });
  }
  tick();
  setInterval(tick, 60000);
})();

// دکمه‌های پیام‌رسان در صفحهٔ تماس
document.querySelectorAll("[data-msg]").forEach(function (a) {
  var k = a.getAttribute("data-msg"), u = "";
  if (k === "whatsapp" && INFO.whatsapp) u = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent("سلام دکتر مساوات، می‌خوام نوبت بگیرم.");
  if (k === "bale" && INFO.bale) u = "https://ble.ir/" + INFO.bale;
  if (k === "instagram" && INFO.instagram) u = "https://instagram.com/" + INFO.instagram;
  if (u) { a.href = u; a.removeAttribute("data-go"); } else { a.hidden = true; }
});
