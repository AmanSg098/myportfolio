# Aman — Portfolio

Static portfolio site (plain HTML/CSS/JS, no build step).

## Run locally
```bash
python3 -m http.server 5391
# open http://localhost:5391
```

## Deploy to Vercel (free)
**Option A: GitHub (recommended, auto-deploys on push)**
1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com/new → Import the repo.
3. Deployed at https://aman-singh089-six-sigma-90.vercel.app
4. Framework preset: **Other**. Leave build command and output directory empty. Deploy.

Using a different domain? Search-and-replace `aman-singh089-six-sigma-90.vercel.app` in `index.html`, `robots.txt` and `sitemap.xml`.

**Option B: CLI**
```bash
npx vercel        # preview
npx vercel --prod # production
```

## Edit content
Everything is in `index.html`. Images and the resume PDF live in `assets/`.
