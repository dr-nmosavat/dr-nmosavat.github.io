// اطلاعات تماس. مقدار خالی یعنی آن ردیف نمایش داده نمی‌شود.
var INFO = {
  clinic: "مرکز تخصصی دامپزشکی ونک",
  phone: "",
  whatsapp: "989057392125",
  instagram: "Dr.niloofarmosavat",
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
  if (waLink) { a.href = waLink; a.target = "_blank"; a.rel = "noopener"; }
});

var host = document.getElementById("contact-rows");
if (host) {
  var rows = [
    { label: "واتساپ", key: "whatsapp", link: function () { return waLink; }, text: function () { return "پیام در واتساپ"; } },
    { label: "اینستاگرام", key: "instagram", link: function (v) { return "https://instagram.com/" + v; }, text: function (v) { return "@" + v; }, ltr: true },
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
