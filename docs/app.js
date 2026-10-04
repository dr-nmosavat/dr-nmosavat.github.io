// اطلاعات تماس. مقدار خالی یعنی آن ردیف نمایش داده نمی‌شود.
var INFO = {
  clinic: "مرکز تخصصی دامپزشکی ونک",
  phone: "",
  whatsapp: "989057392125",
  instagram: "Dr.niloofarmosavat",
  bale: "dr_niloofar_mosavat",
  hours: "۱۵:۰۰ تا ۲۱:۰۰",
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
    { label: "واتساپ", key: "whatsapp", link: function () { return waLink; }, text: function () { return "پیام در واتساپ"; } },
    { label: "اینستاگرام", key: "instagram", link: function (v) { return "https://instagram.com/" + v; }, text: function (v) { return "@" + v; }, ltr: true },
    { label: "بله", key: "bale", link: function (v) { return "https://ble.ir/" + v; }, text: function (v) { return "@" + v; }, ltr: true },
    { label: "کلینیک", key: "clinic" },
    { label: "نشانی", key: "address" },
    { label: "ساعت کاری", key: "hours" },
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

// تاریخ و ساعت (تاریخ شمسی، ۱۴ روز آینده؛ ساعت ۱۵ تا ۲۰:۳۰)
var WHEN = (function () {
  var fmt;
  try { fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { weekday: "long", day: "numeric", month: "long" }); }
  catch (e) { fmt = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long" }); }
  var nf = new Intl.NumberFormat("fa-IR", { useGrouping: false, minimumIntegerDigits: 2 });
  function days() {
    var out = [], d = new Date();
    if (d.getHours() >= 20) d.setDate(d.getDate() + 1);
    for (var k = 0; k < 14; k++) {
      var x = new Date(d.getTime()); x.setDate(d.getDate() + k);
      var pp = {}; fmt.formatToParts(x).forEach(function (q) { pp[q.type] = q.value; });
      out.push([pp.weekday, pp.day, pp.month].filter(Boolean).join(" "));
    }
    return out;
  }
  function hours() {
    var out = [];
    for (var h = 15; h <= 20; h++) { out.push(nf.format(h) + ":" + nf.format(0)); if (h < 21) out.push(nf.format(h) + ":" + nf.format(30)); }
    return out;
  }
  function fill(sel, list, first) {
    if (!sel) return;
    sel.innerHTML = "";
    var o0 = document.createElement("option"); o0.value = ""; o0.textContent = first; sel.appendChild(o0);
    list.forEach(function (t) { var o = document.createElement("option"); o.value = t; o.textContent = t; sel.appendChild(o); });
  }
  return { fill: fill, days: days, hours: hours };
})();
WHEN.fill(document.getElementById("bk-date"), WHEN.days(), "انتخاب تاریخ");
WHEN.fill(document.getElementById("bk-hour"), WHEN.hours(), "انتخاب ساعت");
WHEN.fill(document.getElementById("sh-date"), WHEN.days(), "تاریخ (اختیاری)");
WHEN.fill(document.getElementById("sh-hour"), WHEN.hours(), "ساعت (اختیاری)");

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

// دکمهٔ شناور مشاوره
var consultLink = INFO.whatsapp ? "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent("سلام، نیاز به مشاوره دارم.") : "";
document.querySelectorAll("[data-consult]").forEach(function (a) {
  if (consultLink) { a.href = consultLink; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go"); }
});

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

// تاریخ و ساعت امروز (به وقت تهران)
(function () {
  var el = document.getElementById("today");
  if (!el) return;
  var tz = "Asia/Tehran", df, tf;
  try {
    df = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" });
    tf = new Intl.DateTimeFormat("fa-IR", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
  } catch (e) { el.hidden = true; return; }
  var hourFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false });
  var dEl = el.querySelector(".t-date"), tEl = el.querySelector(".t-time"), sEl = el.querySelector(".t-state");
  function tick() {
    var now = new Date();
    var parts = {};
    df.formatToParts(now).forEach(function (p) { parts[p.type] = p.value; });
    dEl.textContent = [parts.weekday, parts.day, parts.month, parts.year].filter(Boolean).join(" ");
    tEl.textContent = tf.format(now);
    var h = parseInt(hourFmt.format(now), 10) % 24;
    var open = h >= 15 && h < 21;
    sEl.textContent = open ? "اکنون در ساعت کاری" : "ساعت کاری ۱۵ تا ۲۱";
    el.classList.toggle("is-open", open);
  }
  tick();
  setInterval(tick, 20000);
})();
