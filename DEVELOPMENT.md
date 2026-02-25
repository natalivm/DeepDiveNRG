# DeepDiveNRG — Developer Guide

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (with live reload)
npm run dev

# Build static site for production
npm run build
```

The development server runs at `http://localhost:3000` by default (via `npx serve`).

## Project Structure

```
DeepDiveNRG/
├── index.html              # Home page
├── page1.html              # Tab 1 — Інвестиційний аналіз (Ukrainian)
├── page2.html              # Tab 2 — AI Premium Rotation (Ukrainian)
├── page3.html              # Tab 3 — placeholder
├── app.js                  # Main JavaScript (nav, SW registration, interactions)
├── config.js               # Centralized site configuration (pages, colors, metadata)
├── styles.css              # Dark-theme stylesheet (responsive)
├── sw.js                   # Service Worker (network-first, offline caching)
├── manifest.json           # PWA manifest
├── icons/                  # SVG icons for PWA
├── scripts/
│   └── build.js            # Build script — copies source files to _site/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions: build + deploy to GitHub Pages
├── _config.yml             # GitHub Pages configuration
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── .eslintrc.json          # ESLint linting rules
├── .prettierrc.json        # Prettier formatting rules
├── .editorconfig           # Editor consistency settings
└── .gitignore              # Git ignore patterns
```

## Configuration

Site-wide settings (page list, titles, language, colours) live in **`config.js`**.
This is the single source of truth for navigation — updating it propagates to the bottom nav bar automatically via `app.js`.

## Code Quality

```bash
# Lint JavaScript files
npm run lint

# Format all files with Prettier
npm run format
```

### ESLint Rules

| Rule | Level | Purpose |
|------|-------|---------|
| `no-unused-vars` | warn | Catch dead code |
| `semi` | error | Require semicolons |
| `quotes` | error | Enforce single quotes |
| `prefer-const` | error | Immutable bindings where possible |
| `eqeqeq` | error | Strict equality checks |
| `no-var` | error | Disallow legacy `var` declarations |

### Code Patterns

**JSDoc** — all exported functions and constants in `app.js`, `config.js`, and `sw.js` carry JSDoc comments for IDE support.

**Error handling** — async operations (dynamic `import()`, Service Worker cache operations) use `.catch()` with `console.error` logging.

**No magic values** — SVG icon paths are centralised in the `NAV_ICONS` constant; site metadata lives in `siteConfig`.

## Deployment

Deployment is automated via **GitHub Actions**. On every push to `main`, the workflow runs `npm run build`, which copies source files to `_site/`, and then deploys `_site/` to GitHub Pages.

1. Push changes to `main`
2. The GitHub Actions workflow builds and deploys automatically.
3. The updated site is live at:  
   [https://natalivm.github.io/DeepDiveNRG/](https://natalivm.github.io/DeepDiveNRG/)

## Adding a New Page

1. Add an entry to `siteConfig.pages` in **`config.js`**
2. Add a matching SVG path array to `NAV_ICONS` in **`app.js`** (keyed by the same `id`)
3. Create the corresponding HTML file (copy `page3.html` as a template)
4. The bottom navigation and active-link highlighting are generated automatically
