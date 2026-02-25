// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}

// ===== Navigation Icon Paths (keyed by page id) =====
/** @type {Record<string, string[]>} SVG path data for each page's bottom-nav icon */
const NAV_ICONS = {
  index: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  page1: ['M12 2L2 7l10 5 10-5-10-5', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  page2: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
  page3: ['M22 12h-4l-3 9L9 3l-3 9H2']
};

// ===== Bottom Navigation =====
/**
 * Builds and appends a mobile bottom-navigation bar to the page.
 * Reads icon paths from {@link NAV_ICONS} keyed by each page's `id`.
 *
 * @param {Array<{id: string, href: string, label: string}>} pages - Page entries from siteConfig.
 */
function createBottomNav(pages) {
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('aria-label', 'Bottom navigation');

  pages.forEach(({ id, href, label }) => {
    const isActive = currentPage === href || (currentPage === '' && href === 'index.html');
    const a = document.createElement('a');
    a.href = href;
    a.className = 'bottom-nav-item' + (isActive ? ' active' : '');
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'bottom-nav-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const iconPaths = NAV_ICONS[id] || [];
    iconPaths.forEach((d) => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    const span = document.createElement('span');
    span.className = 'bottom-nav-label';
    span.textContent = label;
    a.appendChild(svg);
    a.appendChild(span);
    nav.appendChild(a);
  });

  document.body.appendChild(nav);
}

// ===== Hamburger Menu (desktop) =====
/**
 * Toggles the hamburger menu open/closed and updates ARIA attributes.
 *
 * @param {HTMLElement} toggle - The hamburger button element.
 * @param {HTMLElement} menu - The nav-links list element.
 */
function initHamburgerMenu(toggle, menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('is-open');
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

/**
 * Highlights the active link in the desktop nav and tabs bar
 * based on the current page URL.
 *
 * @param {string} currentPage - The current page filename (e.g. 'page1.html').
 */
function highlightActiveLinks(currentPage) {
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    a.classList.toggle('active', href === currentPage || (currentPage === '' && href === 'index.html'));
  });

  document.querySelectorAll('.tab-link').forEach((tab) => {
    const href = tab.getAttribute('href');
    tab.classList.toggle('tab-active', href === currentPage);
  });
}

/**
 * Shows the PWA install banner and wires up install / dismiss buttons.
 *
 * @param {BeforeInstallPromptEvent} promptEvent - The deferred install prompt.
 */
function showInstallBanner(promptEvent) {
  const banner = document.querySelector('.install-banner');
  if (!banner) return;

  let deferredPrompt = promptEvent;
  banner.classList.add('visible');

  const installBtn = banner.querySelector('.install-btn');
  const dismissBtn = banner.querySelector('.install-dismiss');

  if (installBtn) {
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        banner.classList.remove('visible');
      });
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.classList.remove('visible');
    });
  }
}

// ===== DOMContentLoaded initialisation =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-hamburger');
  const menu = document.querySelector('.nav-links');

  if (toggle && menu) {
    initHamburgerMenu(toggle, menu);
  }

  // ===== Page Transition =====
  document.body.classList.add('page-ready');

  // ===== Active link highlight (desktop nav + tabs bar) =====
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  highlightActiveLinks(currentPage);

  // ===== Inject bottom nav =====
  import('./config.js').then(({ siteConfig }) => {
    createBottomNav(siteConfig.pages);
  }).catch((err) => {
    console.error('Failed to load site config:', err);
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
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    showInstallBanner(e);
  });
});
