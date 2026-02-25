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
├── index.html      # Main page with hero, about, services, contact sections + 3 navigation tabs
├── page1.html      # Tab 1 sub-page with back button
├── page2.html      # Tab 2 sub-page with back button
├── page3.html      # Tab 3 sub-page with back button
├── styles.css      # Dark theme stylesheet (responsive, CSS custom properties)
├── _config.yml     # GitHub Pages configuration
├── .nojekyll       # Skips Jekyll processing (plain HTML/CSS site)
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