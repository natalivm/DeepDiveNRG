# DeepDiveNRG

A dark-themed website for DeepDiveNRG, a next-generation energy solutions company.

## Live Site

Visit the live site at: [https://natalivm.github.io/DeepDiveNRG/](https://natalivm.github.io/DeepDiveNRG/)

## GitHub Pages Deployment

Deployment is automated via GitHub Actions. On every push to `main`, the workflow builds the site to `_site/` and deploys it to GitHub Pages.

### Setup

1. Go to **Settings → Pages** in the repository.
2. Under **Source**, select **GitHub Actions**.
3. Push to `main` — the workflow handles the rest.
4. The site will be available at `https://natalivm.github.io/DeepDiveNRG/` within a few minutes.

### Project Structure

```
DeepDiveNRG/
├── index.html          # Main page + 3 navigation tabs
├── page1.html          # Tab 1 sub-page
├── page2.html          # Tab 2 sub-page
├── page3.html          # Tab 3 sub-page
├── styles.css          # Dark theme stylesheet (responsive, CSS custom properties)
├── app.js              # Main JavaScript (nav, SW registration, interactions)
├── config.js           # Centralized site configuration (pages, colors, metadata)
├── sw.js               # Service Worker (network-first, offline caching)
├── manifest.json       # PWA manifest
├── icons/              # SVG icons for PWA
├── scripts/build.js    # Build script — copies files to _site/
├── .github/workflows/  # GitHub Actions deployment workflow
├── _config.yml         # GitHub Pages configuration
├── .nojekyll           # Skips Jekyll processing (plain HTML/CSS/JS site)
├── package.json        # Node.js dev dependencies and scripts
├── DEVELOPMENT.md      # Developer setup guide
└── README.md           # This file
```

### Features

- **Dark theme** — Deep dark backgrounds (`#0d0f14`) with cyan (`#00c8ff`) accent colour
- **Responsive layout** — Fluid typography via `clamp()`, collapses gracefully on mobile
- **Navigation tabs** — Tab 1, Tab 2, Tab 3 linking to dedicated sub-pages
- **Back buttons** — Each sub-page has a styled `← Back` link returning to the main page
- **Sticky header** — Frosted-glass navigation bar with blur backdrop
- **GitHub Pages compatible** — `.nojekyll` file ensures plain HTML/CSS is served directly

### Notes

- The `.nojekyll` file ensures GitHub Pages serves the static files directly without Jekyll processing.
- All asset paths are relative, so the site works correctly under the `/DeepDiveNRG/` subdirectory.
- Site configuration (pages list, titles, colours) is centralised in `config.js` — the bottom navigation is generated from it automatically.
- See [DEVELOPMENT.md](DEVELOPMENT.md) for local development setup instructions.