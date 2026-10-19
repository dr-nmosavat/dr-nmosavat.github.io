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
  var KEY = "dm_hb";
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
  function q(s) { return root.querySelector(s); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function load() { try { var d = JSON.parse(localStorage.getItem(KEY) || "null"); if (d && d.pets && d.recs) return d; } catch (e) {} return { pets: [], recs: [], cur: null }; }
  var db = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { alert("ذخیره‌سازی در این مرورگر ممکن نیست."); } }
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
  function when(n) { return n === 0 ? "امروز" : n > 0 ? toolFa(n) + " روز دیگر" : toolFa(-n) + " روز گذشته"; }
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
    o.push("HEALTH RECORD | شناسنامه سلامت" + (srvOf(cp) ? " | ID " + cp.srv.code : ""), cp.name + (cp.en ? " / " + cp.en : "") + (cp.owner ? " | Owner/صاحب: " + cp.owner : "") + (cp.guardian ? " | Guardian/سرپرست: " + cp.guardian : ""), (SPEN[cp.species] || cp.species || "") + (cp.breed ? " | " + cp.breed + (be ? " / " + be : "") : ""));
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
  function renderCover(cp) {
    var lw = db.recs.filter(function (r) { return r.pet === cp.id && r.weight; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0], rows = [];
    if (srvOf(cp)) rows.push(["کد پت / ID", '<bdi dir="ltr">' + esc(cp.srv.code) + "</bdi>"]);
    rows.push(["صاحب پت / Owner", cp.owner ? esc(cp.owner) : '<span class="nil">—</span>']);
    if (cp.guardian) rows.push(["سرپرست / Guardian", esc(cp.guardian)]);
    function enp(s) { return s ? ' <span class="en">· ' + esc(s) + "</span>" : ""; }
    if (cp.species) rows.push(["گونه / Species", esc(cp.species) + enp(SPEN[cp.species])]);
    var be = cp.breedEn || breedEn(cp.breed);
    if (cp.breed) rows.push(["نژاد / Breed", esc(cp.breed) + enp(be)]);
    if (cp.birth) rows.push(["تولد / Birth", esc(fd(cp.birth)) + enp(enDate(cp.birth))]);
    if (cp.birth && ageText(cp.birth)) rows.push(["سن / Age", esc(ageText(cp.birth))]);
    if (lw) rows.push(["وزن / Weight", toolFa(lw.weight) + " کیلوگرم" + enp(lw.weight + " kg")]);
    q("[data-hb-cover]").innerHTML = '<button type="button" class="hb-qr" data-hb-qr aria-label="نمایش QR شناسنامه">' + qrSvg(qrText(cp)) + '</button><small class="hb-cv-t">شناسنامهٔ سلامت<br><i>Health Record</i></small><div class="hb-cv-ic"><button type="button" class="hb-cv-icb" data-hb-cover-photo aria-label="تغییر عکس پت">' + avatar(cp, "hb-cv-img") + '<span class="hb-cam" aria-hidden="true">📷</span></button></div><b>' + esc(cp.name) + "</b>" + (cp.en ? '<span class="hb-cv-en" dir="ltr">' + esc(cp.en) + "</span>" : "") + (rows.length ? '<dl class="hb-id">' + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") + "</dl>" : "");
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
    var dbar = q("[data-hb-drbar]"); if (dbar) dbar.hidden = DRPAGE && !isDr();
    if (DRPAGE && srvOn() && !isDr()) { pets.innerHTML = ""; main.hidden = true; pf.hidden = true; if (noAcct) noAcct.hidden = true; if (gate) gate.hidden = false; document.documentElement.classList.remove("hb-has-pet"); return; }
    if (!db.pets.length) { var guest = srvOn() && !isDr(); pets.innerHTML = ""; main.hidden = true; pf.hidden = guest; if (noAcct) noAcct.hidden = !(guest && !DRPAGE); if (gate) gate.hidden = !(guest && DRPAGE); document.documentElement.classList.remove("hb-has-pet"); return; }
    if (noAcct) noAcct.hidden = true; if (gate) gate.hidden = true;
    var cp = curPet(); db.cur = cp.id;
    pets.innerHTML = db.pets.map(function (p) { return '<button type="button" class="chip' + (p.id === cp.id ? " on" : "") + '" data-hb-pet="' + p.id + '">' + avatar(p, "hb-mini") + " " + esc(p.name) + "</button>"; }).join("") + (srvOn() && !isDr() ? "" : '<button type="button" class="chip" data-hb-newpet>＋ پت جدید</button>');
    main.hidden = !pf.hidden; if (!pf.hidden) return;
    renderCover(cp);
    // کارت برنامهٔ واکسن
    var pl = q("[data-hb-plan]"), young = cp.birth && (cp.species === "سگ" || cp.species === "گربه") && -days(cp.birth) < 400, hasPlan = (cp.plan || []).length;
    if (young && !hasPlan) pl.innerHTML = '<div class="hb-plan-c"><b>برنامهٔ واکسن ' + (cp.species === "سگ" ? "توله‌سگ" : "بچه‌گربه") + "</b><p>با زدن دکمهٔ زیر، تاریخ نوبت‌های واکسن و کرم‌کشی بر اساس تاریخ تولد حساب می‌شود و به «یادآوری‌ها» اضافه می‌شود. تاریخ‌ها تقریبی‌اند و طبق نظر دامپزشک تنظیم کنید.</p><button type=\"button\" class=\"btn small primary\" data-hb-mkplan>📅 ساخت برنامهٔ واکسن و کرم‌کشی</button><details class=\"hb-det\"><summary>برنامه شامل چه چیزی است؟</summary><p>واکسن در هفتهٔ ۸، ۱۲ و ۱۶ (" + (cp.species === "سگ" ? "چندگانه سگ" : "سه‌گانه گربه") + ")، هاری در هفتهٔ ۱۶ و یادآور سالانه؛ ضدانگل داخلی در هفته‌های ۲، ۴، ۶، ۸، ۱۲، ۱۶، ۲۰ و ۲۴. بعد از ساخت، هر نوبت با «انجام شد» در دفترچه ثبت می‌شود و می‌توانید آن را به تقویم گوشی اضافه کنید. هر زمان خواستید «حذف برنامه» را بزنید.</p></details></div>";
    else if (!cp.birth && (cp.species === "سگ" || cp.species === "گربه")) pl.innerHTML = '<div class="hb-plan-c"><b>برنامهٔ واکسن توله و بچه‌گربه</b><p>با نوشتن تاریخ تولد، برنامهٔ پیشنهادی ساخته می‌شود.</p><button type="button" class="btn small" data-hb-edit-pet>نوشتن تاریخ تولد</button></div>';
    else pl.innerHTML = hasPlan ? '<div class="hb-plan-c ok"><span>برنامهٔ واکسن ' + (cp.species === "سگ" ? "توله‌سگ" : "بچه‌گربه") + ' فعال است.</span><button type="button" class="hb-lnk" data-hb-delplan>حذف برنامه</button></div>' : "";
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
  var OWNER_LOCKED = ["واکسن", "ویزیت", "آزمایش", "عقیم‌سازی"];   // انواعی که فقط دکتر ثبت می‌کند
  var DR_SALT = "GnOd3U5koVp1Ozi8RTcLbA==", DR_HASH = "b4Ba9BSekt9YN0YQ3iruqAzem9RYjTbLV4PClSZjdFs=";
  function srvOn() { return !!INFO.sheetApi && !!window.fetch; }
  function api(body) {
    var ctl = window.AbortController ? new AbortController() : null, tm = ctl ? setTimeout(function () { ctl.abort(); }, 20000) : 0;
    return fetch(INFO.sheetApi, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); }).then(function (j) { clearTimeout(tm); if (j && j.ok === false && j.err === "auth" && body.t !== undefined && DRPAGE && localStorage.getItem("dm_hb_dr") === "1") drDrop("ورود شما از طرف سرور تأیید نشد؛ لطفاً دوباره وارد شوید."); return j; }).catch(function () { clearTimeout(tm); return { ok: false, err: "net" }; });
  }
  function tokGet() { try { var o = JSON.parse(localStorage.getItem("dm_hb_tok") || "null"); return o && o.exp > Date.now() ? o.t : ""; } catch (e) { return ""; } }
  function tokSet(t) { try { if (t) localStorage.setItem("dm_hb_tok", JSON.stringify({ t: t, exp: (Number(String(t).split(".")[0]) || Date.now() + 3 * 86400000) - 60000 })); else localStorage.removeItem("dm_hb_tok"); } catch (e) {} }
  var DRPAGE = document.body.classList.contains("hb-drpage");
  var drListRun = null;
  function dview(v) { root.setAttribute("data-dview", v); [].forEach.call(root.querySelectorAll("[data-hb-dtab]"), function (b) { b.classList.toggle("on", b.getAttribute("data-hb-dtab") === v); }); if (v === "list" && isDr() && srvOn() && drListRun) drListRun(); }
  function drDrop(msg) { try { localStorage.removeItem("dm_hb_dr"); } catch (e) {} tokSet(""); setTimeout(function () { applyRole(); render(); toast(msg); }, 0); }
  function isDr() { if (!DRPAGE) return false; try { var f = localStorage.getItem("dm_hb_dr") === "1"; if (f && srvOn() && !tokGet()) { drDrop("مدت اعتبار ورود تمام شد؛ لطفاً دوباره وارد شوید."); return false; } return f; } catch (e) { return false; } }
  function srvOf(p) { return p && p.srv && p.srv.code ? p.srv : null; }
  function errMsg(e) { return e === "net" ? "اتصال با سرور برقرار نشد. اینترنت را بررسی کنید." : e === "auth" ? "دسترسی مجاز نیست (دوباره وارد شوید یا لینک را بررسی کنید)." : e === "forbidden" ? "این مورد را فقط دکتر ثبت یا تغییر می‌دهد." : e === "locked" ? "ورود موقتاً قفل شد؛ چند دقیقه بعد دوباره تلاش کنید." : "خطای سرور؛ دوباره تلاش کنید."; }
  function toSrvPet(p) { return { code: p.srv && p.srv.code, name: p.name, en: p.en, owner: p.owner, guardian: p.guardian, species: p.species, breed: p.breed, breedEn: p.breedEn, birth: p.birth, plan: p.plan || [], consent: p.consent ? 1 : 0 }; }
  function toSrvRec(r) { var o = {}; ["id", "type", "date", "name", "brand", "serial", "place", "extra", "freq", "how", "dur", "end", "weight", "next", "closed"].forEach(function (k) { if (r[k]) o[k] = r[k]; }); return o; }
  function normRec(r) { var o = {}; for (var k in r) o[k] = r[k]; o.dr = r.dr ? 1 : 0; o.closed = !!r.closed; return o; }
  function upsertSrv(sp, recs, key) {
    var p = db.pets.filter(function (x) { return (x.srv && x.srv.code === sp.code) || x.id === sp.code; })[0];
    if (!p) { p = { id: sp.code, plan: [] }; db.pets.push(p); }
    ["name", "en", "owner", "guardian", "species", "breed", "breedEn", "birth"].forEach(function (k) { p[k] = sp[k] || ""; });
    p.plan = sp.plan || []; p.consent = !!sp.consent; p.srv = { code: sp.code, key: key || (p.srv && p.srv.key) || sp.key || "" };
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
  function toast(msg) { var t = document.createElement("div"); t.className = "hb-toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.classList.add("off"); }, 3200); setTimeout(function () { t.remove(); }, 3800); }
  function applyRole() { document.documentElement.classList.toggle("hb-dr", isDr()); var b = q("[data-hb-drbtn]"); if (b) b.textContent = isDr() ? "خروج" : "ورود دکتر"; var bd = q("[data-hb-drbadge]"); if (bd) bd.hidden = !isDr(); if (!editId) { var nw = srvOn() && isDr(); q("[data-hb-pf-title]").textContent = nw ? "صدور شناسنامهٔ جدید" : "شناسنامهٔ پت"; q("[data-hb-save-pet]").textContent = nw ? "صدور شناسنامه" : "ذخیره"; } var nb = q("[data-hb-newbox]"); if (nb) nb.hidden = !(srvOn() && isDr()); var sb = q("[data-hb-searchbox]"); if (sb) sb.hidden = !(srvOn() && isDr()); var vb = q("[data-hb-verifybox]"); if (vb) vb.hidden = !(srvOn() && isDr()); }
  function checkDrPass(pw) {
    if (!window.crypto || !crypto.subtle) return Promise.resolve(false);
    var s = atob(DR_SALT), salt = new Uint8Array(s.length), i; for (i = 0; i < s.length; i++) salt[i] = s.charCodeAt(i);
    return crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveBits"]).then(function (k) { return crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" }, k, 256); }).then(function (bits) { return btoa(String.fromCharCode.apply(null, new Uint8Array(bits))) === DR_HASH; }).catch(function () { return false; });
  }
  var curPg = 0, editList = false;
  var PGS = ["مشخصات", "واکسیناسیون", "ضدانگل", "سایر"];
  function recDel(r) { return false ? '<button type="button" class="hb-pdel" data-hb-del="' + r.id + '" aria-label="حذف">✕</button>' : ""; }
  function pageRows(cp, types, mode) {
    var rs = db.recs.filter(function (r) { return r.pet === cp.id && types.indexOf(r.type) > -1; }).sort(function (x, y) { return x.date < y.date ? 1 : -1; });
    if (!rs.length) return '<p class="hb-pe">' + (mode === "vax" && !isDr() ? "واکسن‌ها توسط دکتر ثبت می‌شود." : "هنوز موردی ثبت نشده است.") + "</p>";
    return rs.map(function (r) {
      var k = cfg(r.type);
      if (mode === "vax" || mode === "par") {
        var main = (r.brand ? "<bdi>" + esc(r.brand) + "</bdi>" + (r.name ? " · " : "") : "") + (r.name ? esc(r.name) : r.brand ? "" : tl(r.type));
        return '<div class="hb-pr">' + recDel(r) + '<div class="hb-pn"><b>' + main + "</b>" + (mode === "par" ? "<span>" + (r.type === "ضدانگل داخلی" ? "داخلی" : "خارجی") + "</span>" : "") + (r.serial ? '<small dir="ltr">Lot: ' + esc(r.serial) + "</small>" : "") + '</div><div class="hb-pd"><span><i>' + (mode === "vax" ? "تزریق" : "مصرف") + "</i>" + fd(r.date) + "</span><span><i>تکرار</i>" + (r.next ? fd(r.next) : "—") + "</span></div></div>";
      }
      if (r.type === "دارو") {
        var act = r.dur === "دائمی" || (r.end && days(r.end) >= 0), line2 = [r.extra, r.freq, r.how].filter(Boolean).map(esc).join(" · ");
        return '<div class="hb-pr"><div class="hb-pn"><b>' + k.ic + " " + esc(r.name || "دارو") + (act ? ' <span class="hb-act">فعال</span>' : "") + "</b>" + (line2 ? "<small>" + line2 + "</small>" : "") + '</div><div class="hb-pd"><span><i>شروع</i>' + fd(r.date) + "</span><span><i>تا</i>" + (r.dur === "دائمی" ? "دائمی" : r.end ? fd(r.end) : "—") + "</span></div></div>";
      }
      var det = [r.name, r.place, r.extra].filter(Boolean).map(esc).join(" · ") + (r.weight ? (r.name || r.place || r.extra ? " · " : "") + toolFa(r.weight) + " کیلوگرم" : "");
      return '<div class="hb-pr">' + recDel(r) + '<div class="hb-pn"><b>' + k.ic + " " + tl(r.type) + "</b>" + (!r.dr && (r.type === "سایر" || r.type === "دارو") ? "<span>ثبت صاحب پت</span>" : "") + (det ? "<small>" + det + "</small>" : "") + '</div><div class="hb-pd"><span>' + fd(r.date) + "</span></div></div>";
    }).join("");
  }
  function weightChart(cp) {
    var ws = db.recs.filter(function (r) { return r.pet === cp.id && r.weight; }).sort(function (x, y) { return x.date < y.date ? -1 : 1; });
    if (ws.length < 2) return "";
    var vals = ws.map(function (r) { return r.weight; }), mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), rg = (mx - mn) || 1;
    var pts = ws.map(function (r, i) { return (10 + i * (280 / (ws.length - 1))).toFixed(1) + "," + (60 - ((r.weight - mn) / rg) * 46).toFixed(1); }).join(" ");
    return '<div class="hb-weight"><svg viewBox="0 0 300 70" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="#1f5ea6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><small>روند وزن: از ' + toolFa(vals[0]) + " به " + toolFa(vals[vals.length - 1]) + " کیلوگرم</small></div>";
  }
  function renderPages(cp) {
    function pg(i, title, body) { return '<div class="hb-pg-h">' + title + '</div><div class="hb-pg-b">' + body + "</div>"; }
    q('[data-hb-pg="1"]').innerHTML = pg(1, "💉 واکسیناسیون", pageRows(cp, ["واکسن"], "vax"));
    q('[data-hb-pg="2"]').innerHTML = pg(2, "🪱 ضدانگل داخلی و خارجی", pageRows(cp, ["ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)"], "par"));
    q('[data-hb-pg="3"]').innerHTML = pg(3, "🩺 ویزیت، آزمایش، وزن و سایر", weightChart(cp) + pageRows(cp, ["ویزیت", "آزمایش", "عقیم‌سازی", "دارو", "وزن", "سایر"], "oth"));
    q("[data-hb-ptabs]").innerHTML = PGS.map(function (t, i) { return '<button type="button" class="chip' + (i === curPg ? " on" : "") + '" data-hb-pgo="' + i + '">' + t + "</button>"; }).join("");
    q("[data-hb-dots]").innerHTML = PGS.map(function (t, i) { return '<i class="' + (i === curPg ? "on" : "") + '"></i>'; }).join("");
    var tr = q("[data-hb-track]"); tr.scrollTo({ left: (getComputedStyle(tr).direction === "rtl" ? -1 : 1) * curPg * tr.clientWidth, behavior: "auto" }); fitTrack();
  }
  function fitTrack() { var tr = q("[data-hb-track]"); if (!tr) return; var h = 0; [].forEach.call(tr.children, function (s) { h = Math.max(h, s.scrollHeight); }); tr.style.height = h + "px"; }
  window.addEventListener("resize", function () { if (q("[data-hb-track]")) fitTrack(); });
  function setPg(i) { curPg = i; goPg(i); [].forEach.call(q("[data-hb-ptabs]").children, function (c, n) { c.classList.toggle("on", n === i); }); [].forEach.call(q("[data-hb-dots]").children, function (c, n) { c.classList.toggle("on", n === i); }); fitTrack(); }
  function goPg(i) { var tr = q("[data-hb-track]"); tr.scrollTo({ left: (getComputedStyle(tr).direction === "rtl" ? -1 : 1) * i * tr.clientWidth, behavior: "smooth" }); }
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
  var editRecId = null;
  function renderTypes() {
    var avail = ORDER.filter(function (t) { return !locked(t); });
    q("[data-hb-types]").innerHTML = '<div class="fld"><label for="hb-tsel">نوع خدمت</label><select id="hb-tsel" data-hb-tsel' + (editRecId ? " disabled" : "") + ">" + avail.map(function (t) { return '<option value="' + esc(t) + '"' + (t === curType ? " selected" : "") + ">" + tl(t) + "</option>"; }).join("") + "</select></div>";
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
    JD.d.set(r.date); JD.x.set(r.next || ""); xTouched = true; updateSug();
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
    if (!c.weight && !c.noNext) h += '<div class="fld"><label>تاریخ تکرار / نوبت بعدی <small>(اختیاری)</small></label><div class="jd" data-jd="x"></div><p class="hb-sug" data-hb-sug hidden></p><div class="hb-quick"><button type="button" data-hb-add="1">+۱ ماه</button><button type="button" data-hb-add="3">+۳ ماه</button><button type="button" data-hb-add="12">+۱ سال</button><button type="button" data-hb-clear>بدون نوبت</button></div></div>';
    q("[data-hb-sf]").innerHTML = h; q("[data-hb-err]").hidden = true;
    JD.d = initJd(q('[data-jd="d"]'), { minY: -2, maxY: 0 }); JD.x = (c.weight || c.noNext) ? { get: function () { return ""; }, set: function () {}, on: function () {} } : initJd(q('[data-jd="x"]'), { optional: true, minY: 0, maxY: 6 });
    JD.d.set(ymd(new Date())); JD.d.on(function () { xTouched = false; updateSug(); }); JD.x.on(function () { xTouched = true; });
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
    q("#hb-pn").value = p ? p.name : ""; q("#hb-pe").value = p && p.en || ""; q("#hb-po").value = p && p.owner || ""; q("#hb-pg").value = p && p.guardian || "";  q("#hb-pbe").value = p && p.breedEn || ""; q("#hb-pbe").setAttribute("data-auto", p && p.breedEn ? "" : "1"); JD.pb.set(p ? p.birth : ""); formPhoto = p && p.photo || ""; showPhoto();
    var segs = q('[data-seg="hbsp"]').children; [].forEach.call(segs, function (b) { b.classList.toggle("on", p ? b.getAttribute("data-v") === p.species : b.getAttribute("data-v") === "سگ"); });
    fillBreeds(p ? p.species : "سگ", p ? p.breed : "");
    q("[data-hb-petform]").hidden = false; q("[data-hb-main]").hidden = true;
  }
  JD.pb = initJd(q('[data-jd="pb"]'), { optional: true, minY: -30, maxY: 0 });
  root.addEventListener("change", function (e) { var s = e.target; if (s && s.hasAttribute && s.hasAttribute("data-hb-tsel")) { curType = s.value; xTouched = false; renderFields(); return; } if (s && s.hasAttribute && s.hasAttribute("data-hb-sel")) { var o = q("#" + s.id + "-o"); if (o) { o.hidden = s.value !== "__o"; if (!o.hidden) o.focus(); } } });
  q("#hb-pbr").addEventListener("change", function () { var o = q("#hb-pbro"); o.hidden = this.value !== "__o"; if (!o.hidden) o.focus(); var e = q("#hb-pbe"); if (e.getAttribute("data-auto") === "1") e.value = breedEn(getBreed()); });
  (function () {
    var sq = q("[data-hb-q]"), tm = 0; if (!sq) return;
    function run() { var box = q("[data-hb-qres]"); box.innerHTML = '<p class="hb-qmsg">در حال جستجو…</p>'; api({ a: "search", t: tokGet(), q: sq.value }).then(function (j) { if (!j.ok) { box.innerHTML = '<p class="hb-qmsg">' + esc(errMsg(j.err)) + "</p>"; return; } box.innerHTML = j.pets.length ? j.pets.map(function (p) { return '<button type="button" class="hb-qr1" data-hb-qopen="' + esc(p.code) + '"><b>' + esc(p.name) + (p.en ? " · " + esc(p.en) : "") + "</b><small>" + esc((p.owner ? p.owner + " · " : "") + p.code) + "</small></button>"; }).join("") : '<p class="hb-qmsg">موردی پیدا نشد.</p>'; var lo = db.pets.filter(function (p) { return !srvOf(p); }); if (lo.length) box.innerHTML += '<p class="hb-qmsg hb-qlo">فقط روی این دستگاه (هنوز روی سرور ذخیره نشده):</p>' + lo.map(function (p) { return '<button type="button" class="hb-qr1" data-hb-lopen="' + esc(p.id) + '"><b>' + esc(p.name) + "</b><small>" + esc(p.owner || "") + "</small></button>"; }).join(""); }); }
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
  (function () { var hd = document.querySelector("header.top"), ly = window.scrollY; if (!hd || !document.body.classList.contains("hb-page")) return; window.addEventListener("scroll", function () { var y = window.scrollY; if (y > ly + 6 && y > 90) hd.classList.add("fold"); else if (y < ly - 6 || y < 40) hd.classList.remove("fold"); ly = y; }, { passive: true }); })();
  // ---- ارسال شناسنامه برای صاحب پت (لینک) و دریافت ----
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
    return [2, cp.id, cp.name, cp.en || "", cp.owner || "", cp.guardian || "", Object.keys(SPE).indexOf(cp.species), cp.breed || "", cp.breedEn || "", cp.birth ? dayN(cp.birth) : 0, plan, recs];
  }
  function expandShare(a) {
    var p = { id: a[1], name: a[2], en: a[3], owner: a[4], guardian: a[5], species: Object.keys(SPE)[a[6]] || "دیگر", breed: a[7], breedEn: a[8], birth: a[9] ? dayD(a[9]) : "", plan: [] };
    (a[10] || []).forEach(function (x) { if (ORDER[x[0]]) p.plan.push({ type: ORDER[x[0]], date: dayD(x[1]), label: x[2], done: !!x[3] }); });
    var r = (a[11] || []).filter(function (x) { return ORDER[x[0]]; }).map(function (x) { var fl = x[9] || 0; return { type: ORDER[x[0]], date: dayD(x[1]), name: dDec(x[2]), brand: dDec(x[3]), serial: x[4], place: dDec(x[5]), extra: x[6], weight: x[7], next: x[8] ? dayD(x[8]) : "", closed: !!(fl & 2), d: fl & 1 ? 1 : 0, freq: dDec(x[10]), how: dDec(x[11]), dur: dDec(x[12]), end: x[13] ? dayD(x[13]) : "" }; });
    return { v: 1, p: p, r: r };
  }
  function cleanStr(v, n) { return typeof v === "string" ? v.slice(0, n || 120) : ""; }
  function cleanDate(v) { return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ""; }
  function sanitizeShare(d) {
    if (Array.isArray(d)) d = expandShare(d);
    if (!d || d.v !== 1 || !d.p || !Array.isArray(d.r)) throw new Error("bad");
    var p = d.p, pet = { id: /^[a-z0-9]{3,30}$/.test(p.id || "") ? p.id : uid(), name: cleanStr(p.name, 30), en: cleanStr(p.en, 30), owner: cleanStr(p.owner, 40), guardian: cleanStr(p.guardian, 40), species: SPE[p.species] ? p.species : "دیگر", breed: cleanStr(p.breed, 40), breedEn: cleanStr(p.breedEn, 40), birth: cleanDate(p.birth), plan: [] };
    if (!pet.name) throw new Error("bad");
    (Array.isArray(p.plan) ? p.plan : []).slice(0, 60).forEach(function (x) { if (x && CFG[x.type] && cleanDate(x.date)) pet.plan.push({ id: /^[a-z0-9]{3,30}$/.test(x.id || "") ? x.id : uid(), type: x.type, label: cleanStr(x.label, 90), date: x.date, done: !!x.done }); });
    var recs = []; d.r.slice(0, 400).forEach(function (x) { if (!x || !CFG[x.type] || !cleanDate(x.date)) return; var w = Number(x.weight) || 0; recs.push({ id: /^[a-z0-9]{3,30}$/.test(x.id || "") ? x.id : uid(), pet: pet.id, type: x.type, date: x.date, name: cleanStr(x.name, 90), brand: cleanStr(x.brand, 60), serial: cleanStr(x.serial, 60), place: cleanStr(x.place, 90), extra: cleanStr(x.extra, 90), freq: cleanStr(x.freq, 40), how: cleanStr(x.how, 40), dur: cleanStr(x.dur, 20), end: cleanDate(x.end), weight: w > 0 && w < 200 ? w : 0, next: cleanDate(x.next), closed: !!x.closed, dr: x.d === 1 ? 1 : 0 }); });
    return { pet: pet, recs: recs };
  }
  function faDigits(s) { return String(s || "").replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; }).replace(/\D/g, ""); }
  function waNum(s) { var d = faDigits(s); if (!d) return ""; if (d.indexOf("00") === 0) d = d.slice(2); if (d.charAt(0) === "0") d = "98" + d.slice(1); else if (d.length === 10 && d.charAt(0) === "9") d = "98" + d; return d; }
  var shareLink = "";
  function shareMsg() { var cp = curPet(); return "📒 شناسنامهٔ سلامت «" + cp.name + "»\nدکتر نیلوفر مساوات\n\nبا این لینک باز کنید و «افزودن به دفترچهٔ من» را بزنید:\n" + shareLink; }
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
    if (srvOf(cp) && srvOn()) { shareLink = (/^https?:/.test(location.protocol) ? location.href.replace(/[^\/?#]*([?#].*)?$/, "") + "p#" + cp.srv.code + "." + cp.srv.key : location.href.replace(/#.*$/, "") + "#p=" + cp.srv.code + "." + cp.srv.key); q("[data-hb-shlink]").value = shareMsg(); q("[data-hb-shlen]").textContent = toolFa(shareLink.length) + " نویسه · لینک زنده (همیشه آخرین وضعیت)"; q("[data-hb-shqr]").innerHTML = qrFromText(shareLink); return; }
    packShare(shareData(cp)).then(function (s) { shareLink = location.href.replace(/#.*$/, "") + "#share=" + s; q("[data-hb-shlink]").value = shareMsg(); q("[data-hb-shlen]").textContent = toolFa(shareLink.length) + " نویسه"; var qs = qrFromText(shareLink); q("[data-hb-shqr]").innerHTML = qs || "<p class=\"hb-shnote\">لینک برای QR بیش از حد بلند است؛ از لینک یا واتساپ استفاده کنید.</p>"; }).catch(function () { q("[data-hb-shlink]").value = "ساخت لینک در این مرورگر ممکن نشد."; });
  }
  function closeModal(sel) { q(sel).hidden = true; document.documentElement.classList.remove("gift-open"); }
  var pendingImport = null;
  function checkImport() {
    var ml = /^#p=([A-Za-z0-9\-]{3,20})\.([A-Za-z0-9]{10,40})$/.exec(location.hash || "");
    if (ml) {
      if (!srvOn()) { alert("این لینک زنده به سرور نیاز دارد که هنوز فعال نشده است."); return; }
      api({ a: "getOwner", code: ml[1], key: ml[2] }).then(function (j) {
        if (!j.ok) { alert(j.err === "auth" ? "این لینک معتبر نیست یا باطل شده است. از دکتر لینک تازه بخواهید." : errMsg(j.err)); return; }
        pendingImport = { live: { code: j.pet.code, key: ml[2], pet: j.pet, recs: j.recs } };
        var cn = function (t) { return j.recs.filter(function (r) { return r.type === t; }).length; };
        var inf = [cn("واکسن") ? toolFa(cn("واکسن")) + " واکسیناسیون" : "", (cn("ضدانگل داخلی") + cn("ضدانگل خارجی (کک و کنه)")) ? toolFa(cn("ضدانگل داخلی") + cn("ضدانگل خارجی (کک و کنه)")) + " ضدانگل" : "", cn("ویزیت") ? toolFa(cn("ویزیت")) + " ویزیت" : ""].filter(Boolean).join("، ") || "بدون سابقهٔ ثبت‌شده";
        q("[data-hb-impinfo]").innerHTML = "<b>" + esc(j.pet.name) + "</b>" + (j.pet.owner ? "<small>صاحب: " + esc(j.pet.owner) + "</small>" : "") + "<small>" + esc(inf) + "</small>";
        q("[data-hb-impm]").hidden = false; document.documentElement.classList.add("gift-open");
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
    if (t.closest("[data-hb-open]")) return openSheet();
    if ((b = t.closest("[data-hb-goto]")) && !t.closest("button")) { var gt = b.getAttribute("data-hb-goto"); setPg(gt === "واکسن" ? 1 : /ضدانگل/.test(gt) ? 2 : 3); q("[data-hb-ptabs]").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if ((b = t.closest("[data-hb-opt]"))) { [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle("on", x === b); }); var n = q("#hb-n"); if (n) n.value = b.getAttribute("data-hb-opt"); return; }
    if ((b = t.closest("[data-hb-tab]"))) { curTab = Number(b.getAttribute("data-hb-tab")); return render(); }
    if ((b = t.closest("[data-hb-pet]"))) { db.cur = b.getAttribute("data-hb-pet"); q("[data-hb-petform]").hidden = true; save(); render(); return syncCur(); }
    if ((b = t.closest("[data-hb-dtab]"))) { var dv = b.getAttribute("data-hb-dtab"); dview(dv); if (dv === "new") { petForm(null); } else q("[data-hb-petform]").hidden = true; return; }
    if (t.closest("[data-hb-back]")) { q("[data-hb-petform]").hidden = true; dview("list"); return; }
    if ((b = t.closest("[data-hb-lopen]"))) { db.cur = b.getAttribute("data-hb-lopen"); q("[data-hb-petform]").hidden = true; save(); render(); dview("pet"); return; }
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
      var fv = { name: n2, en: q("#hb-pe").value.trim(), owner: q("#hb-po").value.trim(), guardian: q("#hb-pg").value.trim(), breed: getBreed(), breedEn: q("#hb-pbe").value.trim(), species: spv, birth: bd };
      var perr = q("[data-hb-perr]"); perr.hidden = true;
      var useSrv = srvOn() && isDr() && (!ep0 || srvOf(ep0));
      if (srvOn() && ep0 && !isDr()) {   // صاحب پت فقط عکس را عوض می‌کند
        ep0.photo = formPhoto; editId = null; q("[data-hb-petform]").hidden = true; save(); return render();
      }
      if (useSrv) {
        var cons = q("#hb-pcons").checked; if (!ep0 && !cons) { perr.textContent = "گرفتن رضایت صاحب پت لازم است."; perr.hidden = false; return; }
        var pin = {}; for (var kp in fv) pin[kp] = fv[kp]; pin.code = ep0 ? ep0.srv.code : ""; pin.plan = ep0 ? ep0.plan || [] : []; pin.consent = cons || (ep0 && ep0.consent) ? 1 : 0;
        var sbtn = t.closest("[data-hb-save-pet]"); sbtn.disabled = true;
        api({ a: "savePet", t: tokGet(), pet: pin }).then(function (j) {
          sbtn.disabled = false; if (!j.ok) { perr.textContent = errMsg(j.err); perr.hidden = false; return; }
          var recs = ep0 ? db.recs.filter(function (r) { return r.pet === ep0.id; }) : [], pp = upsertSrv(j.pet, recs, j.pet.key);
          pp.photo = formPhoto || (ep0 && ep0.photo) || ""; db.cur = pp.id; editId = null; q("[data-hb-petform]").hidden = true; save(); render(); dview("pet");
        });
        return;
      }
      if (ep0) { for (var k4 in fv) ep0[k4] = fv[k4]; ep0.photo = formPhoto; }
      else { var p = { id: uid(), plan: [], photo: formPhoto }; for (var k5 in fv) p[k5] = fv[k5]; db.pets.push(p); db.cur = p.id; }
      editId = null; q("[data-hb-petform]").hidden = true; save(); return render();
    }
    if (t.closest("[data-hb-mkplan]")) { var cp2 = curPet(); cp2.plan = buildPlan(cp2); save(); return render(); }
    if (t.closest("[data-hb-delplan]")) { if (confirm("برنامهٔ پیشنهادی حذف شود؟")) { curPet().plan = []; save(); render(); } return; }
    if ((b = t.closest("[data-hb-open-type]"))) { if (locked(b.getAttribute("data-hb-open-type"))) return; curType = b.getAttribute("data-hb-open-type"); openSheet(); return; }
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
      var qc = b.getAttribute("data-hb-qopen"); b.disabled = true;
      api({ a: "get", t: tokGet(), code: qc }).then(function (j) { b.disabled = false; if (!j.ok) return alert(errMsg(j.err)); var p = upsertSrv(j.pet, j.recs, j.pet.key); db.cur = p.id; q("[data-hb-petform]").hidden = true; save(); render(); dview("pet"); });
      return;
    }
    if (t.closest("[data-hb-tosrv]")) {
      var cpm = curPet(); if (!cpm || srvOf(cpm) || !srvOn() || !isDr()) return;
      if (!confirm("رضایت صاحب پت برای ذخیرهٔ اطلاعات روی سرور گرفته شده است؟")) return;
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
      if (isDr()) { if (!confirm("از حالت دکتر خارج می‌شوید؟")) return; try { localStorage.removeItem("dm_hb_dr"); } catch (x) {} tokSet(""); applyRole(); return render(); }
      q("[data-hb-drm]").hidden = false; document.documentElement.classList.add("gift-open"); q("[data-hb-drpw]").value = ""; q("[data-hb-drpw]").type = "password"; q("[data-hb-drerr]").hidden = true; q("[data-hb-drpw]").focus(); return;
    }
    if (t.closest("[data-hb-dr-close]") || t === q("[data-hb-drm]")) return closeModal("[data-hb-drm]");
    if (t.closest("[data-hb-dr-ok]")) {
      var pw = q("[data-hb-drpw]").value.trim(), er0 = q("[data-hb-drerr]"), fin0 = function () { try { localStorage.setItem("dm_hb_dr", "1"); } catch (x) {} closeModal("[data-hb-drm]"); curType = "واکسن"; applyRole(); render(); dview("list"); toast("خوش آمدید خانم دکتر 👩‍⚕️"); };
      if (srvOn()) api({ a: "drLogin", pass: pw, rem: q("[data-hb-remember]").checked ? 1 : 0 }).then(function (j) { if (!j.ok) { er0.textContent = j.err === "auth" ? "رمز درست نیست." : errMsg(j.err); er0.hidden = false; return; } tokSet(j.t); fin0(); });
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
    if (t.closest("[data-hb-imp-yes]")) {
      if (pendingImport && pendingImport.live) {
        var lv = pendingImport.live, pl0 = upsertSrv(lv.pet, lv.recs, lv.key); db.cur = pl0.id; q("[data-hb-petform]").hidden = true; save(); pendingImport = null; closeModal("[data-hb-impm]"); try { history.replaceState(null, "", location.pathname); } catch (x) {} return render();
      }
      if (!pendingImport) return; var pi = pendingImport, ex = db.pets.filter(function (p) { return p.id === pi.pet.id; })[0];
      if (ex && !confirm("این پت قبلاً در دفترچهٔ شما هست. با اطلاعات جدید به‌روز شود؟")) return;
      if (ex) { pi.pet.photo = ex.photo || ""; db.pets = db.pets.map(function (p) { return p.id === pi.pet.id ? pi.pet : p; }); db.recs = db.recs.filter(function (r) { return r.pet !== pi.pet.id; }); } else db.pets.push(pi.pet);
      db.recs = db.recs.concat(pi.recs); db.cur = pi.pet.id; q("[data-hb-petform]").hidden = true; save(); pendingImport = null; closeModal("[data-hb-impm]"); try { history.replaceState(null, "", location.pathname); } catch (x) {} return render();
    }
    if (t.closest("[data-hb-qr]")) { var cq = curPet(); q("[data-hb-qrbox]").innerHTML = qrSvg(qrText(cq)); q("[data-hb-qrm]").hidden = false; document.documentElement.classList.add("gift-open"); return; }
    if (t.closest("[data-hb-qr-close]") || t === q("[data-hb-qrm]")) { q("[data-hb-qrm]").hidden = true; document.documentElement.classList.remove("gift-open"); return; }
    if (t.closest("[data-hb-qr-save]")) return savePng(q("[data-hb-qrbox] svg"), "qr-" + (curPet().en || "pet") + ".png");
    if (t.closest("[data-hb-shqr-save]")) return savePng(q("[data-hb-shqr] svg"), "share-" + (curPet().en || "pet") + ".png");
    if (t.closest("[data-hb-more]")) { showAll = !showAll; return render(); }
    if (t.closest("[data-hb-save]")) {
      var ed = editRecId ? db.recs.filter(function (r) { return r.id === editRecId; })[0] : null;
      if (locked(curType) || (editRecId && !ed)) return;
      var cp = curPet(); if (!cp) return; var d = JD.d.get(); if (!d) return; var c = cfg(curType), er = q("[data-hb-err]"), vals = {};
      var w = c.weight ? toolNum((q("#hb-w") || {}).value) : 0;
      if (c.weight && !(w > 0)) { er.textContent = "وزن را وارد کنید."; er.hidden = false; q("#hb-w").focus(); return; }
      for (var fi = 0; fi < c.f.length; fi++) { var ff = c.f[fi]; vals[ff.id] = fieldVal(ff); if (ff.req && !vals[ff.id]) { er.textContent = "«" + ff.label.replace(" (Lot / Batch)", "") + "» الزامی است."; er.hidden = false; var el0 = q("#hb-f-" + ff.id); if (el0) { el0.focus(); if (el0.tagName === "SELECT" && el0.value === "__o") q("#" + el0.id + "-o").focus(); } return; } }
      var nx = JD.x.get(), nm = vals.name || "", end = DURD[vals.dur] ? addDays(d, DURD[vals.dur]) : "";
      db.mem = db.mem || {};
      c.f.forEach(function (f) { var el = q("#hb-f-" + f.id); if (el && el.tagName === "SELECT" && el.value === "__o" && vals[f.id]) { var mk = curType + "|" + f.id; if (f.sel(cp.species).indexOf(vals[f.id]) < 0) { db.mem[mk] = db.mem[mk] || []; if (db.mem[mk].indexOf(vals[f.id]) < 0) db.mem[mk].push(vals[f.id]); } } });
      var fields = { date: d, name: nm, brand: vals.brand || "", serial: vals.serial || "", place: vals.place || "", extra: vals.extra || "", freq: vals.freq || "", how: vals.how || "", dur: vals.dur || "", end: end, weight: w || 0, next: nx };
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
        editRecId = null; save(); closeSheet(); render();
      }
      var sv = srvOf(cp);
      if (sv && srvOn()) {
        var tmp = ed ? JSON.parse(JSON.stringify(ed)) : { id: uid(), type: curType }; for (var k3 in fields) tmp[k3] = fields[k3]; tmp.closed = false;
        q("[data-hb-save]").disabled = true;
        api(isDr() ? { a: "saveRec", t: tokGet(), code: sv.code, rec: toSrvRec(tmp) } : { a: "ownerAddRec", code: sv.code, key: sv.key, rec: toSrvRec(tmp) }).then(function (j) {
          q("[data-hb-save]").disabled = false;
          if (!j.ok) { er.textContent = errMsg(j.err); er.hidden = false; return; }
          var srec = normRec(j.rec); srec.pet = cp.id; commit(ed ? null : srec);
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
  applyRole(); dview("list");
  checkImport();
  syncCur();
  if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) { try { navigator.serviceWorker.register("sw.js"); } catch (e) {} }
  render();
})();
