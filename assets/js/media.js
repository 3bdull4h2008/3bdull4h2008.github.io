/* Hero film loads only when its frame is near the viewport, and pauses
   when the tab is hidden so a looping clip does not run off-screen. */
(function () {
  "use strict";
  var clips = document.querySelectorAll("video.media__vid[data-src]");
  if (!clips.length) return;
  var quiet = window.matchMedia("(prefers-reduced-motion: reduce)");
  var conn = navigator.connection || {};
  var slow = /(^|-)2g$/.test(conn.effectiveType || "");
  if (quiet.matches || conn.saveData || slow) return;
  function load(v) {
    if (v.getAttribute("src")) return;
    v.setAttribute("src", v.getAttribute("data-src"));
    v.removeAttribute("data-src");
    if (v.hasAttribute("data-autoplay")) v.play().catch(function () {});
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { load(e.target); obs.unobserve(e.target); }
      });
    }, { rootMargin: "900px" });
    Array.prototype.forEach.call(clips, function (v) { io.observe(v); });
  } else {
    function apply() { Array.prototype.forEach.call(clips, load); }
    if (document.readyState === "complete") apply();
    else window.addEventListener("load", apply, { once: true });
  }
  document.addEventListener("visibilitychange", function () {
    Array.prototype.forEach.call(clips, function (v) {
      if (document.hidden) { v.pause(); }
      else if (v.hasAttribute("data-autoplay")) { v.play().catch(function () {}); }
    });
  });
})();
