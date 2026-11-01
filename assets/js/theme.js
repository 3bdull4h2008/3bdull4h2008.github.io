/* Theme toggle. Dark is the brand default; the choice is remembered.
   The label is the language layer's job: this only owns the state and
   announces the change, so the two toggles never fight over one button. */
(function () {
  try { var stored = localStorage.getItem('aa-theme');
        if (stored === 'light' || stored === 'dark')
          document.documentElement.setAttribute('data-theme', stored); } catch (e) {}
})();
document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  function sync() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content',
      root.getAttribute('data-theme') === 'light' ? '#F5F6F1' : '#070A07');
    document.dispatchEvent(new CustomEvent('aa:theme'));
  }
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('aa-theme', next); } catch (e) {}
    sync();
  });
  sync();
});
