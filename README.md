# NEXVAULT — Public Game Asset Store

A responsive, Unity Asset Store–inspired **public asset catalog** built with **React + Vite + Tailwind CSS 4**. It is designed for **GitHub Pages** hosting, with actual large file downloads linked from **Google Drive**. No database, paid backend, visitor accounts, or server setup is required for this release.

> **Demo data:** The 16 asset listings, publisher names and download counts included in this source code are **fictional examples**. Preview SVG artwork is original and bundled. **Demo downloads are deliberately disabled** until you add your real Google Drive links.

## Included features

- Responsive homepage with categories, featured, newest, popular and collections
- Browse all assets, full-text keyword search, category shortcuts, file-format and render-pipeline filters
- Sorting (newest, oldest, recent updates, popularity, A–Z) and pagination
- Individual asset pages with images, details, tags, specs, share button, related assets and download CTA
- Curated collections and visitor favorites saved in browser `localStorage`
- Draft/archived status (hidden from public site)
- Original, local, lightweight SVG demonstration thumbnails
- Local **Asset Manager** (`tools/asset-manager.html`) to import, edit and export catalog JSON
- Automated GitHub Pages deployment with GitHub Actions

## Requirements

- [Node.js](https://nodejs.org/) **20.19+** (Node 22 LTS recommended)
- npm and Git
- GitHub account; Google Drive account for files

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

Run preflight and build:

```bash
npm run validate
npm run build
npm run preview
```

`npm run build` creates the static `dist/` website. A network connection is necessary for the initial `npm install`. There is no committed dependency lockfile in this starter; `npm install` creates one. Commit the generated `package-lock.json` after first install for reproducible later builds, and optionally switch the workflow install command to `npm ci`.

## Publish to GitHub Pages

1. Create a new GitHub repository, for example `my-asset-store`.
2. Upload the **contents of this project folder** to the repository (not the parent folder). Make sure `.github/workflows/deploy.yml` is included. Use the `main` branch.
3. From the project folder, or using any Git client:

   ```bash
   git init
   git add .
   git commit -m "Initial NexVault asset store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/my-asset-store.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` and `my-asset-store` with your actual account and repository.
4. In your GitHub repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Open **Actions** and verify the **Deploy NexVault to GitHub Pages** workflow completes successfully.
6. Your site should be available at `https://YOUR_USERNAME.github.io/my-asset-store/` (Pages publishing may require a few minutes after the workflow finishes).

### Important: GitHub Pages base path

The included workflow **automatically calculates the Vite base path from the repository name**. For a project repository `my-asset-store`, it builds under `/my-asset-store/`; for a special username.github.io repository it uses `/`. You do not need to manually edit Vite config for standard GitHub Pages deployment. Routes are hash-based (`/#/assets`, `/#/asset/fantasy-village`) so page refreshes work on static hosting.

For a **custom domain** on GitHub Pages, set `VITE_BASE_PATH=/` in the workflow build environment and configure the domain in GitHub Pages settings.

## Add Google Drive files

1. Upload your ZIP, `.unitypackage`, `.blend`, audio or other asset file to **Google Drive**.
2. Right click the Drive file → **Share** → **General access** → **Anyone with the link** → **Viewer**.
3. Choose **Copy link**. It usually looks like:

   ```text
   https://drive.google.com/file/d/EXAMPLE_FILE_ID/view?usp=sharing
   ```

4. In `public/data/assets.json`, find the corresponding asset and set its `downloadUrl` to the link:

   ```json
   {
     "id": "as-001",
     "slug": "fantasy-village",
     "title": "Enchanted Village Environment",
     "subtitle": "Stylized fantasy environment",
     "description": "Your own description",
     "category": "3d",
     "image": "images/assets/fantasy-village.svg",
     "tags": ["Fantasy", "Environment"],
     "format": "Unitypackage",
     "published": "2026-11-11",
     "status": "published",
     "downloadUrl": "https://drive.google.com/file/d/EXAMPLE_FILE_ID/view?usp=sharing"
   }
   ```

5. Save the file and push to GitHub. GitHub Actions will rebuild and republish the catalog automatically.

**Visitor behavior:** Clicking **Open Google Drive file** opens your Drive share link in a new tab. Google Drive may present a preview, download confirmation, or quota warning. The site does not silently bypass Google's download limits and cannot guarantee unlimited free bandwidth. A visitor does not need a Google account if the file's permissions allow anonymous access.

**IMPORTANT:** Do not put any Google account passwords, access tokens, API secrets or private files into your public repository. This project does not need a Google Drive API key.

## Add or edit assets without writing JSON manually

Open `tools/asset-manager.html` in a browser (double-click the file). It runs locally as a standalone file.

1. Click **Import assets.json** and choose `public/data/assets.json`.
2. Click **New asset** or **Edit**. Add title, category, thumbnail path, tags and public Google Drive URL.
3. Click **Save record**. You may edit many assets during the same session.
4. Click **Export assets.json**.
5. Replace the project's `public/data/assets.json` with the exported file. Then run `npm run validate`, commit and push.

**Note:** The manager does **not** directly upload assets to Google Drive or update GitHub. It edits local JSON and exports a file for publication. Make a backup before making large changes.

### Asset metadata format

Each record is an object in the array in `public/data/assets.json`. Supported fields:

| Field | Meaning |
|---|---|
| `id` | Stable unique record ID — do not change if you want favorites to persist |
| `slug` | Unique URL identifier like `magic-particles` |
| `title`, `subtitle`, `description` | Visible details and searchable content |
| `publisher` | Name shown on the listing card |
| `category` | `3d`, `2d`, `audio`, `vfx`, `tools`, `templates`, `shaders`, `ui`, or `games` |
| `tags` | Array of searchable keywords |
| `format`, `size`, `unityVersion`, `pipeline`, `version` | Technical details / filter metadata |
| `image` | Local path relative to `public/`, e.g. `images/assets/example.webp` |
| `gallery` | Optional image path array for image carousel on detail page |
| `published`, `updated` | `YYYY-MM-DD` dates used for sorting |
| `featured` | Boolean to show in Featured grid |
| `downloads` | Optional manually entered count; **not automatically tracked** |
| `status` | `published` appears publicly; `draft` and `archived` are hidden |
| `downloadUrl` | Public HTTPS Google Drive link; empty string disables the button |

Images can also be HTTPS URLs, but bundling optimized WebP files in `public/images/assets/` is recommended for stability. Keep GitHub Pages site size limits in mind when adding lots of previews. The large downloadable packages belong on Google Drive.

### Add custom categories

Edit `src/data/categories.js` to add or rename a category. Also update the allowed categories array in `scripts/validate-assets.mjs` and the dropdown in `tools/asset-manager.html`.

### Change branding / styling

- Brand name: `src/components/Brand.jsx`, `src/components/Footer.jsx`, `index.html`
- Purple accent and colors: `src/styles.css`, component Tailwind classes
- Logo favicon: `public/favicon.svg`
- Home sections: `src/pages/Home.jsx`
- Curated collections: `src/data/collections.js`

## File structure

```text
.
├── .github/workflows/deploy.yml
├── index.html
├── public/
│   ├── data/assets.json
│   ├── images/assets/*.svg
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   ├── data/
│   │   ├── categories.js
│   │   └── collections.js
│   ├── lib/
│   └── pages/
├── tools/asset-manager.html
├── scripts/validate-assets.mjs
├── vite.config.js
└── package.json
```

## Limitations / planned upgrades

- GitHub Pages is **static hosting**: there is no online server-side asset upload or protected admin authentication in this first version.
- The local JSON manager is an offline editor, not a remote CMS.
- Google Drive download links depend on the public sharing permissions of each file and Google Drive's service limits.
- Sample download counts are illustrative; there is no analytics backend yet.
- Favorites are browser-local and are not synchronized across devices.
- The app uses hash routing for Github Pages simplicity. If you later prioritize search-engine indexing, consider an SEO-friendly static prerendered architecture.

## Deployment help

If a page is blank after deployment, check the browser console and confirm that GitHub Actions actually set `VITE_BASE_PATH` to `/<repo-name>/`, and that the Actions workflow succeeded. If assets are missing, remember that `image` is a path under `public/` and is case-sensitive. If a Google Drive link opens an access request, check that its General Access is **Anyone with the link**.

---

Made with React 19, Vite 6, Tailwind CSS 4 and lucide-react icons. No external design template or third-party asset thumbnails were copied.
