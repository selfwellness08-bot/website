# SELF Wellness — Full Stack E-Commerce

Premium wellness e-commerce platform with a React storefront and Express + PostgreSQL backend.

---

## 📁 Project Structure

```
website/
├── frontend/          React + Vite + TailwindCSS v4 storefront + admin panel
├── backend/           Express 5 + Drizzle ORM API server
├── .gitignore
├── package.json       Root scripts for convenience
└── README.md
```

---

## 🚀 GitHub → Cloudflare Pages Deployment

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: SELF Wellness"
git remote add origin https://github.com/YOUR_USERNAME/self-wellness.git
git push -u origin main
```

### Step 2 — Deploy Backend First

Deploy the `backend/` folder to any Node.js host. Recommended:
- **Railway** (https://railway.app) — `New Project → Deploy from GitHub → backend/`
- **Render** (https://render.com) — Web Service, root dir `backend/`, build `npm install && npm run build`, start `npm run start`
- **Fly.io** — `fly launch` inside `backend/`

Set these environment variables on your backend host:
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
ADMIN_EMAIL=admin@selfwellness.com
ADMIN_PASSWORD=yourpassword
PORT=3001
NODE_ENV=production
```

Run the database migration after first deploy:
```bash
cd backend && npm run db:push
```

### Step 3 — Deploy Frontend to Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click **Create application → Pages → Connect to Git**
3. Select your GitHub repository
4. Configure the build:

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | `cd frontend && npm install && npm run build` |
| **Build output directory** | `frontend/dist` |
| **Root directory** | `/` |

5. Add **Environment Variables**:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend.railway.app` (your deployed backend URL) |

6. Click **Save and Deploy**

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/self-wellness.git
cd self-wellness/website

# 2. Start backend
cd backend
cp .env.example .env        # Edit with your DB credentials
npm install
npm run db:push             # Push schema to DB
npm run dev                 # Starts on http://localhost:3001

# 3. Start frontend (new terminal)
cd frontend
cp .env.example .env        # Edit VITE_API_URL if needed
npm install
npm run dev                 # Starts on http://localhost:5173
```

Visit `http://localhost:5173` for the store, `http://localhost:5173/#/admin` for the admin panel.

---

## 🔑 Admin Access

| Field | Default |
|-------|---------|
| URL | `/#/admin` |
| Email | `admin@selfwellness.com` |
| Password | `selfwellness786#` |

> ⚠️ Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables in production.

---

## 🛢️ Database Schema

7 tables managed by Drizzle ORM:

| Table | Purpose |
|-------|---------|
| `products` | Product catalog (14 seeded) |
| `orders` | Customer orders |
| `order_items` | Line items per order |
| `newsletter_subscribers` | Email subscribers |
| `site_settings` | Key-value site config |
| `discount_codes` | Coupon codes |
| `admin_users` | Reserved for future use |

Run migrations with:
```bash
cd backend && npm run db:push
```

---

## 🎨 Brand

| Token | Value |
|-------|-------|
| Orange | `#ff7a00` |
| Deep Green | `#0d4b3e` |
| Cream | `#f8f8f5` |
| Display Font | Cormorant Garamond |
| Body Font | DM Sans |
| Admin Font | Plus Jakarta Sans + Syne |

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes (prod) | Your backend base URL (e.g. `https://api.selfwellness.com`) |

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | JWT signing secret |
| `SESSION_SECRET` | ✅ | Session encryption secret |
| `ADMIN_EMAIL` | Optional | Admin login email (default: `admin@selfwellness.com`) |
| `ADMIN_PASSWORD` | Optional | Admin login password (default: `selfwellness786#`) |
| `PORT` | Optional | API server port (default: `3001`) |
| `OPENAI_API_KEY` | Optional | For AI PDF import + mockup generation |
| `GCS_BUCKET_NAME` | Optional | Google Cloud Storage bucket for image uploads |

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, TailwindCSS v4, framer-motion |
| Routing | react-router-dom v7 (HashRouter) |
| Backend | Express 5, Node.js 18+ |
| Database | PostgreSQL + Drizzle ORM |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Image Upload | multer + Google Cloud Storage |
| AI | OpenAI (DALL-E mockup + PDF extraction) |
