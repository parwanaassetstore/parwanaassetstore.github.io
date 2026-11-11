# Parwana Store — Public Asset Store (Copyrighted + Drive Media update)

React + Vite + Tailwind CSS website for **https://parwanaassetstore.github.io/**. Hosted on GitHub Pages; asset downloads, screenshots, and main thumbnail links can be stored on Google Drive.

## What's new

- Top menu **3D, 2D, Audio, Tools, VFX, Templates, SDKs, Copyrighted**.
- Copyrighted expands to a full duplicate hierarchy of all the existing top-level menus and their nested subcategories, so `Copyrighted → 3D → Characters → Animals → Birds` works as its own filtered category page.
- Local Asset Manager now has **Copyrighted? Yes/No**. A copyrighted asset is saved under `copyrighted/<normal-category>` with `copyrighted: true`, so it appears in the Copyrighted category tree (instead of the regular 3D/2D listing). The All Assets and New/Popular sections can show both.
- Asset details now include multiple image previews with thumbnails, Previous/Next arrows, and an optional embedded YouTube video.
- Asset cards, detail previews, and gallery thumbnails attempt to display public Google Drive image links by extracting the file ID. No real asset image needs to be uploaded to GitHub.
- Google Drive images **are not guaranteed** to render as `<img>` on all browsers/accounts because Google Drive is not a dedicated image hosting/CDN service. If image endpoints fail, site displays a fallback rather than a blank/broken frame. Verify public access by testing in Incognito. Direct HTTPS image URLs are also supported.

## Live website update — beginner steps

**IMPORTANT: The update-only ZIP does NOT contain `public/data/assets.json`. Your real assets are preserved. Do not upload the entire complete-source ZIP over a populated live repository unless you intend to replace data.**

1. Download `parwana-store-v3-update-only.zip`; right-click → **Extract All**.
2. Open your repository: https://github.com/parwanaassetstore/parwanaassetstore.github.io
3. Choose **Code → Add file → Upload files**.
4. Open the extracted `Parwana-Store-V3-Update` folder and drag **the contents of that folder** (not the ZIP itself) into GitHub's upload window. Preserve the `src`, `public`, `tools`, `scripts` folders.
5. Press **Commit changes**.
6. Open **Actions** and confirm your existing GitHub Pages build gets a green check. If there is a red cross, open the failed workflow and copy the error message.
7. Open https://parwanaassetstore.github.io/ and press **Ctrl + Shift + R**.

You do NOT need to re-upload `.github` or create another GitHub Pages workflow. Your existing workflow continues to work.

## How to add/edit real asset data

1. Double-click **`Parwana-Asset-Manager.html`** (included separately), or open `tools/asset-manager.html` locally in Chrome.
2. From GitHub, download the **latest** `public/data/assets.json` file before editing. Click **Import assets.json** in the local manager and choose the file.
3. Click **+ New asset** or Edit an existing asset.
4. Choose the normal category (e.g. `3D → Characters → Animals → Birds`). For Copyrighted, select **Copyrighted category? → Yes**. It automatically stores the item in the Copyrighted subcategory; **No** leaves it in the normal category.
5. Paste your main image's **Google Drive sharing link** into **Main image**. Paste more Drive image links under **Extra images**, **one link per line**. The main image is displayed as the asset card image.
6. Optionally paste a full YouTube watch/share/shorts/live URL into the **YouTube video link** field.
7. Paste the separate ZIP/Unitypackage Google Drive sharing link into **Download link**.
8. Fill title, subtitle, format, description and click **Save record**.
9. Click **Export assets.json**. Upload the exported file to the SAME GitHub path: `public/data/assets.json` (replace existing; do not rename it `assets (1).json`).
10. After GitHub Actions green check, refresh your site. New published assets appear under New Assets, and correct category pages.

### Google Drive image sharing

For **each image** (not only the ZIP): Google Drive → right-click image → **Share → General access → Anyone with the link → Viewer → Copy link**. Use a FILE link, such as:

`https://drive.google.com/file/d/YOUR_IMAGE_FILE_ID/view?usp=sharing`

A folder link won't display a specific image. If Google prevents hotlinking, even a public image may not render in the website; open the link in an Incognito window to verify sharing. You can instead choose an image host that provides direct public image URLs, while keeping downloads on Google Drive.

### Example of an asset record

```json
{
  "id": "as-example",
  "slug": "fantasy-bird",
  "title": "Fantasy Bird",
  "subtitle": "Game ready bird character",
  "description": "Sample listing",
  "category": "copyrighted/3d/characters/animals/birds",
  "copyrighted": true,
  "publisher": "Parwana Store",
  "image": "https://drive.google.com/file/d/MAIN_IMAGE_FILE_ID/view",
  "gallery": [
    "https://drive.google.com/file/d/MAIN_IMAGE_FILE_ID/view",
    "https://drive.google.com/file/d/SECOND_IMAGE_FILE_ID/view"
  ],
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "tags": ["Fantasy", "Birds"],
  "format": "Unitypackage",
  "published": "2026-11-11",
  "status": "published",
  "downloadUrl": "https://drive.google.com/file/d/ZIP_FILE_ID/view"
}
```

IDs are placeholders, not real image/video/download assets. Real records should be made using the manager to avoid errors.

## Notes

- GitHub Pages hosts a static React site. The local manager only edits/exports JSON; no online admin login or direct Google Drive upload is added.
- Existing sample thumbnail SVG files remain in `public/images/assets` for demo records; **new real asset images need not be uploaded to GitHub**.
- `npm install && npm run build` builds to `dist`. `.github/workflows/deploy.yml` handles deployment on commits to `main`. This is a user/organization `*.github.io` repo and uses Vite base `/` and HashRouter.
- `public/data/categories.json` + `src/data/categories.js` define and validate the same hierarchy. Existing `assets.json` records remain valid.
- Download count tracking is manual with the current static JSON architecture.
- Never upload passwords, API keys, Drive service credentials, or other secrets to a public GitHub repository.
