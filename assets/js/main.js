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

// Microinteraction 3: 3D tilt on the About portrait (mouse devices, no reduced motion).
(function () {
  var img = document.querySelector('.tilt-img');
  if (!img) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var MAX = 8; // degrees per axis
  var rect = null;
  var frame = 0;
  var rx = 0;
  var ry = 0;

  function paint() {
    frame = 0;
    img.style.transform =
      'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
  }

  img.addEventListener('pointerenter', function (e) {
    if (e.pointerType !== 'mouse') return;
    rect = img.getBoundingClientRect();
    img.classList.add('is-tilting');
  });

  img.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || !rect) return;
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    ry = Math.max(-MAX, Math.min(MAX, x * 2 * MAX));
    rx = Math.max(-MAX, Math.min(MAX, -y * 2 * MAX));
    if (!frame) frame = requestAnimationFrame(paint);
  });

  img.addEventListener('pointerleave', function () {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    rect = null;
    img.classList.remove('is-tilting');
    img.style.transform = '';
  });
})();

// Contact: "Copy email" button. Injected by JS only when the Clipboard API exists, so no-JS users never see a dead button.
(function () {
  var block = document.querySelector('.contact-block');
  if (!block || !navigator.clipboard || !navigator.clipboard.writeText) return;

  var EMAIL = 'satrimtf@gmail.com';
  var ICON_COPY =
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';
  var ICON_CHECK =
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 13l4 4L19 7"/></svg>';

  var button = document.createElement('button');
  button.type = 'button';
  button.className =
    '-mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-base font-semibold text-accent transition-colors hover:text-ink active:text-primary-soft';

  var status = document.createElement('p');
  status.className = 'sr-only';
  status.setAttribute('aria-live', 'polite');

  var timer = 0;

  function render(copied) {
    button.innerHTML = (copied ? ICON_CHECK : ICON_COPY) + '<span>' + (copied ? '¡Copiado!' : 'Copiar email') + '</span>';
  }

  function announce(message) {
    // Clear first so a repeated message is announced again
    status.textContent = '';
    setTimeout(function () {
      status.textContent = message;
    }, 50);
  }

  button.addEventListener('click', function () {
    navigator.clipboard.writeText(EMAIL).then(
      function () {
        render(true);
        announce('Email copiado al portapapeles');
        clearTimeout(timer);
        timer = setTimeout(function () {
          render(false);
        }, 2000);
      },
      function () {
        announce('No se pudo copiar, el email es ' + EMAIL);
      }
    );
  });

  render(false);
  block.appendChild(button);
  block.appendChild(status);
})();
