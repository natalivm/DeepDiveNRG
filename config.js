// ===== Centralized Site Configuration =====

/**
 * @typedef {Object} PageConfig
 * @property {string}   id    - Unique page identifier.
 * @property {string}   title - Full page title used in the browser tab.
 * @property {string}   href  - Relative URL to the page (e.g. 'page1.html').
 * @property {string}   label - Short label shown in navigation elements.
 * @property {string}   lang  - BCP 47 language tag for the page content.
 * @property {string[]} icon  - SVG path `d` attribute strings for the bottom-nav icon.
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
    {
      id: 'index', title: 'DeepDiveNRG', href: 'index.html', label: 'Home', lang: 'en',
      icon: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10']
    },
    {
      id: 'page1', title: 'Інвестиційний аналіз', href: 'page1.html', label: 'Slow Reading', lang: 'uk',
      icon: ['M12 2L2 7l10 5 10-5-10-5', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5']
    },
    {
      id: 'page2', title: 'AI Premium Rotation', href: 'page2.html', label: 'Tab 2', lang: 'uk',
      icon: ['M18 20V10', 'M12 20V4', 'M6 20v-6']
    },
    {
      id: 'page3', title: 'Tab 3', href: 'page3.html', label: 'Tab 3', lang: 'uk',
      icon: ['M22 12h-4l-3 9L9 3l-3 9H2']
    }
  ],
  colors: {
    bgPrimary: '#0d0d0d',
    accent: '#00d4ff'
  }
};
