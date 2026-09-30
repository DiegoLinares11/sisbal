/* Prados de Sisbal — interacciones del sitio */
(() => {
  const WHATSAPP_NUMBER = '50230363921';
  const SHARE_TEXT = 'Conoce Prados de Sisbal, lotes en preventa en Cobán, Alta Verapaz';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Encabezado: fondo al hacer scroll y menú móvil ---------- */
  const header = $('[data-header]');
  const toggle = $('[data-nav-toggle]');
  const menu = $('[data-nav-menu]');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
  };
  toggle.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Enlace activo según la sección visible ---------- */
  const navLinks = $$('.nav__menu ul a');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Animaciones de entrada ---------- */
  const revealables = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    // Escalonar elementos hermanos (tarjetas, íconos)
    revealables.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
      const index = siblings.indexOf(el);
      if (siblings.length > 1) el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 0.08}s`);
      reveal.observe(el);
    });
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Visor de imágenes de amenidades ---------- */
  const dialog = $('[data-lightbox-dialog]');
  if (dialog && typeof dialog.showModal === 'function') {
    const img = $('[data-lightbox-img]', dialog);
    const caption = $('[data-lightbox-caption]', dialog);
    $$('[data-lightbox]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        img.src = link.getAttribute('href');
        img.alt = link.querySelector('img')?.alt ?? '';
        caption.textContent = link.dataset.caption ?? '';
        dialog.showModal();
      });
    });
    $('[data-lightbox-close]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  }

  /* ---------- Formulario → WhatsApp ---------- */
  const form = $('[data-wa-form]');
  if (form) {
    const error = $('[data-form-error]', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = String(data.get('nombre') || '').trim();
      const nameInput = form.elements.nombre;
      if (!nombre) {
        error.hidden = false;
        nameInput.setAttribute('aria-invalid', 'true');
        nameInput.focus();
        return;
      }
      error.hidden = true;
      nameInput.removeAttribute('aria-invalid');

      const interes = String(data.get('interes') || '');
      const mensaje = String(data.get('mensaje') || '').trim();
      const lines = [
        `Hola, mi nombre es ${nombre}.`,
        `Me interesa: ${interes} en Prados de Sisbal.`,
      ];
      if (mensaje) lines.push(mensaje);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Compartir el sitio ---------- */
  const status = $('[data-share-status]');
  const pageUrl = () => window.location.href.split('#')[0];
  const setStatus = (msg) => {
    if (!status) return;
    status.textContent = msg;
    clearTimeout(setStatus.t);
    setStatus.t = setTimeout(() => { status.textContent = ''; }, 3500);
  };

  const waShare = $('[data-share="whatsapp"]');
  const fbShare = $('[data-share="facebook"]');
  if (waShare) waShare.href = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}: ${pageUrl()}`)}`;
  if (fbShare) fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl())}`;

  const copyBtn = $('[data-share="copy"]');
  if (copyBtn) {
    if (navigator.share) {
      copyBtn.textContent = 'Compartir…';
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.share({ title: 'Prados de Sisbal', text: SHARE_TEXT, url: pageUrl() });
        } catch { /* el usuario canceló */ }
      });
    } else {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pageUrl());
          setStatus('¡Enlace copiado! Ya puedes pegarlo donde quieras.');
        } catch {
          setStatus(`Copia este enlace: ${pageUrl()}`);
        }
      });
    }
  }

  /* ---------- Año del pie de página ---------- */
  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
