/* Reveal on view. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (n) { n.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
  nodes.forEach(function (n) { io.observe(n); });
})();
