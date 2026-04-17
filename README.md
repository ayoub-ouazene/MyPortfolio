# My Portfolio

A modern, animated portfolio built with **React + Vite**.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/` — upload this folder anywhere.

---

## ☁️ Deploy Options (all FREE)

### Option 1 — Vercel (recommended, 1 minute)
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Click Deploy — done. Live URL instantly.

### Option 2 — Netlify Drop (no account needed)
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag & drop the `dist/` folder
4. Live instantly with a random URL (you can set a custom one)

### Option 3 — GitHub Pages
1. Push to GitHub
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
4. Run `npm run build && npm run deploy`

---

## ✏️ How to Edit Your Content

All content lives in one file: **`src/data/index.js`**

### Add a project
Copy any existing object in the `projects` array and update:
- `title`, `desc`, `tags`, `repo`, `live` (optional)
- `emoji` for the placeholder icon

### Add a screenshot to a project
1. Put your image in `public/screenshots/`
2. In `Projects.jsx`, replace the `<span>{p.emoji}</span>` line with:
   ```jsx
   <img src={`/screenshots/${yourFileName}.png`} alt={p.title} />
   ```

### Add your photo
1. Put `photo.jpg` in `public/`
2. In `Hero.jsx`, replace `AYB` text with:
   ```jsx
   <img src="/photo.jpg" alt="Ayoub Ouazene" />
   ```

### Add your CV
1. Put your CV PDF in `public/` as `cv.pdf`
2. In `About.jsx`, change the CV button href to `"/cv.pdf"`

### Add/edit hackathons or skills
All in `src/data/index.js` — just add or update the objects.

---

## 🗂 Project Structure

```
portfolio/
├── public/
│   └── (put photo.jpg, cv.pdf, screenshots/ here)
├── src/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Hackathons.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── index.js        ← ALL YOUR CONTENT IS HERE
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
