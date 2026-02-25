# DeepDiveNRG

A dark-themed website for DeepDiveNRG, a next-generation energy solutions company.

## Live Site

Visit the live site at: [https://natalivm.github.io/DeepDiveNRG/](https://natalivm.github.io/DeepDiveNRG/)

## GitHub Pages Deployment

This site is deployed via GitHub Pages from the `main` branch root directory.

### Setup

1. Go to **Settings → Pages** in the repository.
2. Under **Source**, select **Deploy from a branch**.
3. Choose the `main` branch and `/ (root)` folder, then click **Save**.
4. The site will be available at `https://natalivm.github.io/DeepDiveNRG/` within a few minutes.

### Project Structure

```
DeepDiveNRG/
├── index.html      # Home page with hero, about, services, contact sections + navigation tabs
├── page1.html      # Tab 1 — Інвестиційний аналіз (Ukrainian, lang="uk")
├── page2.html      # Tab 2 — AI Premium Rotation (Ukrainian, lang="uk")
├── page3.html      # Tab 3 — placeholder sub-page
├── app.js          # Main JavaScript (bottom nav, SW registration, interactions)
├── config.js       # Centralized site configuration (pages, titles, colours)
├── styles.css      # Dark theme stylesheet (responsive, CSS custom properties)
├── sw.js           # Service Worker (offline caching with date-based versioning)
├── manifest.json   # PWA manifest
├── icons/          # SVG icons for PWA
├── _config.yml     # GitHub Pages configuration
├── .nojekyll       # Skips Jekyll processing (plain HTML/CSS/JS site)
├── .eleventy.js    # Eleventy build configuration (optional local dev)
├── package.json    # Node.js dev dependencies and scripts
├── DEVELOPMENT.md  # Developer setup guide
└── README.md       # This file
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