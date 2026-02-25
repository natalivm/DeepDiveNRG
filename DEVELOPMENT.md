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

The development server runs at `http://localhost:8080` by default.

## Project Structure

```
DeepDiveNRG/
├── index.html          # Home page
├── page1.html          # Tab 1 — Інвестиційний аналіз (Ukrainian)
├── page2.html          # Tab 2 — AI Premium Rotation (Ukrainian)
├── page3.html          # Tab 3 — placeholder
├── app.js              # Main JavaScript (nav, SW registration, interactions)
├── config.js           # Centralized site configuration (pages, colors, metadata)
├── styles.css          # Dark-theme stylesheet (responsive)
├── sw.js               # Service Worker (offline caching)
├── manifest.json       # PWA manifest
├── icons/              # SVG icons for PWA
├── _config.yml         # GitHub Pages configuration
├── .nojekyll           # Disables Jekyll processing on GitHub Pages
├── .eleventy.js        # Eleventy build configuration
├── .eslintrc.json      # ESLint linting rules
├── .prettierrc.json    # Prettier formatting rules
├── .editorconfig       # Editor consistency settings
└── .gitignore          # Git ignore patterns
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

## Deployment

The site is deployed automatically to **GitHub Pages** from the `main` branch root directory.

1. Push changes to `main`
2. GitHub Pages rebuilds and serves the updated site at:  
   [https://natalivm.github.io/DeepDiveNRG/](https://natalivm.github.io/DeepDiveNRG/)

> **Note:** No build step is required for GitHub Pages — the raw HTML/CSS/JS files are served directly.  
> The `npm run build` command generates a `_site/` directory for local preview only.

## Adding a New Page

1. Add an entry to `siteConfig.pages` in **`config.js`**
2. Create the corresponding HTML file (copy `page3.html` as a template)
3. The bottom navigation is generated automatically from `config.js`
