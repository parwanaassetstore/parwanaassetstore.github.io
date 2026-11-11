# Parwana Store — Public Unity Asset Library

A responsive **React + Vite + Tailwind CSS** asset catalog for **GitHub Pages**, with large files linked from **Google Drive**. Designed for `https://parwanaassetstore.github.io/`.

## Is update mein kya badla?

- Website ka naam **Parwana Store** kar diya gaya hai (header, footer, title, favicon, local manager).
- Header ki categories is order mein hain: **3D, 2D, Audio, Tools, VFX, Templates, SDKs**.
- In sab ke andar poori multi-level hierarchy hai (128 categories aur subcategories total).
- Har category/subcategory ka clickable page hai. Example: `/#/category/3d/characters/animals/birds`.
- Homepage par sirf **Explore by Category**, **New Assets**, **Popular Downloads** hain.
- Homepage se hero, Featured This Week, One Library, aur Creative Collections hata diye hain.
- Category pages apni child categories ko links ki tarah dikhate hain aur unke andar ke published assets filter karte hain.
- Local Asset Manager mein ab 128 categories select kar sakte hain.

## Pehle se live website update karna — simple steps (NO CODING)

**IMPORTANT:** Agar `public/data/assets.json` mein aap ne apne REAL assets add kar diye hain, to update se pehle is file ka backup kar lein. Update package mein reclassified DEMO asset catalog bhi included hai; file replace karne par pehle se saved real asset entries overwrite ho sakti hain.

1. `parwana-store-update-only.zip` download kar ke **Extract All** karein.
2. Extracted folder kholein. Andar `src`, `public`, `scripts`, `tools`, `index.html`, `package.json` honge.
3. Apni repository kholein: <https://github.com/parwanaassetstore/parwanaassetstore.github.io>
4. **Code → Add file → Upload files** click karein.
5. Extracted folder **ke andar ka saara content** upload area mein drag and drop karein. ZIP khud upload na karein. In folders ke existing files replace ho jayenge; subfolder structure same rehna chahiye.
6. **Commit changes** press karein.
7. **Actions** tab mein website deployment ka green tick check karein.
8. <https://parwanaassetstore.github.io/> khol kar **Ctrl + Shift + R** press karein.

**`.github` folder ko phir se upload karne ki zaroorat nahi**, kyunke aapki website already live hai aur deployment workflow kaam kar raha hai. Update-only ZIP mein `.github` intentionally nahi rakha.

## New Assets automatic kaise show hote hain?

Jab aap local asset manager mein **New asset** add karte hain:

1. Asset ka `status` **published** select karte hain.
2. Manager new asset ke liye current date ko `published` mein save karta hai.
3. **Export assets.json** karke GitHub repository mein `public/data/assets.json` replace karein.
4. GitHub Actions deploy hone ke baad homepage ke **New Assets** mein newest 8 published assets (latest publish date first) nazar aayenge.

**Popular Downloads:** `downloads` value se sort hote hain. GitHub Pages + JSON + Google Drive mein download count **automatically track nahi hota**; JSON value manually maintain karni hogi, ya future mein external tracking service add karni hogi. Demo assets ke sample download counts haqeeqi nahi hain.

## Categories assign karna

1. Double click `tools/asset-manager.html`.
2. **Import assets.json** press kar ke `public/data/assets.json` kholein.
3. **Add asset** ya **Edit** karein.
4. **Category / Subcategory** dropdown mein correct category choose karein. Example `3D → Characters → Animals → Birds`.
5. **Save record → Export assets.json**.
6. Exported `assets.json` ko GitHub repository ke `public/data/assets.json` path par upload/replace karein.

Asset pictures `public/images/assets/` mein ja sakti hain aur badi ZIP/unitypackage files **Google Drive** par rehengi. Download button tabhi work karega jab `downloadUrl` mein public Google Drive share link diya gaya ho.

## Full project local commands (optional for developers)

```bash
npm install
npm run validate
npm run dev
npm run build
```

`npm run build` creates `dist/`. Workflow `.github/workflows/deploy.yml` GitHub Pages base path ko repository name ke mutabiq set karta hai. User/organization GitHub Pages repository (`parwanaassetstore.github.io`) par base path `/` hai. The site uses `HashRouter` so nested category URLs are `/#/category/...` and work on static hosting.

## Data layout

- `public/data/assets.json` — published assets' metadata; paths like `"3d/characters/animals/birds"`.
- `src/data/categories.js` — frontend category tree; all menu and category pages yahin se bante hain.
- `public/data/categories.json` — same category tree for validation and future catalog tooling.
- `tools/asset-manager.html` — offline local asset editor with category dropdown.
- `public/images/assets/` — demo thumbnails (SVG).
- `scripts/validate-assets.mjs` — verifies data and categories before building.

**Demo notice:** The included 16 asset records, publishers and download numbers are sample data. Actual asset downloads are disabled until you set Google Drive links.

### Security

Your repository is public. GitHub par kabhi Google account passwords, private files, API keys ya credentials upload na karein.
