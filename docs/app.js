// اطلاعات تماس. مقدار خالی یعنی آن ردیف نمایش داده نمی‌شود.
var INFO = {
  clinic: "مرکز تخصصی دامپزشکی ونک",
  phone: "",
  whatsapp: "989057392125",
  instagram: "dr.niloofarmosavat",
  bale: "dr_niloofar_mosavat",
  hours: "۱۱:۰۰ تا ۲۱:۰۰",
  address: "ونک، شیخ بهایی شمالی، برج مرمر، طبقه اول",
  homeVisit: "منظریه، اختیاریه، پاسداران، بلوار کاوه، قیطریه (با هماهنگی قبلی)",
  neshan: "https://nshn.ir/d6sbvrTDWxOVnZ",
  balad: "",
  wheelApi: "https://script.google.com/macros/s/AKfycbzo2VYI-uF9SoyoMkgMbCnM5s5-zOvsPJDp4Ea9C2GHmeBEsJMoVhlbccVgtnpqx_TM/exec",   // آدرس Apps Script چرخ؛ خالی یعنی چرخ محلی
  sheetApi: "https://script.google.com/macros/s/AKfycbzo2VYI-uF9SoyoMkgMbCnM5s5-zOvsPJDp4Ea9C2GHmeBEsJMoVhlbccVgtnpqx_TM/exec"    // همان آدرس برای همگام‌سازی شناسنامه؛ خالی یعنی فقط روی خود گوشی
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
    { label: "ویزیت تخصصی در منزل یا محل", key: "homeVisit" },
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

// لوگوی پیام‌رسان‌ها (برای پنجره‌های انتخاب)
var BRAND = (function () {
  var uid = 0;
  return {
    "واتساپ": { cls: "m-wa", logo: function () { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'; } },
    "بله": { cls: "m-bale", logo: function () { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1a8fe3" d="M12 3C6.5 3 3 6.6 3 11c0 2.3 1 4.3 2.7 5.7L5 21l4.2-2c.9.2 1.8.3 2.8.3 5.5 0 9-3.6 9-8S17.5 3 12 3z"/><path d="M8.3 11.2l2.5 2.5 4.8-4.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; } },
    "اینستاگرام": { cls: "m-ig", logo: function () {
      var id = "igs" + (++uid);
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".3" stop-color="#fa7e1e"/><stop offset=".55" stop-color="#d62976"/><stop offset=".8" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="url(#' + id + ')" stroke-width="2.1"/><circle cx="12" cy="12" r="4" fill="none" stroke="url(#' + id + ')" stroke-width="2.1"/><circle cx="17.2" cy="6.8" r="1.2" fill="url(#' + id + ')"/></svg>';
    } }
  };
})();

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
  var bkText = "";
  var baleBtn = document.getElementById("bk-bale");
  var copied = document.getElementById("bk-copied");
  document.querySelectorAll("#bk-form [data-logo]").forEach(function (s) { var br = BRAND[s.getAttribute("data-logo")]; if (br) s.innerHTML = br.logo(); });
  if (baleBtn) {
    if (!INFO.bale) baleBtn.hidden = true;
    baleBtn.addEventListener("click", function () {
      build();
      var done = function () { if (copied) copied.hidden = false; };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(bkText).then(done, done);
        else { var t = document.createElement("textarea"); t.value = bkText; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(t); done(); }
      } catch (e) { done(); }
      window.open("https://ble.ir/" + INFO.bale, "_blank", "noopener");
    });
  }
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
    if (window.__promo) lines.push("🎁 تخفیف روز دامپزشک (۲۰٪ ویزیت و مشاورهٔ رایگان)");
    bkText = lines.join("\n");
    if (INFO.whatsapp) send.href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(bkText);
  };
  window.__bkBuild = build;
  if (/[?&]promo=/.test(location.search)) { window.__promo = true; }
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
  var short = topic.split(/[:؟?]/)[0].trim();
  var text = topic.indexOf("سؤال عمومی") === 0 ? "سلام دکتر مساوات، یک سؤال دربارهٔ پتم دارم." : "سلام دکتر مساوات، دربارهٔ «" + short + "» سؤال دارم.";
  a.href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(text);
  a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go");
});

// لینک‌های پایین صفحه
document.querySelectorAll("[data-ig]").forEach(function (a) {
  if (INFO.instagram) { a.href = "https://instagram.com/" + INFO.instagram; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go"); }
});
document.querySelectorAll("[data-map]").forEach(function (a) {
  a.href = INFO.neshan || gmaps; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-go");
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
    var br = BRAND[o.t];
    a.className = "sheet-opt m-btn " + (br ? br.cls : "");
    a.href = o.u; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = '<span class="m-ic">' + (br ? br.logo() : "") + '</span><span class="m-t"><b></b><small></small></span>';
    a.querySelector("b").textContent = o.t;
    a.querySelector("small").textContent = o.n;
    list.appendChild(a);
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
    var br = BRAND[o.t];
    a.className = "sheet-opt m-btn " + (br ? br.cls : "");
    a.href = o.u; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = '<span class="m-ic">' + (br ? br.logo() : "") + '</span><span class="m-t"><b></b><small></small></span>';
    a.querySelector("b").textContent = o.t;
    a.querySelector("small").textContent = o.n;
    list.appendChild(a);
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

// نوار متحرک تاریخ و ساعت (فقط صفحهٔ اصلی). از چپ به راست حرکت می‌کند و با لمس یا موس می‌ایستد.
(function () {
  var bars = document.querySelectorAll(".datebar[data-mq]");
  if (!bars.length) return;
  var tz = "Asia/Tehran", df, nf, wd, hm;
  try {
    df = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" });
    nf = new Intl.NumberFormat("fa-IR", { useGrouping: false, minimumIntegerDigits: 2 });
    wd = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" });
    hm = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "numeric", hour12: false });
  } catch (e) { return; }
  var KEY = { Sat: "sat", Sun: "sun", Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri" };
  function t(h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return nf.format(hh) + ":" + nf.format(mm); }
  function items() {
    var d = new Date(), p = {}, q = {};
    df.formatToParts(d).forEach(function (x) { p[x.type] = x.value; });
    hm.formatToParts(d).forEach(function (x) { q[x.type] = x.value; });
    var h = (parseInt(q.hour, 10) % 24) + parseInt(q.minute, 10) / 60;
    var key = KEY[wd.format(d)];
    var v = (typeof SCHEDULE !== "undefined" && SCHEDULE.inperson) ? SCHEDULE.inperson[key] : null;
    var clinic;
    if (Array.isArray(v)) {
      var open = v.some(function (x) { return h >= x[0] && h < x[1]; });
      var span = v.map(function (x) { return "از " + t(x[0]) + " تا " + t(x[1]); }).join(" و ");
      clinic = (open ? "اکنون در کلینیک هستند · " : "ویزیت حضوری امروز ") + span;
    } else clinic = "امروز ویزیت حضوری فقط با وقت قبلی";
    return [
      "امروز " + [p.weekday, p.day, p.month, p.year].filter(Boolean).join(" ") + " ساعت " + nf.format(parseInt(q.hour, 10) % 24) + ":" + nf.format(parseInt(q.minute, 10)),
      clinic
    ];
  }
  function group(list) {
    return '<span class="mq-g">' + list.map(function (x) { return '<span class="mq-i">' + x + "</span>"; }).join('<span class="mq-sep" aria-hidden="true">•</span>') + '</span>';
  }
  function render() {
    var g = group(items());
    [].forEach.call(bars, function (bar) {
      var tr = bar.querySelector(".mq-track");
      if (tr) tr.innerHTML = g + g + g + g;
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

(function(){try{var y=new Intl.DateTimeFormat("fa-IR-u-ca-persian",{year:"numeric",timeZone:"Asia/Tehran"}).format(new Date());document.querySelectorAll("[data-year]").forEach(function(e){e.textContent=y;});}catch(e){}})();

// جلوگیری از ذخیرهٔ ساده و اتفاقی عکس‌ها (فقط روی عکس‌ها)
(function () {
  var sel = ".ph, .photo, .slider, .gallery, #lb, .vid";
  document.addEventListener("contextmenu", function (e) {
    if (e.target.closest && e.target.closest(sel)) e.preventDefault();
  });
  document.addEventListener("copy", function (e) {
    var n = window.getSelection && window.getSelection().anchorNode;
    n = n && (n.nodeType === 1 ? n : n.parentElement);
    if (n && n.closest && n.closest(sel)) e.preventDefault();
  });
  document.addEventListener("selectstart", function (e) {
    var n = e.target && (e.target.nodeType === 1 ? e.target : e.target.parentElement);
    if (n && n.closest && n.closest(sel)) e.preventDefault();
  });
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO" || (e.target.closest && e.target.closest(sel))) e.preventDefault();
  });
  document.querySelectorAll("video").forEach(function (v) {
    v.setAttribute("controlslist", "nodownload noplaybackrate");
    v.setAttribute("disablepictureinpicture", "");
  });
})();

// پر کردن خودکار «خدمت» در فرم نوبت از آدرس (مثلاً booking.html?service=واکسیناسیون)
(function () {
  try {
    var sel = document.getElementById("bk-service");
    var m = /[?&]service=([^&]+)/.exec(location.search);
    if (!sel || !m) return;
    var want = decodeURIComponent(m[1]);
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].text === want || sel.options[i].value === want) { sel.selectedIndex = i; sel.dispatchEvent(new Event("change", { bubbles: true })); break; }
    }
  } catch (e) {}
})();

// پوستر ویژهٔ روز دامپزشک: فقط در روز مشخص‌شده (به وقت تهران)، یک بار در هر بازدید، چند ثانیه می‌ماند
(function () {
  var PROMO = { from: "2026-10-05", to: "2026-10-06", showAt: 900, stay: 9000 };
  try {
    var today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran" }).format(new Date());
    var force = window.PROMO_FORCE || /[?&]promo=test/.test(location.search);
    if (!force && (today < PROMO.from || today > PROMO.to)) return;
    var lastDay = (today === PROMO.to);
    var seen = false, claimed = false;
    try { seen = sessionStorage.getItem("promoSeen") === today; } catch (e) {}
    try { claimed = localStorage.getItem("promoClaimed") === PROMO.to; } catch (e) {}
    // اگر کاربر دکمهٔ تخفیف را زده، دیگر نمایش داده نمی‌شود؛ وگرنه در هر بار ورود به سایت دوباره می‌آید
    if ((claimed || seen) && !force) return;
    window.__promoActive = true;
    var spa = !!document.getElementById("pg-booking");
    var el = document.createElement("div");
    el.className = "promo-poster";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "تبریک روز دامپزشک");
    el.hidden = true;
    el.innerHTML =
      '<button type="button" class="pp-x" aria-label="بستن">×</button>' +
      '<svg class="pp-paw" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><ellipse cx="13" cy="21" rx="5" ry="6.5"/><ellipse cx="22" cy="12" rx="5" ry="6.5"/><ellipse cx="34" cy="12" rx="5" ry="6.5"/><ellipse cx="43" cy="21" rx="4.5" ry="6"/><path d="M28 24c-7 0-14 7-14 13 0 4 3 6 7 6 3 0 4-1 7-1s4 1 7 1c4 0 7-2 7-6 0-6-7-13-14-13z"/></svg>' +
      '<b class="pp-title">روز دامپزشک مبارک 🐾</b>' +
      '<p class="pp-msg">دامپزشکی یعنی عشق؛ یعنی نجات یک جان کوچک. این روز را به همهٔ همکاران دامپزشک تبریک می‌گوییم.</p>' +
      '<div class="pp-offer"><span>هدیه به پت‌های شما</span><strong>۲۰٪ تخفیف ویزیت + مشاورهٔ رایگان</strong><small>' + (lastDay ? "فقط امروز، تا پایان شب" : "تا فردا شب") + '</small></div>' +
      '<a class="pp-btn" data-promo href="' + (spa ? "#booking" : "booking.html?promo=1") + '"' + (spa ? ' data-go="booking"' : "") + '>گرفتن نوبت با تخفیف</a>';
    document.body.appendChild(el);
    var timer;
    function hide() {
      clearTimeout(timer);
      el.classList.remove("show");
      setTimeout(function () { el.hidden = true; }, 500);
      try { sessionStorage.setItem("promoSeen", today); } catch (e) {}
    }
    el.querySelector(".pp-x").addEventListener("click", hide);
    el.querySelector(".pp-btn").addEventListener("click", function () {
      window.__promo = true;
      try { localStorage.setItem("promoClaimed", PROMO.to); } catch (e) {}
      if (window.__bkBuild) window.__bkBuild();
      hide();
    }, true);
    setTimeout(function () {
      el.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("show"); }); });
      timer = setTimeout(hide, PROMO.stay);
    }, PROMO.showAt);
  } catch (e) {}
})();

// حباب کوتاه کنار دکمهٔ مشاوره: چند ثانیه بعد از ورود نشان داده می‌شود و بسته می‌شود
(function () {
  var fab = document.querySelector(".fab");
  if (!fab || window.__promoActive) return;
  var seen = false;
  try { seen = sessionStorage.getItem("bubbleSeen") === "1"; } catch (e) {}
  if (seen) return;
  var b = document.createElement("div");
  b.className = "fab-bubble";
  b.setAttribute("role", "status");
  b.hidden = true;
  b.innerHTML = '<span>سؤال دارید؟ از دکتر بپرسید</span><button type="button" aria-label="بستن">×</button>';
  document.body.appendChild(b);
  var timer;
  function place() {
    var r = fab.getBoundingClientRect();
    b.style.left = (r.right + 10) + "px";
    b.style.bottom = (window.innerHeight - r.bottom + (r.height - 40) / 2) + "px";
    b.style.maxWidth = Math.max(140, window.innerWidth - r.right - 26) + "px";
  }
  function hide(remember) {
    clearTimeout(timer);
    b.classList.remove("show");
    setTimeout(function () { b.hidden = true; }, 300);
    if (remember) { try { sessionStorage.setItem("bubbleSeen", "1"); } catch (e) {} }
  }
  b.querySelector("button").addEventListener("click", function () { hide(true); });
  fab.addEventListener("click", function () { hide(true); });
  setTimeout(function () {
    var sheet = document.querySelector(".sheet:not([hidden])");
    if (sheet) return;
    place(); b.hidden = false;
    requestAnimationFrame(function () { b.classList.add("show"); });
    timer = setTimeout(function () { hide(true); }, 3000);
  }, 2000);
})();

// ظاهر شدن آرام بخش‌ها با اسکرول (فقط وقتی مرورگر پشتیبانی کند و کاربر «کاهش حرکت» را نخواسته باشد)
(function () {
  try {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var sel = ".page-head, section > h2, section > .sub, .solo.banner, .svc-row, .rv-row, .grid.five, .grid.two, .agrid, .group, .today-card, .about, .expl, .cta, .note, .msgr, .book-grid, .article h2, .acard, .step, .gallery .ph, .contact .row, .rv-cta, .askbox, .tip";
    var els = [].slice.call(document.querySelectorAll(sel)).filter(function (e) {
      // عناصر تو در تو یا داخل ردیف‌های اسکرول افقی جدا انیمیشن نگیرند
      var p = e.parentElement;
      while (p) { if (p.classList && p.classList.contains("reveal")) return false; p = p.parentElement; }
      return true;
    });
    if (!els.length) return;
    document.documentElement.classList.add("rv-on");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (!en.isIntersecting) return;
        var e = en.target; io.unobserve(e);
        e.classList.add("in");
        setTimeout(function () { e.classList.remove("reveal", "in"); e.style.removeProperty("--d"); }, 900);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    var groups = new Map();
    els.forEach(function (e) {
      e.classList.add("reveal");
      var k = e.parentElement, n = groups.get(k) || 0;
      if (/(^|\s)(acard|step|ph|row)(\s|$)/.test(e.className)) e.style.setProperty("--d", Math.min(n, 5) * 0.08 + "s");
      groups.set(k, n + 1);
      io.observe(e);
    });
    // اگر به هر دلیل چیزی دیده نشد (مثلاً ابزار بدون اسکرول)، بعد از چند ثانیه همه را نشان بده
    setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); }, 6000);
  } catch (e) {}
})();

// شمارندهٔ کلیک روی دکمه‌های مهم (با GoatCounter؛ اگر بارگذاری نشده باشد هیچ اتفاقی نمی‌افتد)
(function () {
  function count(name) {
    try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: name, title: name, event: true }); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a, button") : null;
    if (!a) return;
    var h = a.getAttribute("href") || "", n = null;
    if (a.hasAttribute("data-promo")) n = "click-promo";
    else if (a.id === "bk-bale") n = "click-bale-from-booking";
    else if (a.hasAttribute("data-consult")) n = "click-consult-button";
    else if (a.hasAttribute("data-online")) n = "click-online-visit-button";
    else if (/wa\.me/.test(h)) n = "click-whatsapp";
    else if (/ble\.ir/.test(h)) n = "click-bale";
    else if (/hossein\.tallachiyan/.test(h)) n = "click-designer";
    else if (/ig\.me|instagram\.com/.test(h)) n = "click-instagram";
    else if (/^tel:/.test(h)) n = "click-phone";
    else if (/nshn\.ir/.test(h)) n = "click-neshan";
    else if (/google\.com\/maps/.test(h)) n = "click-google-maps";
    else if (/booking\.html|#booking/.test(h)) n = "click-booking-page";
    if (n) count(n);
  }, true);
})();

// آلبوم: «دیدن بیشتر»، فیلتر بیماری‌ها و پنجرهٔ پروندهٔ بیماری
(function () {
  var cs = document.getElementById("casheet");
  document.addEventListener("click", function (e) {
    var t = e.target, el;
    if (!t.closest) return;
    if ((el = t.closest("[data-more]"))) {
      var wrap = el.previousElementSibling;
      if (wrap) wrap.classList.add("open");
      el.hidden = true;
      return;
    }
    if ((el = t.closest(".chip[data-tag]"))) {
      var tag = el.getAttribute("data-tag"), chips = el.parentNode;
      var cb = el.closest(".grp-box"); if (cb) cb.classList.add("used");
      [].forEach.call(chips.querySelectorAll(".chip"), function (c) { c.classList.toggle("on", c === el); });
      var grid = (cb || chips).nextElementSibling;
      if (grid && grid.classList.contains("grp-sub")) grid = grid.nextElementSibling;
      if (grid) {
        grid.classList.toggle("filtered", !!tag);
        [].forEach.call(grid.querySelectorAll(".ccard, .acard"), function (c) { c.classList.toggle("tag-h", !!tag && c.getAttribute("data-tag") !== tag); });
        var em = grid.nextElementSibling;
        if (em && em.classList.contains("cempty")) em.hidden = grid.querySelectorAll(".ccard:not(.tag-h)").length > 0;
      }
      return;
    }
    if (cs && (el = t.closest("[data-case]"))) {
      var d = el.parentNode.querySelector(".case-detail");
      var body = cs.querySelector(".cs-body");
      body.innerHTML = d.innerHTML;
      [].forEach.call(body.querySelectorAll(".dph"), function (p) { p.classList.add("ph"); });
      cs.hidden = false; document.body.classList.add("lb-open");
      return;
    }
    if (cs && !cs.hidden && (t === cs || (t.closest(".sheet-x") && cs.contains(t)))) {
      cs.hidden = true; document.body.classList.remove("lb-open");
      cs.querySelector(".cs-body").innerHTML = "";
    }
  });
  document.addEventListener("keydown", function (e) {
    var lb = document.getElementById("lb");
    if (e.key === "Escape" && cs && !cs.hidden && (!lb || lb.hidden)) {
      cs.hidden = true; document.body.classList.remove("lb-open");
      cs.querySelector(".cs-body").innerHTML = "";
    }
  });
})();

// تصویر حساس: تار تا وقتی بیننده «نمایش» را بزند
(function () {
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".sens-btn") : null;
    if (!b) return;
    var w = b.parentNode, ph = w.querySelector(".ph");
    w.classList.add("on");
    if (ph && ph.getAttribute("data-g")) ph.setAttribute("data-group", ph.getAttribute("data-g"));
    b.parentNode.removeChild(b);
  });
})();

// سرفصل‌های مقاله: رفتن به بخش مورد نظر (بدون تغییر آدرس صفحه)
(function () {
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".toc-b") : null;
    if (!b) return;
    var root = b.closest(".pg") || document;
    var t = root.querySelector('[id="' + b.getAttribute("data-scroll") + '"]');
    if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

// دسته‌بندی مقاله‌ها: گونه ← دسته ← مقاله‌ها
(function () {
  var sec = document.getElementById("articles-all");
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t.closest) return;
    var chip = t.closest(".grp-chips:not(.case-chips) .chip"), tile = t.closest("button.cat-tile"), back = t.closest(".back-cats");
    if (!chip && !tile && !back) return;
    var root = (chip || tile || back).closest("section") || document;
    var chips = root.querySelector(".grp-chips"), head = root.querySelector(".list-head"), list = root.querySelector(".agrid[data-list]");
    var panels = root.querySelectorAll(".cat-panel");
    function curGrp() { return chips.querySelector(".chip.on").getAttribute("data-grp"); }
    function homeList() { if (head.nextSibling !== list) head.parentNode.insertBefore(list, head.nextSibling); }
    function showPanel(g) {
      homeList();
      [].forEach.call(panels, function (p) { p.hidden = p.getAttribute("data-grp-panel") !== g; });
      head.hidden = true; list.hidden = true;
      [].forEach.call(root.querySelectorAll("button.cat-tile.open"), function (x) { x.classList.remove("open"); });
    }
    if (chip && chip.classList.contains("on")) {
      homeList();
      try { sessionStorage.removeItem("learnState"); } catch (err) {}
      chip.classList.remove("on");
      [].forEach.call(panels, function (p) { p.hidden = true; });
      head.hidden = true; list.hidden = true;
      return;
    }
    if (chip) {
      var gb = chips.closest(".grp-box"); if (gb) gb.classList.add("used");
      [].forEach.call(chips.querySelectorAll(".chip"), function (c) { c.classList.toggle("on", c === chip); });
      showPanel(chip.getAttribute("data-grp"));
      try { sessionStorage.setItem("learnState", JSON.stringify({ g: chip.getAttribute("data-grp") })); } catch (err) {}
    } else if (back) {
      showPanel(curGrp());
    } else if (tile) {
      var g = curGrp(), cat = tile.getAttribute("data-cat");
      var wasOpen = tile.classList.contains("open");
      [].forEach.call(root.querySelectorAll("button.cat-tile"), function (x) { x.classList.remove("open"); });
      head.hidden = true;
      if (wasOpen) { list.hidden = true; homeList(); try { sessionStorage.setItem("learnState", JSON.stringify({ g: g })); } catch (err) {} return; }
      tile.classList.add("open");
      [].forEach.call(list.querySelectorAll(".acard"), function (c) {
        var ok = c.getAttribute("data-group") === g && c.getAttribute("data-topic") === cat;
        c.classList.toggle("grp-h", !ok);
      });
      list.hidden = false;
      list.setAttribute("data-n", String(list.querySelectorAll(".acard:not(.grp-h)").length));
      tile.parentNode.insertBefore(list, tile.nextSibling);
      try { tile.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (err) {}
      try { sessionStorage.setItem("learnState", JSON.stringify({ g: g, c: cat })); } catch (err) {}
    }
  });
})();

// برگشت از مقاله: گونه و دسته‌ای که باز بود دوباره باز می‌شود
(function () {
  function go() {
    var sec = document.getElementById("articles-all"); if (!sec || !sec.querySelector(".grp-chips")) return;
    var st = null; try { st = JSON.parse(sessionStorage.getItem("learnState") || "null"); } catch (err) {}
    if (!st || !st.g) return;
    var chip = sec.querySelector('.grp-chips .chip[data-grp="' + st.g + '"]'); if (!chip || chip.classList.contains("on")) return;
    chip.click();
    if (st.c) { var t = sec.querySelector('.cat-panel:not([hidden]) button.cat-tile[data-cat="' + st.c + '"]'); if (t) t.click(); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go); else go();
  window.addEventListener("pageshow", function (e) { if (e.persisted) return; });
})();

// نوار عکس‌ها: کشیدن با موس (با انگشت خودش اسکرول می‌شود)
(function () {
  document.querySelectorAll("[data-strip]").forEach(function (el) {
    var down = false, sx = 0, ss = 0, moved = false;
    el.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; sx = e.clientX; ss = el.scrollLeft; el.classList.add("drag");
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = ss - dx;
    });
    window.addEventListener("pointerup", function () { if (!down) return; down = false; el.classList.remove("drag"); });
    el.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    el.addEventListener("dragstart", function (e) { e.preventDefault(); });
  });
})();

// هدیه به کوچولوها: اعلان کوچک ← پنجرهٔ چرخ
(function () {
  var root = document.querySelector("[data-gift]"); if (!root) return;
  document.body.appendChild(root); root.hidden = false;
  var toast = root.querySelector("[data-gift-toast]"), fab = root.querySelector("[data-gift-fab]"), modal = root.querySelector("[data-wheel-modal]");
  var box = root.querySelector("[data-wheel]"), rot = box.querySelector("[data-wheel-rot]"), btn = box.querySelector("[data-wheel-spin]"), res = box.querySelector("[data-wheel-res]");
  var SEGS = ["free", "d10", "consult", "d20", "retry", "d30"];
  var WEIGHTS = { free: 2, consult: 10, d10: 28, d20: 15, d30: 5, retry: 40 };
  var NAMES = { free: "ویزیت رایگان", consult: "مشاورهٔ آنلاین رایگان", d10: "۱۰٪ تخفیف ویزیت", d20: "۲۰٪ تخفیف ویزیت", d30: "۳۰٪ تخفیف ویزیت" };
  var KEY = "dm_wheel", DKEY = "dm_gift_dismiss", DAY = 86400000, VALID = 7 * DAY, SNOOZE = 7 * DAY, DELAY = 10000;
  var cur = 0, busy = false, timer = null;
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "null") || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function fa(n) { return String(n).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  function faDate(t) { try { return new Date(t).toLocaleDateString("fa-IR"); } catch (e) { return ""; } }
  function snoozed() { try { return Number(localStorage.getItem(DKEY) || 0) > Date.now(); } catch (e) { return false; } }
  function snooze() { try { localStorage.setItem(DKEY, String(Date.now() + SNOOZE)); } catch (e) {} }
  function pick(noRetry) {
    var ids = Object.keys(WEIGHTS).filter(function (k) { return !(noRetry && k === "retry"); });
    var sum = ids.reduce(function (a, k) { return a + WEIGHTS[k]; }, 0), r = Math.random() * sum;
    for (var i = 0; i < ids.length; i++) { r -= WEIGHTS[ids[i]]; if (r < 0) return ids[i]; }
    return ids[ids.length - 1];
  }
  function show(p) {
    res.hidden = false;
    if (p.id === "retry") { res.innerHTML = "<b>این بار نشد!</b><span>یک شانس دیگر دارید. دوباره بچرخانید.</span>"; return; }
    var html = "<b>تبریک! برندهٔ " + NAMES[p.id] + " شدید 🎉</b><span>کد جایزه: <bdi class=\"wheel-code\">" + p.code + "</bdi> · اعتبار تا " + faDate(p.exp) + "</span>";
    if (INFO.whatsapp) {
      var t = "سلام دکتر مساوات، در «هدیه به کوچولوها» سایت برندهٔ «" + NAMES[p.id] + "» شدم. کد جایزه: " + p.code + " (اعتبار تا " + faDate(p.exp) + ").";
      html += '<a class="btn small" target="_blank" rel="noopener" href="https://wa.me/' + INFO.whatsapp + "?text=" + encodeURIComponent(t) + '">دریافت جایزه از واتساپ</a>';
    }
    res.innerHTML = html;
  }
  function lock(msg) { btn.disabled = true; btn.textContent = msg; }
  function openModal() {
    clearTimeout(timer); toast.hidden = true; fab.hidden = true; modal.hidden = false; document.documentElement.classList.add("gift-open");
    try { btn.focus({ preventScroll: true }); } catch (e) {}
  }
  function closeAll() {
    if (busy) return;
    modal.hidden = true; toast.hidden = true; fab.hidden = false; document.documentElement.classList.remove("gift-open"); snooze();
  }
  var st = load(), now = Date.now();
  if (st.prize && st.prize.exp > now && st.prize.id !== "retry") show(st.prize);
  var usedToday = st.day === today() && st.used && !st.retry;
  if (usedToday) lock("فردا دوباره بچرخانید");
  // اعلان خودکار فقط وقتی لازم است
  if (usedToday || snoozed()) fab.hidden = false;
  else timer = setTimeout(function () { if (modal.hidden) toast.hidden = false; }, DELAY);
  root.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-gift-open]") || t.closest("[data-gift-fab]")) return openModal();
    if (t.closest("[data-gift-dismiss]")) return closeAll();
    if (t === modal) return closeAll();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeAll(); });
  function devId() {
    try { var d = localStorage.getItem("dm_dev"); if (!d) { d = Math.random().toString(36).slice(2, 14) + Date.now().toString(36); localStorage.setItem("dm_dev", d); } return d; } catch (e) { return "x" + Date.now().toString(36); }
  }
  function spinTo(id, make, remote) {
    var idxs = []; SEGS.forEach(function (x, i) { if (x === id) idxs.push(i); });
    var seg = idxs[Math.floor(Math.random() * idxs.length)], center = (seg + 0.5) * (360 / SEGS.length);
    var jitter = (Math.random() - 0.5) * 24;
    cur = cur + 360 * 6 + ((360 - ((cur + center + jitter) % 360)) % 360);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rot.style.transition = reduce ? "none" : "transform 4.6s cubic-bezier(.12,.6,.1,1)";
    rot.style.transform = "rotate(" + cur + "deg)";
    var done = function () {
      var prize = make();
      save({ day: today(), used: 1, retry: id === "retry" ? 1 : 0, prize: prize }); show(prize); busy = false;
      if (id === "retry") { btn.disabled = false; btn.textContent = "دوباره بچرخان"; } else lock("فردا دوباره بچرخانید");
    };
    if (reduce) done(); else setTimeout(done, 4800);
  }
  function localSpin(second) {
    var id = pick(second);
    spinTo(id, function () { return { id: id, code: "DL-" + fa(Math.floor(1000 + Math.random() * 9000)), exp: Date.now() + VALID }; });
  }
  function callApi(second) {
    var ctl = window.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 9000);
    return fetch(INFO.wheelApi + (INFO.wheelApi.indexOf("?") > -1 ? "&" : "?") + "action=spin&dev=" + encodeURIComponent(devId()), ctl ? { signal: ctl.signal } : {})
      .then(function (r) { clearTimeout(to); return r.json(); });
  }
  btn.addEventListener("click", function () {
    if (busy) return; var s = load();
    if (s.day === today() && s.used && !s.retry) return lock("فردا دوباره بچرخانید");
    var second = s.day === today() && s.used && s.retry;
    busy = true; btn.disabled = true; res.hidden = true;
    if (!INFO.wheelApi || !window.fetch) return localSpin(second);
    var label = btn.textContent; btn.textContent = "لحظه‌ای صبر کنید…";
    callApi(second).then(function (d) {
      btn.textContent = label;
      if (d && d.ok) return spinTo(d.id, function () { return { id: d.id, code: d.code, exp: d.exp }; });
      if (d && d.reason === "done") { busy = false; if (d.id && d.code) { save({ day: today(), used: 1, retry: 0, prize: { id: d.id, code: d.code, exp: d.exp } }); show({ id: d.id, code: d.code, exp: d.exp }); } return lock("فردا دوباره بچرخانید"); }
      if (d && d.reason === "busy") { busy = false; btn.disabled = false; res.hidden = false; res.innerHTML = "<b>امروز ظرفیت چرخ پر شد</b><span>فردا دوباره امتحان کنید.</span>"; return; }
      localSpin(second);
    }).catch(function () { btn.textContent = label; localSpin(second); });
  });
})();

// ابزارها: دکمه‌های انتخابی
document.addEventListener("click", function (e) {
  var b = e.target.closest ? e.target.closest(".seg button") : null; if (!b) return;
  [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle("on", x === b); });
});
function toolNum(s) {
  return parseFloat(String(s || "").replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); }).replace(/[٫,،]/g, "."));
}
function toolFa(n) { return String(n).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }).replace(".", "٫"); }

// ماشین‌حساب جیرهٔ غذایی
(function () {
  var root = document.querySelector("[data-diet]"); if (!root) return;
  var res = root.querySelector("[data-diet-res]"), ft = root.querySelector("#d-ft"), kcBox = root.querySelector("[data-kc]");
  function seg(name) { var b = root.querySelector('[data-seg="' + name + '"] .on'); return b ? b.getAttribute("data-v") : ""; }
  function v(id) { return root.querySelector("#" + id).value; }
  ft.addEventListener("change", function () { kcBox.hidden = ft.value !== "custom"; });
  root.querySelector("[data-diet-go]").addEventListener("click", function () {
    var sp = seg("sp"), neu = seg("neu") === "1", age = v("d-age"), act = v("d-act"), bc = v("d-bc"), w = toolNum(v("d-w"));
    res.hidden = false;
    if (!(w > 0)) { res.innerHTML = "<b>وزن را وارد کنید</b><span>وزن پت را به کیلوگرم بنویسید.</span>"; return; }
    var kc = ft.value === "custom" ? toolNum(v("d-kc")) : Number(ft.value);
    if (!(kc >= 30)) { res.innerHTML = "<b>انرژی غذا را وارد کنید</b><span>عدد کیلوکالری در ۱۰۰ گرم را از روی بستهٔ غذا بنویسید.</span>"; return; }
    var over = bc === "over" || bc === "obese";
    var bw = bc === "over" ? w * 0.9 : bc === "obese" ? w * 0.8 : w;
    var rer = bw < 2 ? 30 * bw + 70 : 70 * Math.pow(bw, 0.75), f;
    if (sp === "dog") f = age === "p4" ? 3.0 : age === "grow" ? 2.0 : age === "adult" ? (neu ? 1.6 : 1.8) : (neu ? 1.4 : 1.6);
    else f = age === "p4" ? 2.5 : age === "grow" ? 2.0 : age === "adult" ? (neu ? 1.2 : 1.4) : (neu ? 1.1 : 1.2);
    if (over) f = sp === "dog" ? 1.0 : 0.8;
    else if (age === "adult" || age === "senior") { if (act === "low") f *= 0.9; if (act === "high") f *= 1.15; }
    var kcal = rer * f; if (bc === "thin") kcal *= 1.1;
    var g = kcal / kc * 100, lo = g * 0.9, hi = g * 1.1;
    var meals = age === "p4" ? 4 : age === "grow" ? 3 : (sp === "dog" ? 2 : 3);
    var r = function (x) { return toolFa(Math.round(x / 5) * 5); };
    var notes = ["وزن پت را هر ۲ تا ۴ هفته بگیرید و اگر بالا یا پایین رفت، مقدار را حدود ۱۰٪ تنظیم کنید.", "اگر تنقلات می‌دهید، حدود ۱۰٪ انرژی روزانه را از غذای اصلی کم کنید."];
    if (over) notes.unshift("برای کاهش وزن، مقدار بر پایهٔ وزن هدف تقریبی حساب شد. وزن هدف و سرعت کاهش را با دکتر مشخص کنید؛ گرسنگی دادن، به‌ویژه به گربه، خطرناک است.");
    if (bc === "thin") notes.unshift("پت لاغر ابتدا باید معاینه شود تا بیماری پشت لاغری نباشد.");
    if (age === "p4") notes.unshift("تولهٔ زیر ۴ ماه را در ۳ تا ۴ وعده غذا بدهید و رشدش را کنترل کنید.");
    var perMeal = g / meals;
    res.innerHTML = '<span class="tr-k">مقدار تقریبی غذا در روز</span><b class="tr-n">حدود ' + r(g) + ' گرم</b><span>(بین ' + r(lo) + ' تا ' + r(hi) + ' گرم)</span>' +
      '<span>انرژی روزانه: حدود ' + toolFa(Math.round(kcal / 10) * 10) + ' کیلوکالری</span>' +
      '<span>پیشنهاد: ' + toolFa(meals) + ' وعده، هر وعده حدود ' + r(perMeal) + ' گرم</span>' +
      '<ul class="plain tr-notes">' + notes.map(function (n) { return "<li>" + n + "</li>"; }).join("") + "</ul>";
    if (INFO.whatsapp) {
      var t = "سلام دکتر مساوات، با ماشین‌حساب جیرهٔ سایت برای " + (sp === "dog" ? "سگ" : "گربه") + " " + toolFa(w) + " کیلویی حدود " + r(g) + " گرم غذا در روز درآمد. ممکن است نظرتان را بگویید؟";
      res.innerHTML += '<a class="btn small" target="_blank" rel="noopener" href="https://wa.me/' + INFO.whatsapp + "?text=" + encodeURIComponent(t) + '">پرسیدن از دکتر دربارهٔ این مقدار</a>';
    }
  });
})();

// دفترچهٔ سلامت پت
(function () {
  var root = document.querySelector("[data-hb]"); if (!root) return;
  // دکتر و مراجع حافظهٔ جدا دارند: پت‌هایی که دکتر در این مرورگر باز می‌کند روی صفحهٔ عمومی دفترچه دیده نمی‌شود
  try { if (window.navigator.standalone || (window.matchMedia && matchMedia("(display-mode: standalone)").matches)) document.documentElement.classList.add("hb-standalone"); } catch (e) {}
  var ISDRP = document.body.classList.contains("hb-drpage"), KEY = ISDRP ? "dm_hb_drdb" : "dm_hb", TMPKEY = "dm_hb_tmp";
  var MON = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  var PLACES = ["مرکز دامپزشکی ونک (دکتر مساوات)", "کلینیک ژیوان، تجریش", "کلینیک ژیوان، هروی", "تهران پت کلینیک، تهرانپارس", "ویزیت در منزل"];
  var DOG_VT = ["۴گانه سگ", "۵گانه سگ", "۶گانه سگ", "۷گانه سگ", "۸گانه سگ", "۹گانه سگ", "۱۰گانه سگ", "هاری", "بوردتلا (سرفهٔ کنل)", "لپتوسپیروز", "کرونا ویروس سگ"];
  var CAT_VT = ["۳گانه گربه", "۴گانه گربه", "هاری"];
  var CAT_VT_LEGACY = ["۳گانه گربه (FVRCP)", "۴گانه گربه", "لوسمی گربه (FeLV)", "هاری", "کلامیدیا گربه"];   // فقط برای سازگاری لینک‌های قدیمی
  var DOG_VB = ["Nobivac", "Vanguard", "Eurican", "Hexadog", "Duramune", "Recombitek", "Biocan", "Canigen", "Rabisin", "Defensor"];
  var CAT_VB = ["Nobivac Tricat", "Biofel", "Felocell", "Purevax", "Feligen", "Eurifel", "Rabisin", "Defensor"];
  var INT_B = ["Drontal", "Milbemax", "Panacur", "Caniverm", "Pyrantel (ژنریک)"];
  var EXT_B = ["Frontline", "Advantix", "Bravecto", "NexGard", "Simparica", "Revolution", "Seresto", "Broadline"];
  var WTIC = '<svg class="hb-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3.5" width="18" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 9.2a4 4 0 0 1 8 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 9.2l1.7-1.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><text x="12" y="17.2" text-anchor="middle" font-size="6" font-weight="700" fill="currentColor" font-family="sans-serif">kg</text></svg>';
  var DRUGS = ["Pimobendan", "Furosemide", "Enalapril", "Benazepril", "Spironolactone", "Amoxicillin", "Amoxicillin-Clavulanate", "Cephalexin", "Metronidazole", "Doxycycline", "Prednisolone", "Meloxicam", "Omeprazole", "Famotidine", "Ondansetron", "Maropitant", "Gabapentin", "Levothyroxine"];
  var FREQ = ["روزی ۱ بار", "روزی ۲ بار", "روزی ۳ بار", "روزی ۴ بار", "یک روز در میان", "هفته‌ای یک بار", "در صورت نیاز"];
  var HOW = ["با غذا", "ناشتا", "نیم ساعت قبل از غذا", "بعد از غذا", "هر زمان"];
  var DUR = ["۳ روز", "۵ روز", "۷ روز", "۱۰ روز", "۱۴ روز", "۲۱ روز", "۱ ماه", "۳ ماه", "دائمی"];
  var DURD = { "۳ روز": 3, "۵ روز": 5, "۷ روز": 7, "۱۰ روز": 10, "۱۴ روز": 14, "۲۱ روز": 21, "۱ ماه": 30, "۳ ماه": 90 };
  function F(id, label, o) { o = o || {}; o.id = id; o.label = label; return o; }
  function bySp(d, c) { return function (sp) { return sp === "سگ" ? d : sp === "گربه" ? c : []; }; }
  function fx(l) { return function () { return l; }; }
  // هر نوع: فیلدهای مناسب خودش (req: الزامی)
  var CFG = {
    "واکسن": { ic: "💉", k: "vax", title: "واکسیناسیون", f: [F("name", "نوع واکسن", { sel: bySp(DOG_VT, CAT_VT), req: 1, ph: "نام یا نوع واکسن" }), F("brand", "برند واکسن", { sel: bySp(DOG_VB, CAT_VB), req: 1, ph: "نام برند" }), F("serial", "سریال‌نامبر (Lot / Batch)", { req: 1, ltr: 1, ph: "مثلاً A12345" })] },
    "ضدانگل داخلی": { ic: "🪱", k: "par", f: [F("name", "نوع دارو", { sel: fx(["قرص", "شربت یا سوسپانسیون", "قطرهٔ پشتی", "خمیر یا پودر", "تزریقی"]) }), F("brand", "برند", { sel: fx(INT_B), ph: "نام برند" }), F("serial", "سریال‌نامبر (Lot / Batch)", { ltr: 1, ph: "مثلاً A12345" }), F("extra", "دوز")] },
    "ضدانگل خارجی (کک و کنه)": { ic: "🛡️", k: "par", f: [F("name", "نوع محصول", { sel: fx(["قطرهٔ پشتی", "قرص", "اسپری", "قلاده", "شامپوی ضدانگل"]) }), F("brand", "برند", { sel: fx(EXT_B), ph: "نام برند" }), F("serial", "سریال‌نامبر (Lot / Batch)", { ltr: 1, ph: "مثلاً A12345" })] },
    "ویزیت": { ic: "🩺", k: "vis", f: [F("name", "دلیل مراجعه", { sel: fx(["معاینهٔ عمومی", "چکاپ سالانه", "بیماری یا مشکل", "کنترل بعد از درمان", "مشاورهٔ آنلاین", "ویزیت در منزل"]) }), F("place", "محل ویزیت", { sel: fx(PLACES), ph: "نام کلینیک یا دامپزشک" }), F("extra", "توضیح (علامت یا تشخیص)")] },
    "وزن": { ic: WTIC, k: "wt", weight: true, f: [F("extra", "توضیح")] },
    "دارو": { ic: "💊", k: "oth", noNext: true, dateLabel: "تاریخ شروع مصرف", f: [F("name", "نام دارو", { sel: fx(DRUGS), req: 1, ph: "نام دارو" }), F("extra", "دوز مصرف", { req: 1, ph: "مثلاً ۲.۵ mg یا ۱ قرص" }), F("freq", "دفعات مصرف", { sel: fx(FREQ), req: 1 }), F("how", "نحوه مصرف", { sel: fx(HOW) }), F("dur", "مدت مصرف", { sel: fx(DUR), req: 1 })] },
    "عقیم‌سازی": { ic: "✂️", k: "vis", f: [F("name", "نوع", { sel: fx(["عقیم‌سازی ماده", "اخته (نر)"]) }), F("place", "کلینیک یا جراح", { sel: fx(PLACES), ph: "نام کلینیک یا جراح" }), F("extra", "توضیح")] },
    "آزمایش": { ic: "🧪", k: "vis", f: [F("name", "نوع آزمایش", { sel: fx(["آزمایش خون", "آزمایش ادرار", "آزمایش مدفوع", "تست سریع", "سونوگرافی یا رادیوگرافی"]) }), F("extra", "نتیجه یا یادداشت")] },
    "سایر": { ic: "📝", k: "oth", f: [F("name", "عنوان", { req: 1 }), F("extra", "توضیح")] }
  };
  var ORDER = ["واکسن", "ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)", "ویزیت", "وزن", "دارو", "عقیم‌سازی", "آزمایش", "سایر"];
  function tl(t) { return (cfg(t).title || t).replace(" (کک و کنه)", ""); }
  var qrLib = (function () { var qrcode=function(){var t=function(t,r){var e=t,n=c[r],o=null,a=0,u=null,i=[],f={},g=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(a=4*e+17),l(0,0),l(a-7,0),l(0,a-7),s(),h(),d(t,r),e>=7&&v(t),null==u&&(u=w(e,n,i)),p(u,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||a<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||a<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<a-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<a-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=A.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var a=t[r],u=t[n];if(null==o[a][u])for(var i=-2;i<=2;i+=1)for(var f=-2;f<=2;f+=1)o[a+i][u+f]=-2==i||2==i||-2==f||2==f||0==i&&0==f}},v=function(t){for(var r=A.getBCHTypeNumber(e),n=0;n<18;n+=1){var u=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+a-8-3]=u}for(n=0;n<18;n+=1){u=!t&&1==(r>>n&1);o[n%3+a-8-3][Math.floor(n/3)]=u}},d=function(t,r){for(var e=n<<3|r,u=A.getBCHTypeInfo(e),i=0;i<15;i+=1){var f=!t&&1==(u>>i&1);i<6?o[i][8]=f:i<8?o[i+1][8]=f:o[a-15+i][8]=f}for(i=0;i<15;i+=1){f=!t&&1==(u>>i&1);i<8?o[8][a-i-1]=f:i<9?o[8][15-i-1+1]=f:o[8][15-i-1]=f}o[a-8][8]=!t},p=function(t,r){for(var e=-1,n=a-1,u=7,i=0,f=A.getMaskFunction(r),g=a-1;g>0;g-=2)for(6==g&&(g-=1);;){for(var c=0;c<2;c+=1)if(null==o[n][g-c]){var l=!1;i<t.length&&(l=1==(t[i]>>>u&1)),f(n,g-c)&&(l=!l),o[n][g-c]=l,-1==(u-=1)&&(i+=1,u=7)}if((n+=e)<0||a<=n){n-=e,e=-e;break}}},w=function(t,r,e){for(var n=M.getRSBlocks(t,r),o=C(),a=0;a<e.length;a+=1){var u=e[a];o.put(u.getMode(),4),o.put(u.getLength(),A.getLengthInBits(u.getMode(),t)),u.write(o)}var i=0;for(a=0;a<n.length;a+=1)i+=n[a].dataCount;if(o.getLengthInBits()>8*i)throw"code length overflow. ("+o.getLengthInBits()+">"+8*i+")";for(o.getLengthInBits()+4<=8*i&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*i||(o.put(236,8),o.getLengthInBits()>=8*i));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,a=new Array(r.length),u=new Array(r.length),i=0;i<r.length;i+=1){var f=r[i].dataCount,g=r[i].totalCount-f;n=Math.max(n,f),o=Math.max(o,g),a[i]=new Array(f);for(var c=0;c<a[i].length;c+=1)a[i][c]=255&t.getBuffer()[c+e];e+=f;var l=A.getErrorCorrectPolynomial(g),h=b(a[i],l.getLength()-1).mod(l);for(u[i]=new Array(l.getLength()-1),c=0;c<u[i].length;c+=1){var s=c+h.getLength()-u[i].length;u[i][c]=s>=0?h.getAt(s):0}}var v=0;for(c=0;c<r.length;c+=1)v+=r[c].totalCount;var d=new Array(v),p=0;for(c=0;c<n;c+=1)for(i=0;i<r.length;i+=1)c<a[i].length&&(d[p]=a[i][c],p+=1);for(c=0;c<o;c+=1)for(i=0;i<r.length;i+=1)c<u[i].length&&(d[p]=u[i][c],p+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=L(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=D(t);break;case"Kanji":e=qrKanji(t);break;default:throw"mode:"+r}i.push(e),u=null},f.isDark=function(t,r){if(t<0||a<=t||r<0||a<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return a},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=M.getRSBlocks(t,n),o=C(),a=0;a<i.length;a++){var u=i[a];o.put(u.getMode(),4),o.put(u.getLength(),A.getLengthInBits(u.getMode(),t)),u.write(o)}var c=0;for(a=0;a<r.length;a++)c+=r[a].dataCount;if(o.getLengthInBits()<=8*c)break}e=t}g(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){g(!0,e);var n=A.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var a,u,i,g,c=f.getModuleCount()*t+2*r,l="";for(g="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+c+'px" height="'+c+'px"',l+=' viewBox="0 0 '+c+" "+c+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+k([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+k(n.id)+'">'+k(n.text)+"</title>":"",l+=e.text?'<description id="'+k(e.id)+'">'+k(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',u=0;u<f.getModuleCount();u+=1)for(i=u*t+r,a=0;a<f.getModuleCount();a+=1)f.isDark(u,a)&&(l+="M"+(a*t+r)+","+i+g);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return createDataURL(e,e,function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var a=Math.floor((r-n)/t),u=Math.floor((e-n)/t);return f.isDark(u,a)?0:1}return 1})},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=k(e),o+='"'),o+="/>"};var k=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,a,u=1*f.getModuleCount()+2*t,i=t,g=u-t,c={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<u;r+=2){for(n=Math.floor((r-i)/1),o=Math.floor((r+1-i)/1),e=0;e<u;e+=1)a="█",i<=e&&e<g&&i<=r&&r<g&&f.isDark(n,Math.floor((e-i)/1))&&(a=" "),i<=e&&e<g&&i<=r+1&&r+1<g&&f.isDark(o,Math.floor((e-i)/1))?a+=" ":a+="█",h+=t<1&&r+1>=g?l[a]:c[a];h+="\n"}return u%2&&t>0?h.substring(0,h.length-u-1)+Array(u+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,a,u=f.getModuleCount()*t+2*r,i=r,g=u-r,c=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<u;e+=1){for(o=Math.floor((e-i)/t),s="",n=0;n<u;n+=1)a=1,i<=n&&n<g&&i<=e&&e<g&&f.isDark(o,Math.floor((n-i)/t))&&(a=0),s+=a?c:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=base64DecodeInputStream(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,a={};;){var u=e.read();if(-1==u)break;var i=n(),f=n()<<8|n();a[String.fromCharCode(u<<8|i)]=f,o+=1}if(o!=r)throw o+" != "+r;return a}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var a=t.charCodeAt(o);if(a<128)r.push(a);else{var u=e[t.charAt(o)];"number"==typeof u?(255&u)==u?r.push(u):(r.push(u>>>8),r.push(255&u)):r.push(n)}}return r}};var r,e,n,o,a,u=1,i=2,f=4,g=8,c={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,p=5,w=6,k=7,A=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,a=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;a(r)-a(e)>=0;)r^=e<<a(r)-a(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;a(r)-a(n)>=0;)r^=n<<a(r)-a(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case p:return function(t,r){return t*r%2+t*r%3==0};case w:return function(t,r){return(t*r%2+t*r%3)%2==0};case k:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=b([1],0),e=0;e<t;e+=1)r=r.multiply(b([1,y.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case u:return 10;case i:return 9;case f:case g:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case u:return 12;case i:return 11;case f:return 16;case g:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case u:return 14;case i:return 13;case f:return 16;case g:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var a=0,u=t.isDark(n,o),i=-1;i<=1;i+=1)if(!(n+i<0||r<=n+i))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==i&&0==f||u==t.isDark(n+i,o+f)&&(a+=1);a>5&&(e+=3+a-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var g=0;t.isDark(n,o)&&(g+=1),t.isDark(n+1,o)&&(g+=1),t.isDark(n,o+1)&&(g+=1),t.isDark(n+1,o+1)&&(g+=1),0!=g&&4!=g||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var c=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(c+=1);return e+=Math.abs(100*c/r/r-50)/5*10},o),y=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function b(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=y.gexp(y.glog(n.getAt(e))+y.glog(t.getAt(o)));return b(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=y.glog(n.getAt(0))-y.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=y.gexp(y.glog(t.getAt(o))+r);return b(e,0).mod(t)}};return n}var M=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case c.L:return t[4*(r-1)+0];case c.M:return t[4*(r-1)+1];case c.Q:return t[4*(r-1)+2];case c.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var a=o.length/3,u=[],i=0;i<a;i+=1)for(var f=o[3*i+0],g=o[3*i+1],l=o[3*i+2],h=0;h<f;h+=1)u.push(r(g,l));return u},e}(),C=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},L=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+a(t.charAt(e));return r},a=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=i,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},D=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o};return t}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)};; return qrcode; })();
  qrLib.stringToBytes = qrLib.stringToBytesFuncs["UTF-8"];
  var STAT = ["واکسن", "ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)", "ویزیت"];
  var TABS = [["به تفکیک نوع", null], ["واکسن", ["واکسن"]], ["ضدانگل", ["ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)"]], ["ویزیت", ["ویزیت"]], ["آزمایش", ["آزمایش"]], ["عقیم‌سازی", ["عقیم‌سازی"]], ["دارو", ["دارو"]], ["وزن", ["وزن"]], ["سایر", ["سایر"]]];
  var SPEN = { "سگ": "Dog", "گربه": "Cat", "پرنده": "Bird", "دیگر": "Other" };
  var BRE = [["ژرمن شپرد", "German Shepherd"], ["گلدن", "Golden Retriever"], ["لابرادور", "Labrador Retriever"], ["هاسکی", "Husky"], ["پاگ", "Pug"], ["پودل", "Poodle"], ["شیتزو", "Shih Tzu"], ["پامرانین", "Pomeranian"], ["اسپیتز", "Spitz"], ["چیواوا", "Chihuahua"], ["یورکشایر", "Yorkshire Terrier"], ["بولداگ", "Bulldog"], ["روتوایلر", "Rottweiler"], ["دوبرمن", "Doberman"], ["مالتیز", "Maltese"], ["کوکر", "Cocker Spaniel"], ["بیگل", "Beagle"], ["سامویید", "Samoyed"], ["تریر", "Terrier"], ["شیرازی", "Persian"], ["پرشین", "Persian"], ["هیمالیایی", "Himalayan"], ["اسکاتیش", "Scottish Fold"], ["بریتیش", "British Shorthair"], ["سیامی", "Siamese"], ["مین کون", "Maine Coon"], ["بنگال", "Bengal"], ["رگدال", "Ragdoll"], ["آنگورا", "Turkish Angora"], ["DSH", "Domestic Shorthair"], ["بومی", "Domestic Shorthair"], ["خیابانی", "Domestic Shorthair"], ["مخلوط", "Mixed"], ["خورشیدی", "Sun Conure"], ["کاسکو", "African Grey"], ["عروس هلندی", "Cockatiel"], ["مرغ عشق", "Lovebird"], ["مینا", "Myna"], ["قناری", "Canary"], ["فنچ", "Finch"], ["کاکادو", "Cockatoo"], ["ماکائو", "Macaw"]];
  function normFa(s) { return String(s || "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u200c\u200f]/g, "").replace(/\s+/g, " ").trim(); }
  var BR = {
    "سگ": [["ژرمن شپرد", "German Shepherd"], ["گلدن ریتریور", "Golden Retriever"], ["لابرادور", "Labrador Retriever"], ["هاسکی", "Husky"], ["پاگ", "Pug"], ["پودل", "Poodle"], ["شیتزو", "Shih Tzu"], ["پامرانین", "Pomeranian"], ["اسپیتز", "Spitz"], ["چیواوا", "Chihuahua"], ["یورکشایر", "Yorkshire Terrier"], ["بولداگ", "Bulldog"], ["روتوایلر", "Rottweiler"], ["دوبرمن", "Doberman"], ["مالتیز", "Maltese"], ["کوکر اسپانیل", "Cocker Spaniel"], ["بیگل", "Beagle"], ["سامویید", "Samoyed"], ["تریر", "Terrier"], ["مخلوط", "Mixed Breed"]],
    "گربه": [["شیرازی (پرشین)", "Persian"], ["هیمالیایی", "Himalayan"], ["اسکاتیش فولد", "Scottish Fold"], ["بریتیش شورت‌هر", "British Shorthair"], ["سیامی", "Siamese"], ["مین‌کون", "Maine Coon"], ["بنگال", "Bengal"], ["رگدال", "Ragdoll"], ["آنگورا", "Turkish Angora"], ["DSH (بومی خانگی)", "Domestic Shorthair"], ["مخلوط", "Mixed Breed"]],
    "پرنده": [["طوطی خورشیدی", "Sun Conure"], ["کاسکو (خاکستری آفریقایی)", "African Grey"], ["عروس هلندی", "Cockatiel"], ["مرغ عشق", "Lovebird"], ["مینا", "Myna"], ["قناری", "Canary"], ["فنچ", "Finch"], ["کاکادو", "Cockatoo"], ["ماکائو", "Macaw"]],
    "دیگر": []
  };
  function breedEn(s) { var n0 = normFa(s), k, i; for (k in BR) for (i = 0; i < BR[k].length; i++) if (normFa(BR[k][i][0]) === n0) return BR[k][i][1]; return breedEn0(s); }
  function breedEn0(s) { var n = normFa(s); if (!n) return ""; for (var i = 0; i < BRE.length; i++) if (n.indexOf(normFa(BRE[i][0])) > -1) return BRE[i][1]; return ""; }
  var SPE = { "سگ": "🐶", "گربه": "🐱", "پرنده": "🐦", "دیگر": "🐾" };
  var curType = "واکسن", curTab = 0, xTouched = false, editId = null, showAll = false, asc = false, JD = {};
  function q(s) { return root.querySelector(s) || (/drbar|drbadge|drbtn|clock/.test(s) ? document.querySelector(s) : null); }
  document.addEventListener("click", function (e) { var hb = e.target.closest && e.target.closest(".hb-staffhdr [data-hb-drbtn]"); if (hb) { var gb = root.querySelector("[data-hb-drgate] [data-hb-drbtn]"); if (gb) gb.click(); } });
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  // حریم خصوصی: صفحهٔ دکتر فقط در sessionStorage (تا بستن تب) نگه می‌دارد؛ در صفحهٔ عمومی، پت‌های «نمایش موقت» هم فقط تا بستن تب می‌مانند
  function readStore(st, key) { try { var d = JSON.parse(st.getItem(key) || "null"); if (d && d.pets && d.recs) return d; } catch (e) {} return null; }
  function load() {
    if (ISDRP) {
      var s = readStore(sessionStorage, KEY);
      if (!s) {   // بار اول بعد از این به‌روزرسانی: کپی‌های قدیمی پاک می‌شوند و فقط پت‌های ذخیره‌نشده روی سرور نگه داشته می‌شوند
        var lg = readStore(localStorage, "dm_hb_drdb") || readStore(localStorage, "dm_hb"); s = { pets: [], recs: [], cur: null, mem: {} };
        if (lg) { s.pets = lg.pets.filter(function (p) { return !(p.srv && p.srv.code); }); s.recs = lg.recs.filter(function (r) { return s.pets.some(function (p) { return p.id === r.pet; }); }); s.mem = lg.mem || {}; s.cur = s.pets[0] ? s.pets[0].id : null; }
        try { localStorage.removeItem("dm_hb_drdb"); localStorage.removeItem("dm_hb"); } catch (e) {}
      }
      s.pets.forEach(function (p) { p.tmp = 1; }); return s;
    }
    var d = readStore(localStorage, KEY) || { pets: [], recs: [], cur: null }, t = readStore(sessionStorage, TMPKEY);
    if (t) { t.pets.forEach(function (p) { p.tmp = 1; d.pets.push(p); }); d.recs = d.recs.concat(t.recs); if (!d.cur) d.cur = t.cur; }
    return d;
  }
  var db = load();
  function save() {
    try {
      if (ISDRP) { sessionStorage.setItem(KEY, JSON.stringify(db)); return; }
      var tids = {}; db.pets.forEach(function (p) { if (p.tmp) tids[p.id] = 1; });
      localStorage.setItem(KEY, JSON.stringify({ pets: db.pets.filter(function (p) { return !p.tmp; }), recs: db.recs.filter(function (r) { return !tids[r.pet]; }), cur: tids[db.cur] ? null : db.cur, mem: db.mem }));
      sessionStorage.setItem(TMPKEY, JSON.stringify({ pets: db.pets.filter(function (p) { return p.tmp; }), recs: db.recs.filter(function (r) { return tids[r.pet]; }), cur: tids[db.cur] ? db.cur : null }));
    } catch (e) { alert("ذخیره‌سازی در این مرورگر ممکن نیست."); }
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function ymd(d) { var p = function (n) { return (n < 10 ? "0" : "") + n; }; return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); }
  function utc(s) { var a = s.split("-"); return Date.UTC(+a[0], +a[1] - 1, +a[2], 12); }
  function iso(ms) { var d = new Date(ms); var p = function (n) { return (n < 10 ? "0" : "") + n; }; return d.getUTCFullYear() + "-" + p(d.getUTCMonth() + 1) + "-" + p(d.getUTCDate()); }
  function fd(s) { try { return new Date(utc(s)).toLocaleDateString("fa-IR", { timeZone: "UTC" }); } catch (e) { return s; } }
  function days(s) { return Math.round((utc(s) - utc(ymd(new Date()))) / 86400000); }
  // ---- تقویم شمسی با Intl ----
  var PF = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", { timeZone: "UTC", year: "numeric", month: "numeric", day: "numeric" });
  function g2j(s) { var o = {}; PF.formatToParts(new Date(utc(s))).forEach(function (p) { if (p.type === "year" || p.type === "month" || p.type === "day" || p.type === "relatedYear") o[p.type] = parseInt(p.value, 10); }); return [o.relatedYear || o.year, o.month, o.day]; }
  var F1 = {};
  function farv1(jy) { if (F1[jy]) return F1[jy]; var base = Date.UTC(jy + 621, 2, 17, 12); for (var k = 0; k < 8; k++) { var t = base + k * 86400000, j = g2j(iso(t)); if (j[0] === jy && j[1] === 1 && j[2] === 1) return (F1[jy] = t); } return (F1[jy] = Date.UTC(jy + 621, 2, 21, 12)); }
  function jLen(jy, jm) { return jm <= 6 ? 31 : jm <= 11 ? 30 : (farv1(jy + 1) - farv1(jy)) / 86400000 === 366 ? 30 : 29; }
  function j2g(jy, jm, jd) { return iso(farv1(jy) + ((jm <= 7 ? (jm - 1) * 31 : 186 + (jm - 7) * 30) + jd - 1) * 86400000); }
  function jToday() { return g2j(ymd(new Date())); }
  function addMonths(s, n) { var j = g2j(s || ymd(new Date())), m = j[1] - 1 + n, y = j[0] + Math.floor(m / 12); m = ((m % 12) + 12) % 12 + 1; return j2g(y, m, Math.min(j[2], jLen(y, m))); }
  function addDays(s, n) { return iso(utc(s || ymd(new Date())) + n * 86400000); }
  // ---- ورودی تاریخ شمسی ----
  function initJd(el, o) {
    o = o || {}; var cy = jToday()[0], y0 = o.minY != null ? cy + o.minY : cy - 3, y1 = cy + (o.maxY != null ? o.maxY : 5);
    var opt = o.optional ? '<option value="">—</option>' : "";
    var ys = opt, ms = opt;
    for (var y = y1; y >= y0; y--) ys += '<option value="' + y + '">' + toolFa(y) + "</option>";
    for (var m = 1; m <= 12; m++) ms += '<option value="' + m + '">' + MON[m - 1] + "</option>";
    el.innerHTML = '<select data-d aria-label="روز"></select><select data-m aria-label="ماه">' + ms + '</select><select data-y aria-label="سال">' + ys + "</select>";
    var sy = el.querySelector("[data-y]"), sm = el.querySelector("[data-m]"), sd = el.querySelector("[data-d]");
    function days_() { var y = +sy.value, m = +sm.value, cur = sd.value, n = y && m ? jLen(y, m) : 31, h = o.optional ? '<option value="">—</option>' : ""; for (var d = 1; d <= n; d++) h += '<option value="' + d + '">' + toolFa(d) + "</option>"; sd.innerHTML = h; if (cur && +cur <= n) sd.value = cur; }
    sy.addEventListener("change", days_); sm.addEventListener("change", days_); days_();
    var api = {
      get: function () { return sy.value && sm.value && sd.value ? j2g(+sy.value, +sm.value, +sd.value) : ""; },
      set: function (s) { if (!s) { sy.value = ""; sm.value = ""; days_(); sd.value = ""; return; } var j = g2j(s); sy.value = j[0]; sm.value = j[1]; days_(); sd.value = j[2]; },
      on: function (fn) { [sy, sm, sd].forEach(function (x) { x.addEventListener("change", fn); }); }
    };
    return api;
  }
  function curPet() { return db.pets.filter(function (p) { return p.id === db.cur; })[0] || db.pets[0]; }
  function dl(name, text, type) { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: type })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  function when(n) {
    if (n === 0) return "امروز"; if (n > 0) return toolFa(n) + " روز دیگر";
    var a = -n; if (a < 60) return toolFa(a) + " روز گذشته";
    var y = Math.floor(a / 365), m = Math.round((a % 365) / 30); if (m === 12) { y++; m = 0; }
    return (y ? toolFa(y) + " سال" : "") + (y && m ? " و " : "") + (m ? toolFa(m) + " ماه" : "") + " گذشته";
  }
  function cfg(t) { return CFG[t] || CFG["سایر"]; }
  function ageText(b) {
    if (!b) return ""; var d = -days(b); if (d < 0) return "";
    if (d < 60) return toolFa(Math.max(1, Math.round(d / 7))) + " هفته";
    var m = Math.floor(d / 30.4); if (m < 24) return toolFa(m) + " ماه";
    var y = Math.floor(m / 12), r = m % 12; return toolFa(y) + " سال" + (r ? " و " + toolFa(r) + " ماه" : "");
  }
  function suggest(type, dateStr, pet) {
    var young = false; if (pet && pet.birth) { var ad = Math.round((utc(dateStr) - utc(pet.birth)) / 86400000); young = ad >= 0 && ad < 112; }
    var sp = pet ? pet.species : "";
    if (type === "واکسن") { if (sp === "پرنده" || sp === "دیگر") return null; return young ? { d: 28, t: "۴ هفته بعد (دوز بعدی در دورهٔ توله یا بچه‌گربه)" } : { d: 365, t: "۱ سال بعد (یادآور سالانه)" }; }
    if (type === "ضدانگل داخلی") return young ? { d: 30, t: "۱ ماه بعد" } : { d: 90, t: "۳ ماه بعد" };
    if (type === "ضدانگل خارجی (کک و کنه)") return { d: 30, t: "۱ ماه بعد" };
    if (type === "وزن") return { d: 21, t: "۳ هفته بعد", manual: true };
    if (type === "عقیم‌سازی") return { d: 14, t: "۲ هفته بعد (کنترل زخم)" };
    return null;
  }
  // ---- برنامهٔ واکسن توله و بچه‌گربه ----
  function buildPlan(pet) {
    var dog = pet.species === "سگ", out = [], b = pet.birth; if (!b || (!dog && pet.species !== "گربه")) return out;
    var vac = dog ? [[8, "چندگانه سگ، نوبت اول"], [12, "چندگانه سگ، نوبت دوم"], [16, "چندگانه سگ، نوبت سوم"], [16, "هاری"], [52, "یادآور سالانه (چندگانه و هاری)"]]
      : [[8, "سه‌گانه گربه، نوبت اول"], [12, "سه‌گانه گربه، نوبت دوم"], [16, "سه‌گانه گربه، نوبت سوم"], [16, "هاری"], [52, "یادآور سالانه (سه‌گانه و هاری)"]];
    vac.forEach(function (v) { out.push({ id: uid(), type: "واکسن", label: v[1], date: addDays(b, v[0] * 7), done: false }); });
    [2, 4, 6, 8, 12, 16, 20, 24].forEach(function (w) { out.push({ id: uid(), type: "ضدانگل داخلی", label: "ضدانگل داخلی (دوره‌ای)", date: addDays(b, w * 7), done: false }); });
    var lim = addDays(ymd(new Date()), -14);
    return out.filter(function (x) { return x.date >= lim; });
  }
  function avatar(p, cls) { return p.photo ? '<img class="' + cls + '" src="' + p.photo + '" alt="' + esc(p.name) + '">' : '<span class="' + cls + '">' + (SPE[p.species] || "🐾") + "</span>"; }
  var GM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function enDate(s) { var p = s.split("-"); return +p[2] + " " + GM[+p[1] - 1] + " " + p[0]; }
  function fl(s) { var j = g2j(s); return j[0] + "/" + j[1] + "/" + j[2]; }
  function qrText(cp) {
    function last(t, n) { return db.recs.filter(function (r) { return r.pet === cp.id && r.type === t; }).sort(function (x, y) { return x.date < y.date ? 1 : -1; }).slice(0, n); }
    function line(r) { return "- " + [r.brand, r.name || tl(r.type)].filter(Boolean).join(" · ") + (r.serial ? " Lot:" + r.serial : "") + (r.extra && !r.serial ? " (" + String(r.extra).slice(0, 24) + ")" : "") + ": " + fl(r.date) + " / " + r.date; }
    function nextOf(t) { var n = allRem().filter(function (r) { return r.pet === cp.id && r.type === t; })[0]; return n ? n.date : ""; }
    var lw = last("وزن", 1)[0], be = cp.breedEn || breedEn(cp.breed), o = [];
    o.push("HEALTH RECORD | شناسنامه سلامت" + (srvOf(cp) ? " | ID " + cp.srv.code + (cp.srv.auth ? " | Auth " + cp.srv.auth : "") : ""), cp.name + (cp.en ? " / " + cp.en : "") + ((cp.owner || cp.guardian) ? " | Guardian/سرپرست: " + (cp.owner || cp.guardian) : "") + "", (SPEN[cp.species] || cp.species || "") + (cp.breed ? " | " + cp.breed + (be ? " / " + be : "") : ""));
    if (cp.birth) o.push("Birth/تولد: " + fl(cp.birth) + " (" + cp.birth + ")");
    if (lw) o.push("Weight/وزن: " + lw.weight + " kg (" + lw.date + ")");
    [["واکسن", "Vaccines/واکسن", 3], ["ضدانگل داخلی", "Deworming/ضدانگل داخلی", 2], ["ضدانگل خارجی (کک و کنه)", "Flea-tick/ضدانگل خارجی", 2]].forEach(function (x) {
      var rs = last(x[0], x[2]); if (!rs.length) return; o.push(x[1] + ":"); rs.forEach(function (r) { o.push(line(r)); });
      var nd = nextOf(x[0]); if (nd) o.push("  Next/بعدی: " + fl(nd) + " / " + nd);
    });
    var v = last("ویزیت", 1)[0]; if (v) { o.push("Last visit/آخرین ویزیت: " + fl(v.date) + " / " + v.date); var nv = nextOf("ویزیت"); if (nv) o.push("  Next/بعدی: " + fl(nv)); }
    o.push("Dr. Niloofar Mosavat DVM", "drniloofarmosavat.ir");
    return o.join("\n");
  }
  function qrSvg(text) {
    var q; for (var t = text; t.length > 60; t = t.slice(0, -40)) { try { q = qrLib(0, "L"); q.addData(t, "Byte"); q.make(); break; } catch (e) { q = null; } }
    if (!q) return ""; var n = q.getModuleCount(), d = "", r, c;
    for (r = 0; r < n; r++) for (c = 0; c < n; c++) if (q.isDark(r, c)) d += "M" + (c + 3) + " " + (r + 3) + "h1v1h-1z";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (n + 6) + " " + (n + 6) + '" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
  }
  // QR جلد: به صفحهٔ اصالت‌سنجی می‌رود (کدها محرمانه نیستند)؛ برای پتی که روی سرور نیست، همان خلاصهٔ متنی
  function coverQr(cp) {
    var sv = srvOf(cp);
    if (sv) { var u = qrFromText("https://drniloofarmosavat.ir/verify.html?c=" + encodeURIComponent(sv.code) + (sv.auth ? "&a=" + encodeURIComponent(sv.auth) : "")); if (u) return u; }
    return qrSvg(qrText(cp));
  }
  function renderCover(cp) {
    var lw = db.recs.filter(function (r) { return r.pet === cp.id && r.weight; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0], rows = [];
    var gname = cp.owner || cp.guardian;
    rows.push(["سرپرست / Guardian", gname ? esc(gname) : '<span class="nil">—</span>']);
    function enp(s) { return s ? ' <span class="en">' + esc(s) + "</span>" : ""; }
    if (cp.species) rows.push(["گونه / Species", esc(cp.species) + enp(SPEN[cp.species])]);
    rows.push(["جنسیت / Sex", cp.sex ? esc(cp.sex) + enp(cp.sex === "نر" ? "Male" : "Female") : "نامشخص" + enp("Unknown")]);
    rows.push(["عقیم‌سازی / Neutered", cp.neut ? esc(cp.neut) + enp(cp.neut === "عقیم‌شده" ? "Yes" : "No") : "نامشخص" + enp("Unknown")]);
    var be = cp.breedEn || breedEn(cp.breed);
    if (cp.breed) rows.push(["نژاد / Breed", esc(cp.breed) + enp(be)]);
    if (cp.birth) rows.push(["تولد / Birth", esc(fd(cp.birth)) + enp(enDate(cp.birth))]);
    if (cp.birth && ageText(cp.birth)) rows.push(["سن / Age", esc(ageText(cp.birth))]);
    if (lw) rows.push(["وزن / Weight", toolFa(lw.weight) + " کیلوگرم" + enp(lw.weight + " kg")]);
    q("[data-hb-cover]").innerHTML = '<button type="button" class="hb-qr" data-hb-qr aria-label="نمایش QR شناسنامه">' + coverQr(cp) + '</button><small class="hb-cv-t">شناسنامهٔ سلامت<br><i>Health Record</i></small><div class="hb-cv-ic"><button type="button" class="hb-cv-icb" data-hb-cover-photo aria-label="تغییر عکس پت">' + avatar(cp, "hb-cv-img") + '<span class="hb-cam" aria-hidden="true">📷</span></button></div><b>' + esc(cp.name) + "</b>" + (cp.en ? '<span class="hb-cv-en" dir="ltr">' + esc(cp.en) + "</span>" : "") + (rows.length ? '<dl class="hb-id">' + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") + "</dl>" : "");
  }
  // همهٔ یادآوری‌ها: نوبت‌های بعدی + برنامهٔ واکسن
  function allRem() {
    var out = [];
    var pm = {}; db.pets.forEach(function (p) { pm[p.id] = p; });
    db.recs.forEach(function (r) { var lc = ((pm[r.pet] || {}).lc || {})[r.id]; if (r.next && !r.closed && !lc && r.type !== "وزن" && !db.recs.some(function (x) { return x.pet === r.pet && x.type === r.type && x.id !== r.id && x.date >= r.next; })) out.push({ id: r.id, kind: "rec", pet: r.pet, type: r.type, label: [r.brand ? "<bdi>" + esc(r.brand) + "</bdi>" : "", r.name ? esc(r.name) : ""].filter(Boolean).join(" · "), html: 1, date: r.next }); });
    db.pets.forEach(function (p) { (p.plan || []).forEach(function (x) { if (!x.done && !(p.lc || {})[x.id]) out.push({ id: x.id, kind: "plan", pet: p.id, type: x.type, label: x.label, date: x.date }); }); });
    return out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  }
  function render() {
    var pets = q("[data-hb-pets]"), main = q("[data-hb-main]"), pf = q("[data-hb-petform]");
    var noAcct = q("[data-hb-noacct]"), gate = q("[data-hb-drgate]");
    var dbar = q("[data-hb-drbar]"); if (dbar) dbar.hidden = false;   // نوار بالا همیشه دیده شود (دکمهٔ ورود/خروج)
    if (DRPAGE && srvOn() && !isDr()) { pets.innerHTML = ""; main.hidden = true; pf.hidden = true; if (noAcct) noAcct.hidden = true; if (gate) gate.hidden = false; document.documentElement.classList.remove("hb-has-pet"); return; }
    if (!db.pets.length) { var guest = srvOn() && !isDr(); pets.innerHTML = ""; main.hidden = true; pf.hidden = guest; if (noAcct) noAcct.hidden = !(guest && !DRPAGE); if (gate) gate.hidden = !(guest && DRPAGE); document.documentElement.classList.remove("hb-has-pet"); return; }
    if (noAcct) noAcct.hidden = true; if (gate) gate.hidden = true;
    var cp = curPet(); db.cur = cp.id;
    var hideOthers = linkPetId && !showOthers && !isDr() && db.pets.length > 1 && db.pets.some(function (x) { return x.id === linkPetId; });
    pets.innerHTML = (hideOthers ? db.pets.filter(function (p) { return p.id === linkPetId; }) : db.pets).map(function (p) { return '<button type="button" class="chip' + (p.id === cp.id ? " on" : "") + '" data-hb-pet="' + p.id + '">' + avatar(p, "hb-mini") + " " + esc(p.name) + "</button>"; }).join("") + (hideOthers ? '<button type="button" class="chip hb-others" data-hb-others>پت‌های دیگر من (' + toolFa(db.pets.length - 1) + ")</button>" : "") + (srvOn() && !isDr() ? "" : '<button type="button" class="chip" data-hb-newpet>＋ پت جدید</button>');
    main.hidden = !pf.hidden; if (!pf.hidden) return;
    var smb = q("[data-hb-smsbadge]"); if (smb) { smb.hidden = !isDr(); smb.className = "hb-smsbadge " + (cp.smsok ? "on" : "off"); smb.textContent = cp.smsok ? "📩 پیامک یادآور واکسن و ضدانگل: روشن ✅" : "📩 پیامک یادآور: خاموش (برای روشن‌کردن: ویرایش پت ← تیک رضایت)"; }
    renderCover(cp); var dcl = q("[data-hb-drcall]"); if (dcl) { var dnm = cp.owner || cp.guardian || "", dph = isDr() ? cp.phone || "" : ""; dcl.hidden = !(isDr() && (dnm || dph)); dcl.innerHTML = isDr() ? "<span>👤 سرپرست: <b>" + (dnm ? esc(dnm) : "—") + "</b></span>" + (dph ? '<a class="hb-call" dir="ltr" href="tel:' + esc(dph) + '">📞 ' + esc(dph) + "</a>" : "<small>شماره ثبت نشده</small>") : ""; } var tn = q("[data-hb-tmpnote]"); if (tn) tn.hidden = !(cp.tmp && !ISDRP);
    // کارت برنامهٔ واکسن
    var pl = q("[data-hb-plan]"), young = cp.birth && (cp.species === "سگ" || cp.species === "گربه") && -days(cp.birth) < 400, hasPlan = (cp.plan || []).length;
    if (young && !hasPlan) pl.innerHTML = '<div class="hb-plan-c"><b>برنامهٔ واکسن ' + (cp.species === "سگ" ? "توله‌سگ" : "بچه‌گربه") + "</b><p>با زدن دکمهٔ زیر، تاریخ نوبت‌های واکسن و ضدانگل بر اساس تاریخ تولد حساب می‌شود و به «یادآوری‌ها» اضافه می‌شود. تاریخ‌ها تقریبی‌اند و طبق نظر دامپزشک تنظیم کنید.</p><button type=\"button\" class=\"btn small primary\" data-hb-mkplan>📅 ساخت برنامهٔ واکسن و ضدانگل</button><details class=\"hb-det\"><summary>برنامه شامل چه چیزی است؟</summary><p>واکسن در هفتهٔ ۸، ۱۲ و ۱۶ (" + (cp.species === "سگ" ? "چندگانه سگ" : "سه‌گانه گربه") + ")، هاری در هفتهٔ ۱۶ و یادآور سالانه؛ ضدانگل داخلی در هفته‌های ۲، ۴، ۶، ۸، ۱۲، ۱۶، ۲۰ و ۲۴. بعد از ساخت، هر نوبت با «انجام شد» در دفترچه ثبت می‌شود و می‌توانید آن را به تقویم گوشی اضافه کنید. هر زمان خواستید «حذف برنامه» را بزنید.</p></details></div>";
    else if (!cp.birth && (cp.species === "سگ" || cp.species === "گربه")) pl.innerHTML = '<div class="hb-plan-c"><b>برنامهٔ واکسن توله و بچه‌گربه</b><p>با نوشتن تاریخ تولد، برنامهٔ پیشنهادی ساخته می‌شود.</p><button type="button" class="btn small" data-hb-edit-pet>نوشتن تاریخ تولد</button></div>';
    else pl.innerHTML = hasPlan ? '<div class="hb-plan-c ok"><span>برنامهٔ واکسن ' + (cp.species === "سگ" ? "توله‌سگ" : "بچه‌گربه") + ' فعال است.</span><button type="button" class="hb-lnk" data-hb-delplan>حذف برنامه</button></div>' : "";
    if (srvOn() && !isDr()) pl.innerHTML = "";
    var cpRem = allRem().filter(function (r) { return r.pet === cp.id; }), rl = "", skipV = cp.species === "پرنده" || cp.species === "دیگر", extra = 0;
    STAT.forEach(function (t) {
      if (t === "واکسن" && skipV) return;
      var k = cfg(t), items = cpRem.filter(function (r) { return r.type === t; }), seen = {}, shown = [];
      items.forEach(function (r) { var sk = r.kind === "rec" ? r.label : "plan"; if (showAll || !seen[sk]) { seen[sk] = 1; shown.push(r); } });
      extra += items.length - shown.length;
      if (!shown.length) {
        var had = db.recs.some(function (r) { return r.pet === cp.id && r.type === t; });
        rl += '<div class="hb-r none" data-hb-goto="' + esc(t) + '"><span class="hb-r-ic">' + k.ic + '</span><div class="hb-r-t"><b>' + esc(tl(t)) + (had ? ": نوبت بعدی تعیین نشده" : (locked(t) && t === "ویزیت" ? ": توسط دکتر ثبت می‌شود" : " ثبت نشده")) + "</b></div></div>";
        return;
      }
      shown.forEach(function (r) {
        var n = days(r.date);
        rl += '<div class="hb-r' + (n < 0 ? " late" : n <= 7 ? " soon" : "") + '" data-hb-goto="' + esc(r.type) + '"><span class="hb-r-ic">' + k.ic + '</span><div class="hb-r-t"><b>' + esc(r.type === "واکسن" ? "واکسن" : tl(r.type)) + (r.label ? " · " + (r.html ? r.label : esc(r.label)) : "") + "</b><small>" + fd(r.date) + (n <= 30 ? " · " + (n < 0 ? toolFa(-n) + " روز گذشته" : n === 0 ? "امروز" : toolFa(n) + " روز") : "") + '</small></div><span class="hb-r-b"><button type="button" data-hb-ics="' + r.kind + ":" + r.id + '" title="افزودن به تقویم" aria-label="افزودن به تقویم">📅</button>' + (locked(r.type) ? "" : '<button type="button" data-hb-done="' + r.kind + ":" + r.id + '" title="انجام شد" aria-label="انجام شد">✔</button>') + "</span></div>";
      });
    });
    q("[data-hb-rem]").innerHTML = "<h3>🔔 یادآور</h3>" + rl + (extra > 0 || showAll ? '<div class="hb-more"><button type="button" class="hb-lnk" data-hb-more>' + (showAll ? "فقط نوبت بعدی هر مورد" : "برنامهٔ کامل نوبت‌ها") + "</button></div>" : "");
    renderPages(cp);
    document.documentElement.classList.add("hb-has-pet");
    document.documentElement.classList.toggle("hb-need-srv", srvOn() && !srvOf(cp));
  }
  var OWNER_LOCKED = ["واکسن", "ویزیت", "آزمایش", "عقیم‌سازی", "دارو", "سایر"];   // انواعی که فقط دکتر ثبت می‌کند
  var DR_SALT = "GnOd3U5koVp1Ozi8RTcLbA==", DR_HASH = "b4Ba9BSekt9YN0YQ3iruqAzem9RYjTbLV4PClSZjdFs=";
  function srvOn() { return !!INFO.sheetApi && !!window.fetch; }
  // خواندنی‌ها: اگر ارتباط با گوگل لحظه‌ای قطع بود، یک بار دیگر خودکار امتحان می‌شود
  var API_RETRY = { patList: 1, apList: 1, todayList: 1, qList: 1, invList: 1, svcList: 1, lookup: 1, search: 1, get: 1, petReqList: 1, adoptAdmin: 1, drLogin: 1 };
  function api(body) { return api1(body).then(function (j) { return j && j.ok === false && j.err === "net" && API_RETRY[body.a] ? new Promise(function (r) { setTimeout(r, 1500); }).then(function () { return api1(body); }) : j; }); }
  function api1(body) {
    // آیپد/آیفون قدیمی (iOS ≤ ۱۴): اول روش «اسکریپت» (JSONP) که مثل باز کردن صفحه است؛ اگر نشد، روش معمول
    var enc = JSON.stringify(body);
    if (IOSMODE && enc.length < 6000) return jsonpApi(body, enc).then(function (j) { return j.ok === false && j.err === "net" ? fetchApi(body) : apiPost(j, body); });
    return fetchApi(body);
  }
  function apiPost(j, body) { if (j && j.ok === false && j.err === "auth" && body.t !== undefined && DRPAGE && localStorage.getItem("dm_hb_dr") === "1") drDrop("ورود شما از طرف سرور تأیید نشد؛ لطفاً دوباره وارد شوید."); return j; }
  var jpN = 0;
  function jsonpApi(body, enc) {
    return new Promise(function (res) {
      var cb = "__hbjp" + (++jpN) + "_" + Date.now(), sc = document.createElement("script"), done = false;
      var tm = setTimeout(function () { window.__apiErr = "jsonp timeout"; fin({ ok: false, err: "net" }); }, 20000);
      function fin(j) { if (done) return; done = true; clearTimeout(tm); window[cb] = function () {}; if (sc.parentNode) sc.parentNode.removeChild(sc); res(j || { ok: false, err: "net" }); }
      window[cb] = fin; sc.onerror = function () { window.__apiErr = "jsonp load error"; fin({ ok: false, err: "net" }); };
      sc.src = INFO.sheetApi + "?cb=" + cb + "&d=" + encodeURIComponent(enc); (document.head || document.body).appendChild(sc);
    });
  }
  function fetchApi(body) {
    var ctl = window.AbortController ? new AbortController() : null, tm = ctl ? setTimeout(function () { ctl.abort(); }, 40000) : 0;
    return fetch(INFO.sheetApi, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); }).then(function (j) { clearTimeout(tm); return apiPost(j, body); }).catch(function (e) { clearTimeout(tm); window.__apiErr = String((e && e.message) || e); return { ok: false, err: "net" }; });
  }
  function tokGet() { try { var o = JSON.parse(localStorage.getItem("dm_hb_tok") || "null"); return o && o.exp > Date.now() ? o.t : ""; } catch (e) { return ""; } }
  function tokSet(t) { try { if (t) localStorage.setItem("dm_hb_tok", JSON.stringify({ t: t, exp: (Number(String(t).split(".")[0]) || Date.now() + 3 * 86400000) - 60000 })); else localStorage.removeItem("dm_hb_tok"); } catch (e) {} }
  var DRPAGE = document.body.classList.contains("hb-drpage"), SECP = document.body.classList.contains("hb-secpage");
  var drListRun = null, pendingReq = "";
  function grpOf(v) { return { today: "clients", pt: "clients", list: "book", "new": "book", req: "book", code: "book", adopt: "more", svc: "more", rep: "more", appt: "clients" }[v]; }
  var lastView = "";
  function dview(v) { try { mkAct(""); } catch (e0) {} if (SECP && ["list", "new", "req", "code", "adopt", "pet"].indexOf(v) > -1) v = "today"; if (v !== "pet") lastView = v; root.removeAttribute("data-dcollapsed"); root.setAttribute("data-dview", v); try { syncBillMode(); } catch (e9) {} var _g = grpOf(v); if (_g) { root.setAttribute("data-grp", _g); [].forEach.call(root.querySelectorAll("[data-hb-grp]"), function (gb) { gb.classList.toggle("on", gb.getAttribute("data-hb-grp") === _g); }); } if (v === "today" && isDr() && srvOn() && todayBox()) todayLoad(); if (v === "appt" && isDr() && srvOn() && apBox()) apEnter(); if (v === "svc" && isDr() && srvOn()) svcEnter(); if (v === "rep" && isDr() && srvOn()) repEnter(); [].forEach.call(root.querySelectorAll("[data-hb-dtab]"), function (b) { b.classList.toggle("on", b.getAttribute("data-hb-dtab") === v); }); if (v === "list" && isDr() && srvOn() && drListRun) drListRun(); if (v === "adopt" && isDr() && srvOn()) adLoad(); if (v === "req" && isDr() && srvOn()) rqLoad(); if (v === "pt" && isDr() && srvOn() && ptBox() && !ptBox().hasAttribute("data-on")) { ptBox().setAttribute("data-on", "1"); ptEnter(); } if (v !== "pt" && ptBox()) ptBox().removeAttribute("data-on"); if (v === "list") tabCounts(); if (v !== "new" && v !== "pet") pendingReq = ""; }
  function purgeDrCache() { db.pets = db.pets.filter(function (p) { return !srvOf(p); }); db.recs = db.recs.filter(function (r) { return db.pets.some(function (p) { return p.id === r.pet; }); }); db.cur = db.pets[0] ? db.pets[0].id : null; save(); }
  function drDrop(msg) { try { localStorage.removeItem("dm_hb_dr"); } catch (e) {} purgeDrCache(); tokSet(""); setTimeout(function () { applyRole(); render(); toast(msg); }, 0); }
  function isDr() { if (!DRPAGE) return false; try { var f = localStorage.getItem("dm_hb_dr") === "1"; if (f && srvOn() && !tokGet()) { drDrop("مدت اعتبار ورود تمام شد؛ لطفاً دوباره وارد شوید."); return false; } return f; } catch (e) { return false; } }
  function srvOf(p) { return p && p.srv && p.srv.code ? p.srv : null; }
  function errMsg(e) { return e === "net" ? "ارتباط با سرور (گوگل) موقتاً برقرار نشد؛ چند لحظه بعد دوباره امتحان کنید." + (/[?&]debug=1/.test(location.search) ? " [" + (window.__apiErr || "?") + "]" : "") : e === "auth" ? "دسترسی مجاز نیست (دوباره وارد شوید یا لینک را بررسی کنید)." : e === "forbidden" ? "این مورد را فقط دکتر ثبت یا تغییر می‌دهد." : e === "locked" ? "ورود موقتاً قفل شد؛ چند دقیقه بعد دوباره تلاش کنید." : "خطای سرور؛ دوباره تلاش کنید."; }
  function setSeg(n, v) { [].forEach.call(q('[data-seg="' + n + '"]').children, function (b) { b.classList.toggle("on", b.getAttribute("data-v") === v); }); }
  function segVal(n) { var b = q('[data-seg="' + n + '"] .on'); return b ? b.getAttribute("data-v") : ""; }
  function toSrvPet(p) { return { code: p.srv && p.srv.code, name: p.name, en: p.en, owner: p.owner, guardian: p.guardian, sex: p.sex || "", neut: p.neut || "", phone: p.phone, smsok: p.smsok ? 1 : 0, species: p.species, breed: p.breed, breedEn: p.breedEn, birth: p.birth, plan: p.plan || [], consent: p.consent ? 1 : 0 }; }
  function toSrvRec(r) { var o = {}; ["id", "type", "date", "name", "brand", "serial", "place", "extra", "freq", "how", "dur", "end", "weight", "next", "closed", "src"].forEach(function (k) { if (r[k]) o[k] = r[k]; }); return o; }
  function normRec(r) { var o = {}; for (var k in r) o[k] = r[k]; o.dr = r.dr ? 1 : 0; o.closed = !!r.closed; return o; }
  function upsertSrv(sp, recs, key) {
    var p = db.pets.filter(function (x) { return (x.srv && x.srv.code === sp.code) || x.id === sp.code; })[0];
    if (!p) { p = { id: sp.code, plan: [] }; db.pets.push(p); }
    ["name", "en", "owner", "guardian", "sex", "neut", "species", "breed", "breedEn", "birth"].forEach(function (k) { p[k] = sp[k] || ""; });
    if (isDr() && sp.phone !== undefined) p.phone = sp.phone || ""; else delete p.phone;
    if (isDr() && sp.smsok !== undefined) p.smsok = !!sp.smsok; else delete p.smsok;
    p.plan = sp.plan || []; p.consent = !!sp.consent; p.srv = { code: sp.code, key: key || (p.srv && p.srv.key) || sp.key || "", auth: sp.auth || (p.srv && p.srv.auth) || "" };
    db.recs = db.recs.filter(function (r) { return r.pet !== p.id; }).concat((recs || []).map(function (r) { var o = normRec(r); o.pet = p.id; return o; }));
    return p;
  }
  var syncing = false;
  function syncCur() {
    var cp = curPet(); if (!cp || !srvOf(cp) || !srvOn() || syncing) return; syncing = true;
    var s = srvOf(cp), dr = isDr();
    api(dr ? { a: "get", t: tokGet(), code: s.code } : { a: "getOwner", code: s.code, key: s.key }).then(function (j) {
      syncing = false; if (!j.ok) return;
      var snap = function () { return JSON.stringify([db.pets.filter(function (x) { return x.id === cp.id; }), db.recs.filter(function (r) { return r.pet === cp.id; })]); }, before = snap();
      upsertSrv(j.pet, j.recs, s.key || j.pet.key);
      if (snap() !== before) { save(); render(); }
    });
  }
  function locked(t) { return !isDr() && OWNER_LOCKED.indexOf(t) > -1; }
  function toast(msg, ms) { var t = document.createElement("div"); t.className = "hb-toast" + (/^[✅📩]/.test(msg) ? " ok" : /^⚠/.test(msg) ? " warn" : ""); t.textContent = msg; t.style.top = (16 + document.querySelectorAll(".hb-toast").length * 58) + "px"; document.body.appendChild(t); ms = ms || (/^[✅📩⚠]/.test(msg) ? 5000 : 3200); setTimeout(function () { t.classList.add("off"); }, ms); setTimeout(function () { t.remove(); }, ms + 600); }
  var landed = false;
  function drLanding() { if (!DRPAGE) return; if (!isDr()) { landed = false; return; } if (landed) return; landed = true; if (srvOn() && todayBox()) dview("today"); }
  function applyRole() { document.documentElement.classList.toggle("hb-dr", isDr()); drLanding(); [].forEach.call(document.querySelectorAll("[data-hb-drbtn]"), function (b) { b.textContent = isDr() ? "خروج" : (SECP ? "ورود" : "ورود دکتر"); }); var bd = q("[data-hb-drbadge]"); if (bd) bd.hidden = !isDr(); if (!editId) { var nw = srvOn() && isDr(); q("[data-hb-pf-title]").textContent = nw ? "صدور شناسنامهٔ جدید" : "شناسنامهٔ پت"; q("[data-hb-save-pet]").textContent = nw ? "صدور شناسنامه" : "ذخیره"; } var nb = q("[data-hb-newbox]"); if (nb) nb.hidden = !(srvOn() && isDr()); var sb = q("[data-hb-searchbox]"); if (sb) sb.hidden = !(srvOn() && isDr()); var vb = q("[data-hb-verifybox]"); if (vb) vb.hidden = !(srvOn() && isDr()); }
  function checkDrPass(pw) {
    if (!window.crypto || !crypto.subtle) return Promise.resolve(false);
    var s = atob(DR_SALT), salt = new Uint8Array(s.length), i; for (i = 0; i < s.length; i++) salt[i] = s.charCodeAt(i);
    return crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveBits"]).then(function (k) { return crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" }, k, 256); }).then(function (bits) { return btoa(String.fromCharCode.apply(null, new Uint8Array(bits))) === DR_HASH; }).catch(function () { return false; });
  }
  var curPg = 0, editList = false;
  var PGS = ["مشخصات", "واکسیناسیون", "ضدانگل", "سایر"];
  function recDel(r) { return false ? '<button type="button" class="hb-pdel" data-hb-del="' + r.id + '" aria-label="حذف">✕</button>' : ""; }
  function oldB(r) { return r.src === "old" ? '<span class="hb-oldb">سابقهٔ قبلی</span>' : ""; }
  function pageRows(cp, types, mode) {
    var rs = db.recs.filter(function (r) { return r.pet === cp.id && types.indexOf(r.type) > -1; }).sort(function (x, y) { return x.date < y.date ? 1 : -1; });
    if (!rs.length) return '<p class="hb-pe">' + (mode === "vax" && !isDr() ? "واکسن‌ها توسط دکتر ثبت می‌شود." : "هنوز موردی ثبت نشده است.") + "</p>";
    return rs.map(function (r) {
      var k = cfg(r.type);
      if (mode === "vax" || mode === "par") {
        var main = (r.brand ? "<bdi>" + esc(r.brand) + "</bdi>" + (r.name ? " · " : "") : "") + (r.name ? esc(r.name) : r.brand ? "" : tl(r.type));
        return '<div class="hb-pr">' + recDel(r) + '<div class="hb-pn"><b>' + main + "</b>" + oldB(r) + (mode === "par" ? "<span>" + (r.type === "ضدانگل داخلی" ? "داخلی" : "خارجی") + "</span>" : "") + (r.serial ? '<small dir="ltr">Lot: ' + esc(r.serial) + "</small>" : "") + '</div><div class="hb-pd"><span><i>' + (mode === "vax" ? "تزریق" : "مصرف") + "</i>" + fd(r.date) + "</span><span><i>تکرار</i>" + (r.next ? fd(r.next) : "—") + "</span></div></div>";
      }
      if (r.type === "دارو") {
        var act = r.dur === "دائمی" || (r.end && days(r.end) >= 0), line2 = [r.extra, r.freq, r.how].filter(Boolean).map(esc).join(" · ");
        return '<div class="hb-pr"><div class="hb-pn"><b>' + k.ic + " " + esc(r.name || "دارو") + (act ? ' <span class="hb-act">فعال</span>' : "") + "</b>" + (line2 ? "<small>" + line2 + "</small>" : "") + '</div><div class="hb-pd"><span><i>شروع</i>' + fd(r.date) + "</span><span><i>تا</i>" + (r.dur === "دائمی" ? "دائمی" : r.end ? fd(r.end) : "—") + "</span></div></div>";
      }
      var det = [r.name, r.place, r.extra].filter(Boolean).map(esc).join(" · ") + (r.weight ? (r.name || r.place || r.extra ? " · " : "") + toolFa(r.weight) + " کیلوگرم" : "");
      return '<div class="hb-pr">' + recDel(r) + '<div class="hb-pn"><b>' + k.ic + " " + tl(r.type) + "</b>" + oldB(r) + (!r.dr && (r.type === "سایر" || r.type === "دارو") ? "<span>ثبت سرپرست</span>" : "") + (det ? "<small>" + det + "</small>" : "") + '</div><div class="hb-pd"><span>' + fd(r.date) + "</span></div></div>";
    }).join("");
  }
  function weightChart(cp) {
    var ws = db.recs.filter(function (r) { return r.pet === cp.id && r.weight; }).sort(function (x, y) { return x.date < y.date ? -1 : 1; });
    if (ws.length < 2) return "";
    var vals = ws.map(function (r) { return r.weight; }), mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), rg = (mx - mn) || 1;
    var pts = ws.map(function (r, i) { return (10 + i * (280 / (ws.length - 1))).toFixed(1) + "," + (60 - ((r.weight - mn) / rg) * 46).toFixed(1); }).join(" ");
    return '<div class="hb-weight"><svg viewBox="0 0 300 70" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="#1f5ea6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><small>روند وزن: از ' + toolFa(vals[0]) + " به " + toolFa(vals[vals.length - 1]) + " کیلوگرم</small></div>";
  }
  function sealBox(cp) {
    var sv = srvOf(cp); if (!sv) return "";
    return '<div class="hb-seal"><b class="hb-seal-t">مهر و اصالت</b><div class="hb-seal-r"><span>شمارهٔ شناسنامه</span><b dir="ltr">' + esc(sv.code) + "</b></div>" + (sv.auth ? '<div class="hb-seal-r"><span>کد اصالت</span><b dir="ltr" class="hb-auth">✓ ' + esc(sv.auth) + "</b></div>" : "") + '<p class="hb-seal-x">این دو کد برای جلوگیری از جعل‌اند. هر کس می‌تواند در سایت بررسی کند که این شناسنامه واقعاً از طرف دکتر مساوات صادر شده است.</p><small>راستی‌آزمایی: drniloofarmosavat.ir/asalat</small></div>';
  }
  function renderPages(cp) {
    function pg(i, title, body) { return '<div class="hb-pg-h">' + title + '</div><div class="hb-pg-b">' + body + "</div>"; }
    q('[data-hb-pg="1"]').innerHTML = pg(1, "💉 واکسیناسیون", pageRows(cp, ["واکسن"], "vax"));
    q('[data-hb-pg="2"]').innerHTML = pg(2, "🪱 ضدانگل داخلی و خارجی", pageRows(cp, ["ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)"], "par"));
    q('[data-hb-pg="3"]').innerHTML = pg(3, "🩺 ویزیت، آزمایش، وزن و سایر", weightChart(cp) + pageRows(cp, ["ویزیت", "آزمایش", "عقیم‌سازی", "دارو", "وزن", "سایر"], "oth") + sealBox(cp));
    q("[data-hb-ptabs]").innerHTML = PGS.map(function (t, i) { return '<button type="button" class="chip' + (i === curPg ? " on" : "") + '" data-hb-pgo="' + i + '">' + t + "</button>"; }).join("");
    q("[data-hb-dots]").innerHTML = PGS.map(function (t, i) { return '<i class="' + (i === curPg ? "on" : "") + '"></i>'; }).join("");
    var tr = q("[data-hb-track]"); try { tr.scrollLeft = (getComputedStyle(tr).direction === "rtl" ? -1 : 1) * curPg * tr.clientWidth; } catch (e0) {} fitTrack();
  }
  // آیفون/آیپد: به‌جای اسکرین scroll-snap، فقط صفحهٔ انتخاب‌شده نشان داده می‌شود و کشیدن انگشت جدا مدیریت می‌شود
  (function () { function hh() { var h = document.querySelector(".hb-staffhdr"); if (h) document.documentElement.style.setProperty("--hdrh", (h.offsetHeight + 6) + "px"); } hh(); window.addEventListener("resize", hh); setTimeout(hh, 600); })();
  var IOSMODE = (function () { var m = /(iPhone|iPad|iPod).*? OS (\d+)_/.exec(navigator.userAgent); return !!(m && Number(m[2]) <= 14); })();   // فقط آیفون/آیپد با iOS ۱۴ و قدیمی‌تر
  if (IOSMODE) document.documentElement.classList.add("hb-ios");
  function iosShow(i) { var tr = q("[data-hb-track]"); if (!tr) return; [].forEach.call(tr.children, function (sl, n) { sl.classList.toggle("hb-on", n === i); }); }
  // آیفون/آیپد قدیمی: پنجره‌های شناور (فرم ثبت، QR، اشتراک، راهنما) درون صفحه و با اسکرول خودکار نشان داده می‌شوند
  if (IOSMODE && window.MutationObserver) {
    // فرم و پنجره‌ها را درست زیر دکمه‌های ثبت سریع می‌گذاریم تا بعد از لمس همان‌جا دیده شوند
    var iosAnchor = q(".hb-dacts") || q(".hb-oacts");
    var iosMods = document.querySelectorAll(".hb-sheet, .hb-qrm, .hb-guide");   // شامل پنجرهٔ ورود (data-hb-drm)
    [].forEach.call(iosMods, function (m) {
      var gate0 = q("[data-hb-drgate]");
      if (m.hasAttribute("data-hb-drm") && gate0 && gate0.parentNode) gate0.parentNode.insertBefore(m, gate0.nextSibling);   // پنجرهٔ ورود: زیر دکمهٔ ورود (نه داخل بخش پنهانِ قبل از ورود)
      else if (iosAnchor && iosAnchor.parentNode && !m.classList.contains("hb-guide")) iosAnchor.parentNode.insertBefore(m, iosAnchor.nextSibling);
      new MutationObserver(function () {
        if (m.hidden) return;
        setTimeout(function () { try { var hd = document.querySelector(".hb-staffhdr"), off = (hd ? hd.offsetHeight : 0) + 16; window.scrollTo(0, Math.max(0, m.getBoundingClientRect().top + (window.pageYOffset || 0) - off)); } catch (e2) {} }, 80);   // زیر نوار ثابت بالا پنهان نشود
      }).observe(m, { attributes: true, attributeFilter: ["hidden"] });
    });
    // آیپد قدیمی: وقتی صفحهٔ ورود نمایش داده می‌شود، کادر رمز همان‌جا باز باشد (بدون نیاز به لمس «ورود»)
    var gateI = q("[data-hb-drgate]"), drmI = q("[data-hb-drm]");
    if (gateI && drmI) {
      var syncI = function () { if (!gateI.hidden) { drmI.hidden = false; drmI.classList.add("hb-inline"); } else if (drmI.classList.contains("hb-inline")) { drmI.hidden = true; drmI.classList.remove("hb-inline"); } };
      new MutationObserver(syncI).observe(gateI, { attributes: true, attributeFilter: ["hidden"] }); setTimeout(syncI, 50);
    }
  }
  function fitTrack() { var tr = q("[data-hb-track]"); if (!tr) return; if (IOSMODE) { tr.style.height = "auto"; iosShow(curPg); return; } var h = 0; [].forEach.call(tr.children, function (s) { h = Math.max(h, s.scrollHeight); }); tr.style.height = h + "px"; }
  window.addEventListener("resize", function () { if (q("[data-hb-track]")) fitTrack(); });
  (function () {
    if (!IOSMODE) return; var tr = q("[data-hb-track]"); if (!tr) return; var x0 = 0, y0 = 0;
    tr.addEventListener("touchstart", function (e) { var t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
    tr.addEventListener("touchend", function (e) { var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return; var n = curPg + (dx > 0 ? 1 : -1); if (n < 0 || n >= PGS.length) return; setPg(n); }, { passive: true });
  })();
  function setPg(i) { curPg = i; try { goPg(i); } catch (e1) {} [].forEach.call(q("[data-hb-ptabs]").children, function (c, n) { c.classList.toggle("on", n === i); }); [].forEach.call(q("[data-hb-dots]").children, function (c, n) { c.classList.toggle("on", n === i); }); fitTrack(); }
  // سافاری آیفون/آیپد با scroll-snap و حرکت نرم برنامه‌ای کار نمی‌کند و مدل scrollLeft در راست‌به‌چپ هم بین نسخه‌ها فرق دارد؛
  // پس snap را لحظه‌ای خاموش می‌کنیم و فاصلهٔ واقعی اسلاید تا لبهٔ کارت را اندازه می‌گیریم (مستقل از علامت scrollLeft)
  (function () { try { var sc = document.querySelector('script[src*="app.js?v="]'), v = sc ? sc.getAttribute("src").split("v=")[1] : ""; var el = document.createElement("p"); el.className = "hb-ver"; el.setAttribute("dir", "ltr"); el.textContent = "v" + v; root.appendChild(el); } catch (e) {} })();
  function goPg(i) {
    if (IOSMODE) { iosShow(i); return; }
    var tr = q("[data-hb-track]"), sl = tr.children[i]; if (!sl) return;
    tr.style.scrollSnapType = "none"; tr.style.scrollBehavior = "auto";
    function gap() { return sl.getBoundingClientRect().left - tr.getBoundingClientRect().left; }
    var d = gap();
    if (Math.abs(d) > 2) {
      var before = tr.scrollLeft; tr.scrollLeft = before + d;
      if (Math.abs(gap()) >= Math.abs(d) - 1) tr.scrollLeft = before - d;
    }
    setTimeout(function () { tr.style.scrollSnapType = ""; if (Math.abs(gap()) > 2) { var b2 = tr.scrollLeft, d3 = gap(); tr.scrollLeft = b2 + d3; if (Math.abs(gap()) >= Math.abs(d3) - 1) tr.scrollLeft = b2 - d3; } }, 150);
  }
  (function () {
    var tr = q("[data-hb-track]"), raf = 0; if (!tr) return;
    tr.addEventListener("scroll", function () {
      if (raf) return; raf = requestAnimationFrame(function () {
        raf = 0; var i = Math.max(0, Math.min(PGS.length - 1, Math.round(Math.abs(tr.scrollLeft) / (tr.clientWidth || 1))));
        if (i !== curPg) { curPg = i; fitTrack(); [].forEach.call(q("[data-hb-ptabs]").children, function (c, n) { c.classList.toggle("on", n === i); }); [].forEach.call(q("[data-hb-dots]").children, function (c, n) { c.classList.toggle("on", n === i); }); }
      });
    }, { passive: true });
  })();
  // ---- برگهٔ ثبت: فیلدها بر پایهٔ نوع ----
  var editRecId = null, keepNext = false, lastSrc = "", linkPetId = null, showOthers = false;
  var sheetQuick = false, OTHER_TYPES = ["وزن", "دارو", "آزمایش", "عقیم‌سازی", "سایر"];
  function sheetHead() {
    var card = q(".hb-sheet-card"), h = q("[data-hb-sheet-title]"); if (!card || !h) return;
    var cp = curPet(), nm = cp ? cp.name : "", ttl;
    if (editRecId) ttl = "✏️ ویرایش ثبت"; else if (sheetQuick) ttl = (cfg(curType).ic || "") + " ثبت " + tl(curType); else ttl = isDr() ? "＋ ثبت‌های دیگر" : "ثبت در دفترچه";
    h.textContent = ttl + (nm && !editRecId ? " · " + nm : "");
    card.className = card.className.replace(/\s*ty-\w+/g, "") + " ty-" + (editRecId ? "edit" : sheetQuick ? (cfg(curType).k || "oth") : "oth");
  }
  function renderTypes() {
    var avail = ORDER.filter(function (t) { return !locked(t); });
    if (isDr() && !sheetQuick && !editRecId) { var oth = avail.filter(function (t) { return OTHER_TYPES.indexOf(t) > -1; }); if (oth.length) avail = oth; if (avail.indexOf(curType) < 0) curType = avail[0]; }
    var sel = '<div class="fld"' + (sheetQuick && !editRecId ? " data-hb-tselw hidden" : "") + '><label for="hb-tsel">نوع خدمت</label><select id="hb-tsel" data-hb-tsel' + (editRecId ? " disabled" : "") + ">" + avail.map(function (t) { return '<option value="' + esc(t) + '"' + (t === curType ? " selected" : "") + ">" + tl(t) + "</option>"; }).join("") + "</select></div>";
    q("[data-hb-types]").innerHTML = (sheetQuick && !editRecId ? '<div class="hb-chtype"><button type="button" class="hb-lnk" data-hb-chtype>تغییر نوع</button></div>' : "") + sel;
    sheetHead();
  }
  function showTab(w) {
    q("[data-hb-newwrap]").hidden = w !== "new"; q("[data-hb-hist]").hidden = w !== "hist";
    [].forEach.call(q("[data-hb-stabs]").children, function (c) { c.classList.toggle("on", c.getAttribute("data-hb-stab") === w); });
    if (w === "hist") renderHist();
  }
  function histMain(r) { var m = [r.brand ? "<bdi>" + esc(r.brand) + "</bdi>" : "", r.name ? esc(r.name) : ""].filter(Boolean).join(" · "); return m ? " · " + m : ""; }
  function renderHist() {
    var cp = curPet(), rs = db.recs.filter(function (r) { return r.pet === cp.id; }).sort(function (x, y) { return x.date < y.date ? 1 : -1; });
    q("[data-hb-hist]").innerHTML = rs.length ? rs.map(function (r) {
      var can = isDr() || !r.dr, ed = can && !locked(r.type);
      return '<div class="hb-hr"><span class="hb-hr-ic">' + cfg(r.type).ic + '</span><div class="hb-hr-t"><b>' + esc(tl(r.type)) + histMain(r) + "</b><small>" + fd(r.date) + '</small></div><span class="hb-hr-b">' + (ed ? '<button type="button" data-hb-redit="' + r.id + '" aria-label="ویرایش">✏️</button>' : "") + (can ? '<button type="button" data-hb-rdel="' + r.id + '" aria-label="حذف">🗑</button>' : '<span class="hb-lock" title="ثبت دکتر">🔒</span>') + "</span></div>";
    }).join("") : '<p class="hb-pe2">هنوز چیزی ثبت نشده است.</p>';
  }
  function startEdit(id) {
    var r = db.recs.filter(function (x) { return x.id === id; })[0]; if (!r || locked(r.type) || (r.dr && !isDr())) return;
    editRecId = id; curType = r.type; showTab("new"); renderTypes(); renderFields();
    var c = cfg(r.type); c.f.forEach(function (f) {
      var v = r[f.id] || "", el = q("#hb-f-" + f.id); if (!el) return;
      if (el.tagName === "SELECT") { var has = [].some.call(el.options, function (o) { return o.value === v; }); if (v && !has) { el.value = "__o"; var o2 = q("#" + el.id + "-o"); o2.hidden = false; o2.value = v; } else el.value = v; } else el.value = v;
    });
    if (c.weight && q("#hb-w")) q("#hb-w").value = r.weight || "";
    JD.d.set(r.date); JD.x.set(r.next || ""); xTouched = true; updateSug(); if (q("#hb-src")) q("#hb-src").value = r.src || "";
    q("[data-hb-save]").textContent = "ذخیره تغییرات";
  }
  function fieldHtml(f, sp) {
    var opts = f.sel ? f.sel(sp).concat(((db.mem || {})[curType + "|" + f.id] || []).filter(function (m) { return f.sel(sp).indexOf(m) < 0; })) : [], id = "hb-f-" + f.id, lab = f.label + (f.req ? ' <b class="hb-rq">*</b>' : ' <small>(اختیاری)</small>');
    if (opts.length) return '<div class="fld" data-f="' + f.id + '"><label for="' + id + '">' + lab + '</label><select id="' + id + '" data-hb-sel><option value="">انتخاب کنید…</option>' + opts.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + '<option value="__o">سایر (می‌نویسم)</option></select><input id="' + id + '-o" type="text" maxlength="90" hidden placeholder="' + esc(f.ph || "بنویسید") + '"></div>';
    return '<div class="fld" data-f="' + f.id + '"><label for="' + id + '">' + lab + '</label><input id="' + id + '" type="text" maxlength="90"' + (f.ltr ? ' dir="ltr"' : "") + ' placeholder="' + esc(f.ph || "") + '"></div>';
  }
  function fieldVal(f) { var el = q("#hb-f-" + f.id); if (!el) return ""; if (el.tagName === "SELECT") return el.value === "__o" ? q("#" + el.id + "-o").value.trim() : el.value; return el.value.trim(); }
  function renderFields() {
    var c = cfg(curType), cp = curPet(), sp = cp ? cp.species : "", h = "";
    c.f.forEach(function (f) { h += fieldHtml(f, sp); });
    if (c.weight) h = '<div class="fld"><label for="hb-w">وزن (کیلوگرم) <b class="hb-rq">*</b></label><input id="hb-w" type="number" inputmode="decimal" step="0.1" min="0.05" max="90"></div>' + h;
    h += '<div class="fld"><label>' + (c.dateLabel || "تاریخ (شمسی)") + '</label><div class="jd" data-jd="d"></div></div>';
    h += '<div class="fld hb-srcf"><label for="hb-src">منبع ثبت</label><select id="hb-src"><option value="">ثبت در این کلینیک</option><option value="old">سابقهٔ قبلی (بر اساس گفتهٔ صاحب یا دفترچهٔ کاغذی)</option></select></div>';
    if (!c.weight && !c.noNext) h += '<div class="fld"><label>تاریخ تکرار / نوبت بعدی <small>(اختیاری)</small></label><div class="jd" data-jd="x"></div><p class="hb-sug" data-hb-sug hidden></p><div class="hb-quick"><button type="button" data-hb-add="1">+۱ ماه</button><button type="button" data-hb-add="3">+۳ ماه</button><button type="button" data-hb-add="12">+۱ سال</button><button type="button" data-hb-clear>بدون نوبت</button></div></div>';
    q("[data-hb-sf]").innerHTML = h; q("[data-hb-err]").hidden = true;
    JD.d = initJd(q('[data-jd="d"]'), { minY: -30, maxY: 0 }); JD.x = (c.weight || c.noNext) ? { get: function () { return ""; }, set: function () {}, on: function () {} } : initJd(q('[data-jd="x"]'), { optional: true, minY: -30, maxY: 6 });
    JD.d.set(ymd(new Date())); JD.d.on(function () { xTouched = false; updateSug(); }); JD.x.on(function () { xTouched = true; });
    if (lastSrc && q("#hb-src")) q("#hb-src").value = lastSrc;
    updateSug();
  }
  function updateSug() {
    var el = q("[data-hb-sug]"); if (!el) return; var cp = curPet(), d = JD.d.get() || ymd(new Date()), s = suggest(curType, d, cp);
    if (!s) { el.hidden = true; return; }
    var nd = addDays(d, s.d); el.hidden = false;
    el.innerHTML = "پیشنهاد: " + fd(nd) + " (" + s.t + "؛ تقریبی و طبق نظر دامپزشک)" + (s.manual ? ' <button type="button" data-hb-usesug="' + nd + '">یادآوری بگذار</button>' : "");
    if (!xTouched && !s.manual) JD.x.set(nd);
  }
  function openSheet() { editRecId = null; if (locked(curType)) curType = ORDER.filter(function (t) { return !locked(t); })[0]; xTouched = false; showTab("new"); renderTypes(); renderFields(); q("[data-hb-save]").textContent = "ثبت"; q("[data-hb-sheet]").hidden = false; document.documentElement.classList.add("gift-open"); }
  function closeSheet() { editRecId = null; q("[data-hb-sheet]").hidden = true; document.documentElement.classList.remove("gift-open"); }
  var formPhoto = "";
  function showPhoto() { var b = q("[data-hb-photo]"); b.innerHTML = formPhoto ? '<img src="' + formPhoto + '" alt="">' : "🐾"; q("[data-hb-photo-del]").hidden = !formPhoto; }
  // ---- برش و اندازهٔ عکس ----
  var CR = null;
  function cropDraw() {
    var c = q("[data-hb-cropc]"), x = c.getContext("2d"), V = c.width, s = CR.s0 * CR.z, w = CR.im.width * s, h = CR.im.height * s;
    var mx = Math.max(0, (w - V) / 2), my = Math.max(0, (h - V) / 2); CR.ox = Math.max(-mx, Math.min(mx, CR.ox)); CR.oy = Math.max(-my, Math.min(my, CR.oy));
    x.fillStyle = "#111"; x.fillRect(0, 0, V, V); x.drawImage(CR.im, V / 2 + CR.ox - w / 2, V / 2 + CR.oy - h / 2, w, h);
  }
  function cropPhoto(f, cb) {
    if (!f) return; var rd = new FileReader();
    rd.onload = function () {
      var im = new Image(); im.onload = function () {
        var c = q("[data-hb-cropc]"); CR = { im: im, s0: c.width / Math.min(im.width, im.height), z: 1, ox: 0, oy: 0, cb: cb, pts: {}, pd: 0 };
        q("[data-hb-cropz]").value = 1; cropDraw(); q("[data-hb-cropm]").hidden = false; document.documentElement.classList.add("gift-open");
      }; im.src = rd.result;
    };
    rd.readAsDataURL(f);
  }
  (function () {
    var c = q("[data-hb-cropc]"), zr = q("[data-hb-cropz]"); if (!c) return;
    function k() { return c.width / c.getBoundingClientRect().width; }
    function dist() { var p = Object.keys(CR.pts).map(function (i) { return CR.pts[i]; }); return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); }
    c.addEventListener("pointerdown", function (e) { if (!CR) return; c.setPointerCapture(e.pointerId); CR.pts[e.pointerId] = { x: e.clientX, y: e.clientY }; if (Object.keys(CR.pts).length === 2) CR.pd = dist(); });
    c.addEventListener("pointermove", function (e) {
      if (!CR || !CR.pts[e.pointerId]) return; var n = Object.keys(CR.pts).length, p = CR.pts[e.pointerId];
      if (n === 1) { CR.ox += (e.clientX - p.x) * k(); CR.oy += (e.clientY - p.y) * k(); p.x = e.clientX; p.y = e.clientY; }
      else { p.x = e.clientX; p.y = e.clientY; var d = dist(); if (CR.pd) CR.z = Math.max(1, Math.min(4, CR.z * d / CR.pd)); CR.pd = d; zr.value = CR.z; }
      cropDraw();
    });
    function up(e) { if (CR) { delete CR.pts[e.pointerId]; CR.pd = 0; } }
    c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    c.addEventListener("wheel", function (e) { if (!CR) return; e.preventDefault(); CR.z = Math.max(1, Math.min(4, CR.z * (e.deltaY < 0 ? 1.08 : 0.93))); zr.value = CR.z; cropDraw(); }, { passive: false });
    zr.addEventListener("input", function () { if (CR) { CR.z = Number(zr.value); cropDraw(); } });
  })();
  function cropSave() {
    if (!CR) return; var c = q("[data-hb-cropc]"), V = c.width, O = 480, f = O / V, o = document.createElement("canvas"); o.width = o.height = O;
    var s = CR.s0 * CR.z * f, w = CR.im.width * s, h = CR.im.height * s, x = o.getContext("2d");
    x.fillStyle = "#fff"; x.fillRect(0, 0, O, O); x.drawImage(CR.im, O / 2 + CR.ox * f - w / 2, O / 2 + CR.oy * f - h / 2, w, h);
    var d = o.toDataURL("image/jpeg", .85), cb = CR.cb; CR = null; q("[data-hb-cropm]").hidden = true; document.documentElement.classList.remove("gift-open"); cb(d);
  }
  function resizePhoto(f, cb) {
    if (!f) return; var rd = new FileReader();
    rd.onload = function () { var im = new Image(); im.onload = function () { var s = 320, w = im.width, h = im.height, m = Math.min(w, h), cv = document.createElement("canvas"); cv.width = cv.height = s; cv.getContext("2d").drawImage(im, (w - m) / 2, (h - m) / 2, m, m, 0, 0, s, s); cb(cv.toDataURL("image/jpeg", .82)); }; im.src = rd.result; };
    rd.readAsDataURL(f);
  }
  function readPhoto(f) {
    if (!f) return; var rd = new FileReader();
    rd.onload = function () { var im = new Image(); im.onload = function () { var s = 320, w = im.width, h = im.height, m = Math.min(w, h), cv = document.createElement("canvas"); cv.width = cv.height = s; cv.getContext("2d").drawImage(im, (w - m) / 2, (h - m) / 2, m, m, 0, 0, s, s); formPhoto = cv.toDataURL("image/jpeg", .82); showPhoto(); }; im.src = rd.result; };
    rd.readAsDataURL(f);
  }
  function fillBreeds(sp, cur) {
    var s = q("#hb-pbr"), list = BR[sp] || [], has = list.some(function (x) { return x[0] === cur; });
    s.innerHTML = '<option value="">انتخاب کنید…</option>' + list.map(function (x) { return "<option>" + esc(x[0]) + "</option>"; }).join("") + '<option value="__o">سایر (می‌نویسم)</option>';
    var o = q("#hb-pbro"); o.hidden = true; o.value = "";
    if (cur && has) s.value = cur; else if (cur) { s.value = "__o"; o.hidden = false; o.value = cur; } else s.value = "";
  }
  function getBreed() { var s = q("#hb-pbr"); return s.value === "__o" ? q("#hb-pbro").value.trim() : s.value; }
  function petForm(p) {
    q("[data-hb-petform]").classList.remove("photoonly");
    editId = p ? p.id : null; q("[data-hb-pf-title]").textContent = p ? "ویرایش شناسنامه" : srvOn() && isDr() ? "صدور شناسنامهٔ جدید" : "شناسنامهٔ پت"; q("[data-hb-save-pet]").textContent = !p && srvOn() && isDr() ? "صدور شناسنامه" : "ذخیره";
    q("#hb-pn").value = p ? p.name : ""; q("#hb-pe").value = p && p.en || ""; q("#hb-po").value = p && p.owner || ""; q("#hb-pg").value = p && p.guardian || "";  q("#hb-pbe").value = p && p.breedEn || ""; q("#hb-pbe").setAttribute("data-auto", p && p.breedEn ? "" : "1"); JD.pb.set(p ? p.birth : ""); q("#hb-ph").value = p && p.phone || ""; if (q("#hb-psms")) q("#hb-psms").checked = p ? !!p.smsok : true; setSeg("hbsx", p && p.sex || ""); setSeg("hbne", p && p.neut || ""); formPhoto = p && p.photo || ""; showPhoto();
    var segs = q('[data-seg="hbsp"]').children; [].forEach.call(segs, function (b) { b.classList.toggle("on", p ? b.getAttribute("data-v") === p.species : b.getAttribute("data-v") === "سگ"); });
    fillBreeds(p ? p.species : "سگ", p ? p.breed : "");
    q("[data-hb-petform]").hidden = false; q("[data-hb-main]").hidden = true;
  }
  JD.pb = initJd(q('[data-jd="pb"]'), { optional: true, minY: -30, maxY: 0 });
  root.addEventListener("change", function (e) { var s = e.target; if (s && s.hasAttribute && s.hasAttribute("data-hb-tsel")) { curType = s.value; xTouched = false; renderFields(); sheetHead(); return; } if (s && s.hasAttribute && s.hasAttribute("data-hb-sel")) { var o = q("#" + s.id + "-o"); if (o) { o.hidden = s.value !== "__o"; if (!o.hidden) o.focus(); } } });
  q("#hb-pbr").addEventListener("change", function () { var o = q("#hb-pbro"); o.hidden = this.value !== "__o"; if (!o.hidden) o.focus(); var e = q("#hb-pbe"); if (e.getAttribute("data-auto") === "1") e.value = breedEn(getBreed()); });
  (function () {
    var sq = q("[data-hb-q]"), tm = 0; if (!sq) return;
    function run() { var box = q("[data-hb-qres]"); box.innerHTML = '<p class="hb-qmsg">در حال جستجو…</p>'; api({ a: "search", t: tokGet(), q: sq.value }).then(function (j) { if (!j.ok) { box.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; } box.innerHTML = j.pets.length ? j.pets.map(function (p) { return '<div class="hb-qrw"><button type="button" class="hb-qr1" data-hb-qopen="' + esc(p.code) + '"><b>' + esc(p.name) + (p.en ? " · " + esc(p.en) : "") + "</b><small>" + esc((p.owner ? p.owner + " · " : "") + p.code) + "</small></button>" + (p.phone ? '<a class="hb-call hb-callq" dir="ltr" href="tel:' + esc(p.phone) + '">📞 ' + esc(p.phone) + "</a>" : "") + "</div>"; }).join("") : '<p class="hb-qmsg">موردی پیدا نشد.</p>'; var lo = db.pets.filter(function (p) { return !srvOf(p); }); if (lo.length) box.innerHTML += '<p class="hb-qmsg hb-qlo">فقط روی این دستگاه (هنوز روی سرور ذخیره نشده):</p>' + lo.map(function (p) { return '<button type="button" class="hb-qr1" data-hb-lopen="' + esc(p.id) + '"><b>' + esc(p.name) + "</b><small>" + esc(p.owner || "") + "</small></button>"; }).join(""); }); }
    drListRun = run;
    sq.addEventListener("input", function () { clearTimeout(tm); tm = setTimeout(run, 350); });
    sq.addEventListener("focus", function () { if (!q("[data-hb-qres]").innerHTML) run(); });
  })();
  q("#hb-pbro").addEventListener("input", function () { var e = q("#hb-pbe"); if (e.getAttribute("data-auto") === "1") e.value = breedEn(this.value); });
  document.addEventListener("click", function (e) { if (e.target.closest && e.target.closest('[data-seg="hbsp"] button')) setTimeout(function () { var on = q('[data-seg="hbsp"] .on'); fillBreeds(on ? on.getAttribute("data-v") : "سگ", ""); q("#hb-pbe").value = ""; q("#hb-pbe").setAttribute("data-auto", "1"); }, 0); });
  q("#hb-pbe").addEventListener("input", function () { this.setAttribute("data-auto", ""); });
  q("[data-hb-file]").addEventListener("change", function () { var inp = this; cropPhoto(inp.files[0], function (d) { formPhoto = d; showPhoto(); }); inp.value = ""; });
  q("[data-hb-file2]").addEventListener("change", function () { var inp = this; cropPhoto(inp.files[0], function (d) { var cp = curPet(); if (cp) { cp.photo = d; save(); render(); } }); inp.value = ""; });
  // جمع‌شدن سربرگ سایت هنگام پایین رفتن
  (function () { var hd = document.querySelector("header.top"), ly = window.scrollY; if (!hd || !document.body.classList.contains("hb-page") || document.body.classList.contains("hb-drpage")) return; window.addEventListener("scroll", function () { var y = window.scrollY; if (y > ly + 6 && y > 90) hd.classList.add("fold"); else if (y < ly - 6 || y < 40) hd.classList.remove("fold"); ly = y; }, { passive: true }); })();
  // ---- ارسال شناسنامه برای سرپرست (لینک) و دریافت ----
  function b64u(bytes) { var s = "", i; for (i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function unb64u(t) { t = t.replace(/-/g, "+").replace(/_/g, "/"); while (t.length % 4) t += "="; var s = atob(t), b = new Uint8Array(s.length), i; for (i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; }
  function pipe(bytes, S) { var st = new S("deflate-raw"), w = st.writable.getWriter(); w.write(bytes); w.close(); return new Response(st.readable).arrayBuffer().then(function (b) { return new Uint8Array(b); }); }
  function packShare(obj) {
    var bytes = new TextEncoder().encode(JSON.stringify(obj));
    if (window.CompressionStream) return pipe(bytes, window.CompressionStream).then(function (c) { return "2" + b64u(c); });
    return Promise.resolve("1" + b64u(bytes));
  }
  function unpackShare(str) {
    var m = str.charAt(0), bytes = unb64u(str.slice(1));
    var p = m === "2" ? (window.DecompressionStream ? pipe(bytes, window.DecompressionStream) : Promise.reject(new Error("no"))) : Promise.resolve(bytes);
    return p.then(function (b) { return JSON.parse(new TextDecoder().decode(b)); });
  }
  var DICT = [].concat(DOG_VT, CAT_VT_LEGACY, DOG_VB, CAT_VB, INT_B, EXT_B, PLACES, DRUGS, FREQ, HOW, DUR);
  function dEnc(s) { if (!s) return ""; var i = DICT.indexOf(s); return i > -1 ? "~" + i.toString(36) : s; }
  function dDec(s) { if (typeof s !== "string") return ""; if (/^~[0-9a-z]+$/.test(s)) { var v = DICT[parseInt(s.slice(1), 36)]; return v == null ? "" : v; } return s; }
  function dayN(s) { var p = s.split("-"); return Math.round((Date.UTC(+p[0], +p[1] - 1, +p[2]) - Date.UTC(2020, 0, 1)) / 864e5); }
  function dayD(n) { var d = new Date(Date.UTC(2020, 0, 1) + (+n || 0) * 864e5); return d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2); }
  function shareData(cp) {
    var recs = db.recs.filter(function (x) { return x.pet === cp.id; }).map(function (x) {
      var r = [ORDER.indexOf(x.type), dayN(x.date), dEnc(x.name), dEnc(x.brand), x.serial || "", dEnc(x.place), x.extra || "", x.weight || 0, x.next ? dayN(x.next) : 0, (x.dr ? 1 : 0) | (isDr() ? 1 : 0) | (x.closed ? 2 : 0), dEnc(x.freq), dEnc(x.how), dEnc(x.dur), x.end ? dayN(x.end) : 0];
      while (r.length > 3 && (r[r.length - 1] === "" || r[r.length - 1] === 0)) r.pop(); return r;
    });
    var plan = (cp.plan || []).map(function (x) { return [ORDER.indexOf(x.type), dayN(x.date), x.label || "", x.done ? 1 : 0]; });
    return [2, cp.id, cp.name, cp.en || "", cp.owner || "", cp.guardian || "", Object.keys(SPE).indexOf(cp.species), cp.breed || "", cp.breedEn || "", cp.birth ? dayN(cp.birth) : 0, plan, recs, cp.sex || "", cp.neut || ""];
  }
  function expandShare(a) {
    var p = { id: a[1], name: a[2], en: a[3], owner: a[4], guardian: a[5], species: Object.keys(SPE)[a[6]] || "دیگر", breed: a[7], breedEn: a[8], birth: a[9] ? dayD(a[9]) : "", sex: a[12] === "نر" || a[12] === "ماده" ? a[12] : "", neut: a[13] === "عقیم‌شده" || a[13] === "عقیم‌نشده" ? a[13] : "", plan: [] };
    (a[10] || []).forEach(function (x) { if (ORDER[x[0]]) p.plan.push({ type: ORDER[x[0]], date: dayD(x[1]), label: x[2], done: !!x[3] }); });
    var r = (a[11] || []).filter(function (x) { return ORDER[x[0]]; }).map(function (x) { var fl = x[9] || 0; return { type: ORDER[x[0]], date: dayD(x[1]), name: dDec(x[2]), brand: dDec(x[3]), serial: x[4], place: dDec(x[5]), extra: x[6], weight: x[7], next: x[8] ? dayD(x[8]) : "", closed: !!(fl & 2), d: fl & 1 ? 1 : 0, freq: dDec(x[10]), how: dDec(x[11]), dur: dDec(x[12]), end: x[13] ? dayD(x[13]) : "" }; });
    return { v: 1, p: p, r: r };
  }
  function cleanStr(v, n) { return typeof v === "string" ? v.slice(0, n || 120) : ""; }
  function cleanDate(v) { return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ""; }
  function sanitizeShare(d) {
    if (Array.isArray(d)) d = expandShare(d);
    if (!d || d.v !== 1 || !d.p || !Array.isArray(d.r)) throw new Error("bad");
    var p = d.p, pet = { id: /^[a-z0-9]{3,30}$/.test(p.id || "") ? p.id : uid(), name: cleanStr(p.name, 30), en: cleanStr(p.en, 30), owner: cleanStr(p.owner, 40), guardian: cleanStr(p.guardian, 40), species: SPE[p.species] ? p.species : "دیگر", breed: cleanStr(p.breed, 40), breedEn: cleanStr(p.breedEn, 40), birth: cleanDate(p.birth), sex: p.sex === "نر" || p.sex === "ماده" ? p.sex : "", neut: p.neut === "عقیم‌شده" || p.neut === "عقیم‌نشده" ? p.neut : "", plan: [] };
    if (!pet.name) throw new Error("bad");
    (Array.isArray(p.plan) ? p.plan : []).slice(0, 60).forEach(function (x) { if (x && CFG[x.type] && cleanDate(x.date)) pet.plan.push({ id: /^[a-z0-9]{3,30}$/.test(x.id || "") ? x.id : uid(), type: x.type, label: cleanStr(x.label, 90), date: x.date, done: !!x.done }); });
    var recs = []; d.r.slice(0, 400).forEach(function (x) { if (!x || !CFG[x.type] || !cleanDate(x.date)) return; var w = Number(x.weight) || 0; recs.push({ id: /^[a-z0-9]{3,30}$/.test(x.id || "") ? x.id : uid(), pet: pet.id, type: x.type, date: x.date, name: cleanStr(x.name, 90), brand: cleanStr(x.brand, 60), serial: cleanStr(x.serial, 60), place: cleanStr(x.place, 90), extra: cleanStr(x.extra, 90), freq: cleanStr(x.freq, 40), how: cleanStr(x.how, 40), dur: cleanStr(x.dur, 20), end: cleanDate(x.end), weight: w > 0 && w < 200 ? w : 0, next: cleanDate(x.next), closed: !!x.closed, dr: x.d === 1 ? 1 : 0 }); });
    return { pet: pet, recs: recs };
  }
  function faDigits(s) { return String(s || "").replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; }).replace(/\D/g, ""); }
  function waNum(s) { var d = faDigits(s); if (!d) return ""; if (d.indexOf("00") === 0) d = d.slice(2); if (d.charAt(0) === "0") d = "98" + d.slice(1); else if (d.length === 10 && d.charAt(0) === "9") d = "98" + d; return d; }
  var shareLink = "";
  function shareMsg() { var cp = curPet(); return "📒 شناسنامهٔ سلامت «" + cp.name + "»\nدکتر نیلوفر مساوات\n\nبا این لینک شناسنامه را ببینید و «ذخیره در این گوشی» را بزنید:\n" + shareLink; }
  function qrFromText(text) {
    try { var qq = qrLib(0, "M"); qq.addData(text, "Byte"); qq.make(); var n = qq.getModuleCount(), d = "", r, c; for (r = 0; r < n; r++) for (c = 0; c < n; c++) if (qq.isDark(r, c)) d += "M" + (c + 4) + " " + (r + 4) + "h1v1h-1z"; return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (n + 8) + " " + (n + 8) + '" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>'; } catch (e) { return ""; }
  }
  function savePng(sv, name) {
    if (!sv) return; var im2 = new Image(), url = URL.createObjectURL(new Blob([sv.outerHTML.replace(/^<svg /, '<svg width="800" height="800" ')], { type: "image/svg+xml" }));
    im2.onload = function () { var cv = document.createElement("canvas"); cv.width = cv.height = 800; var cx = cv.getContext("2d"); cx.fillStyle = "#fff"; cx.fillRect(0, 0, 800, 800); cx.imageSmoothingEnabled = false; cx.drawImage(im2, 0, 0, 800, 800); cv.toBlob(function (bl) { var l = document.createElement("a"); l.href = URL.createObjectURL(bl); l.download = name; document.body.appendChild(l); l.click(); setTimeout(function () { l.remove(); }, 500); }); };
    im2.src = url;
  }
  function openShare() {
    var cp = curPet(); if (!cp) return; shareLink = ""; q("[data-hb-shqr]").innerHTML = ""; q("[data-hb-shlink]").value = "در حال ساخت لینک…"; q("[data-hb-shm]").hidden = false; document.documentElement.classList.add("gift-open");
    if (srvOf(cp) && srvOn()) { shareLink = (/^https?:/.test(location.protocol) ? location.href.replace(/[^\/?#]*([?#].*)?$/, "") + "p?" + cp.srv.code + "." + cp.srv.key : location.href.replace(/#.*$/, "") + "#p=" + cp.srv.code + "." + cp.srv.key); q("[data-hb-shlink]").value = shareMsg(); q("[data-hb-shlen]").textContent = toolFa(shareLink.length) + " نویسه · لینک زنده (همیشه آخرین وضعیت)"; q("[data-hb-shqr]").innerHTML = qrFromText(shareLink); return; }
    packShare(shareData(cp)).then(function (s) { shareLink = location.href.replace(/#.*$/, "") + "#share=" + s; q("[data-hb-shlink]").value = shareMsg(); q("[data-hb-shlen]").textContent = toolFa(shareLink.length) + " نویسه"; var qs = qrFromText(shareLink); q("[data-hb-shqr]").innerHTML = qs || "<p class=\"hb-shnote\">لینک برای QR بیش از حد بلند است؛ از لینک یا واتساپ استفاده کنید.</p>"; }).catch(function () { q("[data-hb-shlink]").value = "ساخت لینک در این مرورگر ممکن نشد."; });
  }
  function closeModal(sel) { q(sel).hidden = true; document.documentElement.classList.remove("gift-open"); }
  var pendingImport = null;
  // آیکون صفحهٔ اصلی باید دقیقاً همین نشانی (با کد شناسنامه) را باز کند؛ پس مانیفست ثابت (که آدرس را به صفحهٔ اصلی دفترچه برمی‌گرداند) برداشته می‌شود
  function linkAsApp(nm) {
    try {
      var mf = document.querySelector('link[rel="manifest"]'); if (mf) mf.parentNode.removeChild(mf);
      [["apple-mobile-web-app-capable", "yes"], ["mobile-web-app-capable", "yes"], ["apple-mobile-web-app-title", nm ? "شناسنامهٔ " + nm : "شناسنامهٔ پت"]].forEach(function (x) { var m = document.querySelector('meta[name="' + x[0] + '"]'); if (!m) { m = document.createElement("meta"); m.name = x[0]; document.head.appendChild(m); } m.content = x[1]; });
    } catch (e) {}
  }
  function checkImport() {
    if (location.hash === "#nolink") { try { history.replaceState(null, "", location.pathname); } catch (x) {} alert("این لینک ناقص باز شد: بخش آخر لینک (که کد شناسنامه در آن است) نرسیده است. بعضی برنامه‌های اسکن QR یا مرورگرهای داخل اپ آن را حذف می‌کنند. QR را با دوربین اصلی گوشی اسکن کنید، یا «فقط لینک» را از دکتر بگیرید و در مرورگر (سافاری یا کروم) باز کنید."); return; }
    var ml = /^#p=([A-Za-z0-9\-]{3,20})\.([A-Za-z0-9]{10,40})$/.exec(location.hash || "") || /^\?p=([A-Za-z0-9\-]{3,20})\.([A-Za-z0-9]{10,40})$/.exec(location.search || "");
    if (ml) {
      if (!srvOn()) { alert("این لینک زنده به سرور نیاز دارد که هنوز فعال نشده است."); return; }
      api({ a: "getOwner", code: ml[1], key: ml[2] }).then(function (j) {
        if (!j.ok) { alert(j.err === "auth" ? "این لینک معتبر نیست یا باطل شده است. از دکتر لینک تازه بخواهید." : errMsg(j.err)); return; }
        // لینک را که باز کنند، شناسنامه همان لحظه نمایش داده می‌شود (موقت)؛ با دکمهٔ «ذخیره در این گوشی» ماندگار می‌شود
        var existed = db.pets.some(function (x) { return x.srv && x.srv.code === j.pet.code && !x.tmp; });
        var pi0 = upsertSrv(j.pet, j.recs, ml[2]); if (!existed) pi0.tmp = 1; db.cur = pi0.id; linkPetId = pi0.id; showOthers = false; q("[data-hb-petform]").hidden = true; save();
        // نشانی (همراه با کد) را در نوار آدرس نگه می‌داریم تا «افزودن به صفحهٔ اصلی» همین شناسنامه را باز کند
        // آیفون بخش # را برای آیکون صفحهٔ اصلی نگه نمی‌دارد؛ پس کد را به بخش ? منتقل می‌کنیم
        try { history.replaceState(null, "", location.pathname + "?p=" + ml[1] + "." + ml[2]); } catch (xr) {}
        linkAsApp(j.pet.name);
        render(); try { window.scrollTo(0, 0); } catch (x2) {}
      });
      return;
    }
    var m = /^#share=([\w-]+)$/.exec(location.hash || ""); if (!m) return;
    unpackShare(m[1]).then(sanitizeShare).then(function (x) {
      pendingImport = x; var cnt = function (t) { return x.recs.filter(function (r) { return r.type === t; }).length; };
      var info = [cnt("واکسن") ? toolFa(cnt("واکسن")) + " واکسیناسیون" : "", (cnt("ضدانگل داخلی") + cnt("ضدانگل خارجی (کک و کنه)")) ? toolFa(cnt("ضدانگل داخلی") + cnt("ضدانگل خارجی (کک و کنه)")) + " ضدانگل" : "", cnt("ویزیت") ? toolFa(cnt("ویزیت")) + " ویزیت" : ""].filter(Boolean).join("، ") || "بدون سابقهٔ ثبت‌شده";
      q("[data-hb-impinfo]").innerHTML = "<b>" + esc(x.pet.name) + "</b>" + (x.pet.owner ? "<small>صاحب: " + esc(x.pet.owner) + "</small>" : "") + "<small>" + esc(info) + "</small>";
      q("[data-hb-impm]").hidden = false; document.documentElement.classList.add("gift-open");
    }).catch(function () { alert("این لینک شناسنامه معتبر نیست یا در این مرورگر باز نمی‌شود."); });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.documentElement.classList.contains("hb-present")) { document.documentElement.classList.remove("hb-present"); render(); } if (e.key === "Escape" && !q("[data-hb-sheet]").hidden) closeSheet(); });

  root.addEventListener("click", function (e) {
    var t = e.target, b;
    if (t === q("[data-hb-sheet]")) return closeSheet();
    if (t.closest("[data-hb-close]")) return closeSheet();
    if (t.closest("[data-hb-chtype]")) { var tw = q("[data-hb-tselw]"); if (tw) tw.hidden = false; var cb = t.closest("[data-hb-chtype]"); cb.hidden = true; return; }
    if (t.closest("[data-hb-open]")) { sheetQuick = false; return openSheet(); }
    if ((b = t.closest("[data-hb-goto]")) && !t.closest("button")) { var gt = b.getAttribute("data-hb-goto"); setPg(gt === "واکسن" ? 1 : /ضدانگل/.test(gt) ? 2 : 3); q("[data-hb-ptabs]").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if ((b = t.closest("[data-hb-opt]"))) { [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle("on", x === b); }); var n = q("#hb-n"); if (n) n.value = b.getAttribute("data-hb-opt"); return; }
    if ((b = t.closest("[data-hb-tab]"))) { curTab = Number(b.getAttribute("data-hb-tab")); return render(); }
    if (t.closest("[data-hb-others]")) { showOthers = true; render(); return; }
    if ((b = t.closest("[data-hb-pet]"))) { showOthers = true; db.cur = b.getAttribute("data-hb-pet"); q("[data-hb-petform]").hidden = true; save(); render(); return syncCur(); }
    if ((b = t.closest("[data-hb-dtab]"))) {
      var dv = b.getAttribute("data-hb-dtab");
      if (dv === root.getAttribute("data-dview")) {   // زدن تب فعال: برگشت به فهرست، یا جمع/باز کردن
        if (dv === "pt" && ptMode !== "list") { ptMode = "list"; ptEditV = null; ptShow(); root.removeAttribute("data-dcollapsed"); return; }
        if (root.getAttribute("data-dcollapsed") === "1") root.removeAttribute("data-dcollapsed"); else root.setAttribute("data-dcollapsed", "1");
        return;
      }
      dview(dv); if (dv === "new") { petForm(null); } else q("[data-hb-petform]").hidden = true; return; }
    if (t.closest("[data-hb-back]")) { q("[data-hb-petform]").hidden = true; dview(lastView || "list"); return; }
    if ((b = t.closest("[data-hb-lopen]"))) { db.cur = b.getAttribute("data-hb-lopen"); q("[data-hb-petform]").hidden = true; save(); render(); dview("pet"); return; }
    if (t.closest("[data-hb-addhome]")) { var gd = q("[data-hb-guide]"); if (gd) gd.hidden = false; return; }
    if (t.closest("[data-hb-guide-x]") || t.matches("[data-hb-guide]")) { var gd2 = q("[data-hb-guide]"); if (gd2) gd2.hidden = true; return; }
    if (t.closest("[data-hb-keep]")) { if (!confirm("ذخیره در مرورگر چه فرقی با مراحل بالا دارد؟\n\n• مراحل بالا (افزودن به صفحهٔ اصلی) یک آیکون روی گوشی می‌سازد که با یک لمس شناسنامه را باز می‌کند.\n• ذخیره در مرورگر فقط شناسنامه را در همین مرورگر نگه می‌دارد و آیکونی نمی‌سازد؛ باید دوباره سایت را باز کنید. اگر اطلاعات مرورگر پاک شود، از بین می‌رود.\n\nادامه و ذخیره در مرورگر؟")) return; var kp = curPet(); if (kp) { delete kp.tmp; save(); render(); toast("✅ ذخیره شد. دفعهٔ بعد در همین مرورگر drniloofarmosavat.ir/shenasname را باز کنید"); } return; }
    if (t.closest("[data-hb-wipe]")) {
      if (!confirm("همهٔ شناسنامه‌هایی که روی این دستگاه ذخیره شده پاک شود؟ (روی سرور چیزی پاک نمی‌شود و با لینک دوباره می‌توانید اضافه کنید.)")) return;
      db.pets = []; db.recs = []; db.cur = null; db.mem = {}; save(); try { sessionStorage.removeItem(TMPKEY); } catch (e) {} q("[data-hb-petform]").hidden = true; render(); toast("پاک شد"); return;
    }
    if (t.closest("[data-hb-newpet]")) { petForm(null); var pf0 = q("[data-hb-petform]"); if (pf0 && pf0.scrollIntoView) pf0.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (t.closest("[data-hb-eye]")) { var pw0 = q("[data-hb-drpw]"); pw0.type = pw0.type === "password" ? "text" : "password"; return; }
    if (t.closest("[data-hb-edit-pet]")) { var pe = curPet(); petForm(pe); q("[data-hb-petform]").classList.toggle("photoonly", srvOn() && !isDr()); q("[data-hb-pf-title]").textContent = srvOn() && !isDr() ? "تغییر عکس پت" : "ویرایش شناسنامه"; return; }
    if (t.closest("[data-hb-cancel-pet]")) { var wasEd = !!editId; q("[data-hb-petform]").hidden = true; if (isDr()) dview(wasEd ? "pet" : "list"); return render(); }
    if (t.closest("[data-hb-cover-photo]")) { var cpp = curPet(); if (t.closest(".hb-cam") || !cpp || !cpp.photo) return q("[data-hb-file2]").click(); q("[data-hb-viewimg]").src = cpp.photo; q("[data-hb-viewm]").hidden = false; document.documentElement.classList.add("gift-open"); return; }
    if (t.closest("[data-hb-view-change]")) { q("[data-hb-viewm]").hidden = true; document.documentElement.classList.remove("gift-open"); return q("[data-hb-file2]").click(); }
    if (t.closest("[data-hb-view-close]") || t === q("[data-hb-viewm]")) { q("[data-hb-viewm]").hidden = true; document.documentElement.classList.remove("gift-open"); return; }
    if (t.closest("[data-hb-crop-ok]")) return cropSave();
    if (t.closest("[data-hb-crop-x]") || t === q("[data-hb-cropm]")) { CR = null; q("[data-hb-cropm]").hidden = true; document.documentElement.classList.remove("gift-open"); return; }
    if (t.closest("[data-hb-photo]") || t.closest("[data-hb-photo-add]")) return q("[data-hb-file]").click();
    if (t.closest("[data-hb-photo-del]")) { formPhoto = ""; return showPhoto(); }
    if (t.closest("[data-hb-save-pet]")) {
      var n2 = q("#hb-pn").value.trim(); if (!n2) { q("#hb-pn").focus(); return; }
      var sp = q('[data-seg="hbsp"] .on'), spv = sp ? sp.getAttribute("data-v") : "", bd = JD.pb.get(), ep0 = editId ? db.pets.filter(function (x) { return x.id === editId; })[0] : null;
      var fv = { smsok: q("#hb-psms") && q("#hb-psms").checked ? 1 : 0, phone: q("#hb-ph").value.trim().replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); }), sex: segVal("hbsx"), neut: segVal("hbne"), name: n2, en: q("#hb-pe").value.trim(), owner: q("#hb-po").value.trim(), guardian: q("#hb-pg").value.trim(), breed: getBreed(), breedEn: q("#hb-pbe").value.trim(), species: spv, birth: bd };
      var perr = q("[data-hb-perr]"); perr.hidden = true;
      var useSrv = srvOn() && isDr() && (!ep0 || srvOf(ep0));
      if (srvOn() && ep0 && !isDr()) {   // سرپرست فقط عکس را عوض می‌کند
        ep0.photo = formPhoto; editId = null; q("[data-hb-petform]").hidden = true; save(); return render();
      }
      if (useSrv) {
        var cons = q("#hb-pcons").checked; if (!ep0 && !cons) { perr.textContent = "گرفتن رضایت سرپرست لازم است."; perr.hidden = false; return; }
        var pin = {}; for (var kp in fv) pin[kp] = fv[kp]; pin.code = ep0 ? ep0.srv.code : ""; pin.plan = ep0 ? ep0.plan || [] : []; pin.consent = cons || (ep0 && ep0.consent) ? 1 : 0;
        var sbtn = t.closest("[data-hb-save-pet]"); sbtn.disabled = true;
        api({ a: "savePet", t: tokGet(), pet: pin }).then(function (j) {
          sbtn.disabled = false; if (!j.ok) { perr.textContent = errMsg(j.err); perr.hidden = false; return; }
          var recs = ep0 ? db.recs.filter(function (r) { return r.pet === ep0.id; }) : [], pp = upsertSrv(j.pet, recs, j.pet.key);
          pp.photo = formPhoto || (ep0 && ep0.photo) || ""; db.cur = pp.id; editId = null; q("[data-hb-petform]").hidden = true; save(); if (!ep0 && pendingReq) { api({ a: "petReqSet", t: tokGet(), id: pendingReq, status: "done", code: j.pet.code }); pendingReq = ""; }
          render(); dview("pet");
          toast(ep0 ? "✅ اطلاعات " + (pp.name || "") + " ذخیره شد" : "✅ شناسنامهٔ " + (pp.name || "") + " صادر شد · شمارهٔ " + j.pet.code);
        });
        return;
      }
      if (ep0) { for (var k4 in fv) ep0[k4] = fv[k4]; ep0.photo = formPhoto; }
      else { var p = { id: uid(), plan: [], photo: formPhoto }; for (var k5 in fv) p[k5] = fv[k5]; db.pets.push(p); db.cur = p.id; }
      editId = null; q("[data-hb-petform]").hidden = true; save(); return render();
    }
    if (t.closest("[data-hb-mkplan]")) { var cp2 = curPet(); cp2.plan = buildPlan(cp2); save(); return render(); }
    if (t.closest("[data-hb-delplan]")) { if (confirm("برنامهٔ پیشنهادی حذف شود؟")) { curPet().plan = []; save(); render(); } return; }
    if ((b = t.closest("[data-hb-open-type]"))) { if (locked(b.getAttribute("data-hb-open-type"))) return; curType = b.getAttribute("data-hb-open-type"); sheetQuick = true; openSheet(); return; }
    if (t.closest("[data-hb-sort]")) { asc = !asc; return render(); }
    if ((b = t.closest("[data-hb-pgo]"))) return setPg(Number(b.getAttribute("data-hb-pgo")));
    if (t.closest("[data-hb-present]")) { editList = false; document.documentElement.classList.add("hb-present"); render(); window.scrollTo(0, 0); return; }
    if (t.closest("[data-hb-present-x]")) { document.documentElement.classList.remove("hb-present"); render(); return; }
    if (t.closest("[data-hb-vgo]") || t.closest("[data-hb-vuse]")) {
      var vuse = !!t.closest("[data-hb-vuse]"), vc = q("[data-hb-vcode]").value.trim().toUpperCase(), vr = q("[data-hb-vres]"); if (!vc) { q("[data-hb-vcode]").focus(); return; }
      vr.innerHTML = '<p class="hb-qmsg">در حال بررسی…</p>';
      api({ a: vuse ? "useCode" : "verifyCode", t: tokGet(), code: vc }).then(function (j) {
        if (j.err === "net" || j.err === "auth" || j.err === "server") { vr.innerHTML = '<div class="hb-vbox bad"><b>' + esc(errMsg(j.err)) + "</b></div>"; return; }
        var st = j.status, ex = j.exp ? new Date(j.exp).toLocaleDateString("fa-IR") : "", lab = esc(j.label || "");
        var msg = { valid: ["ok", "کد معتبر است ✓", "جایزه: <b>" + lab + "</b><br>اعتبار تا: " + ex], usedNow: ["ok", "ثبت شد: استفاده شد ✓", "جایزه: <b>" + lab + "</b>"], used: ["bad", "قبلاً استفاده شده", "جایزه: <b>" + lab + "</b>" + (j.usedAt ? "<br>زمان استفاده: " + esc(j.usedAt) : "")], expired: ["bad", "منقضی شده", "جایزه: <b>" + lab + "</b><br>اعتبار تا: " + ex], fake: ["bad", "کد جعلی", "امضای کد با سرور نمی‌خواند."], notfound: ["bad", "کد پیدا نشد", "این کد در شیت ثبت نشده است."], bad: ["bad", "قالب کد درست نیست", "قالب درست: DM-1234-ABCD"] }[st] || ["bad", "نتیجهٔ نامشخص", ""];
        vr.innerHTML = '<div class="hb-vbox ' + msg[0] + '"><b>' + msg[1] + "</b><p>" + msg[2] + "</p>" + (st === "valid" ? '<button type="button" class="btn small primary" data-hb-vuse>ثبت به‌عنوان استفاده‌شده</button>' : "") + "</div>";
      });
      return;
    }
    if ((b = t.closest("[data-hb-qopen]"))) {
      var qc = b.getAttribute("data-hb-qopen"); b.disabled = true; touchLog("pet", qc, (b.querySelector("b") || {}).textContent);
      api({ a: "get", t: tokGet(), code: qc }).then(function (j) { b.disabled = false; if (!j.ok) return alert(errMsg(j.err)); var p = upsertSrv(j.pet, j.recs, j.pet.key); db.cur = p.id; q("[data-hb-petform]").hidden = true; save(); render(); dview("pet"); });
      return;
    }
    if (t.closest("[data-hb-tosrv]")) {
      var cpm = curPet(); if (!cpm || srvOf(cpm) || !srvOn() || !isDr()) return;
      if (!confirm("رضایت سرپرست برای ذخیرهٔ اطلاعات روی سرور گرفته شده است؟")) return;
      var btn = t.closest("[data-hb-tosrv]"); btn.disabled = true; btn.textContent = "در حال ذخیره…";
      var pin = toSrvPet(cpm); pin.consent = 1;
      api({ a: "savePet", t: tokGet(), pet: pin }).then(function (j) {
        if (!j.ok) { btn.disabled = false; btn.textContent = "☁️ ذخیره روی سرور"; return alert(errMsg(j.err)); }
        var recs = db.recs.filter(function (r) { return r.pet === cpm.id; }), i = 0;
        (function next() {
          if (i >= recs.length) { cpm.srv = { code: j.pet.code, key: j.pet.key }; cpm.consent = true; save(); btn.disabled = false; btn.textContent = "☁️ ذخیره روی سرور"; return render(); }
          api({ a: "saveRec", t: tokGet(), code: j.pet.code, rec: toSrvRec(recs[i++]) }).then(function (r) { if (!r.ok) { btn.disabled = false; return alert(errMsg(r.err)); } next(); });
        })();
      });
      return;
    }
    if (t.closest("[data-hb-share]")) return isDr() ? openShare() : undefined;
    if (t.closest("[data-hb-drbtn]")) {
      if (isDr()) { if (!confirm("از حالت دکتر خارج می‌شوید؟")) return; try { localStorage.removeItem("dm_hb_dr"); } catch (x) {} purgeDrCache(); tokSet(""); applyRole(); return render(); }
      q("[data-hb-drm]").hidden = false; document.documentElement.classList.add("gift-open"); q("[data-hb-drpw]").value = ""; q("[data-hb-drpw]").type = "password"; q("[data-hb-drerr]").hidden = true; q("[data-hb-drpw]").focus(); return;
    }
    if (t.closest("[data-hb-dr-close]") || t === q("[data-hb-drm]")) return closeModal("[data-hb-drm]");
    if (t.closest("[data-hb-dr-ok]")) {
      var pw = q("[data-hb-drpw]").value.trim(), er0 = q("[data-hb-drerr]"), fin0 = function () { try { localStorage.setItem("dm_hb_dr", "1"); } catch (x) {} closeModal("[data-hb-drm]"); curType = "واکسن"; applyRole(); render(); if (!(DRPAGE && srvOn() && todayBox())) dview("list"); toast(SECP ? "خوش آمدید 👋" : "خوش آمدید خانم دکتر 👩‍⚕️"); };
      if (srvOn()) api({ a: "drLogin", pass: pw, rem: q("[data-hb-remember]").checked ? 1 : 0 }).then(function (j) { if (!j.ok) { er0.textContent = j.err === "auth" ? "رمز درست نیست." : errMsg(j.err); er0.hidden = false; return; } if (j.role === "sec" && !SECP) { er0.textContent = "این رمز مخصوص منشی است؛ از صفحهٔ منشی وارد شوید."; er0.hidden = false; return; } if (j.role === "mgr") { er0.textContent = "این رمز مدیر است؛ صفحهٔ مدیر هنوز ساخته نشده است."; er0.hidden = false; return; } tokSet(j.t); fin0(); });
      else checkDrPass(pw).then(function (ok) { if (!ok) { er0.textContent = "رمز درست نیست."; er0.hidden = false; return; } fin0(); });
      return;
    }
    if (t.closest("[data-hb-sh-close]") || t === q("[data-hb-shm]")) return closeModal("[data-hb-shm]");
    if (t.closest("[data-hb-sh-copy]") || t.closest("[data-hb-sh-copylink]")) {
      if (!shareLink) return; var onlyLink = !!t.closest("[data-hb-sh-copylink]"), txt = onlyLink ? shareLink : shareMsg(), bt = t.closest("button");
      var tmp = q("[data-hb-shlink]"); try { navigator.clipboard.writeText(txt).catch(function () { tmp.select(); document.execCommand("copy"); }); } catch (x) { tmp.select(); document.execCommand("copy"); }
      var old = bt.textContent; bt.textContent = "کپی شد ✓"; setTimeout(function () { bt.textContent = old; }, 1800); return;
    }
    if (t.closest("[data-hb-sh-wa]")) { if (!shareLink) return; var num = waNum(q("[data-hb-shnum]").value); window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(shareMsg()), "_blank", "noopener"); return; }
    if (t.closest("[data-hb-imp-no]") || t === q("[data-hb-impm]")) { pendingImport = null; closeModal("[data-hb-impm]"); try { history.replaceState(null, "", location.pathname); } catch (x) {} return; }
    if (t.closest("[data-hb-imp-yes]") || t.closest("[data-hb-imp-tmp]")) {
      var tmpMode = !!t.closest("[data-hb-imp-tmp]");
      if (pendingImport && pendingImport.live) {
        var lv = pendingImport.live, pl0 = upsertSrv(lv.pet, lv.recs, lv.key); db.cur = pl0.id; if (tmpMode) pl0.tmp = 1; else delete pl0.tmp; q("[data-hb-petform]").hidden = true; save(); pendingImport = null; closeModal("[data-hb-impm]"); try { history.replaceState(null, "", location.pathname); } catch (x) {} return render();
      }
      if (!pendingImport) return; var pi = pendingImport, ex = db.pets.filter(function (p) { return p.id === pi.pet.id; })[0];
      if (ex && !confirm("این پت قبلاً در دفترچهٔ شما هست. با اطلاعات جدید به‌روز شود؟")) return;
      if (ex) { pi.pet.photo = ex.photo || ""; db.pets = db.pets.map(function (p) { return p.id === pi.pet.id ? pi.pet : p; }); db.recs = db.recs.filter(function (r) { return r.pet !== pi.pet.id; }); } else db.pets.push(pi.pet);
      if (tmpMode) pi.pet.tmp = 1; else delete pi.pet.tmp;
      db.recs = db.recs.concat(pi.recs); db.cur = pi.pet.id; q("[data-hb-petform]").hidden = true; save(); pendingImport = null; closeModal("[data-hb-impm]"); try { history.replaceState(null, "", location.pathname); } catch (x) {} return render();
    }
    if (t.closest("[data-hb-qr]")) { var cq = curPet(); q("[data-hb-qrbox]").innerHTML = coverQr(cq); q("[data-hb-qrm]").hidden = false; document.documentElement.classList.add("gift-open"); return; }
    if (t.closest("[data-hb-qr-close]") || t === q("[data-hb-qrm]")) { q("[data-hb-qrm]").hidden = true; document.documentElement.classList.remove("gift-open"); return; }
    if (t.closest("[data-hb-qr-save]")) return savePng(q("[data-hb-qrbox] svg"), "qr-" + (curPet().en || "pet") + ".png");
    if (t.closest("[data-hb-shqr-save]")) return savePng(q("[data-hb-shqr] svg"), "share-" + (curPet().en || "pet") + ".png");
    if (t.closest("[data-hb-more]")) { showAll = !showAll; return render(); }
    if (t.closest("[data-hb-save]") || t.closest("[data-hb-saveno]")) {
      keepNext = !!t.closest("[data-hb-saveno]");
      var ed = editRecId ? db.recs.filter(function (r) { return r.id === editRecId; })[0] : null;
      if (locked(curType) || (editRecId && !ed)) return;
      var cp = curPet(); if (!cp) return; var d = JD.d.get(); if (!d) return; var c = cfg(curType), er = q("[data-hb-err]"), vals = {};
      var w = c.weight ? toolNum((q("#hb-w") || {}).value) : 0;
      if (c.weight && !(w > 0)) { er.textContent = "وزن را وارد کنید."; er.hidden = false; q("#hb-w").focus(); return; }
      for (var fi = 0; fi < c.f.length; fi++) { var ff = c.f[fi]; vals[ff.id] = fieldVal(ff); if (ff.req && !vals[ff.id]) { er.textContent = "«" + ff.label.replace(" (Lot / Batch)", "") + "» الزامی است."; er.hidden = false; var el0 = q("#hb-f-" + ff.id); if (el0) { el0.focus(); if (el0.tagName === "SELECT" && el0.value === "__o") q("#" + el0.id + "-o").focus(); } return; } }
      var nx = JD.x.get(), nm = vals.name || "", end = DURD[vals.dur] ? addDays(d, DURD[vals.dur]) : "";
      db.mem = db.mem || {};
      c.f.forEach(function (f) { var el = q("#hb-f-" + f.id); if (el && el.tagName === "SELECT" && el.value === "__o" && vals[f.id]) { var mk = curType + "|" + f.id; if (f.sel(cp.species).indexOf(vals[f.id]) < 0) { db.mem[mk] = db.mem[mk] || []; if (db.mem[mk].indexOf(vals[f.id]) < 0) db.mem[mk].push(vals[f.id]); } } });
      var fields = { date: d, name: nm, brand: vals.brand || "", serial: vals.serial || "", place: vals.place || "", extra: vals.extra || "", freq: vals.freq || "", how: vals.how || "", dur: vals.dur || "", end: end, weight: w || 0, next: nx, src: (isDr() && q("#hb-src") && q("#hb-src").value === "old") ? "old" : "" };
      function commit(srvRec) {
        if (ed) { for (var kf in fields) ed[kf] = fields[kf]; ed.closed = false; }
        else {
          db.recs.forEach(function (r) { if (r.pet === cp.id && r.type === curType && r.next && !r.closed && r.next <= d) r.closed = true; });
          (cp.plan || []).forEach(function (x) {
            if (x.done || x.type !== curType || Math.abs(days(x.date) - days(d)) > 10) return;
            if (curType === "ضدانگل داخلی" || (/گانه/.test(nm) && /گانه/.test(x.label)) || (/هاری/.test(nm) && /هاری/.test(x.label))) x.done = true;
          });
          var rec = srvRec || { id: uid(), pet: cp.id, type: curType, dr: isDr() ? 1 : 0 }; if (!srvRec) for (var k2 in fields) rec[k2] = fields[k2]; db.recs.push(rec);
        }
        editRecId = null; save();
        if (keepNext && !ed) { lastSrc = fields.src; render(); renderFields(); toast("ثبت شد؛ مورد بعدی را وارد کنید"); } else { lastSrc = ""; var okName = (curPet() || {}).name || ""; closeSheet(); render(); toast("✅ " + (ed ? "ویرایش ذخیره شد" : tl(curType) + " ثبت شد") + (okName ? " · " + okName : "")); }
      }
      var sv = srvOf(cp);
      if (sv && srvOn()) {
        var tmp = ed ? JSON.parse(JSON.stringify(ed)) : { id: uid(), type: curType }; for (var k3 in fields) tmp[k3] = fields[k3]; tmp.closed = false;
        q("[data-hb-save]").disabled = true;
        api(isDr() ? { a: "saveRec", t: tokGet(), code: sv.code, rec: toSrvRec(tmp) } : { a: "ownerAddRec", code: sv.code, key: sv.key, rec: toSrvRec(tmp) }).then(function (j) {
          q("[data-hb-save]").disabled = false;
          if (!j.ok) { er.textContent = errMsg(j.err); er.hidden = false; return; }
          if (j.pet && j.pet.neut) cp.neut = j.pet.neut; var srec = normRec(j.rec); srec.pet = cp.id; commit(ed ? null : srec);
        });
        return;
      }
      commit(null); return;
    }
    if (false) {      editRecId = null; save(); closeSheet(); return render();
    }
    if ((b = t.closest("[data-hb-stab]"))) { editRecId = null; if (b.getAttribute("data-hb-stab") === "new") { renderTypes(); renderFields(); q("[data-hb-save]").textContent = "ثبت"; } return showTab(b.getAttribute("data-hb-stab")); }
    if ((b = t.closest("[data-hb-redit]"))) return startEdit(b.getAttribute("data-hb-redit"));
    if ((b = t.closest("[data-hb-rdel]"))) { var rid2 = b.getAttribute("data-hb-rdel"), r2 = db.recs.filter(function (r) { return r.id === rid2; })[0]; if (r2 && (isDr() || !r2.dr) && confirm("این مورد حذف شود؟")) {
        var fin = function () { db.recs = db.recs.filter(function (r) { return r.id !== rid2; }); save(); renderHist(); render(); }, svd = srvOf(curPet());
        if (svd && srvOn()) api(isDr() ? { a: "delRec", t: tokGet(), code: svd.code, id: rid2 } : { a: "ownerDelRec", code: svd.code, key: svd.key, id: rid2 }).then(function (j) { if (j.ok) fin(); else alert(errMsg(j.err)); });
        else fin();
      } return; }
    if ((b = t.closest("[data-hb-add]"))) { xTouched = true; JD.x.set(addMonths(JD.d.get(), Number(b.getAttribute("data-hb-add")))); return; }
    if ((b = t.closest("[data-hb-usesug]"))) { xTouched = true; JD.x.set(b.getAttribute("data-hb-usesug")); return; }
    if (t.closest("[data-hb-clear]")) { xTouched = true; JD.x.set(""); return; }
    if ((b = t.closest("[data-hb-del]"))) { var dr0 = db.recs.filter(function (r) { return r.id === b.getAttribute("data-hb-del"); })[0]; if (dr0 && dr0.dr && !isDr()) return; if (confirm("این مورد حذف شود؟")) { var id = b.getAttribute("data-hb-del"); db.recs = db.recs.filter(function (r) { return r.id !== id; }); save(); render(); } return; }
    if ((b = t.closest("[data-hb-done]"))) {
      var pr = b.getAttribute("data-hb-done").split(":"), kd = pr[0], rid = pr[1]; var dn = allRem().filter(function (r) { return r.kind === kd && r.id === rid; })[0]; if (dn && locked(dn.type)) return;
      var cpd = curPet(), svn = srvOf(cpd);
      if (svn && srvOn()) {
        if (kd === "rec") {
          var r0 = db.recs.filter(function (r) { return r.id === rid; })[0]; if (!r0) return;
          if (!isDr()) { cpd.lc = cpd.lc || {}; cpd.lc[rid] = 1; save(); return render(); }
          var t0 = JSON.parse(JSON.stringify(r0)); t0.closed = true;
          api({ a: "saveRec", t: tokGet(), code: svn.code, rec: toSrvRec(t0) }).then(function (j) { if (!j.ok) return alert(errMsg(j.err)); r0.closed = true; save(); render(); }); return;
        }
        var px = (cpd.plan || []).filter(function (x) { return x.id === rid; })[0]; if (!px) return;
        var nr = { id: uid(), type: px.type, date: ymd(new Date()), name: px.label || "" };
        api(isDr() ? { a: "saveRec", t: tokGet(), code: svn.code, rec: nr } : { a: "ownerAddRec", code: svn.code, key: svn.key, rec: nr }).then(function (j) {
          if (!j.ok) return alert(errMsg(j.err));
          var f2 = normRec(j.rec); f2.pet = cpd.id; db.recs.push(f2);
          if (isDr()) { px.done = true; api({ a: "savePet", t: tokGet(), pet: toSrvPet(cpd) }); } else { cpd.lc = cpd.lc || {}; cpd.lc[rid] = 1; }
          save(); render();
        }); return;
      }
      if (kd === "rec") db.recs.forEach(function (r) { if (r.id === rid) r.closed = true; });
      else db.pets.forEach(function (p) { (p.plan || []).forEach(function (x) { if (x.id === rid) { x.done = true; db.recs.push({ id: uid(), pet: p.id, type: x.type, date: ymd(new Date()), name: x.label, brand: "", serial: "", place: "", extra: "", weight: 0, next: "" }); } }); });
      save(); return render();
    }
    if ((b = t.closest("[data-hb-ics]"))) {
      var pr2 = b.getAttribute("data-hb-ics").split(":"), it = allRem().filter(function (r) { return r.kind === pr2[0] && r.id === pr2[1]; })[0]; if (!it) return;
      var pp = db.pets.filter(function (x) { return x.id === it.pet; })[0], ds = it.date.replace(/-/g, ""), now = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
      var sm = (pp ? pp.name + " - " : "") + it.type + (it.label ? ": " + it.label : "");
      return dl("nobat.ics", "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//drniloofarmosavat//hb//FA\r\nBEGIN:VEVENT\r\nUID:" + it.id + "@drniloofarmosavat.ir\r\nDTSTAMP:" + now + "\r\nDTSTART;VALUE=DATE:" + ds + "\r\nSUMMARY:" + sm.replace(/[,;\\\n]/g, " ") + "\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n", "text/calendar");
    }
    if (t.closest("[data-hb-export]")) return dl("daftarche-salamat-pet.json", JSON.stringify(db), "application/json");
    if (t.closest("[data-hb-print]")) return window.print();
    if (t.closest("[data-hb-del-pet]")) {
      var c = curPet(), svc = srvOf(c); if (c && confirm(svc && isDr() ? "پت «" + c.name + "» از سرور هم برای همیشه حذف شود؟" : "پت «" + c.name + "» و همهٔ سابقه‌اش از این گوشی حذف شود؟")) { if (svc && isDr() && srvOn()) api({ a: "deletePet", t: tokGet(), code: svc.code }); db.recs = db.recs.filter(function (r) { return r.pet !== c.id; }); db.pets = db.pets.filter(function (p) { return p.id !== c.id; }); db.cur = db.pets[0] ? db.pets[0].id : null; save(); render(); if (isDr()) dview("list"); }
    }
  });
  q("[data-hb-import]").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return; var rd = new FileReader();
    rd.onload = function () { try { var d = JSON.parse(rd.result); if (!d.pets || !d.recs) throw 0; if (confirm("دفترچهٔ فعلی با نسخهٔ پشتیبان جایگزین شود؟")) { db = d; q("[data-hb-petform]").hidden = true; save(); render(); } } catch (x) { alert("فایل پشتیبان معتبر نیست."); } e.target.value = ""; };
    rd.readAsText(f);
  });
  var dp = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); dp = e; q("[data-hb-install]").hidden = false; });
  q("[data-hb-do-install]").addEventListener("click", function () { if (dp) { dp.prompt(); dp = null; q("[data-hb-install]").hidden = true; } });
  if (/iphone|ipad/i.test(navigator.userAgent) && !window.navigator.standalone) q("[data-hb-ios]").hidden = false;
  (function () { var w = q("[data-hb-wa]"); if (w && INFO.whatsapp) w.href = "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent("سلام دکتر مساوات، می‌خواهم شناسنامهٔ سلامت پتم را بگیرم."); var vci = q("[data-hb-vcode]"); if (vci) vci.addEventListener("keydown", function (e) { if (e.key === "Enter") q("[data-hb-vgo]").click(); }); var pwi = q("[data-hb-drpw]"); if (pwi) pwi.addEventListener("keydown", function (e) { if (e.key === "Enter") q("[data-hb-dr-ok]").click(); }); })();
  // ---- درخواست شناسنامه (سرپرست) ----
  (function () {
    var m = q("[data-hb-reqm]"); if (!m) return;
    var form = m.querySelector("[data-hb-rqform]"), okb = m.querySelector("[data-hb-rqok]"), err = m.querySelector("[data-hb-rqerr]");
    function g(id) { return m.querySelector("#" + id).value.trim(); }
    function seg() { var b = m.querySelector('[data-seg="hb-rq-sp"] .on'); return b ? b.getAttribute("data-v") : "سگ"; }
    root.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest && t.closest("[data-hb-req]")) {
        form.hidden = false; okb.hidden = true; err.hidden = true;
        var cp = curPet(); m.querySelector("#hb-rq-owner").value = (cp && cp.owner) || m.querySelector("#hb-rq-owner").value;
        m.hidden = false; document.documentElement.classList.add("gift-open"); return;
      }
      if (t.closest && (t.closest("[data-hb-rq-close]") || t === m)) { m.hidden = true; document.documentElement.classList.remove("gift-open"); return; }
      if (t.closest && t.closest("[data-hb-rq-send]")) {
        var btn = t.closest("[data-hb-rq-send]"), digits = g("hb-rq-contact").replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/\D/g, "");
        err.hidden = true;
        if (!g("hb-rq-name")) { err.textContent = "نام پت را بنویسید."; err.hidden = false; return; }
        if (!g("hb-rq-owner")) { err.textContent = "نام سرپرست را بنویسید."; err.hidden = false; return; }
        if (digits.length < 10) { err.textContent = "شمارهٔ تماس را کامل بنویسید."; err.hidden = false; return; }
        btn.disabled = true; btn.textContent = "در حال ارسال…";
        api({ a: "petReqSubmit", name: g("hb-rq-name"), species: seg(), owner: g("hb-rq-owner"), contact: g("hb-rq-contact"), birth: g("hb-rq-birth"), note: g("hb-rq-note"), hp: g("hb-rq-hp") }).then(function (j) {
          btn.disabled = false; btn.textContent = "ارسال درخواست";
          if (!j.ok) { err.textContent = j.err === "busy" ? "تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره امتحان کنید." : j.err === "net" ? "اتصال با سرور برقرار نشد. اینترنت را بررسی کنید." : "ارسال انجام نشد؛ اطلاعات را بررسی کنید."; err.hidden = false; return; }
          form.hidden = true; okb.hidden = false;
          okb.innerHTML = "<h2>✅ درخواست شما ثبت شد</h2><p>کد پیگیری: <bdi dir=\"ltr\">" + esc(j.id) + "</bdi><br>دکتر شناسنامه را می‌سازد و لینک یا QR آن را برایتان می‌فرستد. اگر عجله دارید، همین الان در واتساپ هم خبر بدهید.</p>"
            + '<div class="hb-btns hb-center"><a class="btn small primary" target="_blank" rel="noopener" href="https://wa.me/' + INFO.whatsapp + "?text=" + encodeURIComponent("سلام دکتر، درخواست شناسنامه برای «" + g("hb-rq-name") + "» ثبت کردم. کد: " + j.id) + '">خبر دادن در واتساپ</a><button type="button" class="btn small ghost" data-hb-rq-close>بستن</button></div>';
        });
      }
    });
  })();
  // ---- شمارندهٔ تب‌ها (دکتر) ----
  var tabBase = {};
  var tabCnt = {};
  function grpBadges() { var G = { clients: ["today", "appt"], book: ["req"], more: ["adopt"] }; [].forEach.call(root.querySelectorAll("[data-hb-grp]"), function (gb) { var g = gb.getAttribute("data-hb-grp"), sum = 0; (G[g] || []).forEach(function (v) { sum += (g === "clients" && v === "appt") ? apFutureCount() : (tabCnt[v] || 0); }); if (!gb.getAttribute("data-base")) gb.setAttribute("data-base", gb.textContent); gb.textContent = gb.getAttribute("data-base") + (sum ? " (" + toolFa(sum) + ")" : ""); gb.classList.toggle("has-new", sum > 0); }); }
  var apRemShown = "";
  function apRemind() {   // یادآوری ورود: دکتر نوبت امروز یا روزهای بعد دارد
    if (!DRPAGE || SECP || !isDr() || !apItems.length) return; var td = apToday || isoNow(), up = apItems.filter(function (r) { return r.status === "booked" && r.date >= td && !isQueue(r) && !(r.date === td && cameOn(r)); }), nt = up.filter(function (r) { return r.date === td; }).length, key = td + ":" + up.length;
    var old = ""; try { old = sessionStorage.getItem("dm_hb_apr") || ""; } catch (e) {}
    if (!up.length || apRemShown === key || old === key || q("[data-hb-apalert]")) return;
    apRemShown = key; var el = document.createElement("div"); el.className = "hb-apalert"; el.setAttribute("data-hb-apalert", "");
    el.innerHTML = "<span>🗓 <b>شما " + toolFa(up.length) + " نوبت ویزیت دارید</b>" + (nt ? " (امروز: " + toolFa(nt) + ")" : "") + '</span><div><button type="button" class="btn small primary" data-hb-apalgo="' + (nt ? "today" : "upcoming") + '">مشاهده</button><button type="button" class="btn small ghost" data-hb-apalx>بستن</button></div>';
    var nav = q(".hb-drnav"); if (nav) nav.parentNode.insertBefore(el, nav); else root.insertBefore(el, root.firstChild);
  }
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t.closest) return; var g = t.closest("[data-hb-apalgo]"), x = t.closest("[data-hb-apalx]"); if (!g && !x) return;
    var el = q("[data-hb-apalert]"); try { sessionStorage.setItem("dm_hb_apr", (apToday || isoNow()) + ":" + apItems.filter(function (r) { return r.status === "booked" && r.date >= (apToday || isoNow()) && !isQueue(r) && !(r.date === (apToday || isoNow()) && cameOn(r)); }).length); } catch (e2) {}
    if (el) el.remove(); if (g) { apFilter = g.getAttribute("data-hb-apalgo"); dview("appt"); }
  });
  function apPoll() { if (!DRPAGE || SECP || document.hidden || !srvOn() || !isDr()) return; api({ a: "apList", t: tokGet() }).then(function (j) { if (j && j.ok) { apItems = j.items || []; apToday = j.today || apToday || isoNow(); setTabCount("appt", apCountAll()); apRemind(); } }); }
  setInterval(apPoll, 60000); setTimeout(apPoll, 3000); document.addEventListener("visibilitychange", function () { if (!document.hidden) apPoll(); });
  function apFutureCount() { var td = apToday || isoNow(); return apItems.filter(function (r) { return r.status === "booked" && r.date > td && !isQueue(r); }).length; }
  function apCountAll() { var td = apToday || isoNow(); return apItems.filter(function (r) { return r.status === "booked" && r.date >= td && !isQueue(r) && !(r.date === td && cameOn(r)); }).length; }
  function setTabCount(v, n) { tabCnt[v] = n; grpBadges(); var b = q('[data-hb-dtab="' + v + '"]'); if (!b) return; if (!tabBase[v]) tabBase[v] = b.textContent;
    if (v === "appt") { b.innerHTML = esc(tabBase[v]) + (n ? ' <span class="hb-apdot">' + toolFa(n) + "</span>" : ""); b.classList.remove("has-new"); return; } b.textContent = tabBase[v] + (n ? " (" + toolFa(n) + ")" : ""); b.classList.toggle("has-new", n > 0); }
  function tabCounts() {
    if (!(isDr() && srvOn())) return;
    api({ a: "petReqList", t: tokGet() }).then(function (j) { if (j.ok) { rqItems = j.items; setTabCount("req", rqItems.filter(function (r) { return r.status === "new"; }).length); } });
    api({ a: "adoptAdmin", t: tokGet() }).then(function (j) { if (j.ok) { adItems = j.items; setTabCount("adopt", adItems.filter(function (r) { return r.status === "pending"; }).length); } });
  }
  // ---- درخواست‌های شناسنامه (دکتر) ----
  var rqItems = [];
  function rqLoad() {
    var box = q("[data-hb-rqlist]"); box.innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>';
    api({ a: "petReqList", t: tokGet() }).then(function (j) { if (!j.ok) { box.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; } rqItems = j.items; rqRender(); });
  }
  function rqRender() {
    var b = q('[data-seg="hb-rqf"] .on'), f = b ? b.getAttribute("data-v") : "new", box = q("[data-hb-rqlist]");
    setTabCount("req", rqItems.filter(function (r) { return r.status === "new"; }).length);
    var list = rqItems.filter(function (r) { return f === "closed" ? r.status !== "new" : r.status === "new"; });
    box.innerHTML = list.length ? list.map(function (r) {
      var btns = r.status === "new" ? '<button type="button" class="btn small primary" data-hb-rqissue data-id="' + esc(r.id) + '">✅ صدور شناسنامه</button><button type="button" class="btn small hb-danger" data-hb-rqact="rejected" data-id="' + esc(r.id) + '">رد</button>'
        : '<button type="button" class="btn small" data-hb-rqact="new" data-id="' + esc(r.id) + '">بازگرداندن به جدید</button>';
      return '<article class="hb-adc"><div class="hb-adh"><b>' + esc(r.name) + "</b><span>" + esc(r.species) + " · سرپرست: " + esc(r.owner) + '</span><em class="ad-' + (r.status === "new" ? "pending" : r.status === "done" ? "done" : "rejected") + '">' + (r.status === "new" ? "جدید" : r.status === "done" ? "صادر شد" : "ردشده") + "</em></div>"
        + (r.birth ? "<p>تولد: " + esc(r.birth) + "</p>" : "") + (r.note ? "<p>توضیح: " + esc(r.note) + "</p>" : "")
        + '<p>📞 <a href="tel:' + esc(r.contact) + '" dir="ltr">' + esc(r.contact) + '</a> · کد <bdi dir="ltr">' + esc(r.id) + "</bdi>" + (r.code ? ' · شناسنامه <bdi dir="ltr">' + esc(r.code) + "</bdi>" : "") + "</p>"
        + '<div class="hb-adb">' + btns + '<button type="button" class="btn small ghost hb-danger" data-hb-rqact="deleted" data-id="' + esc(r.id) + '">🗑 حذف</button></div></article>';
    }).join("") : '<p class="hb-qmsg">موردی نیست.</p>';
  }
  root.addEventListener("click", function (e) {
    var t = e.target, b2;
    if (t.closest && t.closest('[data-seg="hb-rqf"] button')) { setTimeout(rqRender, 0); return; }
    if ((b2 = t.closest && t.closest("[data-hb-rqact]"))) {
      var st = b2.getAttribute("data-hb-rqact"), id = b2.getAttribute("data-id");
      if (st === "deleted" && !confirm("این درخواست حذف شود؟")) return;
      b2.disabled = true; api({ a: "petReqSet", t: tokGet(), id: id, status: st }).then(function (j) { if (!j.ok) { b2.disabled = false; return alert(errMsg(j.err)); } rqLoad(); });
      return;
    }
    if ((b2 = t.closest && t.closest("[data-hb-rqissue]"))) {
      var rid = b2.getAttribute("data-id"), it = rqItems.filter(function (x) { return x.id === rid; })[0]; if (!it) return;
      dview("new"); petForm(null); pendingReq = rid;
      q("#hb-pn").value = it.name; q("#hb-po").value = it.owner;
      var sb = q('[data-seg="hbsp"] [data-v="' + it.species + '"]'); if (sb) sb.click();
      toast("اطلاعات درخواست وارد شد؛ تاریخ تولد و رضایت را کامل کنید");
      var pf = q("[data-hb-petform]"); if (pf && pf.scrollIntoView) pf.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ---- بیماران من (دفتر مراجعات دکتر) ----
  var PT_REASONS = ["معاینهٔ عمومی / چکاپ", "واکسیناسیون", "ضدانگل (کرم‌کشی، کک و کنه)", "ویزیت بیماری", "مشکل گوارشی (استفراغ، اسهال)", "مشکل پوست و مو", "مشکل چشم و گوش", "مشکل دهان و دندان", "لنگش، شکستگی یا تصادف", "آزمایش یا تصویربرداری", "عقیم‌سازی", "جراحی", "پیگیری درمان", "مشاوره (تغذیه، رفتار)"];
  var ptPre = null, ptFromAp = "", ptItems = [], ptLoaded = false, ptMode = "list", ptCur = "", ptEditV = null, PTJ = {}, ptPending = "";
  function isoNow() { var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; }; return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); }
  function isoPlus(iso, n) { var d = new Date(iso + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function faDigits(s) { return String(s || "").replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); }); }
  function ptBox() { return q("[data-hb-ptbox]"); }
  function ptF(n) { return ptBox().querySelector('[data-pt="' + n + '"]'); }
  function ptGroup(k) { return ptItems.filter(function (r) { return r.pkey === k; }).sort(function (a, b) { var x = (a.date || "") + " " + (a.created || ""), y = (b.date || "") + " " + (b.created || ""); return x < y ? 1 : x > y ? -1 : 0; }); }   // جدید به قدیم (تاریخ و ساعت ثبت)
  function ptGroups() { var map = {}, order = []; ptItems.forEach(function (r) { if (!map[r.pkey]) { map[r.pkey] = []; order.push(r.pkey); } map[r.pkey].push(r); }); return order.map(function (k) { return map[k]; }); }
  function ptLoad() {
    if (ptBox() && ptMode === "list" && !ptLoaded) ptBox().innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>';
    api({ a: "patList", t: tokGet() }).then(function (j) { if (!j.ok) { ptBox().innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; } ptItems = j.items || []; ptLoaded = true; if (ptPending) { ptCur = ptPending; ptPending = ""; if (ptGroup(ptCur).length) { ptMode = "file"; ptEditV = null; } } if (ptMode === "new") return; ptShow(); });
  }
  function ptEnter() { ptMode = "list"; ptEditV = null; if (ptLoaded) ptShow(); else ptLoad(); }
  var FU_REASONS = ["ویزیت مجدد"].concat(PT_REASONS);
  function reasonSel(attr, list, ph) { return '<select data-' + attr + '="r">' + list.map(function (r) { return '<option value="' + esc(r) + '">' + esc(r) + "</option>"; }).join("") + '<option value="__other">سایر (خودم می‌نویسم)…</option></select><input data-' + attr + '="rx" type="text" maxlength="150" placeholder="' + ph + '" hidden>'; }
  var VDATE = '<p class="hb-vdl"><a href="#" data-hb-vdshow>📅 تاریخ مراجعه: امروز · تغییر تاریخ</a></p><div class="fld" data-hb-vdate hidden><label>تاریخ مراجعه</label><div class="jd" data-pjd="d"></div></div>';
  function ptVisitFields(v) {
    if (SECP) return VDATE + '<div class="fld"><label>دلیل مراجعه <small>(کوتاه)</small></label><input data-pt="reasonx" type="text" maxlength="150" placeholder="مثلاً: واکسن، ویزیت، آزمایش"></div>';
    return VDATE
      + '<div class="fld"><label>دلیل مراجعه</label><select data-pt="reason"><option value="">— علت تخصصی مراجعه را انتخاب کنید —</option>' + PT_REASONS.map(function (r) { return '<option value="' + esc(r) + '">' + esc(r) + "</option>"; }).join("") + '<option value="__other">سایر (خودم می‌نویسم)…</option></select><input data-pt="reasonx" type="text" maxlength="150" placeholder="دلیل مراجعه را بنویسید" hidden></div>'
      + '<div class="fld"><label>🔍 یافته‌ها <small>(معاینه، علائم)</small></label><textarea data-pt="find" rows="3" maxlength="700"></textarea></div>'
      + '<div class="fld"><label>💊 تشخیص و درمان</label><textarea data-pt="note" rows="3" maxlength="800"></textarea></div>'
      + '<details class="hb-ptmore" data-hb-ptmore><summary>📅 مراجعهٔ بعدی (پیامک یادآور خودکار)</summary><div class="fld"><label>چه روزی بیاید؟ <small>(اختیاری)</small></label><div class="jd" data-pjd="f"></div></div>'
      + '<div class="fld"><label>به چه دلیل؟</label><select data-pt="fureason">' + FU_REASONS.map(function (r) { return '<option value="' + esc(r) + '">' + esc(r) + "</option>"; }).join("") + '<option value="__other">سایر (خودم می‌نویسم)…</option></select><input data-pt="fureasonx" type="text" maxlength="150" placeholder="دلیل مراجعهٔ بعدی" hidden></div></details>';
  }
  // یادداشت دکتر در یک ستون ذخیره می‌شود: «یافته‌ها: …» و «تشخیص و درمان: …»
  var NF = "یافته‌ها: ", ND = "تشخیص و درمان: ";
  var NC = "شکایت پذیرش: ";
  function noteJoin(f, d, c) { f = String(f || "").trim(); d = String(d || "").trim(); c = String(c || "").trim(); if (!f && !d) return ""; return (c ? NC + c + "\n" : "") + (f ? NF + f : "") + (f && d ? "\n" : "") + (d ? ND + d : ""); }
  function noteSplit(n) {
    n = String(n || ""); var c = "", k = n.indexOf(NC); if (k > -1) { var e = n.indexOf("\n", k); c = n.slice(k + NC.length, e > -1 ? e : undefined).trim(); n = (n.slice(0, k) + (e > -1 ? n.slice(e + 1) : "")).trim(); }
    var i = n.indexOf(NF), j = n.indexOf(ND); if (i < 0 && j < 0) return { f: "", d: n, c: c }; var f = i > -1 ? n.slice(i + NF.length, j > i ? j : undefined).trim() : "", d = j > -1 ? n.slice(j + ND.length, i > j ? i : undefined).trim() : ""; return { f: f, d: d, c: c };
  }
  function hasClin(n) { var o = noteSplit(n); return !!(o.f || o.d); }
  function ptSetReason(r) { var sel = ptF("reason"), rx = ptF("reasonx"); if (!sel) { if (rx) rx.value = r || ""; return; } if (r && PT_REASONS.indexOf(r) < 0) { sel.value = "__other"; rx.value = r; rx.hidden = false; } else sel.value = r || ""; }
  function ptInitVisit(v) {
    var box = ptBox(); PTJ.d = initJd(box.querySelector('[data-pjd="d"]'), { minY: -10, maxY: 0 }); PTJ.d.set(v && v.date || isoNow()); if (v && v.date && v.date !== isoNow()) { box.querySelector("[data-hb-vdate]").hidden = false; box.querySelector(".hb-vdl").hidden = true; }
    ptSetReason(v && v.reason || "");
    if (SECP) return;
    PTJ.f = initJd(box.querySelector('[data-pjd="f"]'), { optional: true, minY: -1, maxY: 2 }); PTJ.f.set(v && v.follow || ""); var mo = box.querySelector("[data-hb-ptmore]"); if (mo && v && v.follow) mo.open = true;
    var np = noteSplit(v && v.note || ""); ptF("find").value = np.f; ptF("note").value = np.d;
    var sel = ptF("reason"), rx = ptF("reasonx"), fs = ptF("fureason"), fx = ptF("fureasonx");
    sel.addEventListener("change", function () { rx.hidden = sel.value !== "__other"; if (!rx.hidden) rx.focus(); });
    fs.addEventListener("change", function () { fx.hidden = fs.value !== "__other"; if (!fx.hidden) fx.focus(); });
  }
  function ptVisitVals() {
    if (SECP) return { date: PTJ.d.get(), reason: ptF("reasonx").value.trim(), note: "", follow: "", fu: "" };
    var sel = ptF("reason"), fs = ptF("fureason");
    var compl = ptEditV ? noteSplit(ptEditV.note).c : ""; if (!compl && (!ptEditV || ptEditV === emptyTodayVisit(ptCur)) && !visitedToday(ptCur)) { var tv = emptyTodayVisit(ptCur); compl = tv ? tv.reason : qReasonFor(ptCur); }
    return { date: PTJ.d.get(), reason: sel.value === "__other" ? ptF("reasonx").value.trim() : sel.value, note: noteJoin(ptF("find").value, ptF("note").value, compl), follow: PTJ.f.get(), fu: fs.value === "__other" ? ptF("fureasonx").value.trim() : fs.value };
  }
  // مراجعهٔ بعدی دکتر = یک نوبت با پیامک یادآور
  function ptFollowAppt(g, pkey, vv) {
    if (!vv.follow) return;
    api({ a: "apSave", t: tokGet(), id: "", v: { date: vv.follow, time: "", name: g.name, species: g.species, owner: g.owner, phone: g.phone, reason: vv.fu || "ویزیت مجدد", note: "مراجعهٔ بعدی (تعیین‌شده توسط دکتر)", pkey: pkey, rem: g.phone ? 1 : 0 } }).then(function (j) { if (j.ok) { apItems.push(j.item); toast("📅 مراجعهٔ بعدی ثبت شد · " + wdOf(vv.follow) + " " + jLabel(vv.follow) + (g.phone ? " · پیامک یادآور می‌رود" : " · (بدون شماره، پیامکی نمی‌رود)"), 6000); } else toast("⚠️ مراجعهٔ بعدی ثبت نشد: " + errMsg(j.err), 7000); });
  }
  function ptSpecies(sel) { return '<div class="seg" data-seg="hb-ptsp">' + ["سگ", "گربه", "پرنده", "دیگر"].map(function (x) { return '<button type="button"' + (x === (sel || "سگ") ? ' class="on"' : "") + ' data-v="' + x + '">' + x + "</button>"; }).join("") + "</div>"; }
  // نژاد: لیست کشویی بر اساس گونه + «سایر» برای نوشتن دستی
  var BR_MIX = "مخلوط / نامشخص";
  function breedFld(attr, val) { return '<div class="fld"><select data-hb-brsel="' + attr + '" aria-label="نژاد"></select><input data-' + attr + '="breed" type="text" maxlength="40" placeholder="نژاد را بنویسید" aria-label="نژاد" value="' + esc(val || "") + '" hidden></div>'; }
  function brFill(box, attr) {
    if (!box) return; var sel = box.querySelector('[data-hb-brsel="' + attr + '"]'), inp = box.querySelector('[data-' + attr + '="breed"]'); if (!sel || !inp) return;
    var sp = segVal("hb-ptsp") || "سگ", list = (BR[sp] || []).map(function (x) { return x[0]; }).slice().sort(function (a, b) { return a.localeCompare(b, "fa"); }), v = inp.value.trim();
    if (!list.length) { sel.hidden = true; inp.hidden = false; return; }
    var inList = !v || v === BR_MIX || list.indexOf(v) > -1; sel.hidden = false;
    sel.innerHTML = '<option value="">نژاد (اختیاری)</option>' + list.map(function (n) { return '<option value="' + esc(n) + '"' + (n === v ? " selected" : "") + ">" + esc(n) + "</option>"; }).join("") + '<option value="' + BR_MIX + '"' + (v === BR_MIX ? " selected" : "") + ">" + BR_MIX + '</option><option value="__other"' + (!inList ? " selected" : "") + ">سایر (خودم می‌نویسم)…</option>";
    inp.hidden = inList;
  }
  function brAll() { brFill(apBox(), "ap"); brFill(ptBox(), "pt"); }
  document.addEventListener("change", function (e) {
    var sel = e.target, attr = sel && sel.getAttribute && sel.getAttribute("data-hb-brsel"); if (!attr) return;
    var inp = sel.parentNode.querySelector('[data-' + attr + '="breed"]'); if (!inp) return;
    if (sel.value === "__other") { inp.hidden = false; inp.value = ""; inp.focus(); } else { inp.hidden = true; inp.value = sel.value; }
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest('[data-seg="hb-ptsp"] button'); if (!b) return;
    setTimeout(function () { [["ap", apBox()], ["pt", ptBox()]].forEach(function (x) { var inp = x[1] && x[1].querySelector('[data-' + x[0] + '="breed"]'); if (inp && x[1].querySelector('[data-hb-brsel="' + x[0] + '"]')) { inp.value = ""; brFill(x[1], x[0]); } }); }, 0);
  });
  function box0() { return ptBox().querySelectorAll("[data-hb-ptsavenew]"); }
  function ptReasonSel() {
    return '<select data-pt="reason" aria-label="دلیل مراجعه"><option value="">دلیل مراجعه</option>' + (SECP ? CP : AP_REASONS).map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + "</option>"; }).join("") + '<option value="__other">سایر (قابل نوشتن)…</option></select><input data-pt="reasonx" type="text" maxlength="150" placeholder="دلیل را بنویسید" hidden>';
  }
  function ptNewVals() { var sl = ptF("reason"); return { date: isoNow(), reason: sl.value === "__other" ? ptF("reasonx").value.trim() : sl.value, note: "", follow: "", fu: "" }; }
  var NM_F = "نیلوفر سارا مریم زهرا فاطمه نرگس شیما مهسا سمانه الهام ندا لیلا سحر پریسا پریا مینا سپیده آتنا آیدا ترانه هانیه یاسمن یاسمین نازنین نسترن نگار نگین شبنم شقایق شادی شیرین مهشید مرجان رویا رها ریحانه زینب معصومه الناز الهه بهار بهناز پرستو پروین فرزانه فریبا فرشته کتایون گلناز گلنوش گیتا ماهرخ مژگان مهناز مهدیس مبینا مائده ملیکا مهتاب نازی نسیم نجمه نفیسه هستی هدیه هلیا هما یلدا ژاله ژیلا سوگند سودابه سمیرا ستاره سیمین صبا صدف ساناز سهیلا سوسن شهرزاد شهلا شکوفه طاهره عاطفه عسل عطیه غزل فرناز فروغ کیمیا کوثر لادن لاله مارال مانیا محبوبه مرضیه منیره منا مهری میترا ناهید نرجس نیکی نیلا وحیده ویدا پگاه پانته‌آ آوا آزاده آرزو اکرم افسانه افسر اعظم اشرف بتول بنفشه پوران پونه تینا ثمین جمیله حانیه حدیث حلیمه خدیجه دنیا دلارام راضیه رقیه رعنا زیبا ساره سولماز سیما شراره شهین فاطیما فاطمه‌زهرا فریده لیدا مستانه ملیحه مهین نازیلا نغمه نیکا نسرین نوشین هاجر هانیه هلن هنگامه".split(/\s+/),
      NM_M = "علی محمد حسین حسن رضا مهدی امیر امیرحسین امیررضا محمدرضا محمدحسین مجید حمید سعید فرهاد بهرام بهزاد کامران کیوان آرش آرمان آریا پارسا پویا پوریا پژمان سینا سامان سجاد سروش شهرام شاهین صادق صالح طاها عباس عبدالله عرفان علیرضا فرزاد فرشید فریدون قاسم کاوه کریم کوروش مازیار مسعود مصطفی منصور مهران مهرداد میلاد ناصر نیما نوید هادی هاشم همایون وحید یاسر یاشار یوسف یونس ابراهیم احسان احمد اسماعیل اکبر امین ایمان بابک بهروز بیژن پیمان تورج جواد جمشید جلال حامد حبیب حمیدرضا خسرو داود دانیال رامین رحیم رسول روزبه سهراب سیاوش سیامک سلمان شایان شهروز فرامرز فربد کسری کمال محسن محمود مرتضی مهیار موسی نادر نصرالله هومن هوشنگ آقا‌جان اصغر اکبر جعفر جمال حسام حیدر خلیل رحمان رستم سبحان سعدی سلیم شعیب صمد صفر طالب ظفر عادل عارف عبدالرضا عزیز علی‌اکبر علی‌رضا غلامرضا فتح‌الله فرید فضل‌الله قدرت کرم لطفعلی ماهان مهرشاد مهراد نعمت هرمز هژیر".split(/\s+/);
  function guessTitle(owner) {
    var t = String(owner || "").replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/[\u200c\u200f]/g, " ").trim().replace(/^(خانم|آقای|آقا|دکتر|مهندس|سرکار|جناب)\s+/, "");
    if (!t) return ""; var w = t.split(/\s+/), one = w[0], two = w.length > 1 ? w[0] + w[1] : "";
    if (two && (NM_M.indexOf(two) > -1)) return "آقا"; if (two && (NM_F.indexOf(two) > -1)) return "خانم";
    if (NM_F.indexOf(one) > -1 && NM_M.indexOf(one) < 0) return "خانم"; if (NM_M.indexOf(one) > -1 && NM_F.indexOf(one) < 0) return "آقا"; return "";
  }
  function ptApplyGuess(force) {
    var sg = q('[data-seg="hb-ptot"]'), ow = ptF("owner"); if (!sg || !ow) return; if (sg.getAttribute("data-manual") && !force) return;
    var g = guessTitle(ow.value); [].forEach.call(sg.children, function (b) { b.classList.toggle("on", !!g && b.getAttribute("data-v") === g); });
  }
  function ptIdFields(r, lk) {
    var bx = lk ? '<div class="hb-lkres"></div>' : "";
    return '<div class="fld"><div class="hb-ownf"><input data-pt="owner"' + (lk ? ' data-hb-lk="pt" autocomplete="off"' : "") + ' type="text" maxlength="40" placeholder="👤 نام سرپرست' + (lk ? " (جستجو در سوابق)" : "") + '" value="' + esc(r && r.owner || "") + '">' + segOpts("hb-ptot", ["خانم", "آقا"], r && r.otitle) + "</div>" + bx + "</div>"
      + '<div class="fld"><input data-pt="name"' + (lk ? ' data-hb-lk="pt" autocomplete="off"' : "") + ' type="text" maxlength="40" placeholder="' + (lk ? "🔎 نام پت (جستجو در سوابق)" : "نام پت") + '" value="' + esc(r && r.name || "") + '">' + bx + "</div>"
      + '<div class="fld"><input data-pt="phone"' + (lk ? ' data-hb-lk="pt"' : "") + ' type="tel" inputmode="tel" dir="ltr" maxlength="16" placeholder="📞 شمارهٔ تماس (۰۹۱۲…)" autocomplete="off" value="' + esc(r && r.phone || "") + '">' + bx + "</div>"
      + '<div class="fld">' + ptSpecies(r && r.species) + "</div>"
      + breedFld("pt", r && r.breed)
      + '<div class="fld hb-sxrow">' + segOpts("hb-ptsex", ["نر", "ماده"], r && r.sex) + '<label class="hb-neut"><input type="checkbox" data-pt="neut"' + (r && r.neut === "عقیم" ? " checked" : "") + '> عقیم</label></div>'
      + '<div class="fld hb-bdrow"><span class="hb-lbl">🎂 تاریخ تولد <small>(اختیاری)</small></span><div class="jd" data-pjd="pb"></div></div>'
      + '<div class="fld hb-agerow"><span class="hb-lbl">یا سن تقریبی:</span><input type="text" inputmode="numeric" dir="ltr" data-pt="agey" placeholder="۰" maxlength="2"><span>سال</span><input type="text" inputmode="numeric" dir="ltr" data-pt="agem" placeholder="۰" maxlength="2"><span>ماه</span></div>';
  }
  function segOpts(n, l, sel) { return '<div class="seg" data-seg="' + n + '">' + l.map(function (x) { return '<button type="button"' + (x === sel ? ' class="on"' : "") + ' data-v="' + x + '">' + x + "</button>"; }).join("") + "</div>"; }
  function ptIdInit(r) {
    var bx = ptBox(), el = bx.querySelector('[data-pjd="pb"]'); if (!el) return; PTJ.pb = initJd(el, { optional: true, minY: -30, maxY: 0 }); PTJ.pb.set(r && r.birth || "");
    var ay = bx.querySelector('[data-pt="agey"]'), am = bx.querySelector('[data-pt="agem"]');
    function fromBirth() { var b = PTJ.pb.get(), t = jToday(); if (!b) return; var a = g2j(b), m = (t[0] - a[0]) * 12 + (t[1] - a[1]) - (t[2] < a[2] ? 1 : 0); if (m < 0) m = 0; ay.value = Math.floor(m / 12) || ""; am.value = m % 12 || ""; }
    function fromAge() { var y = parseInt(faDigits(ay.value), 10) || 0, m = parseInt(faDigits(am.value), 10) || 0; if (!y && !m) { PTJ.pb.set(""); return; } var t = jToday(), tot = t[0] * 12 + (t[1] - 1) - (y * 12 + m), yy = Math.floor(tot / 12), mm = tot % 12 + 1; PTJ.pb.set(j2g(yy, mm, Math.min(t[2], jLen(yy, mm)))); }
    PTJ.pb.on(fromBirth); ay.addEventListener("input", fromAge); am.addEventListener("input", fromAge); fromBirth();
    [].forEach.call(bx.querySelectorAll('[data-seg="hb-ptsex"],[data-seg="hb-ptot"]'), function (sg) { sg.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; var was = b.classList.contains("on"); [].forEach.call(sg.children, function (x) { x.classList.remove("on"); }); if (!was) b.classList.add("on"); if (sg.getAttribute("data-seg") === "hb-ptot") sg.setAttribute("data-manual", "1"); }); });
    var otg = bx.querySelector('[data-seg="hb-ptot"]'), own = bx.querySelector('[data-pt="owner"]');
    if (otg && own) { if (r && r.otitle) otg.setAttribute("data-manual", "1"); else ptApplyGuess(false); own.addEventListener("input", function () { ptApplyGuess(false); }); }
  }
  function ptAge(iso) { if (!iso) return ""; var a = g2j(iso), t = jToday(), m = (t[0] - a[0]) * 12 + (t[1] - a[1]) - (t[2] < a[2] ? 1 : 0); if (m < 0) return ""; var y = Math.floor(m / 12), mm = m % 12; return y ? toolFa(y) + " سال" + (mm ? " و " + toolFa(mm) + " ماه" : "") : (mm ? toolFa(mm) + " ماه" : "کمتر از ۱ ماه"); }
  function ptEff(g) { var o = {}; ["birth", "sex", "neut", "otitle"].forEach(function (k) { var h = g.filter(function (x) { return x[k]; })[0]; o[k] = h ? h[k] : ""; }); return o; }
  var invLoaded = false;
  function visInv(v) {
    var l = invItems.filter(function (x) { return x.vid === v.id && x.status !== "void"; }); if (!l.length) return "";
    var o = ""; l.forEach(function (inv) { (inv.items || []).forEach(function (x) { if (x.rep || needsRep(x.name)) o += '<div class="hb-ptvx">' + (/ضد ?انگل/.test(x.name) ? "🪱 " : "💉 ") + "<b>" + esc(x.name) + "</b>" + (x.rep ? " · تکرار: " + esc(repLabel(x.rep)) : "") + "</div>"; }); });
    return o ? '<div class="hb-ptvi">' + o + "</div>" : "";
  }
  function qReasonFor(pk) { var td = isoNow(), q0 = allQ().filter(function (x) { return x.pkey === pk && x.date === td && x.qnote; })[0]; return q0 ? q0.qnote : ""; }
  function emptyTodayVisit(pk) { var td = isoNow(); return ptGroup(pk).filter(function (x) { return x.date === td && !hasClin(x.note); })[0] || null; }
  function todayReason(e) {
    if (!e) return ""; var r = ""; if (e.pkey) { var tv = emptyTodayVisit(e.pkey); if (tv && tv.reason) r = tv.reason; }
    if (!r && e.ap && e.ap.reason && e.ap.reason !== "در انتظار ویزیت") r = e.ap.reason; if (!r && e.q && e.q.qnote) r = e.q.qnote; return r;
  }
  var ptActOpen = false, ptTab = "med", ptInvOk = {}, ptBackView = "", billRet = "today";
  function ptInvLoad(pk) {
    ptInvOk[pk] = 1;
    api({ a: "invList", t: tokGet(), pkey: pk }).then(function (j) {
      if (!j || !j.ok) { ptInvOk[pk] = 0; return; }
      var ids = {}, l = j.items || []; l.forEach(function (x) { ids[x.id] = 1; });
      invItems = invItems.filter(function (x) { return !ids[x.id]; }).concat(l); ptInvOk[pk] = 2; invLoaded = true;
      var bx = ptBox(), ae = document.activeElement;
      if (ptMode === "file" && ptCur === pk && bx && !(ptTab !== "inv" && ae && bx.contains(ae) && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName))) ptShow();
    });
  }
  var INV_ST = { paid: ["پرداخت‌شده", "paid"], pending: ["در انتظار پرداخت", "pend"], partial: ["نیمه‌پرداخت", "part"], free: ["بدون هزینه", "free"] };
  function ptInvHtml(pk, g) {
    var l = invItems.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.pkey === pk && o.x.status !== "void"; });
    l.sort(function (a, b) { return a.x.date < b.x.date ? 1 : a.x.date > b.x.date ? -1 : a.i - b.i; });
    var out = ptInvOk[pk] === 2 ? "" : '<p class="hb-qmsg">در حال بارگذاری فاکتورها…</p>', last = "";
    var smT = l.reduce(function (t, o) { return t + (o.x.total || 0); }, 0), dbtT = l.reduce(function (t, o) { return t + ((o.x.status === "pending" || o.x.status === "partial") ? o.x.total - o.x.paid : 0); }, 0);
    if (l.length) out += '<div class="hb-invsum"><div><span>جمع هزینه‌ها</span><b>' + money(smT) + "</b></div><div><span>تعداد فاکتور</span><b>" + toolFa(l.length) + "</b></div>" + (dbtT ? '<div class="hb-invdebt"><span>بدهی (در انتظار پرداخت)</span><b>' + money(dbtT) + "</b></div>" : "") + "</div>";
    l.forEach(function (o) {
      var v = o.x, st = INV_ST[v.status] || [v.status, "pend"];
      if (v.date !== last) { last = v.date; out += '<h5 class="hb-invdg">' + esc(wdOf(v.date)) + " " + esc(fd(v.date)) + "</h5>"; }
      out += '<button type="button" class="hb-invc" data-hb-invfile="' + esc(v.id) + '"><span class="hb-invc1"><b>' + esc(v.id) + '</b><em class="hb-st st-' + st[1] + '">' + st[0] + (v.status === "partial" ? " · مانده " + money(v.total - v.paid) : "") + '</em></span><span class="hb-invc2">' + esc((v.items || []).slice(0, 3).map(function (z) { return z.name; }).join("، ") + ((v.items || []).length > 3 ? " …" : "")) + '</span><span class="hb-invc3">' + money(v.total) + "</span></button>";
    });
    if (!l.length && ptInvOk[pk] === 2) out += '<p class="hb-qmsg">هنوز فاکتوری برای این پرونده ثبت نشده است.</p>';
    if (!SECP && ptInvOk[pk] === 2) {
      var nb = g.filter(function (v) { return !invItems.some(function (x) { return x.vid === v.id && x.status !== "void"; }); });
      if (nb.length) out += '<h5 class="hb-invdg">⚠️ ویزیت‌های بدون فاکتور</h5>' + nb.map(function (v) { return '<div class="hb-invnb"><span>' + esc(fd(v.date)) + (v.reason ? " · " + esc(v.reason) : "") + '</span><button type="button" class="btn small primary" data-hb-ptbill="' + esc(v.id) + '">💳 صدور و ارسال به پذیرش</button></div>'; }).join("") + '<p class="hb-mut hb-nbnote">با «صدور و ارسال به پذیرش» فاکتور ساخته می‌شود و برای دریافت وجه به میز پذیرش می‌رود.</p>';
    }
    return out;
  }
  function ptOpsHtml(r) {
    return '<div class="hb-adb hb-ptacts"><button type="button" class="btn small ghost" data-hb-ptidedit>✏️ ویرایش اطلاعات</button>' + (SECP ? "" : '<button type="button" class="btn small ghost" data-hb-ptbook>🪪 صدور شناسنامه</button>') + '<button type="button" class="btn small ghost" data-hb-ptsms>📩 ارسال پیامک</button><button type="button" class="btn small ghost" data-hb-ptappt>🗓 ثبت نوبت</button><button type="button" class="btn small ghost hb-newpetb" data-hb-ptnewpet>🐾 پت جدید</button></div><div class="hb-ptidf" data-hb-ptidf hidden>' + ptIdFields(r) + '<p class="hb-err" data-hb-pterr hidden></p><div class="hb-btns hb-center"><button type="button" class="btn small primary" data-hb-ptidsave>ذخیرهٔ اطلاعات</button><button type="button" class="btn small ghost" data-hb-ptidcancel>انصراف</button></div></div>';
  }
  function ptFormHtml() {
    return '<div class="hb-ptform hb-ptvform"><h4 class="hb-ptsec hb-ptsec2" data-hb-ptvt>پروندهٔ بیمار · مراجعهٔ امروز</h4>' + ptVisitFields() + '<p class="hb-err" data-hb-pterr2 hidden></p><div class="hb-btns hb-center"><button type="button" class="btn small primary" data-hb-ptsavev>ثبت مراجعه</button><button type="button" class="btn small ghost" data-hb-ptvcancel hidden>انصراف از ویرایش</button></div></div>';
  }
  function ptMedHtml(g) {
    return g.map(function (v) {
        var np = noteSplit(v.note || ""); return '<div class="hb-ptv"><div class="hb-ptvh" data-hb-ptvtog="' + esc(v.id) + '" role="button"><div class="hb-ptvt"><b>' + esc(fd(v.date)) + "</b>" + (v.reason ? " · " + esc(v.reason) : "") + (v.follow ? ' <small class="hb-ptfu">پیگیری: ' + esc(fd(v.follow)) + "</small>" : "") + ' <span class="hb-arw">▾</span></div></div>' + (np.c ? '<div class="hb-ptvc">🗣 شکایت پذیرش: ' + esc(np.c) + "</div>" : "") + visInv(v)
          + '<div class="hb-ptvd" data-hb-ptvd="' + esc(v.id) + '" hidden>' + (np.f ? '<p class="hb-ptn"><b>🔍 یافته‌ها:</b> ' + esc(np.f) + "</p>" : "") + (np.d ? '<p class="hb-ptn"><b>💊 تشخیص و درمان:</b> ' + esc(np.d) + "</p>" : "") + (!np.f && !np.d ? '<p class="hb-ptn hb-mut">یادداشتی ثبت نشده است.</p>' : "") + "</div>"
          + '<div class="hb-ptvb"><button type="button" class="btn small ghost" data-hb-ptedit="' + esc(v.id) + '">✏️ ویرایش</button><button type="button" class="btn small ghost hb-danger" data-hb-ptdel="' + esc(v.id) + '">🗑 حذف</button></div></div>';
      }).join("");
  }
  function invMount(id) {
    [].forEach.call(document.querySelectorAll("[data-hb-invpanel]"), function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
    var card = q('[data-hb-invfile="' + id + '"]'); if (!card) return; card.insertAdjacentHTML("afterend", '<div data-hb-invpanel></div>'); invOpenId = id; invPanel();
  }
  function invRefresh() { if (ptBox() && root.getAttribute("data-dview") === "pt" && ptMode === "file") ptShow(); else if (todayBox()) todayRender(); }
  function ptShow() {
    var box = ptBox(); if (!box) return; syncBillMode(); if (ptMode === "bill") return;
    if (ptMode === "new") {
      box.innerHTML = '<div class="hb-ptform"><h3 class="hb-pth hb-ctr hb-ft hb-ft2">🐾 ثبت بیمار جدید</h3>' + ptIdFields(ptPre, true) + '<div class="fld">' + ptReasonSel() + '</div><label class="hb-cons hb-smscb"><input type="checkbox" data-hb-ptsms-cb checked> 📩 ارسال پیامک تأیید ثبت به سرپرست <small>(با اطلاع ایشان؛ شمارهٔ موبایل معتبر لازم است)</small></label><p class="hb-err" data-hb-pterr hidden></p><div class="hb-btns hb-center"><button type="button" class="btn small primary" data-hb-ptsavenew="today">ثبت و بردن به لیست امروز</button>' + (SECP ? "" : '<button type="button" class="btn small ghost" data-hb-ptsavenew="only">فقط ثبت</button>') + '<button type="button" class="btn small ghost" data-hb-ptback>انصراف</button></div></div>';
      brFill(box, "pt"); ptIdInit(ptPre); (function () { var sl = ptF("reason"), rx = ptF("reasonx"); sl.addEventListener("change", function () { rx.hidden = sl.value !== "__other"; if (!rx.hidden) rx.focus(); }); var pr = ptPre && ptPre.reason; if (pr) { if ((SECP ? CP : AP_REASONS).indexOf(pr) > -1) sl.value = pr; else { sl.value = "__other"; rx.value = pr; rx.hidden = false; } } })(); return;
    }
    if (ptMode === "file") {
      var g = ptGroup(ptCur); if (!g.length) { ptMode = "list"; return ptShow(); }
      if (ptInvOk[ptCur] !== 1 && ptInvOk[ptCur] !== 2) ptInvLoad(ptCur);
      var r = Object.assign({}, g[0], ptEff(g));
      var dbt = invItems.filter(function (x) { return x.pkey === r.pkey && (x.status === "pending" || x.status === "partial"); }).reduce(function (t0, x) { return t0 + x.total - x.paid; }, 0), tot0 = invItems.filter(function (x) { return x.pkey === r.pkey && x.status !== "void"; }), sm = tot0.reduce(function (t0, x) { return t0 + x.total; }, 0);
      box.innerHTML = '<button type="button" class="btn small ghost hb-ptbk" data-hb-ptback>→ برگشت</button>' + (billDraft && billDraft.pkey === ptCur ? '<button type="button" class="btn small primary hb-ptbk hb-resume" data-hb-billresume>↩ برگشت به فاکتور (خدمات انتخاب‌شده حفظ شده)</button>' : "")
        + '<div class="hb-ptfile" data-hb-ptfile><h4 class="hb-ptsec">اطلاعات پت و سرپرست</h4><div class="hb-ptinfo"><b class="hb-ptn1">' + esc(r.name) + "</b>" + (r.fno ? '<span class="hb-fno">پروندهٔ ' + esc(r.fno) + "</span>" : "") + "<span>" + esc(r.species) + (r.breed ? " · " + esc(r.breed) : "") + (r.owner ? " · سرپرست: " + esc(r.owner) : "") + "</span>" + ((r.sex || r.neut || r.birth) ? '<span class="hb-ptmeta">' + [r.sex, r.neut, r.birth ? "سن: " + ptAge(r.birth) + " (تولد " + fd(r.birth) + ")" : ""].filter(Boolean).map(esc).join(" · ") + "</span>" : "") + (r.phone ? '<a class="hb-call" dir="ltr" href="tel:' + esc(r.phone) + '">📞 ' + esc(r.phone) + "</a>" : "<small>شمارهٔ تماس ثبت نشده</small>") + "</div>"
        + (SECP || !emptyTodayVisit(r.pkey) || !emptyTodayVisit(r.pkey).reason ? "" : '<p class="hb-todayreason">🗣 شکایت پذیرش: <b>' + esc(emptyTodayVisit(r.pkey).reason) + "</b></p>")
        + (SECP ? "" : '<p class="hb-ptlastl">اولین مراجعه: ' + esc(fd(g[g.length - 1].date)) + (g.length > 1 ? " · " + toolFa(g.length) + " مراجعه" : "") + "</p>" + '<p class="hb-smsst" data-hb-ptsmsst>' + smsLine(r.pkey) + "</p>")
        + "</div>"
        + (SECP ? "" : ptFormHtml())
        + '<div class="hb-ftabs' + (SECP ? " two" : " three") + '"><button type="button" class="btn' + (ptTab === "ops" ? " primary" : " ghost") + '" data-hb-pttab="ops">⚙️ عملیات</button><button type="button" class="btn' + (ptTab === "inv" ? " primary" : " ghost") + '" data-hb-pttab="inv">🧾 فاکتورها</button>' + (SECP ? "" : '<button type="button" class="btn' + (ptTab === "med" ? " primary" : " ghost") + '" data-hb-pttab="med">🩺 سوابق (' + toolFa(g.length) + ")</button>") + "</div>"
        + '<div data-hb-pttabbox>' + (ptTab === "inv" ? ptInvHtml(r.pkey, g) : ptTab === "med" ? ptMedHtml(g) : ptTab === "ops" ? ptOpsHtml(r) : "") + "</div>";
      brFill(box, "pt"); if (ptTab === "ops") ptIdInit(r);
      if (ptTab === "inv") { if (invOpenId && invItems.some(function (x) { return x.id === invOpenId && x.pkey === r.pkey; })) invMount(invOpenId); }
      if (!SECP) {
        ptInitVisit(ptEditV);
        var vf = box.querySelector(".hb-ptvform"), vt = box.querySelector("[data-hb-ptvt]");
        if (vf && vt) { vt.setAttribute("role", "button"); if (!ptEditV && visitedToday(ptCur)) { vf.classList.add("hb-coll"); vt.innerHTML = "✅ امروز ویزیت شده · ثبت مراجعهٔ دیگر <span class=\"hb-arw\">▾</span>"; } else vt.innerHTML = esc(vt.textContent) + ' <span class="hb-arw">▴</span>'; }
        if (ptEditV) { q("[data-hb-ptvt]").textContent = "ویرایش مراجعه"; q("[data-hb-ptsavev]").textContent = "ذخیرهٔ ویرایش"; q("[data-hb-ptvcancel]").hidden = false; }
      }
      return;
    }
    box.innerHTML = '<div class="hb-pttool"><input type="search" data-hb-ptq autocomplete="off" placeholder="🔎 جستجو: نام، سرپرست، تلفن یا تشخیص"><button type="button" class="btn small ghost" data-hb-ptref aria-label="تازه‌سازی">🔄</button></div><div data-hb-ptfollow></div><div class="hb-adlist" data-hb-ptlist></div>';
    ptRenderList();
  }
  // صف امروز (حضور همین الان) جدا از نوبت؛ فعلاً در همان شیت نوبت‌ها با برچسب «[صف]» در یادداشت
  // دکمهٔ ثبت فعال بالای صفحه مشخص شود
  function mkAct(w) { [].forEach.call(root.querySelectorAll("[data-hb-apnewtop],[data-hb-ptnewtop]"), function (b) { b.classList.toggle("on", w === "ap" ? b.hasAttribute("data-hb-apnewtop") : w === "pt" ? b.hasAttribute("data-hb-ptnewtop") : false); }); }
  var QM = "[صف]";
  var svcDef = 50, QSHEET = false, qItems = [], invItems = [], svcItems = [], svcLoaded = false;
  function allQ() { var leg = apItems.filter(isQueue); if (!QSHEET) return leg; var nq = qItems.map(function (r) { return { id: r.id, date: r.date, time: r.time, pkey: r.pkey, name: r.name, species: r.species, breed: r.breed, owner: r.owner, phone: r.phone, status: r.status === "done" ? "done" : "booked", note: QM, qnote: r.note || "", _q: 1 }; }); return nq.concat(leg.filter(function (x) { return !(x.pkey && nq.some(function (y) { return y.pkey === x.pkey && y.date === x.date; })); })); }   // صف جدید + ردیف‌های قدیمی «[صف]» (روز تعویض اسکریپت)
  function qLoad(cb) { api({ a: "qList", t: tokGet() }).then(function (j) { if (j.ok) { QSHEET = true; qItems = j.items || []; } if (cb) cb(); }); }
  function invLoad(cb) { api({ a: "invList", t: tokGet() }).then(function (j) { if (j.ok) invItems = j.items || []; if (cb) cb(); }); }
  function svcLoad(cb) { if (svcLoaded) { if (cb) cb(); return; } api({ a: "svcList", t: tokGet() }).then(function (j) { if (j.ok) { svcItems = j.items || []; svcLoaded = true; if (j.defPct != null) svcDef = j.defPct; } if (cb) cb(j.ok); }); }
  function isQueue(r) { return /^(\[صف\]|ارسال از پذیرش)/.test(String(r && r.note || "")) || /ارسال از پذیرش/.test(String(r && r.note || "")) || (String(r && r.reason || "") === "در انتظار ویزیت" && !r.smsAt); }
  function ptInToday(k) { var td = apToday || isoNow(); return !!k && apItems.filter(function (x) { return !isQueue(x); }).concat(allQ()).some(function (x) { return x.pkey === k && x.date === td && x.status === "booked"; }); }
  // منشی: افزودن بیمار به «نوبت‌های امروز» دکتر (یک نوبتِ امروز با ساعت همین الان)
  var CP = ["ویزیت", "چکاپ", "واکسن", "ضدانگل", "درد", "استفراغ / اسهال", "بی‌حالی / بی‌اشتهایی", "پوست / ریزش مو", "مشاوره", "عقیم‌سازی"];
  function reasonAsk(o, done) {
    var old = document.querySelector(".hb-rsm"); if (old && old.parentNode) old.parentNode.removeChild(old);
    var m = document.createElement("div"); m.className = "hb-rsm";
    m.innerHTML = '<div class="hb-rsc" role="dialog"><h3>شکایت / علت مراجعهٔ «' + esc(o.name) + '»؟ <small>(همان که صاحب پت می‌گوید)</small></h3><div class="hb-rsg">' + CP.map(function (r) { return '<button type="button" class="hb-rsb" data-r="' + esc(r) + '">' + esc(r) + "</button>"; }).join("") + '</div><input type="text" class="hb-rsx" maxlength="80" placeholder="یا علت دیگر را بنویسید…"><div class="hb-rsa"><button type="button" class="btn primary" data-hb-rsok>ثبت و فرستادن به دکتر</button><button type="button" class="btn ghost" data-hb-rsskip>بدون علت</button><button type="button" class="btn ghost" data-hb-rsno>انصراف</button></div></div>';
    document.body.appendChild(m); var chosen = "", close = function () { if (m.parentNode) m.parentNode.removeChild(m); };
    m.addEventListener("click", function (e) {
      var t = e.target; if (!t.closest) return; var b = t.closest(".hb-rsb");
      if (b) { chosen = b.getAttribute("data-r"); [].forEach.call(m.querySelectorAll(".hb-rsb"), function (x) { x.classList.toggle("on", x === b); }); m.querySelector(".hb-rsx").value = ""; return; }
      if (t.closest("[data-hb-rsok]")) { var tx = m.querySelector(".hb-rsx").value.trim(); var r = tx || chosen; if (!r) { m.querySelector(".hb-rsx").focus(); return; } close(); done(r); return; }
      if (t.closest("[data-hb-rsskip]")) { close(); done(""); return; }
      if (t.closest("[data-hb-rsno]") || t === m) close();
    });
    m.querySelector(".hb-rsx").addEventListener("input", function () { chosen = ""; [].forEach.call(m.querySelectorAll(".hb-rsb"), function (x) { x.classList.remove("on"); }); });
  }
  function ptToday(o, btn, reason) {
    if (ptInToday(o.pkey)) return toast("«" + o.name + "» از قبل در لیست امروز است.");
    if (SECP && reason === undefined) return reasonAsk(o, function (r) { ptToday(o, btn, r); });
    var d = new Date(), hm = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); if (btn) btn.disabled = true;
    if (QSHEET) { api({ a: "qAdd", t: tokGet(), v: { pkey: o.pkey || "", name: o.name, species: o.species, breed: o.breed || "", owner: o.owner, phone: o.phone, note: reason || "" } }).then(function (j) { if (btn) btn.disabled = false; if (!j.ok) return toast("⚠️ " + errMsg(j.err), 7000); if (!j.dup) qItems.push(j.item); tdQ = ""; tdRes = []; toast(j.dup ? "«" + o.name + "» از قبل در لیست امروز است." : "✅ «" + o.name + "» به لیست امروز دکتر اضافه شد"); if (ptBox() && ptMode === "list") ptRenderList(); if (todayBox()) todayRender(); }); return; }
    api({ a: "apSave", t: tokGet(), id: "", v: { date: apToday || isoNow(), time: hm, name: o.name, species: o.species, breed: o.breed || "", owner: o.owner, phone: o.phone, reason: reason || "در انتظار ویزیت", note: QM + " ارسال از پذیرش", pkey: o.pkey || "", rem: 0 } }).then(function (j) {
      if (btn) btn.disabled = false; if (!j.ok) return toast("⚠️ " + errMsg(j.err), 7000);
      apItems.push(j.item); tdQ = ""; tdRes = [];
      toast("✅ «" + o.name + "» به لیست امروز دکتر اضافه شد"); if (ptBox() && ptMode === "list") ptRenderList(); if (todayBox()) todayRender();
    });
  }
  function ownBtns(l) { var seen = {}, out = ""; l.forEach(function (r) { var k = (r.owner || "") + "|" + (r.phone || ""); if ((!r.owner && !r.phone) || seen[k] || Object.keys(seen).length >= 3) return; seen[k] = 1; out += '<button type="button" class="btn small ghost hb-newown" data-hb-ptnewown data-o="' + esc(r.owner || "") + '" data-p="' + esc(r.phone || "") + '">＋ پت جدید برای «' + esc(r.owner || r.phone) + "»</button>"; }); return out ? '<div class="hb-newowns">' + out + "</div>" : ""; }
  function ptRenderList() {
    var qi = ptBox().querySelector("[data-hb-ptq]"), qs = faDigits(qi ? qi.value : "").trim().toLowerCase(), box = ptBox().querySelector("[data-hb-ptlist]"), fb = ptBox().querySelector("[data-hb-ptfollow]"), now = isoNow();
    if (!box) return;
    var groups = ptGroups(), shown = groups.filter(function (g) { return !qs || faDigits(g.map(function (r) { return [r.name, r.owner, r.phone, r.reason, r.note, r.fno].join(" "); }).join(" ")).toLowerCase().indexOf(qs) > -1; });
    var due = groups.filter(function (g) { var f = g[0].follow; return f && f <= isoPlus(now, 2); }); due.sort(function (a, b) { return a[0].follow < b[0].follow ? -1 : 1; });
    fb.innerHTML = due.length && !qs ? '<div class="hb-ptdue"><b>🔔 پیگیری‌ها (' + toolFa(due.length) + ")</b>" + due.slice(0, 8).map(function (g) { var r = g[0]; return '<button type="button" class="hb-ptdr" data-hb-ptopen="' + esc(r.pkey) + '"><span>' + esc(r.name) + (r.owner ? " · " + esc(r.owner) : "") + "</span><small>" + (r.follow < now ? "عقب‌افتاده · " : r.follow === now ? "امروز · " : "") + esc(fd(r.follow)) + "</small></button>"; }).join("") + "</div>" : "";
    var more = 0; if (SECP && !qs && shown.length > 5) { more = shown.length - 5; shown = shown.slice(0, 5); }
    box.innerHTML = shown.length ? shown.map(function (g) {
      var r = g[0];
      if (SECP) { var inT = ptInToday(r.pkey); return '<div class="hb-qrw hb-qrws hb-sc"><div class="hb-qr1 hb-scopen" role="button" tabindex="0" data-hb-ptopen="' + esc(r.pkey) + '"><b>' + esc(r.name) + ' <span class="hb-qsp">· ' + esc(r.species) + (r.breed ? " · " + esc(r.breed) : "") + "</span></b><small>" + (r.fno ? esc(r.fno) + " · " : "") + (r.owner ? esc(r.owner) + " · " : "") + "آخرین: " + esc(fd(r.date)) + "</small>" + (r.phone ? '<a class="hb-scph" dir="ltr" href="tel:' + esc(r.phone) + '">📞 ' + esc(r.phone) + "</a>" : "") + '</div><button type="button" class="hb-scday' + (inT ? " on" : "") + '" data-hb-pttoday="' + esc(r.pkey) + '"><span>' + (inT ? "✅" : "📅") + "</span><small>" + (inT ? "امروز" : "به امروز") + '</small></button>' + "</div>"; }
      return '<div class="hb-qrw"><button type="button" class="hb-qr1" data-hb-ptopen="' + esc(r.pkey) + '"><b>' + esc(r.name) + (smsMap()[r.pkey] || g.some(function (x) { return x.smsAt; }) ? " 📩" : "") + "</b><small>" + (r.fno ? esc(r.fno) + " · " : "") + esc(r.species) + (r.breed ? " · " + esc(r.breed) : "") + (r.owner ? " · " + esc(r.owner) : "") + " · " + toolFa(g.length) + " مراجعه</small><small>آخرین: " + esc(fd(r.date)) + (r.reason ? " · " + esc(r.reason) : "") + "</small></button>" + (r.phone ? '<a class="hb-call hb-callq" dir="ltr" href="tel:' + esc(r.phone) + '">📞 ' + esc(r.phone) + "</a>" : "") + "</div>";
    }).join("") + (qs ? ownBtns(shown.map(function (g) { return g[0]; })) : "") + (more ? '<p class="hb-qmsg">' + toolFa(more) + " بیمار دیگر هم هست؛ برای دیدن، نام یا شماره را جستجو کنید.</p>" : "") : '<p class="hb-qmsg">' + (ptItems.length ? "موردی پیدا نشد." : "هنوز بیماری ثبت نشده است. با «ثبت بیمار جدید» شروع کنید.") + "</p>";
  }
  var SMS_ERR = { sms_off: "پیامک هنوز فعال نشده (در اسکریپت سایت تنظیم نشده).", bad_phone: "شمارهٔ موبایل سرپرست معتبر نیست.", rate: "همین الان برای این بیمار پیامک رفته؛ چند دقیقه بعد دوباره امتحان کنید.", notfound: "بیمار پیدا نشد." };
  var SMSK = "dm_hb_sms";
  function smsMap() { try { return JSON.parse(localStorage.getItem(SMSK) || "{}") || {}; } catch (e) { return {}; } }
  function smsMark(k) { var m = smsMap(); m[k] = isoNow(); try { localStorage.setItem(SMSK, JSON.stringify(m)); } catch (e) {} }
  function smsLine(k) { var d = smsMap()[k] || ptGroup(k).map(function (x) { return x.smsAt || ""; }).sort().pop(); return d ? "📩 پیامک ثبت پرونده ارسال شد ✅ " + fd(d) : "📩 پیامک ثبت پرونده هنوز ارسال نشده"; }
  function ptSendSms(pkey) {
    api({ a: "patSms", t: tokGet(), pkey: pkey }).then(function (j) { if (j.ok) { smsMark(pkey); var sl = q("[data-hb-ptsmsst]"); if (sl) sl.textContent = smsLine(pkey); } toast(j.ok ? "📩 پیامک برای سرپرست ارسال شد" : "⚠️ " + (SMS_ERR[j.err] || ("ارسال پیامک ناموفق بود. " + (j.msg || errMsg(j.err)))), j.ok ? 5000 : 8000); });
  }
  function ptIdVals() { var o = { species: segVal("hb-ptsp") }; ["name", "owner", "phone", "breed"].forEach(function (k) { o[k] = k === "phone" ? faDigits(ptF(k).value.trim()) : ptF(k).value.trim(); }); o.birth = PTJ.pb ? PTJ.pb.get() : ""; o.sex = segVal("hb-ptsex"); o.otitle = segVal("hb-ptot"); var nc = ptBox().querySelector('input[data-pt="neut"]'); o.neut = nc && nc.checked ? "عقیم" : ""; return o; }
  document.addEventListener("input", function (e) { if (e.target && e.target.matches && e.target.matches("[data-hb-ptq]")) ptRenderList(); });
  document.addEventListener("click", function (e) {
    var t = e.target, b; if (!t.closest || !ptBox()) return;
    if (t.closest("[data-hb-ptnew]")) { ptPre = null; ptFromAp = ""; ptMode = "new"; return ptShow(); }
    if (t.closest("[data-hb-ptref]")) { ptLoaded = false; return ptLoad(); }
    if (t.closest("[data-hb-ptback]")) { var bv0 = ptBackView; ptBackView = ""; ptMode = "list"; ptEditV = null; invOpenId = ""; if (bv0 === "today") return ptToToday(); if (bv0 && bv0 !== "pt") { dview(bv0); return; } return ptShow(); }
    if ((b = t.closest("[data-hb-pttab]"))) { var tv = b.getAttribute("data-hb-pttab"); ptTab = ptTab === tv ? "" : tv; invOpenId = ""; return ptShow(); }
    if ((b = t.closest("[data-hb-ptvtog]"))) { var vd1 = q('[data-hb-ptvd="' + b.getAttribute("data-hb-ptvtog") + '"]'); if (vd1) vd1.hidden = !vd1.hidden; return; }
    if ((b = t.closest("[data-hb-invfile]"))) { var fid = b.getAttribute("data-hb-invfile"); if (invOpenId === fid && q("[data-hb-invpanel]")) { invOpenId = ""; [].forEach.call(document.querySelectorAll("[data-hb-invpanel]"), function (e) { if (e.parentNode) e.parentNode.removeChild(e); }); b.classList.remove("open"); return; } invMount(fid); [].forEach.call(document.querySelectorAll(".hb-invc.open"), function (e) { e.classList.remove("open"); }); b.classList.add("open"); return; }
    if (t.closest("[data-hb-invedit]")) { var ve = invItems.filter(function (x) { return x.id === invOpenId; })[0], vv0 = ve && ptItems.filter(function (x) { return x.id === ve.vid; })[0]; if (!vv0) return toast("⚠️ مراجعهٔ این فاکتور پیدا نشد (شاید حذف شده)."); if (root.getAttribute("data-dview") !== "pt") { ptBackView = root.getAttribute("data-dview"); dview("pt"); } ptCur = ve.pkey; billRet = "file"; invOpenId = ""; billOpen(vv0); return; }
    if ((b = t.closest("[data-hb-pttoday]"))) { var gt = ptGroup(b.getAttribute("data-hb-pttoday"))[0]; if (gt) ptToday(gt, b); return; }
    b = t.closest("[data-hb-ptopen]"); if (b && t.closest("a")) b = null;
    if (b) { ptActOpen = false; ptBackView = ""; ptTab = ""; invOpenId = ""; ptCur = b.getAttribute("data-hb-ptopen"); touchLog("patient", ptCur, (ptGroup(ptCur)[0] || {}).name); ptMode = "file"; ptEditV = null; ptShow(); try { window.scrollTo(0, ptBox().getBoundingClientRect().top + window.pageYOffset - 80); } catch (x) {} return; }
    if (t.closest("[data-hb-ptnewpet]")) { var g9 = ptGroup(ptCur), r9 = g9[0] || {}; ptPre = { owner: r9.owner, phone: r9.phone }; ptFromAp = ""; ptMode = "new"; ptShow(); toast("🐾 مشخصات سرپرست وارد شد؛ نام، نوع و نژاد پت جدید را بزنید"); return; }
    if ((b = t.closest("[data-hb-ptnewown]"))) { dview("pt"); ptPre = { owner: b.getAttribute("data-o"), phone: b.getAttribute("data-p") }; ptFromAp = ""; ptMode = "new"; ptShow(); mkAct("pt"); toast("🐾 مشخصات سرپرست وارد شد؛ نام، نوع و نژاد پت جدید را بزنید"); return; }
    if (t.closest("[data-hb-ptidedit]")) { q("[data-hb-ptidf]").hidden = false; var ac2 = q(".hb-ptacts"); if (ac2) ac2.hidden = true; return; }
    if (t.closest("[data-hb-ptidcancel]")) { q("[data-hb-ptidf]").hidden = true; var ac3 = q(".hb-ptacts"); if (ac3) ac3.hidden = false; return; }
    if (t.closest("[data-hb-ptvcancel]")) { ptEditV = null; return ptShow(); }
    if ((b = t.closest("[data-hb-ptvt]"))) { var vf2 = b.closest(".hb-ptvform"), aw = b.querySelector(".hb-arw"); if (vf2) { vf2.classList.toggle("hb-coll"); if (aw) aw.textContent = vf2.classList.contains("hb-coll") ? "▾" : "▴"; } return; }
    if ((b = t.closest("[data-hb-ptbill]"))) { var bv = ptItems.filter(function (x) { return x.id === b.getAttribute("data-hb-ptbill"); })[0]; if (bv) { billRet = "file"; var exi = invItems.filter(function (x) { return x.vid === bv.id && x.status !== "void"; })[0]; if (exi) { invOpenId = exi.id; var bx = ptBox(); if (!q("[data-hb-invpanel]")) bx.insertAdjacentHTML("afterbegin", '<div data-hb-invpanel></div>'); invPanel(); return; } if (!invItems.length) invLoad(function () { billOpen(bv); }); else billOpen(bv); } return; }
    if ((b = t.closest("[data-hb-ptview]"))) { var vd = q('[data-hb-ptvd="' + b.getAttribute("data-hb-ptview") + '"]'); if (vd) { vd.hidden = !vd.hidden; b.textContent = vd.hidden ? "👁 دیدن" : "🔼 بستن"; } return; }
    if ((b = t.closest("[data-hb-ptedit]"))) { ptEditV = ptItems.filter(function (x) { return x.id === b.getAttribute("data-hb-ptedit"); })[0] || null; ptShow(); try { q("[data-hb-ptvt]").scrollIntoView({ behavior: "smooth", block: "center" }); } catch (x) {} return; }
    if ((b = t.closest("[data-hb-ptdel]"))) { var dv0 = ptItems.filter(function (x) { return x.id === b.getAttribute("data-hb-ptdel"); })[0] || {}, hasInv = invItems.some(function (x) { return x.vid === dv0.id && x.status !== "void"; }); if (!confirm("⚠️ مراجعهٔ " + fd(dv0.date || "") + (dv0.reason ? " (" + dv0.reason + ")" : "") + " حذف شود؟\nاین کار قابل برگشت نیست." + (hasInv ? "\n(فاکتور این مراجعه حذف نمی‌شود؛ اگر لازم است جداگانه باطلش کنید.)" : ""))) return; api({ a: "patDel", t: tokGet(), id: b.getAttribute("data-hb-ptdel") }).then(function (j) { if (!j.ok) return alert(errMsg(j.err)); ptItems = ptItems.filter(function (x) { return x.id !== b.getAttribute("data-hb-ptdel"); }); ptShow(); }); return; }
    if (t.closest("[data-hb-ptsms]")) { var gs = ptGroup(ptCur)[0]; if (!gs) return; if (!gs.phone) return toast("⚠️ برای این بیمار شمارهٔ تماس ثبت نشده است."); if (!confirm("پیامک تأیید ثبت برای سرپرست «" + (gs.owner || gs.name) + "» ارسال شود؟")) return; ptSendSms(ptCur); return; }
    if (t.closest("[data-hb-ptbook]")) { var g2 = ptGroup(ptCur)[0]; if (!g2) return; dview("new"); petForm(null); q("#hb-pn").value = g2.name; q("#hb-po").value = g2.owner || ""; q("#hb-ph").value = g2.phone || ""; var sb2 = q('[data-seg="hbsp"] [data-v="' + g2.species + '"]'); if (sb2) sb2.click(); toast("اطلاعات بیمار وارد شد؛ تاریخ تولد و رضایت را کامل کنید"); return; }
    if ((b = t.closest("[data-hb-ptsavenew]"))) {
      var mode = b.getAttribute("data-hb-ptsavenew"), er = q("[data-hb-pterr]"), btn = b, id = ptIdVals(), vv = ptNewVals(); if (!id.name) { er.textContent = "نام پت را بنویسید."; er.hidden = false; ptF("name").focus(); return; }
      if (!vv.reason) { er.textContent = "دلیل مراجعه را انتخاب کنید."; er.hidden = false; return; }
      er.hidden = true; [].forEach.call(box0(), function (x) { x.disabled = true; }); var smsBox = q("[data-hb-ptsms-cb]"), wantSms = !!(smsBox && smsBox.checked), fa = ptFromAp; var v = { name: id.name, species: id.species, breed: id.breed, owner: id.owner, phone: id.phone, birth: id.birth, sex: id.sex, neut: id.neut, otitle: id.otitle, date: vv.date, reason: vv.reason, note: "", follow: "", pkey: "" };
      api({ a: "patSave", t: tokGet(), id: "", v: v }).then(function (j) {
        [].forEach.call(box0(), function (x) { x.disabled = false; }); if (!j.ok) { er.textContent = errMsg(j.err); er.hidden = false; return; }
        ptItems.unshift(j.item); ptCur = j.item.pkey; ptEditV = null; ptFromAp = ""; ptPre = null; toast("✅ بیمار ثبت شد · " + j.item.name);
        if (fa) { api({ a: "apSet", t: tokGet(), id: fa, status: "done" }); apItems.forEach(function (x) { if (x.id === fa) x.status = "done"; }); }
        if (SECP || mode === "today") { if (!fa) ptToday(j.item, null, ""); ptMode = "list"; if (SECP) ptShow(); else dview("today"); } else { ptMode = "file"; ptShow(); }
        if (wantSms) ptSendSms(j.item.pkey);
      });
      return;
    }
    if (t.closest("[data-hb-ptsavev]")) {
      var er2 = q("[data-hb-pterr2]"), btn2 = q("[data-hb-ptsavev]"), g = ptGroup(ptCur)[0], vv2 = ptVisitVals(); if (!g) return;
      if (!vv2.reason) { er2.textContent = "دلیل مراجعه را بنویسید."; er2.hidden = false; return; }
      er2.hidden = true; btn2.disabled = true; var v2 = { name: g.name, species: g.species, breed: g.breed, owner: g.owner, phone: g.phone, date: vv2.date, reason: vv2.reason, note: vv2.note, follow: vv2.follow, pkey: ptCur };
      var adopted = false; if (!ptEditV) { var tv0 = emptyTodayVisit(ptCur); if (tv0) { ptEditV = tv0; adopted = true; } } var wasEdit = !!ptEditV, editId = ptEditV ? ptEditV.id : "";
      api({ a: "patSave", t: tokGet(), id: ptEditV ? ptEditV.id : "", v: v2 }).then(function (j) {
        btn2.disabled = false; if (!j.ok) { er2.textContent = errMsg(j.err); er2.hidden = false; return; }
        if (!ptEditV || ptEditV.follow !== vv2.follow) ptFollowAppt(g, ptCur, vv2); if (ptEditV) ptItems = ptItems.map(function (x) { return x.id === j.item.id ? j.item : x; }); else ptItems.unshift(j.item);
        ptItems.sort(function (x, y) { return x.date < y.date ? 1 : x.date > y.date ? -1 : 0; }); ptEditV = null; toast("✅ مراجعه ثبت شد"); if (!SECP && vv2.date === isoNow() && vv2.note) markVisited(ptCur); if (billDraft && billDraft.vid === editId) { billResume(); return; } if (!SECP && (!wasEdit || adopted)) billOpen(j.item); else ptShow();
      });
      return;
    }
    if (t.closest("[data-hb-ptidsave]")) {
      var er3 = q("[data-hb-pterr]"), id3 = ptIdVals(); if (!id3.name) { er3.textContent = "نام پت را بنویسید."; er3.hidden = false; return; }
      api({ a: "patPatient", t: tokGet(), pkey: ptCur, v: id3 }).then(function (j) { if (!j.ok) { er3.textContent = errMsg(j.err); er3.hidden = false; return; } ptItems.forEach(function (x) { if (x.pkey === ptCur) { x.name = id3.name; x.species = id3.species; x.breed = id3.breed; x.owner = id3.owner; x.phone = id3.phone; x.birth = id3.birth; x.sex = id3.sex; x.neut = id3.neut; x.otitle = id3.otitle; } }); toast("✅ اطلاعات ذخیره شد"); ptShow(); });
    }
  });
  // ---- جستجوی شماره تماس در سوابق (پرکردن خودکار فرم) ----
  var lkRes = {}, lkT = 0;
  function phN(v) { var d = faDigits(v).replace(/\D/g, ""); if (/^98\d{10}$/.test(d)) d = d.slice(2); return d.replace(/^0+/, ""); }
  function lkQuery(el) { var v = faDigits(el.value).trim(), ph = el.type === "tel"; return { ph: ph, q: ph ? phN(v) : v, ok: ph ? phN(v).length >= 3 : v.length >= 2 }; }
  function lkHit(o, Q) { return Q.ph ? phN(o.phone).indexOf(Q.q) > -1 : (String(o.name || "") + " " + String(o.owner || "")).toLowerCase().indexOf(Q.q.toLowerCase()) > -1; }
  function lkLocal(Q) {
    var out = [], seen = {}; function add(o) { var k = phN(o.phone) + "|" + o.name; if (!seen[k]) { seen[k] = 1; out.push(o); } }
    ptGroups().forEach(function (g) { var r = g[0]; if (lkHit(r, Q)) add({ kind: "patient", pkey: r.pkey, name: r.name, species: r.species, breed: r.breed || "", owner: r.owner, phone: r.phone }); });
    apItems.forEach(function (r) { if (lkHit(r, Q)) add({ kind: "appt", pkey: r.pkey, name: r.name, species: r.species, breed: r.breed || "", owner: r.owner, phone: r.phone }); });
    return out;
  }
  var lkEl = null;
  function lkBox(ctx) { var b = lkEl && lkEl.parentNode && lkEl.parentNode.querySelector(".hb-lkres"); return b || q('[data-hb-lkres="' + ctx + '"]'); }
  function lkShow(ctx, items) {
    var box = lkBox(ctx); if (!box) return; lkRes[ctx] = items = items.slice(0, 12); items.forEach(function (it) { if (/^9\d{9}$/.test(String(it.phone || ""))) it.phone = "0" + it.phone; });
    box.innerHTML = items.length ? '<div class="hb-lkt">قبلاً آمده؟ برای پرکردن فرم لمس کنید:</div>' + items.map(function (it, k) { return '<button type="button" class="hb-lkb" data-hb-lkpick="' + ctx + '" data-i="' + k + '"><b>' + esc(it.name) + '</b><small>' + esc(it.species || "") + (it.breed ? " · " + esc(it.breed) : "") + (it.owner ? " · " + esc(it.owner) : "") + (it.phone ? ' · <span dir="ltr">' + esc(it.phone) + "</span>" : "") + " · " + (it.kind === "pet" ? "شناسنامه‌دار" : it.kind === "patient" ? "پرونده دارد" : "نوبت قبلی") + '</small></button>'; }).join("") : '<small class="hb-lkn">در سوابق نبود؛ فرم را پر کنید.</small>';
  }
  function lkRun(ctx, el) {
    lkEl = el; var Q = lkQuery(el), box = lkBox(ctx); if (!box) return; box.innerHTML = '<small class="hb-lkn">در حال جستجو در سوابق…</small>';
    var stale = function () { var Q2 = lkQuery(el); return Q2.q !== Q.q; };
    api({ a: "lookup", t: tokGet(), q: Q.q }).then(function (j) {
      if (stale()) return;
      if (j.ok && j.items) return lkShow(ctx, j.items);
      // سرور قدیمی: جستجو در بیماران/نوبت‌های همین صفحه + شناسنامه‌ها
      var loc = lkLocal(Q);
      api({ a: "search", t: tokGet(), q: Q.q }).then(function (k) { if (stale()) return; (k.ok && k.pets || []).forEach(function (p) { loc.push({ kind: "pet", code: p.code, name: p.name, species: p.species, breed: "", owner: p.owner, phone: p.phone }); }); lkShow(ctx, loc); });
    });
  }
  document.addEventListener("input", function (e) {
    var el = e.target, ctx = el && el.getAttribute && el.getAttribute("data-hb-lk"); if (!ctx) return;
    clearTimeout(lkT); lkEl = el; var Q = lkQuery(el), box = lkBox(ctx);
    if (!Q.ok) { if (box) box.innerHTML = ""; if (ctx === "ap" && Q.ph) { apLink = "";  } return; }
    lkT = setTimeout(function () { lkRun(ctx, el); }, 450);
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-hb-lkpick]"); if (!b) return;
    var ctx = b.getAttribute("data-hb-lkpick"), it = (lkRes[ctx] || [])[+b.getAttribute("data-i")]; if (!it) return;
    if (ctx === "pt" && it.kind === "patient" && it.pkey && SECP) { if (confirm("«" + it.name + "» قبلاً پرونده دارد. به لیست امروز دکتر اضافه شود؟")) { ptToday(it); ptMode = "list"; ptShow(); } return; }
    if (ctx === "pt" && it.kind === "patient" && it.pkey) { if (confirm("«" + it.name + "» قبلاً پرونده دارد. پرونده‌اش باز شود؟ (برای مراجعهٔ جدید از داخل پرونده ثبت کنید)")) { ptPre = null; ptJump(it.pkey); } return; }
    var F = ctx === "ap" ? apF : ptF;
    ["name", "owner", "breed"].forEach(function (k) { var x = F(k); if (x && it[k]) x.value = it[k]; }); if (it.phone) F("phone").value = it.phone;
    if (it.species) setSeg("hb-ptsp", it.species);
    if (ctx === "pt") { var sgx = q('[data-seg="hb-ptot"]'); if (sgx) sgx.removeAttribute("data-manual"); try { ptApplyGuess(false); } catch (eg) {} }
    brFill(ctx === "ap" ? apBox() : ptBox(), ctx);
    if (ctx === "ap") { apLink = it.pkey || ""; }
    [].forEach.call(root.querySelectorAll(".hb-lkres"), function (x) { x.innerHTML = ""; }); var okb = lkBox(ctx); if (okb) okb.innerHTML = '<small class="hb-lkn">✅ اطلاعات «' + esc(it.name) + '» وارد شد.</small>';
  });
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("[data-hb-vdshow]"); if (!a) return; e.preventDefault(); var w = a.closest(".hb-ptform") || document; var d = w.querySelector("[data-hb-vdate]"); if (d) d.hidden = false; a.parentNode.hidden = true; });
  // ---- پنل کلینیک: ردیابی، ساعت، امروز، نوبت‌دهی ----
  function touchLog(kind, ref, name) { try { if (isDr() && srvOn() && ref) api({ a: "touch", t: tokGet(), kind: kind, ref: ref, name: name || "" }); } catch (e) {} }
  var WD = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
  function jLabel(iso) { var j = g2j(iso); return toolFa(j[2]) + " " + MON[j[1] - 1] + " " + toolFa(j[0]); }
  function wdOf(iso) { return WD[new Date(iso + "T12:00:00").getDay()]; }
  function clockTick() {
    var el = q("[data-hb-clock]"); if (!el) return; var d = new Date(), hh = ("0" + d.getHours()).slice(-2), mm = ("0" + d.getMinutes()).slice(-2);
    try { el.innerHTML = "<b>" + WD[d.getDay()] + "</b><span>" + jLabel(isoNow()) + '</span><span class="hb-ck-t" dir="ltr">' + toolFa(hh + ":" + mm) + "</span>"; } catch (e) {}
  }
  clockTick(); setInterval(clockTick, 15000);

  // امروز
  var todayItems = [];
  function todayBox() { return q("[data-hb-todaybox]"); }
  function todayLoad() {
    var box = todayBox(); if (!box) return; box.innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>';
    api({ a: "todayList", t: tokGet() }).then(function (j) { if (!j.ok) { box.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; } todayItems = j.items || []; todayRender(); setTabCount("today", 0); });
    api({ a: "apList", t: tokGet() }).then(function (j) { if (j.ok) { apItems = j.items || []; apToday = j.today || isoNow(); setTabCount("appt", apCountAll()); apRemind(); if (todayItems.length) todayRender(); else todayApStrip(); } });
    qLoad(function () { if (todayBox()) todayRender(); }); invLoad(function () { if (todayBox()) todayRender(); });
    if (!ptLoaded && !SECP) api({ a: "patList", t: tokGet() }).then(function (j) { if (j.ok) { ptItems = j.items || []; ptLoaded = true; if (todayBox()) todayRender(); } });
  }
  var TD_TAG = { "new": "🆕 ساخته شد امروز", visit: "🩺 مراجعهٔ امروز", opened: "👁 امروز باز شد" };
  // ویزیت‌شدهٔ امروز: دکتر برایش امروز یافته/تشخیص نوشته، یا نوبت امروزش «آمد» خورده
  function visitedToday(k) { var td = isoNow(); return ptItems.some(function (r) { return r.pkey === k && r.date === td && hasClin(r.note); }) || apItems.filter(function (x) { return !isQueue(x); }).concat(allQ()).some(function (r) { return r.pkey === k && r.date === (apToday || td) && r.status === "done"; }); }
  function markVisited(k) {
    var td = apToday || isoNow();
    apItems.forEach(function (x) { if (x.pkey === k && x.date === td && x.status === "booked") { x.status = "done"; api({ a: "apSet", t: tokGet(), id: x.id, status: "done" }); } });
    if (QSHEET) { qItems.forEach(function (x) { if (x.pkey === k && x.status === "wait") x.status = "done"; }); setTimeout(function () { qLoad(function () { if (todayBox()) todayRender(); }); }, 1200); setTabCount("appt", apCountAll()); apRemind(); if (todayBox()) todayRender(); return; }
    // ویزیت بدون صف/نوبت: یک ردیف صفِ «آمد» ساخته می‌شود تا پذیرش هم «ویزیت شد» را ببیند
    var has = apItems.some(function (x) { return x.pkey === k && x.date === td && x.status !== "cancelled"; }), g = ptGroup(k)[0];
    if (!has && g) { var d0 = new Date(), hm0 = ("0" + d0.getHours()).slice(-2) + ":" + ("0" + d0.getMinutes()).slice(-2);
      api({ a: "apSave", t: tokGet(), id: "", v: { date: td, time: hm0, name: g.name, species: g.species, breed: g.breed || "", owner: g.owner, phone: g.phone, reason: "ویزیت", note: QM + " ویزیت دکتر", pkey: k, rem: 0 } }).then(function (j) { if (!j.ok) return; j.item.status = "done"; apItems.push(j.item); api({ a: "apSet", t: tokGet(), id: j.item.id, status: "done" }); if (todayBox()) todayRender(); }); }
    setTabCount("appt", apCountAll()); apRemind(); if (todayBox()) todayRender();
  }
  // صف امروز: نوبت‌های امروز + «به امروز»ها + ویزیت‌شده‌های امروز
  function todayEntries() {
    var td = apToday || isoNow(), map = {}, list = [];
    function key(r) { if (r.pkey) return r.pkey; var ph = phN(r.phone || ""); if (ph) { var m = apItems.filter(function (x) { return x.date === td && x.pkey && phN(x.phone || "") === ph; })[0] || ptItems.filter(function (x) { return phN(x.phone || "") === ph; })[0]; if (m) return m.pkey; } return "A:" + r.id; }
    function ent(k, r) { var e = map[k]; if (!e) { e = map[k] = { k: k, pkey: k.indexOf("A:") === 0 ? "" : k, name: r.name, species: r.species, owner: r.owner, phone: r.phone, ap: null, q: null }; list.push(e); } return e; }
    apItems.filter(function (r) { return !isQueue(r); }).concat(allQ()).forEach(function (r) { if (r.date !== td || r.status === "cancelled") return; var e = ent(key(r), r); if (isQueue(r)) { if (!e.q || r.status === "done") e.q = r; } else if (!e.ap) e.ap = r; });
    if (!SECP) ptItems.forEach(function (r) { if (r.date === td && hasClin(r.note)) ent(r.pkey, r); });
    var other = todayItems.filter(function (it) { if (it.kind === "patient" && map[it.ref]) { var e = map[it.ref]; e.phone = e.phone || it.phone; e.species = e.species || it.species; e.owner = e.owner || it.owner; return false; } return true; });
    var wait = [], done = [];
    list.forEach(function (e) { ((e.pkey && (visitedToday(e.pkey) || invOf(e.pkey))) || (e.q && e.q.status === "done") || (e.ap && e.ap.status === "done") ? done : wait).push(e); });
    var tk = function (e) { return (e.ap && e.ap.time) || (e.q && e.q.time) || "99"; };
    wait.sort(function (a, b) { return tk(a) < tk(b) ? -1 : tk(a) > tk(b) ? 1 : 0; });
    return { wait: wait, done: done, other: other };
  }
  function qCard(e, done) {
    var open = e.pkey ? 'data-hb-tdpt="' + esc(e.pkey) + '"' : "data-hb-apgo";
    var tag = e.ap ? ' <span class="hb-tdtag">🗓 نوبت' + (done ? " داشت" : "") + (e.ap.time ? " " + toolFa(e.ap.time) : "") + "</span>" : "";
    var st = done ? ' <span class="hb-tdvb">ویزیت شد</span>' : ' <span class="hb-tdwb">⏳ در انتظار</span>', iv = done && e.pkey ? invOf(e.pkey) : null;
    if (iv) { st += iv.status === "paid" ? ' <span class="hb-ivb hb-ivok">✅ تسویه · ' + money(iv.total) + "</span>" : iv.status === "free" ? ' <span class="hb-ivb">بدون هزینه</span>' : ' <span class="hb-ivb hb-ivpend">💳 ' + money(iv.total - iv.paid) + "</span>"; if (SECP || iv.status === "pending" || iv.status === "partial") open = 'data-hb-invopen="' + esc(iv.id) + '"'; }
    tdEnt[e.k] = e; var del = !done ? '<button type="button" class="hb-qdel" data-hb-qdel="' + esc(e.k) + '" aria-label="حذف از امروز" title="حذف از امروز">✕</button>' : "";
    return '<div class="hb-qrw hb-tdc' + (done ? " hb-tdv" : " hb-tdw") + (iv && (iv.status === "pending" || iv.status === "partial") ? " hb-tdpay" : "") + '"><button type="button" class="hb-qr1" ' + open + "><b>" + (done ? "✅ " : "") + esc(e.name || "—") + st + tag + "</b><small>" + esc(e.species || "") + (e.owner ? " · " + esc(e.owner) : "") + (!e.ap && e.q && e.q.time && !done ? " · ورود " + toolFa(e.q.time) : "") + "</small>" + (!done && todayReason(e) ? '<small class="hb-tdrs">🗣 شکایت: ' + esc(todayReason(e)) + "</small>" : "") + "</button>" + (e.phone ? '<a class="hb-call hb-callq" dir="ltr" href="tel:' + esc(e.phone) + '">📞 ' + esc(e.phone) + "</a>" : "") + del + "</div>";
  }
  var tdEnt = {};
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-hb-qdel]"); if (!b) return; var e = tdEnt[b.getAttribute("data-hb-qdel")]; if (!e) return;
    if (!confirm("«" + e.name + "» از لیست امروز حذف شود؟" + (e.ap ? "\n(نوبت امروزش هم لغو می‌شود)" : "") + "\nپرونده‌اش دست نمی‌خورد.")) return;
    var jobs = [];
    if (e.q) { if (e.q._q) { jobs.push(api({ a: "qSet", t: tokGet(), id: e.q.id, status: "cancelled" })); qItems = qItems.filter(function (x) { return x.id !== e.q.id; }); } else { jobs.push(api({ a: "apSet", t: tokGet(), id: e.q.id, status: "cancelled" })); apItems.forEach(function (x) { if (x.id === e.q.id) x.status = "cancelled"; }); } }
    if (e.ap) { jobs.push(api({ a: "apSet", t: tokGet(), id: e.ap.id, status: "cancelled" })); apItems.forEach(function (x) { if (x.id === e.ap.id) x.status = "cancelled"; }); }
    todayRender(); Promise.all(jobs).then(function (rs) { var bad = rs.filter(function (j) { return !j.ok; })[0]; toast(bad ? "⚠️ " + errMsg(bad.err) : "✅ «" + e.name + "» از لیست امروز حذف شد", bad ? 7000 : 4000); if (bad) todayLoad(); });
  });
  // تازه‌سازی خودکار و بی‌صدای «امروز» هر ۳۰ ثانیه (وقتی صفحه باز و روی «امروز» است)
  var tdBusy = false;
  function todaySilent() {
    if (tdBusy || document.hidden || !todayBox() || !(isDr() && srvOn()) || root.getAttribute("data-dview") !== "today") return;
    var ae = document.activeElement; if (ae && todayBox().contains(ae) && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
    tdBusy = true;
    var jobs = [api({ a: "qList", t: tokGet() }), api({ a: "invList", t: tokGet() }), api({ a: "apList", t: tokGet() }), SECP ? null : api({ a: "patList", t: tokGet() }), SECP ? null : api({ a: "todayList", t: tokGet() })];
    Promise.all(jobs.map(function (x) { return x || Promise.resolve(null); })).then(function (r) {
      tdBusy = false; if (!r[0] || !r[0].ok) return;
      QSHEET = true; qItems = r[0].items || []; if (r[1] && r[1].ok) invItems = r[1].items || []; if (r[2] && r[2].ok) { apItems = r[2].items || []; apToday = r[2].today || apToday; } if (r[3] && r[3].ok) { ptItems = r[3].items || []; ptLoaded = true; } if (r[4] && r[4].ok) todayItems = r[4].items || [];
      var a2 = document.activeElement; if (root.getAttribute("data-dview") !== "today" || (a2 && todayBox() && todayBox().contains(a2) && /^(INPUT|TEXTAREA|SELECT)$/.test(a2.tagName))) return;
      todayRender(); setTabCount("appt", apCountAll()); apRemind();
    });
  }
  setInterval(todaySilent, 30000); document.addEventListener("visibilitychange", function () { if (!document.hidden) todaySilent(); });
  // ===== صورتحساب و فاکتور =====
  function money(n) { return toolFa(String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + " تومان"; }
  document.addEventListener("input", function (e) { var t = e.target; if (!t || !t.hasAttribute || !(t.hasAttribute("data-hb-bp") || t.hasAttribute("data-hb-bdisc") || t.hasAttribute("data-hb-invamt"))) return; var dg = faDigits(t.value).replace(/[^0-9]/g, ""); t.value = dg ? grp3(dg) : ""; });
  function grp3(n) { return String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function numIn(v) { return Number(faDigits(String(v || "")).replace(/[^0-9]/g, "")) || 0; }
  function invOf(k) { if (!k) return null; var td = isoNow(), l = invItems.filter(function (v) { return v.pkey === k && v.date === td && v.status !== "void"; }); return l[0] || null; }
  function unbilled() {   // دکتر: ویزیت‌های امروز که صورتحساب ندارند
    if (SECP || !QSHEET) return ""; var td = isoNow(), l = ptItems.filter(function (r) { return r.date === td && hasClin(r.note) && !invItems.some(function (v) { return v.vid === r.id && v.status !== "void"; }); }); if (!l.length) return "";
    return '<div class="hb-unb"><b>⚠️ ویزیت‌های بدون صورتحساب (' + toolFa(l.length) + ")</b>" + l.map(function (r) { return '<div class="hb-tdr"><div class="hb-tdri"><b>' + esc(r.name) + "</b><small>" + esc(r.reason || "") + (r.owner ? " · " + esc(r.owner) : "") + '</small></div><button type="button" class="btn small primary" data-hb-unb="' + esc(r.id) + '">💳 صورتحساب</button></div>'; }).join("") + "</div>";
  }
  function oldDebts() {
    var td = isoNow(), l = invItems.filter(function (v) { return v.date < td && (v.status === "pending" || v.status === "partial"); }); if (!l.length) return "";
    var dsum = l.reduce(function (t, v) { return t + v.total - v.paid; }, 0);
    return '<details class="hb-tdoth"><summary><span>🚨 بدهی روزهای قبل</span><em class="hb-debtpill">' + toolFa(l.length) + " مورد · " + money(dsum) + '</em><i class="hb-arw">▾</i></summary>' + l.map(function (v) { return '<div class="hb-tdr"><div class="hb-tdri"><b>' + esc(v.name) + "</b><small>" + esc(fd(v.date)) + " · مانده: " + money(v.total - v.paid) + '</small></div><button type="button" class="btn small primary" data-hb-invopen="' + esc(v.id) + '">💳 دریافت</button></div>'; }).join("") + "</details>";
  }
  function dayReport() {
    if (SECP) return ""; var td = isoNow(), l = invItems.filter(function (v) { return v.date === td && v.status !== "void"; }); if (!l.length) return "";
    var tot = 0, paid = 0, by = {}; l.forEach(function (v) { tot += v.total; paid += v.paid; if (v.paid) by[v.method || "نقد"] = (by[v.method || "نقد"] || 0) + v.paid; });
    return '<div class="hb-rep"><b>📊 گزارش امروز</b><span>جمع فاکتورها: ' + money(tot) + "</span><span>دریافت‌شده: " + money(paid) + (Object.keys(by).length ? " (" + Object.keys(by).map(function (k) { return k + " " + money(by[k]); }).join(" · ") + ")" : "") + "</span><span>مانده: " + money(tot - paid) + "</span></div>";
  }
  // پنجرهٔ صورتحساب بعد از ثبت ویزیت (دکتر)
  var billV = null, billRows = [];
  function billOpen(item) {
    billV = item; svcLoad(function (ok) {
      if (!ok && !svcItems.length) { ptToToday(); return; }   // اسکریپت قدیمی: بدون صورتحساب
      var ex = invItems.filter(function (v) { return v.vid === item.id && v.status !== "void"; })[0];
      billRows = svcItems.filter(function (x) { return x.active; }).map(function (x) { var hit = ex ? ex.items.filter(function (y) { return y.name === x.name; })[0] : null; return { rep: hit && hit.rep || "", name: x.name, price: hit ? hit.price : x.price, qty: hit ? hit.qty : 1, on: ex ? !!hit : /ویزیت/.test(x.name) }; });
      if (ex) ex.items.forEach(function (y) { if (!billRows.some(function (r) { return r.name === y.name; })) billRows.push({ rep: y.rep || "", name: y.name, price: y.price, qty: y.qty, on: true }); });
      billV._inv = ex || null; billTax = ex ? !!ex.tax : true; ptMode = "bill"; billShow(ex ? ex.disc : 0, ex ? ex.note : "");
    });
  }
  var billQ = "", billAll = false, billTax = true, billJd = {};
  var REP_RE = /واکسن|ضد ?انگل/;
  function needsRep(n) { return REP_RE.test(normFa(n)); }
  function repLabel(iso) { var j = g2j(iso); return wdOf(iso) + " " + toolFa(j[2]) + " " + MON[j[1] - 1] + " " + toolFa(j[0]); }
  function addMonths(iso, n) {
    var j = g2j(iso), y = j[0], m = j[1] + n, d = j[2]; y += Math.floor((m - 1) / 12); m = ((m - 1) % 12 + 12) % 12 + 1;
    var out = j2g(y, m, d), k = 0; while (g2j(out)[1] !== m && k++ < 4) { d--; out = j2g(y, m, d); } return out;
  }
  function billTop() {   // ۶ خدمت پرکاربرد (از فاکتورهای قبلی؛ وگرنه ترتیب تعرفه)
    var cnt = {}; invItems.forEach(function (v) { (v.items || []).forEach(function (x) { cnt[x.name] = (cnt[x.name] || 0) + 1; }); });
    return billRows.map(function (r, i) { return { i: i, c: cnt[r.name] || 0 }; }).sort(function (a, b) { return b.c - a.c || a.i - b.i; }).slice(0, 6).map(function (x) { return x.i; });
  }
  function svcIcon(n) {
    n = String(n || ""); var ic = "";
    if (/pcr|ژن|ژنتیک/i.test(n)) ic = "🧬"; else if (/خون.?گیری/.test(n)) ic = "🩸"; else if (/رادیو|اشعه|سونوگرافی|ایکس.?ری|x.?ray/i.test(n)) ic = "🩻";
    else if (/آزمایش|cbc|cbt|ادرار|مدفوع/i.test(n)) ic = "🧪"; else if (/میکروسکوپ|اسمیر|کشت|سیتولوژی|پوست.?تراشی/.test(n)) ic = "🔬";
    else if (/کیت|تشخیص/.test(n)) ic = "🦠"; else if (/ناخن/.test(n)) ic = "💅🏽"; else if (/پانسمان|بخیه|زخم|باند|چسب/.test(n)) ic = "🩹"; else if (/واکسن|تزریق|سرم/.test(n)) ic = "💉";
    else if (/ضد.?انگل|دارو|قرص|شربت|پماد|قطره/.test(n)) ic = "💊"; else if (/ویزیت|معاینه|چکاپ|مشاوره/.test(n)) ic = "🩺";
    var sp = /سگ/.test(n) ? "🐶" : /گربه/.test(n) ? "🐱" : ""; return ic + sp;
  }
  function billList() {
    var el = ptBox().querySelector("[data-hb-blist]"); if (!el) return; var qn = billQ.toLowerCase(), top = billTop(), idx = [];
    var sct = el.scrollTop;
    billRows.forEach(function (r, i) { if (r.on || (qn ? r.name.toLowerCase().indexOf(qn) > -1 : (billAll || top.indexOf(i) > -1))) idx.push(i); });
    var hidden = billRows.length - idx.length, exact = billRows.some(function (r) { return r.name.toLowerCase() === qn; });
    el.innerHTML = '<div class="hb-blhead"><span>خدمت</span><span>قیمت</span><span>تعداد</span><span>جمع</span></div>' + idx.map(function (i) {
      var r = billRows[i], row = '<div class="hb-blr' + (r.on ? " on" : "") + '"><input type="checkbox" class="hb-bck" data-hb-bon="' + i + '"' + (r.on ? " checked" : "") + ' tabindex="-1"><div class="hb-blmain" role="button" data-hb-bmain="' + i + '"><span class="hb-bln">' + (svcIcon(r.name) ? '<i class="hb-sic">' + svcIcon(r.name) + "</i> " : "") + esc(r.name) + '</span></div><span class="hb-blpr" data-hb-bp="' + i + '">' + (r.price ? grp3(r.price) : "۰") + '</span><div class="hb-blqs"><button type="button" class="hb-qb" data-hb-qm="' + i + '" aria-label="کم">−</button><input class="hb-blq" type="text" inputmode="numeric" data-hb-bq="' + i + '" value="' + r.qty + '"><button type="button" class="hb-qb" data-hb-qp="' + i + '" aria-label="زیاد">+</button></div><b class="hb-blt" data-hb-blt="' + i + '"></b></div>';
      if (r.on && needsRep(r.name)) row += '<div class="hb-blrep' + (r.rep ? " ok" : "") + '" data-hb-brep="' + i + '"><div class="hb-brh"><b>📅 تاریخ تکرار «' + esc(r.name) + '»</b><span class="hb-brv">' + (r.rep ? esc(repLabel(r.rep)) : "⚠️ انتخاب نشده (الزامی)") + '</span></div><div class="hb-brq"><button type="button" data-hb-rpq="1" data-i="' + i + '">۱ ماه بعد</button><button type="button" data-hb-rpq="3" data-i="' + i + '">۳ ماه بعد</button><button type="button" data-hb-rpq="12" data-i="' + i + '">۱ سال بعد</button></div><div class="jd" data-pjd="br' + i + '"></div></div>';
      return row;
    }).join("")
      + (!idx.length && qn ? '<p class="hb-qmsg">خدمتی با این نام در تعرفه‌ها نیست.</p>' : "")
      + (billQ && !exact ? '<button type="button" class="btn small ghost hb-bman" data-hb-bman>＋ افزودن «' + esc(billQ) + '» به‌صورت دستی</button>' : "")
      + (!qn && !billAll && hidden > 0 ? '<button type="button" class="btn small ghost hb-bman" data-hb-ball>همهٔ خدمات (' + toolFa(billRows.length) + ")</button>" : "");
    el.scrollTop = sct;
    billJd = {}; idx.forEach(function (i) {
      var r = billRows[i], c = el.querySelector('[data-pjd="br' + i + '"]'); if (!c) return;
      var jd = initJd(c, { optional: true, minY: 0, maxY: 2 }); jd.set(r.rep || ""); billJd[i] = jd;
      c.addEventListener("change", function () { r.rep = jd.get() || ""; billRepUI(i); });
    });
  }
  function billRepUI(i) { var e0 = ptBox().querySelector("[data-hb-berr]"); if (e0) e0.hidden = true; var el = ptBox().querySelector('[data-hb-brep="' + i + '"]'), r = billRows[i]; if (!el || !r) return; el.classList.toggle("ok", !!r.rep); el.classList.remove("bad"); el.querySelector(".hb-brv").textContent = r.rep ? repLabel(r.rep) : "⚠️ انتخاب نشده (الزامی)"; }
  function billShow(disc, note) {
    var box = ptBox(), v = billV; billQ = ""; billAll = false;
    box.innerHTML = '<div class="hb-ptform hb-bill"><div class="hb-blhdr"><h3 class="hb-pth">💳 صورتحساب «' + esc(v.name) + '»</h3><button type="button" class="btn small ghost hb-blbk" data-hb-blback>→ برگشت</button></div>' + '<input type="search" class="hb-bsearch" data-hb-bsearch autocomplete="off" placeholder="🔎 جستجوی خدمت (لمس نام خدمت = یکی اضافه)"><div class="hb-bl" data-hb-blist></div>'
      + (hasClin(v.note) ? "" : '<div class="hb-emptywarn" data-hb-ewarn><span>⚠️ پروندهٔ این مراجعه خالی است؛ تا کامل نشود، فاکتور به پذیرش نمی‌رود.</span><button type="button" class="btn small" data-hb-fillrec>📝 تکمیل پرونده</button></div>')
      + '<div class="hb-bltot" data-hb-btot></div><p class="hb-err" data-hb-berr hidden></p><div class="hb-blbar"><button type="button" class="hb-blxt" data-hb-blxtog>🏷 تخفیف، مالیات و توضیح <span class="hb-arw">▾</span></button><div class="hb-blx"><label class="hb-blxd"><span>تخفیف (تومان)</span><input type="text" inputmode="numeric" dir="ltr" data-hb-bdisc value="' + (disc ? grp3(disc) : "") + '"></label><label class="hb-blxtax"><input type="checkbox" data-hb-btax' + (billTax ? " checked" : "") + '> مالیات ۱۰٪ (بعد از تخفیف)</label><label class="hb-blxn"><span>توضیح <small>(اختیاری)</small></span><input type="text" maxlength="200" data-hb-bnote value="' + esc(note || "") + '"></label></div><div class="hb-blbar1"><div class="hb-blmini" data-hb-bmini></div><button type="button" class="btn primary" data-hb-bsend>📤 ارسال به پذیرش</button></div><div class="hb-blbar2"><button type="button" class="btn small ghost" data-hb-bfree>بدون هزینه</button><button type="button" class="btn small ghost" data-hb-blater>⏭ بعداً</button></div></div>' + "</div>";
    billList(); billCalc(); syncBillMode();
    try { var hd = document.querySelector(".hb-staffhdr"); window.scrollTo(0, Math.max(0, box.getBoundingClientRect().top + window.pageYOffset - (hd ? hd.offsetHeight : 60) - 6)); } catch (e) {}
    setTimeout(billFit, 30); setTimeout(billFit, 300);
  }
  function syncBillMode() { document.documentElement.classList.toggle("hb-billmode", ptMode === "bill" && !!root.getAttribute("data-dview") && root.getAttribute("data-dview") === "pt"); }
  function billFit() {
    if (!document.documentElement.classList.contains("hb-billmode")) return; var l = q("[data-hb-blist]"), bar = q(".hb-blbar"); if (!l || !bar) return;
    l.style.height = "auto"; l.style.maxHeight = "none"; var top = l.getBoundingClientRect().top, ih = window.innerHeight || document.documentElement.clientHeight;
    var er0 = q("[data-hb-berr]"), eh = er0 && !er0.hidden ? er0.offsetHeight + 8 : 0, ew = q("[data-hb-ewarn]"); l.style.height = Math.max(170, ih - top - bar.offsetHeight - (ew ? ew.offsetHeight + 10 : 0) - eh - 14) + "px";
  }
  var billDraft = null;
  function billSnapshot() { billRead(); var bx = ptBox(); billDraft = { vid: billV.id, pkey: billV.pkey, qv: billV, rows: billRows, inv: billV._inv || null, disc: numIn((bx.querySelector("[data-hb-bdisc]") || {}).value), note: (bx.querySelector("[data-hb-bnote]") || {}).value || "", tax: !!(bx.querySelector("[data-hb-btax]") || {}).checked }; }
  function billResume() { var d = billDraft; if (!d) return; billDraft = null; var vis = ptItems.filter(function (x) { return x.id === d.vid; })[0] || d.qv; vis._inv = d.inv; billV = vis; billRows = d.rows; billTax = d.tax; ptCur = d.pkey; ptEditV = null; ptMode = "bill"; if (root.getAttribute("data-dview") !== "pt") dview("pt"); billShow(d.disc, d.note); }
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t.closest) return;
    if (t.closest("[data-hb-fillrec]")) { e.preventDefault(); if (!billV) return; billSnapshot(); var vis = ptItems.filter(function (x) { return x.id === billDraft.vid; })[0]; if (!vis) { billDraft = null; return toast("⚠️ مراجعه پیدا نشد."); } ptCur = vis.pkey; ptMode = "file"; ptTab = ""; ptEditV = vis; ptShow(); try { var f = q("[data-hb-ptvt]"); if (f) f.scrollIntoView({ block: "start" }); window.scrollBy(0, -90); } catch (e1) {} return; }
    if (t.closest("[data-hb-billresume]")) { e.preventDefault(); billResume(); }
  });
  window.addEventListener("resize", function () { setTimeout(billFit, 60); }); window.addEventListener("orientationchange", function () { setTimeout(billFit, 300); });
  function billDone() { billDraft = null; billV = null; if (billRet === "file") { billRet = "today"; ptMode = "file"; ptTab = "inv"; ptShow(); try { window.scrollTo(0, 0); } catch (e) {} } else ptToToday(); }
  document.addEventListener("click", function (e) { var t = e.target; if (!t.closest) return; var b = t.closest("[data-hb-blxtog]"); if (!b) return; var bar = b.closest(".hb-blbar"); bar.classList.toggle("xo"); b.querySelector(".hb-arw").textContent = bar.classList.contains("xo") ? "▴" : "▾"; setTimeout(billFit, 30); });
  function billSet(i, qty) { billRead(); var r = billRows[i]; if (!r) return; if (qty <= 0) { r.on = false; r.qty = 1; } else { r.on = true; r.qty = Math.min(99, qty); } billList(); billCalc(); }
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t.closest || !t.closest(".hb-bill")) return;
    var b = t.closest("[data-hb-qm],[data-hb-qp]");
    if (b) { e.preventDefault(); var i = +(b.getAttribute("data-hb-qm") || b.getAttribute("data-hb-qp")); billRead(); var r = billRows[i]; if (r) billSet(i, (r.on ? r.qty : 0) + (b.hasAttribute("data-hb-qp") ? 1 : -1)); return; }
    var m = t.closest("[data-hb-bmain]"); if (m) { var k = +m.getAttribute("data-hb-bmain"); billRead(); var rr = billRows[k]; if (rr) billSet(k, (rr.on ? rr.qty : 0) + 1); }
  });
  document.addEventListener("input", function (e) { var t = e.target; if (t && t.hasAttribute && t.hasAttribute("data-hb-bq")) { var dg = faDigits(t.value).replace(/[^0-9]/g, ""); t.value = dg ? String(Math.min(99, +dg)) : ""; } });
  function billRead() { var box = ptBox(); billRows.forEach(function (r, i) { var c = box.querySelector('[data-hb-bon="' + i + '"]'); if (!c) return; r.on = c.checked; var qe = box.querySelector('[data-hb-bq="' + i + '"]'), pe = box.querySelector('[data-hb-bp="' + i + '"]'); if (qe) r.qty = Math.max(1, Math.min(99, numIn(qe.value) || 1));  var nm = box.querySelector('[data-hb-bn="' + i + '"]'); if (nm) r.name = nm.value.trim(); }); }
  function billCalc() {
    billRead(); var box = ptBox(), sub = 0; billRows.forEach(function (r) { if (r.on) sub += r.qty * r.price; });
    var d = Math.min(sub, numIn((box.querySelector("[data-hb-bdisc]") || {}).value)), tx = (box.querySelector("[data-hb-btax]") || {}).checked ? Math.round((sub - d) * 0.1) : 0, t = box.querySelector("[data-hb-btot]");
    if (t) t.innerHTML = "<span>جمع: " + money(sub) + "</span>" + (d ? "<span>تخفیف: " + money(d) + "</span>" : "") + (tx ? "<span>مالیات ۱۰٪: " + money(tx) + "</span>" : "") + "<b>مبلغ نهایی: " + money(sub - d + tx) + "</b>";
    [].forEach.call(box.querySelectorAll(".hb-blr"), function (l) { var ck = l.querySelector("[data-hb-bon]"); l.classList.toggle("on", !!(ck && ck.checked)); });
    billRows.forEach(function (r, i) { var lt = box.querySelector('[data-hb-blt="' + i + '"]'); if (lt) lt.textContent = r.on ? money(r.qty * r.price) : ""; });
    var mn = box.querySelector("[data-hb-bmini]"); if (mn) mn.innerHTML = "<small>جمع " + money(sub) + (d ? " · تخفیف " + money(d) : "") + (tx ? " · مالیات " + money(tx) : "") + "</small><b>نهایی: " + money(sub - d + tx) + "</b>";
  }
  function billSave(free, why) {
    billRead(); var box = ptBox(), v = billV, er = box.querySelector("[data-hb-berr]"), on = billRows.filter(function (r) { return r.on && r.name; });
    var items = on.map(function (r) { var o = { name: r.name, qty: r.qty, price: r.price }; if (r.rep) o.rep = r.rep; return o; });
    if (!free && !items.length) { er.textContent = "حداقل یک خدمت انتخاب کنید یا «بدون هزینه» را بزنید."; er.hidden = false; return; }
    if (!v._inv && !hasClin(v.note)) { er.hidden = true; var ew2 = box.querySelector("[data-hb-ewarn]"); if (ew2) { ew2.classList.add("bad"); ew2.querySelector("span").textContent = "⚠️ پروندهٔ این مراجعه خالی است؛ ابتدا «تکمیل پرونده» را بزنید، بعد فاکتور ارسال می‌شود."; } setTimeout(billFit, 20); return; }
    var miss = on.filter(function (r) { return needsRep(r.name) && !r.rep; })[0];
    if (miss) { var mi = billRows.indexOf(miss), me = box.querySelector('[data-hb-brep="' + mi + '"]'); er.textContent = "تاریخ تکرار «" + miss.name + "» را انتخاب کنید (برای پیامک یادآور لازم است)."; er.hidden = false; if (me) { me.classList.add("bad"); try { me.scrollIntoView({ block: "center" }); } catch (e) {} } return; }
    var note = (box.querySelector("[data-hb-bnote]") || {}).value || ""; if (free && why) note = (note ? note + " · " : "") + "بدون هزینه: " + why;
    er.hidden = true; [].forEach.call(box.querySelectorAll(".hb-bill .btn"), function (b) { b.disabled = true; });
    api({ a: "invSave", t: tokGet(), v: { id: v._inv ? v._inv.id : "", vid: v.id, pkey: v.pkey, name: v.name, owner: ((ptEff(ptGroup(v.pkey)).otitle || "") + " " + (v.owner || "")).trim(), phone: v.phone, date: v.date || isoNow(), items: items, disc: numIn((box.querySelector("[data-hb-bdisc]") || {}).value), tax: (box.querySelector("[data-hb-btax]") || {}).checked ? 1 : 0, free: free ? 1 : 0, note: note } }).then(function (j) {
      [].forEach.call(box.querySelectorAll(".hb-bill .btn"), function (b) { b.disabled = false; });
      if (!j.ok) { er.textContent = errMsg(j.err); er.hidden = false; return; }
      invItems = invItems.filter(function (x) { return x.id !== j.item.id; }); invItems.unshift(j.item);
      toast(free ? "✅ بدون هزینه به پذیرش رفت" : "📤 صورتحساب " + money(j.item.total) + " به پذیرش رفت"); if (!hasClin(v.note)) setTimeout(function () { toast("⚠️ پروندهٔ این مراجعه خالی است؛ برای تسویه‌حساب توسط پذیرش، پرونده را تکمیل کنید.", 9000); }, 1500); billDone();
    });
  }
  document.addEventListener("input", function (e) { if (!(e.target && e.target.closest && e.target.closest(".hb-bill"))) return; if (e.target.hasAttribute("data-hb-bsearch")) { billRead(); billQ = faDigits(e.target.value).trim(); billList(); return; } billCalc(); });
  document.addEventListener("change", function (e) { if (!(e.target && e.target.closest && e.target.closest(".hb-bill"))) return; billCalc(); if (e.target.hasAttribute("data-hb-bon")) billList(); });
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t.closest || !t.closest(".hb-bill")) return;
    if (t.closest("[data-hb-bman]") && billQ) { billRead(); var pr = prompt("قیمت «" + billQ + "» (تومان):", ""); if (pr === null) return; billRows.unshift({ name: billQ, price: numIn(pr), qty: 1, on: true }); billQ = ""; var si = ptBox().querySelector("[data-hb-bsearch]"); if (si) si.value = ""; billList(); billCalc(); return; }
    if (t.closest("[data-hb-ball]")) { billRead(); billAll = true; billList(); return; }
    var rq = t.closest("[data-hb-rpq]"); if (rq) { billRead(); var ri = +rq.getAttribute("data-i"), rr = billRows[ri]; if (rr) { rr.rep = addMonths((billV && billV.date) || isoNow(), +rq.getAttribute("data-hb-rpq")); billList(); billCalc(); var e1 = ptBox().querySelector("[data-hb-berr]"); if (e1) e1.hidden = true; } return; }
    if (t.closest("[data-hb-bsend]")) return billSave(false);
    if (t.closest("[data-hb-bfree]")) { var why = prompt("دلیل بدون هزینه (مثلاً: پیگیری رایگان):", "پیگیری رایگان"); if (why === null) return; return billSave(true, why); }
    if (t.closest("[data-hb-blater]")) { billDraft = null; billV = null; ptToToday(); }
    if (t.closest("[data-hb-blback]")) { billDraft = null; billV = null; billRet = "today"; ptMode = "file"; ptShow(); return; }
  });
  // فاکتور و دریافت وجه (پذیرش و دکتر)
  var invOpenId = "";
  function invWho(v) { var o = String(v.owner || "").trim(), m = /^(خانم|آقای|آقا)\s+(.*)$/.exec(o), t = m ? (m[1] === "آقا" ? "آقای" : m[1]) : "آقای / خانم", n = m ? m[2] : o; return t + (n ? " " + n : ""); }
  var fnoTried = false;
  function invPanel() {
    var v = invItems.filter(function (x) { return x.id === invOpenId; })[0], el = q("[data-hb-invpanel]"); if (!el) return; if (!v) { el.innerHTML = ""; return; }
    var rem = v.total - v.paid;
    if (!fnoTried && !ptItems.length) { fnoTried = true; api({ a: "patList", t: tokGet() }).then(function (j2) { if (j2 && j2.ok) { ptItems = j2.items || []; ptLoaded = true; invPanel(); } }); }
    var fn0 = fnoOfPk(v.pkey);
    el.innerHTML = '<div class="hb-inv"><div class="hb-invh"><div class="hb-invm"><div class="hb-invr"><b>' + esc(invWho(v)) + "</b><span>تاریخ: " + esc(fd(v.date)) + '</span></div><div class="hb-invr"><span>نام پت: <b>' + esc(v.name) + "</b></span><span>شمارهٔ فاکتور: " + esc(v.id) + "</span>" + (fn0 ? "<span>شمارهٔ پرونده: " + esc(fn0) + "</span>" : "") + '</div></div><button type="button" class="btn small ghost" data-hb-invclose>→ برگشت</button></div><table class="hb-invt"><tr><th>خدمت</th><th>تعداد</th><th>مبلغ</th></tr>'
      + v.items.map(function (r) { return "<tr><td>" + esc(r.name) + (r.rep ? '<small class="hb-invrp">تکرار: ' + esc(repLabel(r.rep)) + "</small>" : "") + "</td><td>" + toolFa(r.qty) + "</td><td>" + money(r.qty * r.price) + "</td></tr>"; }).join("")
      + "</table>" + (v.disc ? '<p class="hb-invl"><span>تخفیف</span><span>− ' + money(v.disc) + "</span></p>" : "") + (v.tax ? '<p class="hb-invl"><span>مالیات ۱۰٪</span><span>' + money(v.tax) + "</span></p>" : "") + '<p class="hb-invl hb-invtot"><span>مبلغ کل</span><span>' + money(v.total) + "</span></p>" + (v.paid ? '<p class="hb-invl"><span>پرداخت‌شده</span><span>' + money(v.paid) + "</span></p>" : "") + (v.note ? '<p class="hb-mut">' + esc(v.note) + "</p>" : "")
      + (v.status === "paid" ? '<p class="hb-invok">✅ تسویه شد' + (v.method ? " · " + esc(v.method) : "") + "</p>" : v.status === "free" ? '<p class="hb-invok">بدون هزینه</p>' : '<div class="hb-invpay"><div class="seg" data-seg="hb-pm">' + ["نقد", "کارت", "کارت‌به‌کارت"].map(function (m, i) { return '<button type="button"' + (i === 1 ? ' class="on"' : "") + ' data-v="' + m + '">' + m + "</button>"; }).join("") + '</div><div class="fld"><label>مبلغ دریافتی</label><input type="text" inputmode="numeric" dir="ltr" data-hb-invamt value="' + (rem ? grp3(rem) : "") + '"></div><button type="button" class="btn primary" data-hb-invpay>💰 دریافت شد · ' + money(rem) + '</button><button type="button" class="btn small ghost" data-hb-invdisc>🏷 تخفیف' + (v.disc ? " (" + money(v.disc) + ")" : "") + "</button></div>")
      + ('<div class="hb-invacts"><button type="button" class="btn primary hb-wide" data-hb-invshare>📤 ارسال فاکتور (تصویر)</button><button type="button" class="btn ghost" data-hb-invcopy>📋 کپی متن</button><button type="button" class="btn ghost" data-hb-invprint>🖨 چاپ</button></div>') + (!SECP ? '<div class="hb-invacts"><button type="button" class="btn ghost" data-hb-invedit>✏️ ویرایش</button><button type="button" class="btn ghost hb-danger" data-hb-invvoid>🚫 باطل کردن</button></div>' : "") + "</div>";
    try { el.scrollIntoView({ block: "start" }); window.scrollBy(0, -140); } catch (e) {}
  }
  function invPrint(v) {
    var w = window.open("", "_blank"); if (!w) return toast("⚠️ مرورگر اجازهٔ باز کردن پنجرهٔ چاپ را نداد.");
    var f = location.origin + location.pathname.replace(/[^/]*$/, "") + "fonts/Vazirmatn-";
    w.document.write('<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><title>فاکتور ' + esc(v.name) + '</title><style>@font-face{font-family:V;src:url(' + f + 'Regular.woff2)}@font-face{font-family:V;font-weight:700;src:url(' + f + 'Bold.woff2)}body{font-family:V,Tahoma,sans-serif;max-width:560px;margin:24px auto;padding:0 16px;color:#111}h1{font-size:18px;text-align:center;margin:0 0 4px}.s{text-align:center;color:#555;font-size:13px;margin-bottom:16px}.r{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:14px;margin:4px 0}.r:last-of-type{margin-bottom:14px}table{width:100%;border-collapse:collapse;font-size:14px}th,td{padding:7px 4px;border-bottom:1px solid #ddd;text-align:right}td:last-child,th:last-child{text-align:left}.t{display:flex;justify-content:space-between;margin:6px 0;font-size:14px}.g{font-size:17px;font-weight:700;border-top:2px solid #111;padding-top:8px}.f{margin-top:24px;text-align:center;font-size:12px;color:#666}</style></head><body>'
      + "<h1>کلینیک دامپزشکی دکتر نیلوفر مساوات</h1><div class=\"r\"><b>" + esc(invWho(v)) + "</b><span>تاریخ: " + esc(fd(v.date)) + "</span></div><div class=\"r\"><span>نام پت: <b>" + esc(v.name) + "</b></span><span>شمارهٔ فاکتور: " + esc(v.id) + "</span>" + (fnoOfPk(v.pkey) ? "<span>شمارهٔ پرونده: " + esc(fnoOfPk(v.pkey)) + "</span>" : "") + "</div><table><tr><th>خدمت</th><th>تعداد</th><th>مبلغ</th></tr>"
      + v.items.map(function (r) { return "<tr><td>" + esc(r.name) + "</td><td>" + toolFa(r.qty) + "</td><td>" + money(r.qty * r.price) + "</td></tr>"; }).join("") + "</table>"
      + (v.disc ? '<div class="t"><span>تخفیف</span><span>− ' + money(v.disc) + "</span></div>" : "") + (v.tax ? '<div class="t"><span>مالیات بر ارزش افزوده ۱۰٪</span><span>' + money(v.tax) + "</span></div>" : "") + '<div class="t g"><span>مبلغ کل</span><span>' + money(v.total) + "</span></div>"
      + (v.paid ? '<div class="t"><span>پرداخت‌شده' + (v.method ? " (" + esc(v.method) + ")" : "") + "</span><span>" + money(v.paid) + "</span></div>" : "") + (v.total - v.paid > 0 && v.status !== "free" ? '<div class="t"><span>مانده</span><span>' + money(v.total - v.paid) + "</span></div>" : "")
      + '<div class="f">drniloofarmosavat.ir</div><script>setTimeout(function(){window.print()},500)<\/script></body></html>');
    w.document.close();
  }
  // ===== فاکتور به‌صورت تصویر (PNG) برای واتساپ =====
  function fnoOfPk(k) { var r = ptItems.filter(function (x) { return x.pkey === k && x.fno; })[0]; return r ? r.fno : ""; }
  function invBlob(v, cb) {
    var FONT = "Vazirmatn, Tahoma, sans-serif", W = 760, P = 36, RH = 66, lines = [];
    if (v.disc || v.tax) lines.push(["جمع خدمات", money(v.sub), 0]); if (v.disc) lines.push(["تخفیف", "− " + money(v.disc), 0]); if (v.tax) lines.push(["مالیات بر ارزش افزوده ۱۰٪", money(v.tax), 0]);
    lines.push(["مبلغ کل", money(v.total), 1]); if (v.paid) lines.push(["پرداخت‌شده" + (v.method ? " (" + v.method + ")" : ""), money(v.paid), 0]); if (v.status !== "paid" && v.status !== "free" && v.total - v.paid > 0) lines.push(["مانده", money(v.total - v.paid), 1]);
    var H = 345 + v.items.length * RH + lines.length * 52 + 150, cv = document.createElement("canvas"); cv.width = W; cv.height = H; var c = cv.getContext("2d");
    var go = function () {
      try { c.direction = "rtl"; } catch (e) {} c.fillStyle = "#fff"; c.fillRect(0, 0, W, H);
      c.fillStyle = "#1f5aa6"; c.fillRect(0, 0, W, 120); c.fillStyle = "#fff"; c.textAlign = "center"; c.font = "700 34px " + FONT; c.fillText("کلینیک دامپزشکی دکتر نیلوفر مساوات", W / 2, 66); c.font = "400 22px " + FONT; c.fillText("فاکتور", W / 2, 102);
      c.fillStyle = "#111"; c.textAlign = "right"; c.font = "700 28px " + FONT; var y = 176, fn = fnoOfPk(v.pkey); c.fillText(invWho(v), W - P, y); c.font = "400 24px " + FONT; c.textAlign = "left"; c.fillStyle = "#333"; c.fillText("تاریخ: " + fd(v.date), P, y); c.textAlign = "right"; y += 42; c.fillStyle = "#111"; c.fillText("نام پت: " + v.name, W - P, y); if (fn) { c.textAlign = "left"; c.fillText("شمارهٔ پرونده: " + fn, P, y); c.textAlign = "right"; } y += 42; c.fillStyle = "#555"; c.fillText("شمارهٔ فاکتور: " + v.id, W - P, y);
      y += 36; c.fillStyle = "#eef2f8"; c.fillRect(P, y, W - 2 * P, 50); c.fillStyle = "#334"; c.font = "700 22px " + FONT; c.textAlign = "right"; c.fillText("خدمت", W - P - 12, y + 33); c.textAlign = "center"; c.fillText("تعداد", W / 2 + 40, y + 33); c.textAlign = "left"; c.fillText("مبلغ", P + 12, y + 33); y += 50;
      v.items.forEach(function (r, k) {
        if (k % 2) { c.fillStyle = "#fafbfd"; c.fillRect(P, y, W - 2 * P, RH); }
        c.fillStyle = "#111"; c.font = "400 25px " + FONT; c.textAlign = "right"; c.fillText(r.name, W - P - 12, y + (r.rep ? 30 : 42)); if (r.rep) { c.fillStyle = "#1f5aa6"; c.font = "400 18px " + FONT; c.fillText("تکرار: " + repLabel(r.rep), W - P - 12, y + 56); }
        c.fillStyle = "#111"; c.font = "400 25px " + FONT; c.textAlign = "center"; c.fillText(toolFa(r.qty), W / 2 + 40, y + 42); c.textAlign = "left"; c.fillText(money(r.qty * r.price), P + 12, y + 42);
        c.strokeStyle = "#e3e9f2"; c.beginPath(); c.moveTo(P, y + RH); c.lineTo(W - P, y + RH); c.stroke(); y += RH;
      });
      y += 18; lines.forEach(function (l) { c.fillStyle = l[2] ? "#1f3b63" : "#444"; c.font = (l[2] ? "700 30px " : "400 25px ") + FONT; c.textAlign = "right"; c.fillText(l[0], W - P - 12, y + 34); c.textAlign = "left"; c.fillText(l[1], P + 12, y + 34); if (l[2] && l[0] === "مبلغ کل") { c.strokeStyle = "#1f5aa6"; c.lineWidth = 2; c.beginPath(); c.moveTo(P, y); c.lineTo(W - P, y); c.stroke(); c.lineWidth = 1; } y += 52; });
      if (v.status === "paid") { y += 6; c.fillStyle = "#e2f4ea"; c.fillRect(P, y, W - 2 * P, 56); c.fillStyle = "#12684a"; c.textAlign = "center"; c.font = "700 28px " + FONT; c.fillText("✅ تسویه شد", W / 2, y + 38); y += 56; }
      c.fillStyle = "#888"; c.textAlign = "center"; c.font = "400 20px " + FONT; c.fillText("drniloofarmosavat.ir", W / 2, H - 40);
      if (cv.toBlob) cv.toBlob(function (b) { cb(b); }, "image/png"); else { var u = cv.toDataURL("image/png").split(","), bin = atob(u[1]), arr = new Uint8Array(bin.length); for (var q0 = 0; q0 < bin.length; q0++) arr[q0] = bin.charCodeAt(q0); cb(new Blob([arr], { type: "image/png" })); }
    };
    if (document.fonts && document.fonts.load) Promise.all([document.fonts.load("700 28px Vazirmatn"), document.fonts.load("400 25px Vazirmatn")]).then(go, go); else go();
  }
  function invShare(v) {
    toast("در حال ساخت تصویر فاکتور…", 2500);
    invBlob(v, function (blob) {
      var file = null; try { file = new File([blob], "factor-" + v.id + ".png", { type: "image/png" }); } catch (e) {}
      if (file && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) { navigator.share({ files: [file], title: "فاکتور " + v.name }).catch(function () {}); return; }
      var url = URL.createObjectURL(blob), a = document.createElement("a"); a.href = url; a.download = "factor-" + v.id + ".png"; a.target = "_blank"; document.body.appendChild(a); a.click(); setTimeout(function () { document.body.removeChild(a); }, 500);
      toast("📥 تصویر فاکتور آماده شد؛ آن را ذخیره کنید و در واتساپ ضمیمه کنید.", 7000);
      if (v.phone) setTimeout(function () { window.open("https://wa.me/" + waNum(v.phone), "_blank"); }, 1200);
    });
  }
  function invText(v) { var fn1 = fnoOfPk(v.pkey); return "فاکتور کلینیک دامپزشکی دکتر نیلوفر مساوات\n" + invWho(v) + " · تاریخ: " + fd(v.date) + "\nنام پت: " + v.name + " · شمارهٔ فاکتور: " + v.id + (fn1 ? " · شمارهٔ پرونده: " + fn1 : "") + "\n" + v.items.map(function (r) { return "- " + r.name + (r.qty > 1 ? " ×" + r.qty : "") + ": " + money(r.qty * r.price); }).join("\n") + (v.disc ? "\nتخفیف: " + money(v.disc) : "") + (v.tax ? "\nمالیات ۱۰٪: " + money(v.tax) : "") + "\nمبلغ کل: " + money(v.total) + (v.status === "paid" ? "\nپرداخت شد ✅" : ""); }
  document.addEventListener("click", function (e) {
    var t = e.target, b; if (!t.closest) return;
    if ((b = t.closest("[data-hb-invopen]"))) { e.preventDefault(); invOpenId = b.getAttribute("data-hb-invopen"); if (!q("[data-hb-invpanel]")) { var tb = todayBox(); if (tb) tb.insertAdjacentHTML("afterbegin", '<div data-hb-invpanel></div>'); } invPanel(); return; }
    if (t.closest("[data-hb-invdisc]")) { var vd = invItems.filter(function (x) { return x.id === invOpenId; })[0]; if (!vd) return; var dv = prompt("مبلغ کل تخفیف این فاکتور (تومان):\nجمع خدمات: " + money(vd.sub) + "\n(برای حذف تخفیف ۰ بزنید)", vd.disc || ""); if (dv === null) return; var dn = Math.max(0, numIn(dv));
      api({ a: "invDisc", t: tokGet(), id: vd.id, disc: dn }).then(function (j) { if (!j.ok) return toast("⚠️ " + (j.err === "bad" ? "این تخفیف ممکن نیست (فاکتور تسویه شده یا مبلغ بیش از دریافتی‌هاست)." : errMsg(j.err)), 7000); invItems = invItems.map(function (x) { return x.id === j.item.id ? j.item : x; }); toast("✅ تخفیف ثبت شد · مبلغ جدید " + money(j.item.total)); invPanel(); invRefresh(); if (!q("[data-hb-invpanel]") && j.item) { /* پنل با todayRender بسته می‌شود */ invOpenId = j.item.id; var tb = todayBox(); if (tb && !q("[data-hb-invpanel]")) { tb.insertAdjacentHTML("afterbegin", '<div data-hb-invpanel></div>'); invPanel(); } } });
      return; }
    if (t.closest("[data-hb-invclose]")) { invOpenId = ""; invPanel(); [].forEach.call(document.querySelectorAll("[data-hb-pttabbox] [data-hb-invpanel]"), function (e) { if (e.parentNode) e.parentNode.removeChild(e); }); [].forEach.call(document.querySelectorAll(".hb-invc.open"), function (e) { e.classList.remove("open"); }); return; }
    if (t.closest("[data-hb-invvoid]")) {
      var vv = invItems.filter(function (x) { return x.id === invOpenId; })[0]; if (!vv) return;
      var why = prompt("فاکتور «" + vv.name + "» (" + money(vv.total) + ") باطل شود؟" + (vv.paid ? "\n⚠️ " + money(vv.paid) + " پرداخت شده؛ برگشت پول را جداگانه انجام دهید." : "") + "\nدلیل:", ""); if (why === null) return;
      api({ a: "invVoid", t: tokGet(), id: vv.id, why: why }).then(function (j) { if (!j.ok) return toast("⚠️ " + (j.err === "auth" ? "فقط دکتر می‌تواند فاکتور را باطل کند." : errMsg(j.err)), 7000); invItems = invItems.map(function (x) { return x.id === j.item.id ? j.item : x; }); invOpenId = ""; toast("✅ فاکتور باطل شد؛ در صورت نیاز صورتحساب تازه صادر کنید"); invRefresh(); });
      return;
    }
    if (t.closest("[data-hb-invprint]")) { var vp = invItems.filter(function (x) { return x.id === invOpenId; })[0]; if (vp) invPrint(vp); return; }
    if ((b = t.closest("[data-hb-unb]"))) { var uv = ptItems.filter(function (x) { return x.id === b.getAttribute("data-hb-unb"); })[0]; if (uv) { dview("pt"); billOpen(uv); } return; }
    if (t.closest("[data-hb-invshare]")) { var vs = invItems.filter(function (x) { return x.id === invOpenId; })[0]; if (vs) invShare(vs); return; }
    if (t.closest("[data-hb-invcopy]")) { var v0 = invItems.filter(function (x) { return x.id === invOpenId; })[0]; if (v0) { try { navigator.clipboard.writeText(invText(v0)); toast("✅ متن فاکتور کپی شد"); } catch (x) { prompt("متن فاکتور:", invText(v0)); } } return; }
    if ((b = t.closest("[data-hb-invpay]"))) {
      var amt = numIn((q("[data-hb-invamt]") || {}).value), m = segVal("hb-pm") || "کارت"; if (!amt) return toast("⚠️ مبلغ را بنویسید");
      b.disabled = true; api({ a: "invPay", t: tokGet(), id: invOpenId, amount: amt, method: m }).then(function (j) { b.disabled = false; if (!j.ok) return toast("⚠️ " + errMsg(j.err), 7000); invItems = invItems.map(function (x) { return x.id === j.item.id ? j.item : x; }); toast(j.item.status === "paid" ? "✅ تسویه شد · " + money(j.item.total) : "✅ دریافت ثبت شد · مانده " + money(j.item.total - j.item.paid)); invOpenId = j.item.status === "paid" ? "" : invOpenId; invRefresh(); });
      return;
    }
  });
  // گزارش ماهانه (فقط دکتر)
  function drShare(l) {
    var g = 0, c = 0, sh = 0, dsc = 0, n = 0;
    l.forEach(function (v) { if (v.status === "free") return; n++; dsc += v.disc || 0; (v.items || []).forEach(function (x) { var gr = x.qty * x.price, co = x.qty * (x.cost || 0), pc = x.pct == null ? svcDef : x.pct; g += gr; c += co; sh += (gr - co) * pc / 100; }); });
    if (!n) return "";
    var net = g - c; return '<h4 class="hb-pth2">👩‍⚕️ کارکرد دکتر</h4><div class="hb-rep"><span>جمع فروش خدمات: ' + money(g) + "</span><span>− جمع مصرفی (هزینهٔ خرید): " + money(c) + "</span><span>= خالص: " + money(net) + "</span><span>سهم دکتر: <b>" + money(Math.round(sh)) + "</b></span><span>سهم کلینیک: " + money(Math.round(net - sh - dsc)) + (dsc ? " (بعد از کسر تخفیف‌ها: " + money(dsc) + ")" : "") + "</span><small>مالیات در این محاسبه نیست؛ فاکتورهای «بدون هزینه» حساب نمی‌شوند.</small></div>";
  }
  var repM = "", repMode = "m", repPk = "";
  function repFileInit() {
    var w = repBox().querySelector("[data-hb-repfile]");
    w.innerHTML = '<h3 class="hb-pth">🗂 گزارش هر پرونده</h3><input type="search" class="hb-bsearch" data-hb-repq autocomplete="off" placeholder="🔎 شمارهٔ پرونده، نام پت یا سرپرست (مثلاً 13701)"><div data-hb-repres></div><div data-hb-repout></div>';
    var go = function () { if (repPk) repFileShow(); };
    if (ptItems.length) { repFileList(""); go(); } else { api({ a: "patList", t: tokGet() }).then(function (j) { if (j.ok) ptItems = j.items || []; repFileList(""); go(); }); }
  }
  function repFileList(qs) {
    var box = repBox().querySelector("[data-hb-repres]"); if (!box) return; qs = (qs || "").trim().toLowerCase().replace(/^nm/, ""); var seen = {}, l = [];
    ptItems.forEach(function (r) { if (!r.pkey || seen[r.pkey]) return; var hay = ((r.fno || "") + " " + (r.name || "") + " " + (r.owner || "") + " " + (r.phone || "")).toLowerCase().replace(/nm/g, ""); if (qs && hay.indexOf(qs) < 0) return; seen[r.pkey] = 1; l.push(r); });
    box.innerHTML = qs || !repPk ? (l.slice(0, 8).map(function (r) { return '<button type="button" class="hb-qr1 hb-repf" data-hb-reppick="' + esc(r.pkey) + '"><b>' + esc(r.name) + "</b> " + (r.fno ? '<span class="hb-fno">' + esc(r.fno) + "</span> " : "") + "<small>" + esc(r.owner || "") + "</small></button>"; }).join("") || '<p class="hb-qmsg">موردی پیدا نشد.</p>') : "";
  }
  function repFileShow() {
    var out = repBox().querySelector("[data-hb-repout]"), g = ptGroup(repPk), r = g[0] || {}; out.innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>';
    api({ a: "invList", t: tokGet(), pkey: repPk }).then(function (j) {
      if (!j.ok) { out.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; }
      var l = (j.items || []).filter(function (v) { return v.pkey === repPk && v.status !== "void"; }), tot = 0, paid = 0;
      l.forEach(function (v) { tot += v.total; paid += v.paid; });
      var vis = {}; g.forEach(function (v) { vis[v.date] = 1; });
      out.innerHTML = '<div class="hb-rep"><span><b>' + esc(r.name || "") + "</b>" + (r.fno ? " · پروندهٔ " + esc(r.fno) : "") + (r.owner ? " · " + esc(r.owner) : "") + "</span><span>تعداد مراجعه: " + toolFa(g.length) + "</span><span>جمع هزینه‌ها: <b>" + money(tot) + "</b></span><span>پرداخت‌شده: " + money(paid) + "</span><span>مانده (بدهی): " + money(tot - paid) + "</span></div>"
        + '<h4 class="hb-pth2">تاریخ مراجعه‌ها</h4><table class="hb-invt"><tr><th>تاریخ</th><th>علت</th><th>هزینه</th></tr>' + g.map(function (v) { var f = l.filter(function (x) { return x.vid === v.id; }), s = f.reduce(function (t, x) { return t + x.total; }, 0); return "<tr><td>" + esc(fd(v.date)) + "</td><td>" + esc(v.reason || "") + "</td><td>" + (f.length ? money(s) : "—") + "</td></tr>"; }).join("") + "</table>";
    });
  }
  document.addEventListener("click", function (e) { var t = e.target, b; if (!t.closest) return;
    if ((b = t.closest("[data-hb-repmode]"))) { repMode = b.getAttribute("data-hb-repmode"); repEnter(); return; }
    if ((b = t.closest("[data-hb-reppick]"))) { repPk = b.getAttribute("data-hb-reppick"); repBox().querySelector("[data-hb-repres]").innerHTML = ""; repFileShow(); }
  });
  document.addEventListener("input", function (e) { if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-hb-repq")) { repPk = ""; repFileList(e.target.value); var o = repBox().querySelector("[data-hb-repout]"); if (o) o.innerHTML = ""; } });
  function repBox() { return q("[data-hb-repbox]"); }
  function repMonths() { var t = jToday(), y = +t[0], m = +t[1], out = []; while (y > 1405 || (y === 1405 && m >= 7)) { out.push([y, m]); m--; if (m < 1) { m = 12; y--; } } return out.length ? out : [[1405, 7]]; }   // گزارش از مهر ۱۴۰۵ به بعد
  function repEnter() {
    var bx = repBox(); if (!bx) return; var ms = repMonths(); if (!repM) repM = ms[0].join("-");
    bx.innerHTML = '<div class="hb-ptform"><div class="seg hb-repmode"><button type="button" class="btn small ' + (repMode === "m" ? "primary" : "ghost") + '" data-hb-repmode="m">📊 ماهانه</button><button type="button" class="btn small ' + (repMode === "f" ? "primary" : "ghost") + '" data-hb-repmode="f">🗂 هر پرونده</button></div>' + (repMode === "f" ? '<div data-hb-repfile></div></div>' : '<h3 class="hb-pth">📊 گزارش ماهانه</h3><div class="fld"><select data-hb-repm>' + ms.map(function (x) { var k = x.join("-"); return '<option value="' + k + '"' + (k === repM ? " selected" : "") + ">" + MON[x[1] - 1] + " " + toolFa(x[0]) + "</option>"; }).join("") + '</select></div><div data-hb-repout><p class="hb-qmsg">در حال بارگذاری…</p></div></div>');
    if (repMode === "f") return repFileInit(); repLoad();
  }
  function repLoad() {
    var p0 = repM.split("-"), y = +p0[0], m = +p0[1], from = j2g(y, m, 1), to = m === 12 ? j2g(y + 1, 1, 1) : j2g(y, m + 1, 1), out = repBox().querySelector("[data-hb-repout]");
    api({ a: "invList", t: tokGet(), from: from }).then(function (j) {
      if (!j.ok) { out.innerHTML = '<p class="hb-qmsg">' + esc(j.err === "bad" ? "برای گزارش، اسکریپت جدید (v29) لازم است." : errMsg(j.err)) + "</p>"; return; }
      var l = (j.items || []).filter(function (v) { return v.date >= from && v.date < to && v.status !== "void"; });
      var tot = 0, paid = 0, disc = 0, free = 0, by = {}, sv = {};
      l.forEach(function (v) { tot += v.total; paid += v.paid; disc += v.disc; if (v.status === "free") free++; if (v.paid) by[v.method || "نقد"] = (by[v.method || "نقد"] || 0) + v.paid; (v.items || []).forEach(function (x) { var o = sv[x.name] || (sv[x.name] = { n: 0, s: 0 }); o.n += x.qty; o.s += x.qty * x.price; }); });
      var top = Object.keys(sv).sort(function (a, b) { return sv[b].s - sv[a].s; });
      out.innerHTML = !l.length ? '<p class="hb-qmsg">در این ماه فاکتوری ثبت نشده است.</p>' : '<div class="hb-rep"><span>تعداد فاکتور: ' + toolFa(l.length) + (free ? " (بدون هزینه: " + toolFa(free) + ")" : "") + "</span><span>جمع فاکتورها: <b>" + money(tot) + "</b></span><span>دریافت‌شده: " + money(paid) + "</span>" + Object.keys(by).map(function (k) { return "<span>· " + esc(k) + ": " + money(by[k]) + "</span>"; }).join("") + "<span>مانده (بدهی): " + money(tot - paid) + "</span>" + (disc ? "<span>جمع تخفیف‌ها: " + money(disc) + "</span>" : "") + "</div>" + drShare(l)
        + '<h4 class="hb-pth2">خدمات (بیشترین درآمد)</h4><table class="hb-invt"><tr><th>خدمت</th><th>تعداد</th><th>مبلغ</th></tr>' + top.map(function (k) { return "<tr><td>" + esc(k) + "</td><td>" + toolFa(sv[k].n) + "</td><td>" + money(sv[k].s) + "</td></tr>"; }).join("") + "</table>";
    });
  }
  document.addEventListener("change", function (e) { if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-hb-repm")) { repM = e.target.value; repBox().querySelector("[data-hb-repout]").innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>'; repLoad(); } });
  // تعرفه‌ها (فقط دکتر)
  var svcEdit = [];
  function svcBox() { return q("[data-hb-svcbox]"); }
  function svcEnter() { var bx = svcBox(); if (!bx) return; bx.innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>'; svcLoaded = false; svcLoad(function (ok) { if (!ok) { bx.innerHTML = '<p class="hb-qmsg">برای تعرفه‌ها اسکریپت جدید (v29) لازم است.</p>'; return; } svcEdit = svcItems.map(function (x) { return { id: x.id, name: x.name, price: x.price, active: x.active, cost: x.cost || 0, pct: x.pct == null ? "" : x.pct }; }); svcShow(); }); }
  function svcShow() {
    var bx = svcBox(); bx.innerHTML = '<div class="hb-ptform hb-svc"><h3 class="hb-pth">💰 تعرفهٔ خدمات</h3><details class="hb-svhelp"><summary>ℹ️ راهنما</summary><p class="hb-mut">قیمت‌ها به تومان. تیک «فعال» را بردارید تا در فاکتور نیاید. «مصرفی» = هزینهٔ خرید هر واحد (مثلاً قیمت واکسن). «٪ دکتر» = درصد سهم دکتر از (قیمت − مصرفی)؛ خالی = پیش‌فرض. برای دیدن مصرفی و درصد هر خدمت، روی ▾ بزنید.</p></details><div class="hb-svdef"><label>درصد پیش‌فرض سهم دکتر</label><input type="text" inputmode="numeric" dir="ltr" data-hb-svdef value="' + svcDef + '"></div>'
      + svcEdit.map(function (x, i) { var bad = x.cost > x.price; return '<div class="hb-svc2' + (bad ? " bad" : "") + ((bad || !x.id) ? " open" : "") + '"><div class="hb-svt"><span class="hb-sic2" data-hb-sic="' + i + '">' + (svcIcon(x.name) || "▫️") + '</span><input type="text" class="hb-svn" data-hb-svn="' + i + '" value="' + esc(x.name) + '" maxlength="60" placeholder="نام خدمت"><input type="text" class="hb-svpr" inputmode="numeric" dir="ltr" data-hb-svp="' + i + '" value="' + (x.price ? grp3(x.price) : "") + '" aria-label="قیمت"><button type="button" class="hb-svtg" data-hb-svtog aria-label="جزئیات">▾</button></div><div class="hb-svf"><label class="hb-svon"><input type="checkbox" data-hb-sva="' + i + '"' + (x.active ? " checked" : "") + '> فعال (در فاکتور بیاید)</label><label>مصرفی<input type="text" inputmode="numeric" dir="ltr" data-hb-svc="' + i + '" value="' + (x.cost ? grp3(x.cost) : "") + '" placeholder="۰"></label><label>٪ دکتر<input type="text" inputmode="numeric" dir="ltr" data-hb-svq="' + i + '" value="' + (x.pct === "" || x.pct == null ? "" : x.pct) + '" placeholder="' + svcDef + '"></label><button type="button" class="btn small ghost hb-danger" data-hb-svd="' + i + '" aria-label="حذف">🗑 حذف</button><small class="hb-svw">⚠️ مصرفی از قیمت فروش بیشتر است؛ مطمئن باشید درست وارد کرده‌اید.</small></div></div>'; }).join("")
      + '<div class="hb-btns hb-center"><button type="button" class="btn small ghost" data-hb-svadd>＋ خدمت جدید</button><button type="button" class="btn primary" data-hb-svsave>ذخیرهٔ تعرفه‌ها</button></div></div>';
  }
  document.addEventListener("input", function (e) { var t = e.target; if (!t || !t.hasAttribute || !(t.hasAttribute("data-hb-svc") || t.hasAttribute("data-hb-svp"))) return; var dg = faDigits(t.value).replace(/[^0-9]/g, ""); t.value = dg ? grp3(dg) : ""; var card = t.closest(".hb-svc2"); if (!card) return; var pr = numIn(card.querySelector("[data-hb-svp]").value), co = numIn(card.querySelector("[data-hb-svc]").value); card.classList.toggle("bad", co > pr); });
  document.addEventListener("input", function (e) { var t = e.target; if (!t || !t.hasAttribute || !t.hasAttribute("data-hb-svn")) return; var ic = t.parentNode.querySelector("[data-hb-sic]"); if (ic) ic.textContent = svcIcon(t.value) || "▫️"; });
  function svcRead() { var bx = svcBox(); svcEdit.forEach(function (x, i) { var n = bx.querySelector('[data-hb-svn="' + i + '"]'); if (!n) return; x.name = n.value.trim(); x.price = numIn(bx.querySelector('[data-hb-svp="' + i + '"]').value); x.active = bx.querySelector('[data-hb-sva="' + i + '"]').checked ? 1 : 0; x.cost = numIn(bx.querySelector('[data-hb-svc="' + i + '"]').value); var pq = bx.querySelector('[data-hb-svq="' + i + '"]').value.trim(); x.pct = pq === "" ? "" : Math.min(100, numIn(pq)); }); var df = bx.querySelector("[data-hb-svdef]"); if (df && df.value.trim() !== "") svcDef = Math.min(100, numIn(df.value)); }
  document.addEventListener("click", function (e) {
    var t = e.target, b; if (!t.closest || !t.closest("[data-hb-svcbox]")) return;
    if (t.closest("[data-hb-svadd]")) { svcRead(); svcEdit.push({ id: "", name: "", price: 0, active: 1 }); svcShow(); var ins = svcBox().querySelectorAll("[data-hb-svn]"); if (ins.length) ins[ins.length - 1].focus(); return; }
    if ((b = t.closest("[data-hb-svtog]"))) { var cd = b.closest(".hb-svc2"); if (cd) cd.classList.toggle("open"); return; }
    if ((b = t.closest("[data-hb-svd]"))) { svcRead(); svcEdit.splice(+b.getAttribute("data-hb-svd"), 1); svcShow(); return; }
    if ((b = t.closest("[data-hb-svsave]"))) { svcRead(); b.disabled = true; api({ a: "svcSave", t: tokGet(), defPct: svcDef, items: svcEdit.filter(function (x) { return x.name; }) }).then(function (j) { b.disabled = false; if (!j.ok) return toast("⚠️ " + errMsg(j.err), 7000); svcItems = j.items; svcLoaded = true; if (j.defPct != null) svcDef = j.defPct; svcEdit = svcItems.map(function (x) { return { id: x.id, name: x.name, price: x.price, active: x.active, cost: x.cost || 0, pct: x.pct == null ? "" : x.pct }; }); svcShow(); toast("✅ تعرفه‌ها ذخیره شد"); }); }
  });
  function todayCard(it, done) {
    var open = it.kind === "pet" ? 'data-hb-qopen="' + esc(it.ref) + '"' : it.kind === "appt" && !it.ref ? "data-hb-apgo" : 'data-hb-tdpt="' + esc(it.ref) + '"';
    var wb = !done && it._wait ? ' <span class="hb-tdwb">⏳ در انتظار ویزیت' + (it._wait.time ? " · " + toolFa(it._wait.time) : "") + "</span>" : "";
    return '<div class="hb-qrw hb-tdc' + (done ? " hb-tdv" : "") + (wb ? " hb-tdw" : "") + '"><button type="button" class="hb-qr1" ' + open + "><b>" + (done ? "✅ " : "") + esc(it.name || "—") + (done ? ' <span class="hb-tdvb">ویزیت شد</span>' : "") + wb + "</b><small>" + (it.kind === "pet" ? "📒 شناسنامه" : it.kind === "appt" ? "🗓 نوبت" : "🩺 بیمار") + " · " + esc(it.species || "") + (it.owner ? " · " + esc(it.owner) : "") + "</small><small>" + it.tags.map(function (g) { return TD_TAG[g] || g; }).join(" · ") + (it.time ? " · " + toolFa(it.time) : "") + "</small></button>" + (it.phone ? '<a class="hb-call hb-callq" dir="ltr" href="tel:' + esc(it.phone) + '">📞 ' + esc(it.phone) + "</a>" : "") + "</div>";
  }
  // میز پذیرش: جستجوی بیمار در «امروز» → «به امروز» یا «ثبت نوبت»
  var tdQ = "", tdRes = [], tdT = 0;
  function tdResHtml() {
    if (!tdQ) return ""; if (!tdRes.length) return '<p class="hb-qmsg">موردی پیدا نشد؛ از «＋ ثبت بیمار جدید» ثبت کنید.</p>';
    return tdRes.map(function (it, k) { return '<div class="hb-tdr"><div class="hb-tdri"><b>' + esc(it.name) + "</b><small>" + esc(it.species || "") + (it.breed ? " · " + esc(it.breed) : "") + (it.owner ? " · " + esc(it.owner) : "") + (it.phone ? ' · <span dir="ltr">' + esc(it.phone) + "</span>" : "") + '</small></div><button type="button" class="btn small primary" data-hb-tdtoday="' + k + '">' + (it.pkey && ptInToday(it.pkey) ? "✅ امروز" : "📅 به امروز") + '</button><button type="button" class="btn small ghost" data-hb-tdnap="' + k + '">🗓 نوبت</button></div>'; }).join("") + ownBtns(tdRes);
  }
  document.addEventListener("input", function (e) {
    if (!(e.target && e.target.matches && e.target.matches("[data-hb-tdq]"))) return;
    tdQ = faDigits(e.target.value).trim(); clearTimeout(tdT); var r0 = q("[data-hb-tdres]");
    if (tdQ.length < 2) { tdRes = []; if (r0) r0.innerHTML = ""; return; }
    tdT = setTimeout(function () { var qq = tdQ; if (r0) r0.innerHTML = '<p class="hb-qmsg">در حال جستجو…</p>'; api({ a: "lookup", t: tokGet(), q: /^[\d\s+-]+$/.test(qq) ? phN(qq) : qq }).then(function (j) { if (qq !== tdQ) return; tdRes = (j.ok && j.items) || []; tdRes.forEach(function (it) { if (/^9\d{9}$/.test(String(it.phone || ""))) it.phone = "0" + it.phone; }); var r1 = q("[data-hb-tdres]"); if (r1) r1.innerHTML = tdResHtml(); }); }, 450);
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-hb-tdtoday],[data-hb-tdnap]"); if (!b) return;
    var it = tdRes[+(b.getAttribute("data-hb-tdtoday") || b.getAttribute("data-hb-tdnap"))]; if (!it) return;
    if (b.hasAttribute("data-hb-tdtoday")) return ptToday(it, b);
    dview("appt"); apPref = { name: it.name, species: it.species, breed: it.breed, owner: it.owner, phone: it.phone, pkey: it.pkey || "" }; apEditId = ""; apMode = "form"; apShow();
  });
  function todayRender() {
    var box = todayBox(); if (!box) return; var iso = isoNow();
    box.innerHTML = (SECP ? '<div class="hb-tdhead hb-tdsrch"><input type="search" data-hb-tdq autocomplete="off" placeholder="🔎 جستجوی بیمار با نام یا شماره" value="' + esc(tdQ) + '"><button type="button" class="btn small ghost" data-hb-tdref aria-label="تازه‌سازی">🔄</button></div><div data-hb-tdres>' + tdResHtml() + "</div>" : '<div class="hb-tdhead"><b>امروز · ' + esc(wdOf(iso)) + " " + esc(jLabel(iso)) + '</b><span>' + toolFa(todayItems.length) + ' مورد</span><button type="button" class="btn small ghost" data-hb-tdref aria-label="تازه‌سازی">🔄</button></div>') + '<div data-hb-tdap></div>'
      + (function () {
        var g = todayEntries(), w = g.wait, dn0 = g.done, ot = g.other; setTimeout(function () { setTabCount("today", w.length); }, 0);
        var pay = dn0.filter(function (e) { var v = invOf(e.pkey); return v && (v.status === "pending" || v.status === "partial"); }), dn = dn0.filter(function (e) { return pay.indexOf(e) < 0; });
        if (!w.length && !dn0.length && !ot.length) return oldDebts() + '<p class="hb-qmsg">' + (SECP ? "هنوز کسی در صف امروز نیست. بیمار را جستجو کنید و «📅 به امروز» بزنید." : "هنوز کسی در صف امروز نیست.") + "</p>";
        return oldDebts() + (w.length ? '<h4 class="hb-tdsec hb-tdsecw">⏳ در انتظار ویزیت (' + toolFa(w.length) + ")</h4>" + w.map(function (e) { return qCard(e, false); }).join("") : '<p class="hb-qmsg">کسی در انتظار ویزیت نیست.</p>')
          + (pay.length ? '<h4 class="hb-tdsec hb-tdsecp">💳 در انتظار پرداخت (' + toolFa(pay.length) + ")</h4>" + pay.map(function (e) { return qCard(e, true); }).join("") : "")
          + (dn.length ? '<h4 class="hb-tdsec">✅ ویزیت‌شده‌های امروز (' + toolFa(dn.length) + ")</h4>" + dn.map(function (e) { return qCard(e, true); }).join("") : "") + unbilled() + dayReport()
          + (!SECP && ot.length ? '<details class="hb-tdoth"><summary>👁 سایر فعالیت‌های امروز (' + toolFa(ot.length) + ")</summary>" + ot.map(function (it) { return todayCard(it, false); }).join("") + "</details>" : "");
      })();
    var sp0 = q("[data-hb-tdap]"); if (sp0) sp0.innerHTML = "";
    if (invOpenId) { box.insertAdjacentHTML("afterbegin", '<div data-hb-invpanel></div>'); invPanel(); }
  }
  // نوبت‌های امروز داخل خود کارت‌ها نشان داده می‌شوند («⏳ در انتظار ویزیت»)
  function todayApStrip() { if (todayBox()) todayRender(); }
  function todayApStripOld() {
    var el = q("[data-hb-tdap]"); if (!el) return; var l = apItems.filter(function (r) { return r.date === apToday && r.status === "booked" && !(r.pkey && visitedToday(r.pkey)); });
    el.innerHTML = l.length ? '<div class="hb-ptdue hb-tdapb"><b>⏳ در انتظار ویزیت (' + toolFa(l.length) + ")</b>" + l.map(function (r) { return '<button type="button" class="hb-ptdr" data-hb-apgo><span>' + (r.time ? toolFa(r.time) + " · " : "") + esc(r.name) + (r.owner ? " · " + esc(r.owner) : "") + "</span></button>"; }).join("") + "</div>" : "";
  }
  // بعد از ثبت ویزیت: فرم بسته شود و به «امروز» برگردد
  function ptToToday() { ptMode = "list"; ptEditV = null; dview("today"); try { window.scrollTo(0, 0); } catch (e) {} }
  function ptJump(k) { if (SECP) return; ptActOpen = false; ptBackView = root.getAttribute("data-dview") === "pt" ? "" : root.getAttribute("data-dview"); ptTab = ""; invOpenId = ""; ptPending = k; touchLog("patient", k); dview("pt"); if (ptLoaded && ptGroup(k).length) { ptPending = ""; ptCur = k; ptMode = "file"; ptEditV = null; ptShow(); } }

  // نوبت‌دهی
  var apItems = [], apToday = "", apMode = "list", apFilter = "today", apEditId = "", apPref = null, APJ = {};
  function apBox() { return q("[data-hb-apbox]"); }
  function apEnter() { apMode = "list"; apLoad(); }
  function apLoad() {
    var box = apBox(); if (!box) return; if (!ptLoaded) api({ a: "patList", t: tokGet() }).then(function (j) { if (j.ok) { ptItems = j.items || []; ptLoaded = true; if (apMode === "list") apShow(); } }); if (apMode === "list" && !apItems.length) box.innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>';
    api({ a: "apList", t: tokGet() }).then(function (j) {
      if (!j.ok) { if (apMode === "list") box.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; }
      apItems = j.items || []; apToday = j.today || isoNow(); setTabCount("appt", apCountAll()); apRemind();
      if (apMode === "list") apShow();
    });
  }
  var AP_ST = { booked: "⏳ در انتظار", done: "✅ آمد", noshow: "🚫 نیامد", cancelled: "❌ لغو شد" };
  var AP_REASONS = ["ویزیت", "واکسیناسیون", "ضدانگل", "ویزیت مجدد", "چکاپ"];
  // آمد/نیامد خودکار: اگر آن روز مراجعه یا ویزیتی برایش ثبت شده → آمد
  function cameOn(r) {
    if (r.status === "done") return true; var k = r.pkey, ph = phN(r.phone || ""), same = function (x) { return k ? x.pkey === k : ph && phN(x.phone || "") === ph; };
    return ptItems.some(function (x) { return x.date === r.date && same(x); }) || apItems.filter(function (x) { return !isQueue(x); }).concat(allQ()).some(function (x) { return isQueue(x) && x.date === r.date && x.status === "done" && same(x); });
  }
  function apOpen(r) { return r.status === "booked" && r.date >= (apToday || isoNow()) && !cameOn(r); }
  function apStatus(r) { return r.status === "cancelled" ? "❌ لغو شد" : cameOn(r) ? "✅ آمد" : r.date < (apToday || isoNow()) ? "🚫 نیامد" : "⏳ در انتظار"; }
  function apReasonSel(v) {
    var r = v || "", inL = !r || AP_REASONS.indexOf(r) > -1;
    return '<select data-ap="reason" aria-label="دلیل مراجعه"><option value="">دلیل مراجعه</option>' + AP_REASONS.map(function (x) { return '<option value="' + esc(x) + '"' + (x === r ? " selected" : "") + ">" + esc(x) + "</option>"; }).join("") + '<option value="__other"' + (!inL ? " selected" : "") + '>سایر (قابل نوشتن)…</option></select><input data-ap="reasonx" type="text" maxlength="150" placeholder="دلیل را بنویسید" value="' + esc(!inL ? r : "") + '"' + (inL ? " hidden" : "") + ">";
  }

  var apSel = { date: "", time: "" }, apLink = "", AP_H0 = 10, AP_H1 = 22, AP_STEP = 30;
  function apDayList() { var td = apToday || isoNow(), a = []; for (var k = 0; k < 15; k++) a.push(isoPlus(td, k)); return a; }
  function apDaysRender() {
    var el = apBox().querySelector("[data-hb-apdays]"); if (!el) return; var days = apDayList(), oth = apBox().querySelector("[data-hb-apother]");
    if (apSel.date && days.indexOf(apSel.date) < 0) oth.hidden = false;
    el.innerHTML = days.map(function (d, k) { return '<option value="' + d + '"' + (d === apSel.date && oth.hidden ? " selected" : "") + ">" + (k === 0 ? "امروز - " : k === 1 ? "فردا - " : "") + wdOf(d) + " " + jLabel(d).replace(/\s*[۰-۹]{4}$/, "") + "</option>"; }).join("") + '<option value="other"' + (!oth.hidden ? " selected" : "") + ">📅 تاریخ‌های دیگر…</option>";
  }
  function apSlotsRender() {
    var el = apBox().querySelector("[data-hb-apslots]"); if (!el) return; var now = new Date(), td = apToday || isoNow(), nowHm = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2), taken = [], h = '<option value="">انتخاب ساعت…</option>', hm2 = function (m) { return ("0" + Math.floor(m / 60)).slice(-2) + ":" + ("0" + (m % 60)).slice(-2); }, nowM60 = hm2(Math.max(0, now.getHours() * 60 + now.getMinutes() - 60));
    apItems.forEach(function (r) { if (r.date === apSel.date && r.status === "booked" && r.id !== apEditId && r.time) taken.push(r); });
    var slots = []; for (var m = AP_H0 * 60; m < AP_H1 * 60; m += AP_STEP) slots.push(hm2(m)); if (apSel.time && slots.indexOf(apSel.time) < 0) { slots.push(apSel.time); slots.sort(); }
    slots.forEach(function (hm) {
      var a = +hm.slice(0, 2) * 60 + +hm.slice(3), who = taken.filter(function (r) { var b = +r.time.slice(0, 2) * 60 + +r.time.slice(3); return b >= a && b < a + AP_STEP; }).map(function (r) { return r.name; }), past = apSel.date === td && hm < nowM60 && hm !== apSel.time;
      h += '<option value="' + hm + '"' + (hm === apSel.time ? " selected" : "") + (who.length || past ? " disabled" : "") + ">" + toolFa(hm) + (who.length ? " — پر (" + esc(who.join("، ")) + ")" : past ? " — گذشته" : "") + "</option>";
    });
    el.innerHTML = h;
  }
  function apF(n) { return apBox().querySelector('[data-ap="' + n + '"]'); }
  function apShow() {
    var box = apBox(); if (!box) return;
    if (apMode === "form") {
      var v = apPref || {}, e = apEditId ? apItems.filter(function (x) { return x.id === apEditId; })[0] : null; if (e) v = e;
      apSel = { date: v.date || (apFilter === "tomorrow" ? isoPlus(apToday || isoNow(), 1) : (apToday || isoNow())), time: v.time || "" }; apLink = v.pkey || "";
      box.innerHTML = '<div class="hb-ptform hb-apform"><h3 class="hb-pth hb-ctr hb-ft">' + (e ? "✏️ ویرایش نوبت" : "🗓 ثبت نوبت") + '</h3>'
        + '<div class="hb-aptop hb-aptop1"><div class="fld"><select data-hb-apdays aria-label="روز نوبت"></select></div><div class="fld" data-hb-apother hidden><div class="jd" data-pjd="apd"></div></div><div class="fld"><select data-hb-apslots aria-label="ساعت"></select></div></div>'
        + '<div class="fld"><input data-ap="owner" data-hb-lk="ap" type="text" autocomplete="off" maxlength="40" placeholder="👤 نام سرپرست (جستجو در سوابق)" value="' + esc(v.owner || "") + '"><div class="hb-lkres"></div></div>'
        + '<div class="fld"><input data-ap="name" data-hb-lk="ap" type="text" autocomplete="off" maxlength="40" placeholder="🔎 نام پت (جستجو در سوابق)" value="' + esc(v.name || "") + '"><div class="hb-lkres"></div></div>'
        + '<div class="fld"><input data-ap="phone" data-hb-lk="ap" type="tel" inputmode="tel" dir="ltr" maxlength="16" placeholder="📞 شمارهٔ تماس (۰۹۱۲…)" autocomplete="off" value="' + esc(v.phone || "") + '"><div class="hb-lkres"></div></div>'
        + '<div class="fld">' + ptSpecies(v.species) + '</div>'
        + breedFld("ap", v.breed)
        + '<div class="fld">' + apReasonSel(v.reason) + '</div>'
        + '<label class="hb-cons hb-smscb"><input type="checkbox" data-ap="rem"' + (e && e.rem ? " checked" : "") + '> 📩 پیامک یادآور برای سرپرست (روز قبل از نوبت)</label><p class="hb-err" data-hb-aperr hidden></p><div class="hb-btns hb-center"><button type="button" class="btn small primary" data-hb-apsave>ذخیره</button><button type="button" class="btn small ghost" data-hb-apcancel>انصراف</button></div></div>';
      var rs0 = apF("reason"), rx0 = apF("reasonx"); if (rs0 && rs0.tagName === "SELECT") rs0.addEventListener("change", function () { rx0.hidden = rs0.value !== "__other"; if (!rx0.hidden) rx0.focus(); });
      APJ.d = initJd(box.querySelector('[data-pjd="apd"]'), { minY: 0, maxY: 1 }); APJ.d.set(apSel.date);
      box.querySelector("[data-hb-apother]").addEventListener("change", function () { var d = APJ.d.get(); if (d) { apSel.date = d; apSel.time = ""; apSlotsRender(); } });
      box.querySelector("[data-hb-apdays]").addEventListener("change", function () { var dv = this.value, oth = box.querySelector("[data-hb-apother]"); if (dv === "other") { oth.hidden = false; apSel.date = APJ.d.get() || apSel.date; } else { oth.hidden = true; apSel.date = dv; } apSel.time = ""; apSlotsRender(); });
      box.querySelector("[data-hb-apslots]").addEventListener("change", function () { apSel.time = this.value; });
      apDaysRender(); apSlotsRender(); brFill(box, "ap");
      return;
    }
    var td = apToday || isoNow(), tm = isoPlus(td, 1);
    var l = apItems.filter(function (r) { if (isQueue(r)) return false; return apFilter === "today" ? r.date === td : apFilter === "tomorrow" ? r.date === tm : apFilter === "upcoming" ? r.date > td : r.date < td; });
    l.sort(function (a, b) { var k = (a.date + a.time) < (b.date + b.time) ? -1 : 1; return apFilter === "past" ? -k : k; });
    var FL = [["today", "امروز"], ["tomorrow", "فردا"], ["upcoming", "آینده"], ["past", "گذشته"]];
    box.innerHTML = '<div class="hb-pttool"><button type="button" class="btn small ghost" data-hb-apref aria-label="تازه‌سازی">🔄</button></div><div class="seg hb-adf" data-hb-apseg>' + FL.map(function (f) { var nb = f[0] === "past" ? 0 : apItems.filter(function (r) { return r.status === "booked" && !isQueue(r) && !cameOn(r) && (f[0] === "today" ? r.date === td : f[0] === "tomorrow" ? r.date === tm : r.date > td); }).length; return '<button type="button"' + (apFilter === f[0] ? ' class="on"' : "") + ' data-hb-apf="' + f[0] + '">' + f[1] + (nb ? ' <span class="hb-apdot">' + toolFa(nb) + "</span>" : "") + "</button>"; }).join("") + '</div><div class="hb-adlist">'
      + (l.length ? l.map(function (r) {
        var smi = r.smsAt ? '<small class="hb-apsm">📩 یادآور رفت ✅ ' + esc(fd(r.smsAt)) + "</small>" : r.rem ? '<small class="hb-apsm">📩 یادآور روشن</small>' : "";
        var st = apStatus(r), meta = [esc(r.species) + (r.owner ? " · " + esc(r.owner) : ""), (apFilter === "upcoming" || apFilter === "past" ? esc(wdOf(r.date)) + " " + esc(jLabel(r.date)) : ""), esc(r.reason || ""), r.note ? esc(r.note) : ""].filter(Boolean).join(" · ");
        var acts = (apOpen(r) ? '<button type="button" class="hb-apb2 hb-apb-ed" data-hb-apedit="' + esc(r.id) + '">✏️</button><button type="button" class="hb-apb2 hb-apb-cn" data-hb-apst="cancelled" data-id="' + esc(r.id) + '">✕ لغو</button>' : "") + (r.status === "cancelled" || r.status === "noshow" || (r.status === "booked" && r.date < td && !cameOn(r)) ? '<button type="button" class="hb-apb2 hb-apb-dl" data-hb-apdel="' + esc(r.id) + '">🗑 حذف</button>' : "");
        return '<article class="hb-apr ap-' + esc(r.status) + '"><div class="hb-apr1"><b>' + (r.time ? toolFa(r.time) : "—") + '</b><span class="hb-apn">' + esc(r.name) + "</span><em>" + st + "</em>" + (apOpen(r) ? '<button type="button" class="hb-aprb' + (r.smsAt ? " on" : "") + '" data-hb-aprem="' + esc(r.id) + '" aria-label="ارسال یادآور" title="' + (r.smsAt ? "یادآور رفته" : "ارسال یادآور") + '">📩</button>' : "") + '</div><div class="hb-apr2">' + meta + (r.phone ? ' · <a class="hb-call" dir="ltr" href="tel:' + esc(r.phone) + '">📞 ' + esc(r.phone) + "</a>" : "") + (smi ? " · " + smi : "") + '</div>' + (acts ? '<div class="hb-apr3">' + acts + "</div>" : "") + "</article>";
      }).join("") : '<p class="hb-qmsg">نوبتی در این بازه نیست.</p>') + "</div>";
  }
  document.addEventListener("click", function (e) {
    var t = e.target, b; if (!t.closest || !q("[data-hb-drnav]")) return;
    if ((b = t.closest("[data-hb-grp]"))) { var g = b.getAttribute("data-hb-grp"); if (root.getAttribute("data-grp") !== g) dview({ clients: "today", book: "list", more: "adopt" }[g]); return; }
    if (t.closest("[data-hb-remind]")) {
      var rp = curPet(), rs = rp && srvOf(rp); if (!rs) return toast("⚠️ این پت هنوز روی سرور نیست.");
      if (!confirm("یادآور پیامکی برای موعدهای ۶۰ روز آینده «" + rp.name + "» ارسال شود؟")) return;
      api({ a: "petRemind", t: tokGet(), code: rs.code }).then(function (j) {
        var RM = { no_consent: "رضایت پیامک برای این پت تیک نخورده (در ویرایش پت تیک بزنید).", bad_phone: "شمارهٔ موبایل سرپرست معتبر نیست.", rate: "همین الان یادآور رفته؛ چند دقیقه بعد دوباره.", none: "موعد واکسن یا ضدانگلی در ۶۰ روز آینده ثبت نشده.", no_tpl: "قالب پیامک یادآور هنوز در اسکریپت تنظیم نشده.", notfound: "پت پیدا نشد." };
        toast(j.ok ? "📩 " + j.sent + " یادآور ارسال شد" + (j.failed ? " · " + j.failed + " ناموفق" : "") : "⚠️ " + (RM[j.err] || ("ارسال ناموفق. " + (j.msg || errMsg(j.err)))), j.ok ? 5000 : 8000);
      });
      return;
    }
    if (t.closest("[data-hb-apnewtop]")) { dview("appt"); apPref = null; apEditId = ""; apMode = "form"; apShow(); mkAct("ap"); return; }
    if (t.closest("[data-hb-ptnewtop]")) { ptPre = null; ptFromAp = ""; dview("pt"); ptMode = "new"; ptShow(); mkAct("pt"); return; }
    if (t.closest("[data-hb-tdref]")) return todayLoad();
    if ((b = t.closest("[data-hb-tdpt]"))) return ptJump(b.getAttribute("data-hb-tdpt"));
    if (t.closest("[data-hb-apgo]")) { apFilter = "today"; dview("appt"); return; }
    if (t.closest("[data-hb-ptappt]")) { var gp = ptGroup(ptCur)[0]; if (!gp) return; dview("appt"); apPref = { name: gp.name, species: gp.species, breed: gp.breed, owner: gp.owner, phone: gp.phone, pkey: gp.pkey }; apEditId = ""; apMode = "form"; apShow(); return; }
    if (!apBox() || !apBox().contains(t)) return;
    if (t.closest("[data-hb-apnew]")) { apPref = null; apEditId = ""; apMode = "form"; return apShow(); }
    if (t.closest("[data-hb-apref]")) return apLoad();
    if (t.closest("[data-hb-apcancel]")) { apMode = "list"; apPref = null; apEditId = ""; return apShow(); }
    if ((b = t.closest("[data-hb-apf]"))) { apFilter = b.getAttribute("data-hb-apf"); return apShow(); }
    if ((b = t.closest("[data-hb-apin]"))) {
      var ar = apItems.filter(function (x) { return x.id === b.getAttribute("data-hb-apin"); })[0]; if (!ar) return;
      if (ar.pkey) { api({ a: "apSet", t: tokGet(), id: ar.id, status: "done" }); ar.status = "done"; return ptJump(ar.pkey); }
      ptPre = { name: ar.name, species: ar.species, breed: ar.breed, owner: ar.owner, phone: ar.phone, note: ar.note, reason: ar.reason }; ptFromAp = ar.id; dview("pt"); ptMode = "new"; ptShow(); toast("اطلاعات نوبت وارد شد؛ مراجعه را کامل و ثبت کنید"); return;
    }
    if ((b = t.closest("[data-hb-aprem]"))) {
      var rid = b.getAttribute("data-hb-aprem"); if (!confirm("پیامک یادآور همین حالا برای این نوبت ارسال شود؟")) return;
      api({ a: "apRemind", t: tokGet(), id: rid }).then(function (j) { var RE = { no_phone: "شمارهٔ موبایل معتبر ثبت نشده.", no_tpl: "قالب پیامک نوبت (SMS_TPL_APPT) هنوز تنظیم نشده.", rate: "همین الان ارسال شده؛ چند دقیقه بعد.", not_booked: "این نوبت دیگر در انتظار نیست.", notfound: "نوبت پیدا نشد." }; toast(j.ok ? "📩 پیامک یادآور ارسال شد" : "⚠️ " + (RE[j.err] || ("ارسال ناموفق. " + (j.msg || errMsg(j.err)))), j.ok ? 5000 : 8000); });
      return;
    }
    if ((b = t.closest("[data-hb-apedit]"))) { apEditId = b.getAttribute("data-hb-apedit"); apPref = null; apMode = "form"; return apShow(); }
    if ((b = t.closest("[data-hb-apdel]"))) { if (!confirm("این نوبت حذف شود؟")) return; var did = b.getAttribute("data-hb-apdel"); api({ a: "apSet", t: tokGet(), id: did, del: 1 }).then(function (j) { if (!j.ok) return toast("⚠️ " + errMsg(j.err)); apItems = apItems.filter(function (x) { return x.id !== did; }); toast("✅ نوبت حذف شد"); apShow(); }); return; }
    if ((b = t.closest("[data-hb-apdel]"))) { var did = b.getAttribute("data-hb-apdel"), dr0 = apItems.filter(function (x) { return x.id === did; })[0] || {}; if (!confirm("نوبت «" + (dr0.name || "") + "»" + (dr0.time ? " ساعت " + dr0.time : "") + " برای همیشه از لیست حذف شود؟")) return; api({ a: "apSet", t: tokGet(), id: did, del: 1 }).then(function (j) { if (!j.ok) return toast("⚠️ " + errMsg(j.err)); apItems = apItems.filter(function (x) { return x.id !== did; }); toast("🗑 نوبت از لیست حذف شد"); setTabCount("appt", apCountAll()); apShow(); if (todayBox()) todayRender(); }); return; }
    if ((b = t.closest("[data-hb-apst]"))) { var sid = b.getAttribute("data-id"), st = b.getAttribute("data-hb-apst"); api({ a: "apSet", t: tokGet(), id: sid, status: st }).then(function (j) { if (!j.ok) return toast("⚠️ " + errMsg(j.err)); apItems.forEach(function (x) { if (x.id === sid) x.status = st; }); toast(st === "done" ? "✅ نوبت انجام‌شده ثبت شد" : st === "cancelled" ? "✅ نوبت لغو شد" : "✅ نوبت به «در انتظار» برگشت"); setTabCount("appt", apCountAll()); apRemind(); apShow(); }); return; }
    if (t.closest("[data-hb-apsave]")) {
      var er = q("[data-hb-aperr]"), btn = q("[data-hb-apsave]"), sel = apF("reason"), name = apF("name").value.trim();
      if (!name) { er.textContent = "نام پت را بنویسید."; er.hidden = false; apF("name").focus(); return; }
      var v = { date: apBox().querySelector("[data-hb-apother]").hidden ? apSel.date : APJ.d.get(), time: apSel.time, breed: apF("breed").value.trim(), name: name, species: segVal("hb-ptsp"), owner: apF("owner").value.trim(), phone: faDigits(apF("phone").value.trim()), reason: sel.value === "__other" ? apF("reasonx").value.trim() : sel.value.trim(), rem: apF("rem").checked ? 1 : 0, note: (apEditId && (apItems.filter(function (x) { return x.id === apEditId; })[0] || {}).note) || "", pkey: apLink || (apPref && apPref.pkey) || (apEditId && (apItems.filter(function (x) { return x.id === apEditId; })[0] || {}).pkey) || "" };
      if (!v.date) { er.textContent = "روز نوبت را انتخاب کنید."; er.hidden = false; return; }
      if (!v.time) { er.textContent = "ساعت نوبت را انتخاب کنید."; er.hidden = false; return; }
      er.hidden = true; btn.disabled = true;
      api({ a: "apSave", t: tokGet(), id: apEditId, v: v }).then(function (j) {
        btn.disabled = false; if (!j.ok) { er.textContent = errMsg(j.err); er.hidden = false; return; }
        if (apEditId) apItems = apItems.map(function (x) { return x.id === j.item.id ? j.item : x; }); else apItems.push(j.item);
        apEditId = ""; apPref = null; apMode = "list"; apFilter = j.item.date === (apToday || isoNow()) ? "today" : j.item.date > (apToday || isoNow()) ? "upcoming" : "past";
        toast("✅ نوبت ثبت شد · " + wdOf(j.item.date) + " " + jLabel(j.item.date) + (j.item.time ? " · " + toolFa(j.item.time) : "")); setTabCount("appt", apCountAll()); apRemind(); apShow();
      });
    }
  });
  // ---- بررسی اصالت شناسنامه (دکتر) ----
  root.addEventListener("click", function (e) {
    if (!(e.target.closest && e.target.closest("[data-hb-vpgo]"))) return;
    var code = q("[data-hb-vpcode]").value.trim(), au = q("[data-hb-vpauth]").value.trim(), box = q("[data-hb-vpres]");
    if (!code || !au) { box.innerHTML = '<div class="hb-vbox bad"><b>هر دو کد را بنویسید.</b></div>'; return; }
    box.innerHTML = '<div class="hb-vbox"><b>در حال بررسی…</b></div>';
    api({ a: "verifyPet", t: tokGet(), code: code, auth: au }).then(function (j) {
      if (!j.ok) { box.innerHTML = '<div class="hb-vbox bad"><b>' + esc(errMsg(j.err)) + "</b></div>"; return; }
      if (j.valid) box.innerHTML = '<div class="hb-vbox ok"><b>✅ شناسنامه معتبر است</b><span>' + esc(j.pet.name) + " (" + esc(j.pet.species) + ")" + (j.pet.owner ? " · سرپرست: " + esc(j.pet.owner) : "") + (j.pet.created ? " · صدور: " + esc(fd(j.pet.created)) : "") + '</span><span dir="ltr">' + esc(j.pet.code) + "</span></div>";
      else box.innerHTML = '<div class="hb-vbox bad"><b>❌ معتبر نیست</b><span>' + (j.reason === "notfound" ? "شناسنامه‌ای با این کد پیدا نشد." : "کد اصالت با این شناسنامه نمی‌خواند؛ اشتباه تایپی یا شناسنامهٔ تقلبی.") + "</span></div>";
    });
  });
  // ---- واگذاری‌ها (دکتر) ----
  var adItems = [], adPhotoId = "";
  function adLabel(s) { return s === "pending" ? "در انتظار بررسی" : s === "approved" ? "منتشرشده" : s === "done" ? "واگذار شد 🎉" : "ردشده"; }
  function adLoad() {
    var box = q("[data-hb-adlist]"); box.innerHTML = '<p class="hb-qmsg">در حال بارگذاری…</p>';
    api({ a: "adoptAdmin", t: tokGet() }).then(function (j) { if (!j.ok) { box.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; } adItems = j.items; adRender(); });
  }
  function adRender() {
    var b = q('[data-seg="hb-adf"] .on'), f = b ? b.getAttribute("data-v") : "pending", box = q("[data-hb-adlist]");
    setTabCount("adopt", adItems.filter(function (r) { return r.status === "pending"; }).length);
    var list = adItems.filter(function (r) { return f === "closed" ? (r.status === "done" || r.status === "rejected") : r.status === f; });
    box.innerHTML = list.length ? list.map(function (r) {
      var btns = r.status === "pending" ? '<button type="button" class="btn small primary" data-hb-adact="approved" data-id="' + esc(r.id) + '">✅ تأیید و انتشار</button><button type="button" class="btn small hb-danger" data-hb-adact="rejected" data-id="' + esc(r.id) + '">رد</button>'
        : r.status === "approved" ? '<button type="button" class="btn small primary" data-hb-adact="done" data-id="' + esc(r.id) + '">🎉 واگذار شد</button><button type="button" class="btn small" data-hb-adact="pending" data-id="' + esc(r.id) + '">پنهان کردن</button>'
        : '<button type="button" class="btn small" data-hb-adact="pending" data-id="' + esc(r.id) + '">بازگرداندن به انتظار</button>';
      return '<article class="hb-adc"><div class="hb-adh"><b>' + esc(r.name) + "</b><span>" + esc(r.species) + " · " + esc(r.sex) + (r.age ? " · " + esc(r.age) : "") + '</span><em class="ad-' + esc(r.status) + '">' + adLabel(r.status) + "</em></div>"
        + (r.photo ? '<img class="hb-adimg" src="' + esc(r.photo) + '" alt="">' : "")
        + '<p>📍 ' + esc(r.city || "—") + " · عقیم‌شده: " + esc(r.neutered) + " · واکسن: " + esc(r.vaccine) + "</p>"
        + (r.temper ? "<p>رفتار: " + esc(r.temper) + "</p>" : "") + (r.reason ? "<p>دلیل: " + esc(r.reason) + "</p>" : "")
        + '<p>📞 <a href="tel:' + esc(r.contact) + '" dir="ltr">' + esc(r.contact) + '</a> · کد <bdi dir="ltr">' + esc(r.id) + "</bdi></p>"
        + '<div class="hb-adb">' + btns + '<button type="button" class="btn small ghost" data-hb-adphoto data-id="' + esc(r.id) + '">📷 ' + (r.photo ? "تغییر عکس" : "افزودن عکس") + '</button><button type="button" class="btn small ghost hb-danger" data-hb-adact="deleted" data-id="' + esc(r.id) + '">🗑 حذف</button></div></article>';
    }).join("") : '<p class="hb-qmsg">موردی نیست.</p>';
  }
  function adShrink(file, cb) {
    var rd = new FileReader();
    rd.onload = function () { var im = new Image(); im.onload = function () {
      var side = 360, qual = 0.72, out = "";
      for (var k = 0; k < 8; k++) {
        var sc = Math.min(1, side / Math.max(im.width, im.height)), cv = document.createElement("canvas"); cv.width = Math.round(im.width * sc); cv.height = Math.round(im.height * sc);
        cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); out = cv.toDataURL("image/jpeg", qual);
        if (out.length <= 44000) return cb(out); qual = Math.max(0.5, qual - 0.07); side = Math.round(side * 0.88);
      }
      cb("");
    }; im.onerror = function () { cb(""); }; im.src = rd.result; };
    rd.readAsDataURL(file);
  }
  root.addEventListener("click", function (e) {
    var t = e.target, b2;
    if (t.closest && t.closest('[data-seg="hb-adf"] button')) { setTimeout(adRender, 0); return; }
    if ((b2 = t.closest && t.closest("[data-hb-adact]"))) {
      var st = b2.getAttribute("data-hb-adact"), id = b2.getAttribute("data-id");
      if (st === "deleted" && !confirm("این مورد برای همیشه حذف شود؟")) return;
      b2.disabled = true; api({ a: "adoptSet", t: tokGet(), id: id, status: st }).then(function (j) { if (!j.ok) { b2.disabled = false; return alert(errMsg(j.err)); } adLoad(); });
      return;
    }
    if ((b2 = t.closest && t.closest("[data-hb-adphoto]"))) { adPhotoId = b2.getAttribute("data-id"); q("[data-hb-adfile]").click(); }
  });
  q("[data-hb-adfile]").addEventListener("change", function () {
    var inp = this, f = inp.files[0]; if (!f || !adPhotoId) return; var id = adPhotoId; inp.value = "";
    adShrink(f, function (d) { if (!d) return alert("این عکس قابل استفاده نبود."); api({ a: "adoptSet", t: tokGet(), id: id, photo: d }).then(function (j) { if (!j.ok) return alert(errMsg(j.err)); toast("عکس ذخیره شد"); adLoad(); }); });
  });
  applyRole(); if (!(DRPAGE && isDr() && srvOn() && todayBox())) dview("list");
  checkImport();
  if (location.hash === "#request" && !DRPAGE) setTimeout(function () { var rb = q("[data-hb-req]"); if (rb) rb.click(); }, 400);
  syncCur();
  if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) { try { navigator.serviceWorker.register("sw.js"); } catch (e) {} }
  render();
})();

// ابزار سن پت به سن انسان
(function () {
  var root = document.querySelector("[data-petage]"); if (!root) return;
  var res = root.querySelector("[data-pa-res]"), sizeBox = root.querySelector("[data-pa-size]"), birdBox = root.querySelector("[data-pa-bird]");
  function sp() { var b = root.querySelector('[data-seg="pa-sp"] .on'); return b ? b.getAttribute("data-v") : "dog"; }
  function sync() { var s = sp(); sizeBox.hidden = s !== "dog"; birdBox.hidden = s !== "bird"; }
  root.addEventListener("click", function () { setTimeout(sync, 0); }); sync();
  function stage(s, y) {
    if (s === "bird") return y < 1 ? "جوان" : "بالغ";
    var senior = s === "cat" ? 11 : 7;
    return y < 1 ? (s === "cat" ? "بچه‌گربه و نوجوان" : "توله و نوجوان") : y < 3 ? "جوان" : y < senior - 4 ? "بالغ" : y < senior ? "میانسال" : "مسن";
  }
  root.querySelector("[data-pa-go]").addEventListener("click", function () {
    var s = sp(), y = toolNum(root.querySelector("#pa-y").value) || 0, m = toolNum(root.querySelector("#pa-m").value) || 0, age = y + Math.min(11, Math.max(0, m)) / 12, h, note = "";
    res.hidden = false;
    if (!(age > 0)) { res.innerHTML = "<b>سن را وارد کنید</b><span>سال و ماه پت را بنویسید.</span>"; return; }
    if (s === "bird") {
      var life = Number(root.querySelector("#pa-bird").value); h = Math.min(100, age / life * 80); note = "برای پرندگان، سن با میانگین عمر گونه مقایسه شده است و فقط تصویری تقریبی می‌دهد.";
    } else {
      var per = s === "cat" ? 4 : { s: 4, m: 5, l: 6 }[root.querySelector("#pa-size").value];
      h = age <= 1 ? age * 15 : age <= 2 ? 15 + (age - 1) * 9 : 24 + (age - 2) * per;
    }
    var st = stage(s, age);
    res.innerHTML = "<b>حدود " + toolFa(Math.round(h)) + " سالگی انسان</b><span>مرحلهٔ زندگی: " + st + (st === "مسن" ? ". چکاپ منظم و آزمایش خون پیشنهاد می‌شود." : "") + "</span>" + (note ? "<span>" + note + "</span>" : "") + '<a class="btn small" href="health-book.html">ثبت واکسن و چکاپ در دفترچهٔ سلامت</a>';
  });
})();

// ابزار غذاهای سمی
(function () {
  var root = document.querySelector("[data-toxic]"); if (!root) return;
  var inp = root.querySelector("[data-tx-q]"), items = [].slice.call(root.querySelectorAll(".tx")), none = root.querySelector("[data-tx-none]");
  function norm(s) { return String(s || "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/‌/g, "").toLowerCase(); }
  function apply() {
    var b = root.querySelector('[data-seg="tx-sp"] .on'), f = b ? b.getAttribute("data-v") : "", q = norm(inp.value).trim(), n = 0;
    items.forEach(function (li) {
      var ok = (!f || (" " + li.getAttribute("data-sp") + " ").indexOf(" " + f + " ") > -1) && (!q || norm(li.getAttribute("data-n") + " " + li.textContent).indexOf(q) > -1);
      li.hidden = !ok; if (ok) n++;
    });
    none.hidden = n > 0;
  }
  inp.addEventListener("input", apply);
  root.addEventListener("click", function () { setTimeout(apply, 0); });
})();

// چک‌لیست فوریت
(function () {
  var root = document.querySelector("[data-emg-tool]"); if (!root) return;
  var res = root.querySelector("[data-emg-res]"), bar = root.querySelector("[data-emg-bar]");
  bar.addEventListener("click", function () { res.scrollIntoView({ behavior: "smooth", block: "center" }); });
  function upd() {
    var u = root.querySelectorAll('[data-emg="u"]:checked').length, s = root.querySelectorAll('[data-emg="s"]:checked').length;
    res.className = "tool-res emg-res " + (u ? "emg-r" : s ? "emg-y" : "");
    if (u) res.innerHTML = "<b>🚨 فوری است</b><span>همین الان با دامپزشک تماس بگیرید یا پت را به نزدیک‌ترین کلینیک یا اورژانس دامپزشکی ببرید. منتظر بهتر شدن نمانید.</span>" + '<a class="btn small" data-ask="فوریت پت" href="contact.html">پیام به دکتر در واتساپ</a>';
    else if (s) res.innerHTML = "<b>ظرف ۲۴ ساعت باید دیده شود</b><span>برای امروز یا فردا ویزیت بگیرید. اگر علائم بدتر شد یا علائم فوری اضافه شد، فوراً اقدام کنید.</span>" + '<a class="btn small" href="booking.html">ثبت نوبت</a>';
    bar.hidden = !(u || s); bar.className = "emg-bar " + (u ? "emg-r" : "emg-y"); bar.textContent = u ? "🚨 فوری است؛ برای جزئیات بزنید" : "⏱ ظرف ۲۴ ساعت؛ برای جزئیات بزنید";
    if (u || s) return;
    res.innerHTML = "<b>علائم را تیک بزنید</b><span>اگر هیچ‌کدام از این علائم را ندارید ولی نگران هستید، با دکتر مشورت کنید.</span>";
  }
  root.addEventListener("change", upd);
})();

// صفحهٔ واگذاری پت (عمومی)
(function () {
  var root = document.querySelector("[data-adopt]"); if (!root) return;
  var grid = root.querySelector("[data-ad-grid]"), pets = [], form = root.querySelector("[data-ad-form]"), okBox = root.querySelector("[data-ad-ok]"), err = root.querySelector("[data-ad-err]");
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function api(body) { return fetch(INFO.sheetApi, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }).catch(function () { return { ok: false, err: "net" }; }); }
  function wa(txt) { return "https://wa.me/" + INFO.whatsapp + "?text=" + encodeURIComponent(txt); }
  var deco = grid.innerHTML;
  function draw() {
    if (!pets.length) { grid.innerHTML = deco; return; }
    var b = root.querySelector('[data-seg="ad-sp"] .on'), f = b ? b.getAttribute("data-v") : "", list = pets.filter(function (p) { return !f || p.species === f; });
    grid.innerHTML = list.length ? list.map(function (p) {
      return '<article class="ad-card">' + (p.photo ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.species + " " + p.name + " برای واگذاری") + '" loading="lazy">' : '<div class="ad-ph" aria-hidden="true">🐾</div>')
        + '<div class="ad-in"><h3>' + esc(p.name) + '</h3><p class="ad-meta">' + esc(p.species) + " · " + esc(p.sex) + (p.age ? " · " + esc(p.age) : "") + "</p>"
        + '<p class="ad-tags">' + (p.city ? "📍 " + esc(p.city) + " · " : "") + "عقیم‌شده: " + esc(p.neutered) + " · واکسن: " + esc(p.vaccine) + "</p>"
        + (p.temper ? "<p>" + esc(p.temper) + "</p>" : "")
        + '<a class="btn small" target="_blank" rel="noopener" href="' + wa("سلام دکتر، می‌خواهم دربارهٔ واگذاری «" + p.name + "» (کد " + p.id + ") صحبت کنم.") + '">می‌خواهم این پت را بگیرم</a></div></article>';
    }).join("") : '<p class="ad-msg">' + (pets.length ? "موردی برای این گونه نیست." : "") + "</p>";
  }
  root.addEventListener("click", function (e) { if (e.target.closest && e.target.closest('[data-seg="ad-sp"] button')) setTimeout(draw, 0); });
  if (INFO.sheetApi) api({ a: "adoptList" }).then(function (j) { if (j.ok) { pets = j.pets; draw(); } else grid.insertAdjacentHTML("afterbegin", '<p class="ad-msg">بارگذاری فهرست ممکن نشد. کمی بعد دوباره امتحان کنید.</p>'); });
  function seg(n) { var b = root.querySelector('[data-seg="' + n + '"] .on'); return b ? b.getAttribute("data-v") : ""; }
  function val(id) { return root.querySelector("#" + id).value.trim(); }
  root.querySelector("[data-ad-send]").addEventListener("click", function () {
    var btn = this, digits = val("ad-contact").replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/\D/g, "");
    err.hidden = true;
    if (!val("ad-name")) { err.textContent = "نام پت را بنویسید."; err.hidden = false; return; }
    if (digits.length < 10) { err.textContent = "شمارهٔ تماس را کامل بنویسید."; err.hidden = false; return; }
    if (!root.querySelector("#ad-consent").checked) { err.textContent = "تیک موافقت را بزنید."; err.hidden = false; return; }
    btn.disabled = true; btn.textContent = "در حال ثبت…";
    api({ a: "adoptSubmit", species: seg("ad-fsp"), name: val("ad-name"), age: val("ad-age"), sex: seg("ad-sex"), neutered: val("ad-neu"), vaccine: val("ad-vac"), temper: val("ad-temper"), reason: val("ad-reason"), city: val("ad-city"), contact: val("ad-contact"), consent: 1, hp: val("ad-hp") }).then(function (j) {
      btn.disabled = false; btn.textContent = "ثبت درخواست واگذاری";
      if (!j.ok) { err.textContent = j.err === "busy" ? "تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره امتحان کنید." : j.err === "net" ? "اتصال با سرور برقرار نشد. اینترنت را بررسی کنید." : "ثبت انجام نشد؛ اطلاعات را بررسی کنید."; err.hidden = false; return; }
      form.hidden = true; okBox.hidden = false;
      okBox.innerHTML = "<b>✅ درخواست شما ثبت شد</b><span>کد پیگیری: <bdi dir=\"ltr\">" + esc(j.id) + "</bdi>. حالا عکس‌های پت را به واتساپ دکتر بفرستید تا بعد از بررسی همراه آگهی منتشر شود.</span>" + '<a class="btn small" target="_blank" rel="noopener" href="' + wa("سلام دکتر، درخواست واگذاری پت ثبت کردم. کد: " + j.id + " (نام پت: " + val("ad-name") + ")") + '">ارسال عکس در واتساپ</a>';
      okBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
})();

// اصالت‌سنجی شناسنامه (عمومی)
(function () {
  var root = document.querySelector("[data-vfy]"); if (!root) return;
  var res = root.querySelector("[data-vf-res]");
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function jy(iso) { try { return new Date(iso + "T12:00:00").toLocaleDateString("fa-IR-u-ca-persian", { year: "numeric", month: "long", day: "numeric" }); } catch (e) { return iso; } }
  function show(cls, html) { res.hidden = false; res.className = "tool-res vf-" + cls; res.innerHTML = html; }
  root.querySelector("[data-vf-go]").addEventListener("click", function () {
    var code = root.querySelector("#vf-code").value.trim(), au = root.querySelector("#vf-auth").value.trim(), btn = this;
    if (!code || !au) { show("bad", "<b>هر دو کد را بنویسید</b><span>شمارهٔ شناسنامه (مثل NM-1234) و کد اصالت (شش نویسه).</span>"); return; }
    if (!INFO.sheetApi) { show("bad", "<b>اصالت‌سنجی فعلاً در دسترس نیست</b>"); return; }
    btn.disabled = true; show("wait", "<b>در حال بررسی…</b>");
    fetch(INFO.sheetApi, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ a: "verifyPublic", code: code, auth: au }) })
      .then(function (r) { return r.json(); }).catch(function () { return { ok: false, err: "net" }; }).then(function (j) {
        btn.disabled = false;
        if (!j.ok) { show("bad", "<b>" + (j.err === "locked" ? "این کد چند بار اشتباه بررسی شد و موقتاً قفل است. یک ساعت دیگر دوباره امتحان کنید." : j.err === "net" ? "اتصال با سرور برقرار نشد. اینترنت را بررسی کنید." : "تعداد بررسی‌ها زیاد است؛ کمی بعد دوباره امتحان کنید.") + "</b>"); return; }
        if (j.valid) show("ok", "<b>✅ شناسنامه معتبر است</b><span>" + esc(j.pet.name) + " (" + esc(j.pet.species) + ")</span><span>تاریخ صدور: " + esc(jy(j.pet.created)) + "</span><span>نام پت را با شناسنامه مقایسه کنید. سوابق واکسن و ضدانگل را سرپرست در گوشی خودش نشان می‌دهد.</span>");
        else show("bad", "<b>❌ معتبر نیست</b><span>کدها با هم نمی‌خوانند یا شناسنامه‌ای با این کد وجود ندارد. دو کد را دوباره بررسی کنید؛ اگر باز هم همین بود، شناسنامه را معتبر ندانید.</span>");
      });
  });
  (function () { try { var sp = new URLSearchParams(location.search), c0 = sp.get("c"), a0 = sp.get("a"); if (c0) root.querySelector("#vf-code").value = c0; if (a0) root.querySelector("#vf-auth").value = a0; if (c0 && a0) root.querySelector("[data-vf-go]").click(); } catch (e) {} })();
})();

(function () {
  try {
    var ua = navigator.userAgent || "", ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1), and = /Android/i.test(ua);
    if (!ios && !and) return;
    var hide = ios ? "android" : "ios", n = document.querySelectorAll('[data-how="' + hide + '"]');
    for (var i = 0; i < n.length; i++) n[i].hidden = true;
  } catch (e) {}
})();
