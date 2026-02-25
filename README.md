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
├── index.html      # Main page
├── style.css       # Dark theme stylesheet
├── _config.yml     # GitHub Pages configuration
├── .nojekyll       # Skips Jekyll processing (plain HTML/CSS site)
└── README.md       # This file
```

### Notes

- The `.nojekyll` file ensures GitHub Pages serves the static files directly without Jekyll processing.
- All asset paths are relative, so the site works correctly under the `/DeepDiveNRG/` subdirectory.