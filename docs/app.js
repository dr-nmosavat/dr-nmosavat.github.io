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
