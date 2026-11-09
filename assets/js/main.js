// Accessible mobile menu (vanilla JS, no frameworks).
(function () {
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu-movil');
  var overlay = document.getElementById('menu-overlay');
  if (!toggle || !menu) return;

  var iconOpen = document.getElementById('icon-open');
  var iconClose = document.getElementById('icon-close');
  var desktop = window.matchMedia('(min-width: 768px)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    menu.classList.toggle('hidden', !open);
    if (overlay) overlay.classList.toggle('hidden', !open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    // Lock page scroll while the menu is open
    document.body.classList.toggle('overflow-hidden', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a link
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  // Close when tapping the dimmed area
  if (overlay) overlay.addEventListener('click', function () { setOpen(false); });

  // Close with Escape and return focus to the button
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state when resizing to desktop (menu is always visible there via CSS)
  desktop.addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();

// Microinteraction 1: availability badge slides in on load and every time it re-enters the viewport.
(function () {
  var badge = document.querySelector('.badge-enter');
  if (!badge || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Hide without animating, then let the observer reveal it with the transition
  badge.style.transition = 'none';
  badge.classList.add('reveal-pending');
  void badge.offsetWidth;
  badge.style.transition = '';

  new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      badge.classList.toggle('reveal-pending', !entry.isIntersecting);
    });
  }).observe(badge);
})();
