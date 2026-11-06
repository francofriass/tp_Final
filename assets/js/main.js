// Accessible mobile menu (vanilla JS, no frameworks).
(function () {
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu-movil');
  if (!toggle || !menu) return;

  var iconOpen = document.getElementById('icon-open');
  var iconClose = document.getElementById('icon-close');
  var desktop = window.matchMedia('(min-width: 768px)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    menu.classList.toggle('hidden', !open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a link
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

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
