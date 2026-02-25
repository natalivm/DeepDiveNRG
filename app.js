// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ===== Hamburger Menu =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-hamburger');
  const menu = document.querySelector('.nav-links');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.classList.toggle('menu-open', open);
    });

    // Close menu when a link is tapped
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ===== Page Transition =====
  document.body.classList.add('page-ready');

  // ===== Active nav link highlight =====
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === '#about' || href === '#services' || href === '#contact') return;
    if (href && href.includes(currentPage)) {
      a.classList.add('active');
    }
  });

  // ===== iOS standalone: handle internal links =====
  if (window.navigator.standalone) {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.origin === location.origin) {
        e.preventDefault();
        location.href = link.href;
      }
    });
  }

  // ===== Install prompt =====
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const banner = document.querySelector('.install-banner');
    if (banner) {
      banner.classList.add('visible');
      banner.querySelector('.install-btn').addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
          deferredPrompt = null;
          banner.classList.remove('visible');
        });
      });
      banner.querySelector('.install-dismiss').addEventListener('click', () => {
        banner.classList.remove('visible');
      });
    }
  });
});
