/* Brief form: validates, composes a plain-text email and opens the visitor's
   mail client. No backend, no tracking, nothing stored. */
(function () {
  "use strict";
  var form = document.querySelector("[data-brief-form]");
  if (!form) return;
  var status = document.getElementById("brief-status");
  var select = form.querySelector('[name="package"]');
  var params = new URLSearchParams(window.location.search);
  var requested = params.get("package");
  var map = {
    "free": "free",
    "single-hero": "single-hero",
    "launch-set": "launch-set",
    "campaign": "campaign",
    "unlimited": "unlimited"
  };
  if (select && requested && map[requested]) select.value = map[requested];

  function value(name) {
    var field = form.querySelector('[name="' + name + '"]');
    return field ? String(field.value || "").trim() : "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var packageLabel = select && select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].text : "Free render";
    var subject = (select && select.value === "free" ? "Free render request" : "Project brief") +
      " — " + (value("product") || "product visual");
    var lines = [
      "Name: " + value("name"),
      "Email: " + value("email"),
      "Brand: " + (value("brand") || "—"),
      "Product: " + value("product"),
      "Category: " + (value("category") || "—"),
      "Package: " + packageLabel,
      "Deadline: " + (value("deadline") || "—"),
      "Photos: " + (value("photos") || "—"),
      "",
      "What the image should do:",
      (value("message") || "—"),
      "",
      "Free render consent: " + (form.querySelector('[name="consent"]').checked ? "yes" : "no"),
      "",
      "Sent from the work-with-me page."
    ];
    var href = "mailto:abdullaharawashdeh@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    if (status) {
      status.textContent = document.documentElement.lang === "ar"
        ? "جارٍ فتح تطبيق البريد. إن لم يحدث شيء، اكتب إلى abdullaharawashdeh@gmail.com."
        : "Opening your email app. If nothing happens, write to abdullaharawashdeh@gmail.com.";
    }
    window.location.href = href;
  });
})();
