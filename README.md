# Hello World Static Site

A minimal static website ready to be hosted on [GitHub Pages](https://pages.github.com/).

## Structure

```
test-site/
├── index.html          # Entry point served at the site root
├── css/
│   └── style.css       # Styling
├── js/
│   └── script.js       # Client-side JavaScript
├── .nojekyll           # Disables Jekyll processing on GitHub Pages
└── README.md           # This file
```

## Local Preview

From the `test-site/` directory, start a local HTTP server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `hello-world-site`).
2. Copy the contents of this directory to the repo root and push:
   ```bash
   git init
   git add .
   git commit -m "Initial hello world site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo on GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)`
5. Save. GitHub will publish the site at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

The `.nojekyll` file tells GitHub Pages to skip Jekyll processing and serve
files as-is — useful if you later add paths that start with an underscore.
