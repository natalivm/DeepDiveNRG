// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}

// ===== Page Detection Helpers =====
/**
 * Returns the current page filename derived from the URL pathname.
 *
 * @returns {string} e.g. 'page1.html', or 'index.html' when at the root.
 */
function getCurrentPage() {
  return location.pathname.split('/').pop() || 'index.html';
}

/**
 * Returns true when `href` matches the currently active page.
 *
 * @param {string} href        - Relative href of the link being tested.
 * @param {string} currentPage - Value returned by {@link getCurrentPage}.
 * @returns {boolean}
 */
function isPageActive(href, currentPage) {
  return href === currentPage || (currentPage === '' && href === 'index.html');
}

// ===== Bottom Navigation =====
/**
 * Builds and appends a mobile bottom-navigation bar to the page.
 * Icon paths are read from each page's `icon` property in siteConfig.
 *
 * @param {Array<{id: string, href: string, label: string, icon: string[]}>} pages - Page entries from siteConfig.
 */
function createBottomNav(pages) {
  const currentPage = getCurrentPage();

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('aria-label', 'Bottom navigation');

  pages.forEach(({ href, label, icon = [] }) => {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'bottom-nav-item' + (isPageActive(href, currentPage) ? ' active' : '');
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'bottom-nav-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    icon.forEach((d) => {
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
    a.classList.toggle('active', isPageActive(href, currentPage));
  });

  document.querySelectorAll('.tab-link').forEach((tab) => {
    const href = tab.getAttribute('href');
    tab.classList.toggle('tab-active', isPageActive(href, currentPage));
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
  highlightActiveLinks(getCurrentPage());

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
