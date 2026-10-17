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
  wheelApi: ""   // آدرس Apps Script چرخ؛ خالی یعنی چرخ محلی
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
  var DOGV = ["چندگانه سگ (دوگانه، پنج‌گانه، شش‌گانه یا هفت‌گانه)", "هاری", "بوردتلا (سرفهٔ کنل)", "لپتوسپیروز", "کرونا ویروس سگ"];
  var CATV = ["سه‌گانه گربه (FVRCP)", "چهارگانه گربه", "لوسمی گربه (FeLV)", "هاری", "کلامیدیا گربه"];
  // هر نوع: فیلدهای مناسب خودش
  var CFG = {
    "واکسن": { ic: "💉", k: "vax", optLabel: "نام واکسن را انتخاب کنید", opts: function (sp) { return sp === "سگ" ? DOGV : sp === "گربه" ? CATV : []; }, nameLabel: "نام واکسن", ph: "یا اینجا بنویسید", extra: "برند یا شمارهٔ سری (اختیاری)" },
    "ضدانگل داخلی": { ic: "🪱", k: "par", optLabel: "نوع دارو", opts: function () { return ["قرص", "شربت یا سوسپانسیون", "قطرهٔ پشتی", "خمیر یا پودر", "تزریقی"]; }, nameLabel: "نام دارو", ph: "مثلاً نام برند", extra: "دوز (اختیاری)" },
    "ضدانگل خارجی (کک و کنه)": { ic: "🛡️", k: "par", optLabel: "نوع محصول", opts: function () { return ["قطرهٔ پشتی", "قرص", "اسپری", "قلاده", "شامپوی ضدانگل"]; }, nameLabel: "نام محصول", ph: "مثلاً نام برند", extra: "" },
    "ویزیت": { ic: "🩺", k: "vis", optLabel: "دلیل مراجعه", opts: function () { return ["معاینهٔ عمومی", "چکاپ سالانه", "بیماری یا مشکل", "کنترل بعد از درمان", "مشاورهٔ آنلاین", "ویزیت در منزل"]; }, nameLabel: "توضیح", ph: "مثلاً علامت یا تشخیص", extra: "دامپزشک یا کلینیک (اختیاری)" },
    "وزن": { ic: "⚖️", k: "wt", weight: true, nameLabel: "توضیح (اختیاری)", ph: "" },
    "دارو": { ic: "💊", k: "oth", nameLabel: "نام دارو", ph: "مثلاً آنتی‌بیوتیک", extra: "دوز و مدت مصرف" },
    "عقیم‌سازی": { ic: "✂️", k: "vis", optLabel: "نوع", opts: function () { return ["عقیم‌سازی ماده", "اخته (نر)"]; }, nameLabel: "توضیح", ph: "", extra: "کلینیک یا جراح (اختیاری)" },
    "آزمایش": { ic: "🧪", k: "vis", optLabel: "نوع آزمایش", opts: function () { return ["آزمایش خون", "آزمایش ادرار", "آزمایش مدفوع", "تست سریع", "سونوگرافی یا رادیوگرافی"]; }, nameLabel: "توضیح", ph: "", extra: "نتیجه یا یادداشت" },
    "سایر": { ic: "📝", k: "oth", nameLabel: "توضیح", ph: "", extra: "" }
  };
  var ORDER = ["واکسن", "ضدانگل داخلی", "ضدانگل خارجی (کک و کنه)", "ویزیت", "وزن", "دارو", "عقیم‌سازی", "آزمایش", "سایر"];
  var TABS = [["همه", null], ["واکسن", ["vax"]], ["ضدانگل", ["par"]], ["وزن", ["wt"]], ["ویزیت و آزمایش", ["vis"]], ["دارو و سایر", ["oth"]]];
  var SPE = { "سگ": "🐶", "گربه": "🐱", "پرنده": "🐦", "دیگر": "🐾" };
  var curType = "واکسن", curTab = 0, xTouched = false, editId = null, showAll = false, JD = {};
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
  function renderCover(cp) {
    var lw = db.recs.filter(function (r) { return r.pet === cp.id && r.weight; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0], chips = [];
    if (cp.birth) chips.push("تولد: " + fd(cp.birth)); if (cp.birth && ageText(cp.birth)) chips.push("سن: " + ageText(cp.birth));
    if (lw) chips.push("وزن: " + toolFa(lw.weight) + " کیلوگرم");
    q("[data-hb-cover]").innerHTML = '<div class="hb-cv-ic">' + avatar(cp, "hb-cv-img") + '</div><small>شناسنامهٔ سلامت</small><b>' + esc(cp.name) + '</b><span class="hb-cv-sp">' + esc(cp.species || "") + "</span>" + (chips.length ? '<div class="hb-cv-chips">' + chips.map(function (c) { return "<i>" + esc(c) + "</i>"; }).join("") + "</div>" : "");
  }
  // همهٔ یادآوری‌ها: نوبت‌های بعدی + برنامهٔ واکسن
  function allRem() {
    var out = [];
    db.recs.forEach(function (r) { if (r.next) out.push({ id: r.id, kind: "rec", pet: r.pet, type: r.type, label: r.name || "", date: r.next }); });
    db.pets.forEach(function (p) { (p.plan || []).forEach(function (x) { if (!x.done) out.push({ id: x.id, kind: "plan", pet: p.id, type: x.type, label: x.label, date: x.date }); }); });
    return out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  }
  function render() {
    var pets = q("[data-hb-pets]"), main = q("[data-hb-main]"), pf = q("[data-hb-petform]");
    if (!db.pets.length) { pets.innerHTML = ""; main.hidden = true; pf.hidden = false; return; }
    var cp = curPet(); db.cur = cp.id;
    pets.innerHTML = db.pets.map(function (p) { return '<button type="button" class="chip' + (p.id === cp.id ? " on" : "") + '" data-hb-pet="' + p.id + '">' + avatar(p, "hb-mini") + " " + esc(p.name) + "</button>"; }).join("") + '<button type="button" class="chip" data-hb-newpet>＋ پت جدید</button>';
    main.hidden = !pf.hidden; if (!pf.hidden) return;
    renderCover(cp);
    // کارت برنامهٔ واکسن
    var pl = q("[data-hb-plan]"), young = cp.birth && (cp.species === "سگ" || cp.species === "گربه") && -days(cp.birth) < 400, hasPlan = (cp.plan || []).length;
    if (young && !hasPlan) pl.innerHTML = '<div class="hb-plan-c"><b>برنامهٔ واکسن ' + (cp.species === "سگ" ? "توله‌سگ" : "بچه‌گربه") + "</b><p>بر پایهٔ تاریخ تولد، نوبت‌های واکسن و ضدانگل پیشنهاد می‌شود (تقریبی؛ طبق نظر دامپزشک).</p><button type=\"button\" class=\"btn small primary\" data-hb-mkplan>افزودن به یادآوری‌ها</button></div>";
    else if (!cp.birth && (cp.species === "سگ" || cp.species === "گربه")) pl.innerHTML = '<div class="hb-plan-c"><b>برنامهٔ واکسن توله و بچه‌گربه</b><p>با نوشتن تاریخ تولد، برنامهٔ پیشنهادی ساخته می‌شود.</p><button type="button" class="btn small" data-hb-edit-pet>نوشتن تاریخ تولد</button></div>';
    else pl.innerHTML = hasPlan ? '<div class="hb-plan-c ok"><span>برنامهٔ واکسن ' + (cp.species === "سگ" ? "توله‌سگ" : "بچه‌گربه") + ' فعال است.</span><button type="button" class="hb-lnk" data-hb-delplan>حذف برنامه</button></div>' : "";
    var rem = allRem().filter(function (r) { return r.pet === cp.id; }), lim = showAll ? rem.length : 6, rh = rem.slice(0, lim).map(function (r) {
      var p = db.pets.filter(function (x) { return x.id === r.pet; })[0]; if (!p) return ""; var n = days(r.date), k = cfg(r.type);
      return '<div class="hb-r' + (n < 0 ? " late" : n <= 7 ? " soon" : "") + '"><span class="hb-r-ic">' + k.ic + '</span><div><b>' + esc(r.type.replace(" (کک و کنه)", "")) + (r.label ? " · " + esc(r.label) : "") + "</b><small>" + fd(r.date) + " · " + when(n) + (r.kind === "plan" ? " · برنامه" : "") + '</small></div><span class="hb-r-b"><button type="button" data-hb-ics="' + r.kind + ":" + r.id + '">تقویم</button><button type="button" data-hb-done="' + r.kind + ":" + r.id + '">انجام شد</button></span></div>';
    }).join("");
    q("[data-hb-rem]").innerHTML = rem.length ? "<h3>🔔 یادآوری‌های " + esc(cp.name) + "</h3>" + rh + (rem.length > 6 ? '<div class="hb-more"><button type="button" class="hb-lnk" data-hb-more>' + (showAll ? "نمایش کمتر" : "نمایش همه (" + toolFa(rem.length) + ")") + "</button></div>" : "") : "";
    q("[data-hb-tabs]").innerHTML = TABS.map(function (t, i) { return '<button type="button" class="chip' + (i === curTab ? " on" : "") + '" data-hb-tab="' + i + '">' + t[0] + "</button>"; }).join("");
    var mine = db.recs.filter(function (r) { return r.pet === cp.id; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var ks = TABS[curTab][1], shown = ks ? mine.filter(function (r) { return ks.indexOf(cfg(r.type).k) > -1; }) : mine;
    q("[data-hb-list]").innerHTML = shown.length ? shown.map(function (r) {
      var k = cfg(r.type);
      return '<li class="hb-e k-' + k.k + '"><span class="hb-dot">' + k.ic + '</span><div class="hb-ec"><div class="hb-eh"><span class="hb-t">' + esc(r.type.replace(" (کک و کنه)", "")) + "</span><time>" + fd(r.date) + "</time></div>" + (r.name ? "<b>" + esc(r.name) + "</b>" : "") + (r.extra ? "<span>" + esc(r.extra) + "</span>" : "") + (r.weight ? "<span>" + toolFa(r.weight) + " کیلوگرم</span>" : "") + (r.next ? "<small>نوبت بعدی: " + fd(r.next) + "</small>" : "") + '</div><button type="button" class="hb-del" data-hb-del="' + r.id + '" aria-label="حذف">×</button></li>';
    }).join("") : '<li class="hb-empty">اینجا هنوز چیزی ثبت نشده است.<br>با «ثبت در دفترچه» اولین مورد را بنویسید.</li>';
    var ws = mine.filter(function (r) { return r.weight; }).reverse(), wb = q("[data-hb-weight]");
    if (ws.length >= 2 && (curTab === 0 || curTab === 3)) {
      var vals = ws.map(function (r) { return r.weight; }), mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), rg = (mx - mn) || 1;
      var pts = ws.map(function (r, i) { return (10 + i * (280 / (ws.length - 1))).toFixed(1) + "," + (60 - ((r.weight - mn) / rg) * 46).toFixed(1); }).join(" ");
      wb.innerHTML = '<svg viewBox="0 0 300 70" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="#1f5ea6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><small>روند وزن: از ' + toolFa(vals[0]) + " به " + toolFa(vals[vals.length - 1]) + " کیلوگرم</small>";
    } else wb.innerHTML = "";
  }
  // ---- برگهٔ ثبت: فیلدها بر پایهٔ نوع ----
  function renderTypes() {
    q("[data-hb-types]").innerHTML = ORDER.map(function (t) { return '<button type="button" class="hb-ty' + (t === curType ? " on" : "") + '" data-hb-type="' + esc(t) + '"><span>' + cfg(t).ic + "</span>" + esc(t.replace(" (کک و کنه)", "")) + "</button>"; }).join("");
  }
  function renderFields() {
    var c = cfg(curType), cp = curPet(), opts = c.opts ? c.opts(cp ? cp.species : "") : [], h = "";
    if (opts.length) h += '<div class="fld"><label>' + c.optLabel + '</label><div class="hb-opts" role="listbox">' + opts.map(function (o) { return '<button type="button" role="option" data-hb-opt="' + esc(o) + '">' + esc(o) + "</button>"; }).join("") + "</div></div>";
    if (c.nameLabel) h += '<div class="fld"><label for="hb-n">' + c.nameLabel + ' <small>(اختیاری)</small></label><input id="hb-n" type="text" maxlength="90" placeholder="' + esc(c.ph || "") + '"></div>';
    if (c.extra) h += '<div class="fld"><label for="hb-e">' + c.extra.replace(" (اختیاری)", "") + ' <small>(اختیاری)</small></label><input id="hb-e" type="text" maxlength="90"></div>';
    if (c.weight) h += '<div class="fld"><label for="hb-w">وزن (کیلوگرم)</label><input id="hb-w" type="number" inputmode="decimal" step="0.1" min="0.05" max="90"></div>';
    h += '<div class="fld"><label>تاریخ (شمسی)</label><div class="jd" data-jd="d"></div></div>';
    h += '<div class="fld"><label>نوبت بعدی <small>(اختیاری)</small></label><div class="jd" data-jd="x"></div><p class="hb-sug" data-hb-sug hidden></p><div class="hb-quick"><button type="button" data-hb-add="1">+۱ ماه</button><button type="button" data-hb-add="3">+۳ ماه</button><button type="button" data-hb-add="12">+۱ سال</button><button type="button" data-hb-clear>بدون نوبت</button></div></div>';
    q("[data-hb-sf]").innerHTML = h;
    JD.d = initJd(q('[data-jd="d"]'), { minY: -2, maxY: 0 }); JD.x = initJd(q('[data-jd="x"]'), { optional: true, minY: 0, maxY: 6 });
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
  function openSheet() { xTouched = false; renderTypes(); renderFields(); q("[data-hb-sheet]").hidden = false; document.documentElement.classList.add("gift-open"); }
  function closeSheet() { q("[data-hb-sheet]").hidden = true; document.documentElement.classList.remove("gift-open"); }
  var formPhoto = "";
  function showPhoto() { var b = q("[data-hb-photo]"); b.innerHTML = formPhoto ? '<img src="' + formPhoto + '" alt="">' : "🐾"; q("[data-hb-photo-del]").hidden = !formPhoto; }
  function readPhoto(f) {
    if (!f) return; var rd = new FileReader();
    rd.onload = function () { var im = new Image(); im.onload = function () { var s = 320, w = im.width, h = im.height, m = Math.min(w, h), cv = document.createElement("canvas"); cv.width = cv.height = s; cv.getContext("2d").drawImage(im, (w - m) / 2, (h - m) / 2, m, m, 0, 0, s, s); formPhoto = cv.toDataURL("image/jpeg", .82); showPhoto(); }; im.src = rd.result; };
    rd.readAsDataURL(f);
  }
  function petForm(p) {
    editId = p ? p.id : null; q("[data-hb-pf-title]").textContent = p ? "ویرایش شناسنامه" : "شناسنامهٔ پت";
    q("#hb-pn").value = p ? p.name : ""; JD.pb.set(p ? p.birth : ""); formPhoto = p && p.photo || ""; showPhoto();
    var segs = q('[data-seg="hbsp"]').children; [].forEach.call(segs, function (b) { b.classList.toggle("on", p ? b.getAttribute("data-v") === p.species : b.getAttribute("data-v") === "سگ"); });
    q("[data-hb-petform]").hidden = false; q("[data-hb-main]").hidden = true;
  }
  JD.pb = initJd(q('[data-jd="pb"]'), { optional: true, minY: -30, maxY: 0 });
  q("[data-hb-file]").addEventListener("change", function () { readPhoto(this.files[0]); this.value = ""; });
  // جمع‌شدن سربرگ سایت هنگام پایین رفتن
  (function () { var hd = document.querySelector("header.top"), ly = window.scrollY; if (!hd) return; document.body.classList.add("hb-page"); window.addEventListener("scroll", function () { var y = window.scrollY; if (y > ly + 6 && y > 90) hd.classList.add("fold"); else if (y < ly - 6 || y < 40) hd.classList.remove("fold"); ly = y; }, { passive: true }); })();
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !q("[data-hb-sheet]").hidden) closeSheet(); });

  root.addEventListener("click", function (e) {
    var t = e.target, b;
    if (t === q("[data-hb-sheet]")) return closeSheet();
    if (t.closest("[data-hb-close]")) return closeSheet();
    if (t.closest("[data-hb-open]")) return openSheet();
    if ((b = t.closest("[data-hb-type]"))) { curType = b.getAttribute("data-hb-type"); xTouched = false; renderTypes(); return renderFields(); }
    if ((b = t.closest("[data-hb-opt]"))) { [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle("on", x === b); }); var n = q("#hb-n"); if (n) n.value = b.getAttribute("data-hb-opt"); return; }
    if ((b = t.closest("[data-hb-tab]"))) { curTab = Number(b.getAttribute("data-hb-tab")); return render(); }
    if ((b = t.closest("[data-hb-pet]"))) { db.cur = b.getAttribute("data-hb-pet"); q("[data-hb-petform]").hidden = true; save(); return render(); }
    if (t.closest("[data-hb-newpet]")) return petForm(null);
    if (t.closest("[data-hb-edit-pet]")) return petForm(curPet());
    if (t.closest("[data-hb-cancel-pet]")) { q("[data-hb-petform]").hidden = true; return render(); }
    if (t.closest("[data-hb-photo]") || t.closest("[data-hb-photo-add]")) return q("[data-hb-file]").click();
    if (t.closest("[data-hb-photo-del]")) { formPhoto = ""; return showPhoto(); }
    if (t.closest("[data-hb-save-pet]")) {
      var n2 = q("#hb-pn").value.trim(); if (!n2) { q("#hb-pn").focus(); return; }
      var sp = q('[data-seg="hbsp"] .on'), spv = sp ? sp.getAttribute("data-v") : "", bd = JD.pb.get();
      if (editId) { var ep = db.pets.filter(function (x) { return x.id === editId; })[0]; if (ep) { ep.name = n2; ep.species = spv; ep.birth = bd; ep.photo = formPhoto; } }
      else { var p = { id: uid(), name: n2, species: spv, birth: bd, photo: formPhoto, plan: [] }; db.pets.push(p); db.cur = p.id; }
      editId = null; q("[data-hb-petform]").hidden = true; save(); return render();
    }
    if (t.closest("[data-hb-mkplan]")) { var cp2 = curPet(); cp2.plan = buildPlan(cp2); save(); return render(); }
    if (t.closest("[data-hb-delplan]")) { if (confirm("برنامهٔ پیشنهادی حذف شود؟")) { curPet().plan = []; save(); render(); } return; }
    if (t.closest("[data-hb-more]")) { showAll = !showAll; return render(); }
    if (t.closest("[data-hb-save]")) {
      var cp = curPet(); if (!cp) return; var d = JD.d.get(); if (!d) return;
      var w = cfg(curType).weight ? toolNum((q("#hb-w") || {}).value) : 0;
      if (cfg(curType).weight && !(w > 0)) { q("#hb-w").focus(); return; }
      var nm = q("#hb-n") ? q("#hb-n").value.trim() : "", ex = q("#hb-e") ? q("#hb-e").value.trim() : "", nx = JD.x.get();
      db.recs.forEach(function (r) { if (r.pet === cp.id && r.type === curType && r.next && r.next <= d) r.next = ""; });
      (cp.plan || []).forEach(function (x) { if (!x.done && x.type === curType && Math.abs(days(x.date) - (days(d))) <= 10 && (curType === "ضدانگل داخلی" || (nm && x.label.indexOf(nm.split(" ")[0]) > -1))) x.done = true; });
      db.recs.push({ id: uid(), pet: cp.id, type: curType, date: d, name: nm, extra: ex, weight: w || 0, next: nx });
      save(); closeSheet(); return render();
    }
    if ((b = t.closest("[data-hb-add]"))) { xTouched = true; JD.x.set(addMonths(JD.d.get(), Number(b.getAttribute("data-hb-add")))); return; }
    if ((b = t.closest("[data-hb-usesug]"))) { xTouched = true; JD.x.set(b.getAttribute("data-hb-usesug")); return; }
    if (t.closest("[data-hb-clear]")) { xTouched = true; JD.x.set(""); return; }
    if ((b = t.closest("[data-hb-del]"))) { if (confirm("این مورد حذف شود؟")) { var id = b.getAttribute("data-hb-del"); db.recs = db.recs.filter(function (r) { return r.id !== id; }); save(); render(); } return; }
    if ((b = t.closest("[data-hb-done]"))) {
      var pr = b.getAttribute("data-hb-done").split(":"), kd = pr[0], rid = pr[1];
      if (kd === "rec") db.recs.forEach(function (r) { if (r.id === rid) r.next = ""; });
      else db.pets.forEach(function (p) { (p.plan || []).forEach(function (x) { if (x.id === rid) { x.done = true; db.recs.push({ id: uid(), pet: p.id, type: x.type, date: ymd(new Date()), name: x.label, extra: "", weight: 0, next: "" }); } }); });
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
      var c = curPet(); if (c && confirm("پت «" + c.name + "» و همهٔ سابقه‌اش حذف شود؟")) { db.recs = db.recs.filter(function (r) { return r.pet !== c.id; }); db.pets = db.pets.filter(function (p) { return p.id !== c.id; }); db.cur = db.pets[0] ? db.pets[0].id : null; save(); render(); }
    }
  });
  q("[data-hb-import]").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return; var rd = new FileReader();
    rd.onload = function () { try { var d = JSON.parse(rd.result); if (!d.pets || !d.recs) throw 0; if (confirm("دفترچهٔ فعلی با نسخهٔ پشتیبان جایگزین شود؟")) { db = d; save(); render(); } } catch (x) { alert("فایل پشتیبان معتبر نیست."); } e.target.value = ""; };
    rd.readAsText(f);
  });
  var dp = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); dp = e; q("[data-hb-install]").hidden = false; });
  q("[data-hb-do-install]").addEventListener("click", function () { if (dp) { dp.prompt(); dp = null; q("[data-hb-install]").hidden = true; } });
  if (/iphone|ipad/i.test(navigator.userAgent) && !window.navigator.standalone) q("[data-hb-ios]").hidden = false;
  if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) { try { navigator.serviceWorker.register("sw.js"); } catch (e) {} }
  render();
})();
