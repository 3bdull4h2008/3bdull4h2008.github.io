/* Brief form: validates and submits to FormSubmit (email endpoint).
   Falls back to the visitor's mail client if the request fails. */
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
  function isAr() { return document.documentElement.lang === "ar"; }
  function setStatus(text, ok) {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = ok ? "ok" : "error";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (value("_honey")) return;

    var packageLabel = select && select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].text : "Free render";
    var subject = (select && select.value === "free" ? "Free render request" : "Project brief") +
      " — " + (value("product") || "product visual");

    var data = new FormData(form);
    data.append("_subject", subject);
    data.append("_replyto", value("email"));
    data.append("Package", packageLabel);

    setStatus(isAr() ? "جارٍ الإرسال…" : "Sending…", true);

    fetch("https://formsubmit.co/ajax/abdullaharawashdeh@gmail.com", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: data
    })
      .then(function (r) {
        return r.json().then(function (j) { return { ok: r.ok, body: j }; });
      })
      .then(function (res) {
        var success = res.body && (res.body.success === "true" || res.body.success === true);
        if (!res.ok || !success) throw new Error((res.body && res.body.message) || "Submission failed");
        setStatus(isAr()
          ? "تم الإرسال. سأرد خلال يوم عمل واحد."
          : "Sent. I'll reply within one business day.", true);
        form.reset();
        if (select) select.value = requested && map[requested] ? map[requested] : "free";
      })
      .catch(function () {
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
          (value("message") || "—")
        ];
        var href = "mailto:abdullaharawashdeh@gmail.com" +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines.join("\n"));
        setStatus(isAr()
          ? "تعذر الإرسال. سأفتح تطبيق البريد كبديل."
          : "Could not send. Opening your email app as a fallback.", false);
        window.location.href = href;
      });
  });
})();
