// ===== Centralized Site Configuration =====

/**
 * @typedef {Object} PageConfig
 * @property {string} id     - Unique page identifier (matches NAV_ICONS key in app.js).
 * @property {string} title  - Full page title used in the browser tab.
 * @property {string} href   - Relative URL to the page (e.g. 'page1.html').
 * @property {string} label  - Short label shown in navigation elements.
 * @property {string} lang   - BCP 47 language tag for the page content.
 */

/**
 * @typedef {Object} ColorConfig
 * @property {string} bgPrimary - Primary background colour (hex).
 * @property {string} accent    - Accent/highlight colour (hex).
 */

/**
 * @typedef {Object} SiteConfig
 * @property {string}       title       - Site name.
 * @property {string}       description - Short site description.
 * @property {string}       language    - Default BCP 47 language tag for the site.
 * @property {PageConfig[]} pages       - Ordered list of pages used to build navigation.
 * @property {ColorConfig}  colors      - Brand colour palette (mirrors CSS custom properties).
 */

/** @type {SiteConfig} */
export const siteConfig = {
  title: 'DeepDiveNRG',
  description: 'Exploring the depths of energy innovation.',
  language: 'en',
  pages: [
    { id: 'index', title: 'DeepDiveNRG', href: 'index.html', label: 'Home', lang: 'en' },
    { id: 'page1', title: 'Інвестиційний аналіз', href: 'page1.html', label: 'Tab 1', lang: 'uk' },
    { id: 'page2', title: 'AI Premium Rotation', href: 'page2.html', label: 'Tab 2', lang: 'uk' },
    { id: 'page3', title: 'Tab 3', href: 'page3.html', label: 'Tab 3', lang: 'uk' }
  ],
  colors: {
    bgPrimary: '#0d0d0d',
    accent: '#00d4ff'
  }
};
