# SELF Wellness — Production Deployment Guide

A luxury wellness ecommerce platform built with React + Vite (frontend) and Express + PostgreSQL (backend).

## Project Structure

```
self-wellness-production/
├── frontend/          # React + Vite SPA → Deploy to Cloudflare Pages
│   ├── src/
│   │   ├── api/       # API client
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/      # Product seed data
│   │   ├── hooks/
│   │   ├── pages/     # All routes (Home, Shop, Admin, etc.)
│   │   └── ...
│   ├── public/        # Static assets + Cloudflare _redirects
│   ├── vite.config.ts
│   └── package.json
├── backend/           # Express API → Deploy to Railway / Render / Fly.io
│   ├── src/
│   │   ├── db/        # Drizzle ORM + PostgreSQL schema
│   │   ├── routes/    # auth, products, orders, analytics, newsletter, coupons, settings
│   │   ├── lib/       # logger
│   │   ├── app.ts
│   │   └── index.ts
│   ├── drizzle.config.ts
│   ├── build.mjs      # esbuild bundler
│   └── package.json
├── .env.example       # All required environment variables
├── .gitignore
└── README.md
```

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router v7
- **Backend**: Node.js 20+, Express 5, TypeScript, Drizzle ORM, PostgreSQL
- **Auth**: JWT (admin-only), bcryptjs
- **Security**: helmet, express-rate-limit, CORS

---

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL database (local or [Neon](https://neon.tech) free tier)
- pnpm (recommended) or npm

### 1. Backend setup

```bash
cd backend
npm install

# Copy and fill environment variables
cp ../.env.example .env

# Push database schema
npm run db:push

# Build and start
npm run build
npm start
# Backend runs on http://localhost:8080
```

### 2. Frontend setup

```bash
cd frontend
npm install

# For local dev, the Vite proxy forwards /api → localhost:8080
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Production Deployment

### Step 1 — Database (Neon / Supabase / Railway Postgres)

1. Create a PostgreSQL database on [Neon](https://neon.tech) (free) or any provider
2. Copy the connection string → `DATABASE_URL`
3. Run schema migration:
   ```bash
   cd backend
   DATABASE_URL="your-connection-string" npm run db:push
   ```

### Step 2 — Backend (Railway)

1. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
2. Select this repo, choose the `backend/` folder as root (or use Nixpacks with root dir)
3. Add environment variables from `.env.example`:
   - `DATABASE_URL`
   - `JWT_SECRET` (generate: `openssl rand -base64 48`)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NODE_ENV=production`
   - `PORT=8080`
4. Build command: `npm run build`
5. Start command: `npm start`
6. Note your Railway URL: `https://your-app.up.railway.app`

**Alternative backends**: [Render](https://render.com), [Fly.io](https://fly.io), [Heroku](https://heroku.com)

### Step 3 — Frontend (Cloudflare Pages)

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project → Connect to Git**
3. Select your repo
4. Set build settings:
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-app.up.railway.app` (your Railway URL)
6. Click **Save and Deploy**

Your site will be live at `https://yourproject.pages.dev`

---

## Admin Panel

- URL: `https://yourdomain.pages.dev/#/admin`
- Login with your `ADMIN_EMAIL` + `ADMIN_PASSWORD`
- Features: Dashboard analytics, Products (add/edit/delete), Orders, Subscribers, Coupons, Settings

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing (min 32 chars) |
| `ADMIN_EMAIL` | ✅ | Admin login email |
| `ADMIN_PASSWORD` | ✅ | Admin login password |
| `PORT` | ✅ | Server port (default: 8080) |
| `NODE_ENV` | ✅ | `production` or `development` |
| `ALLOWED_ORIGINS` | Recommended | Comma-separated allowed frontend URLs |
| `VITE_API_URL` | Frontend only | Backend URL for Cloudflare Pages |
| `RAZORPAY_KEY_ID` | Optional | Razorpay payment key |
| `RAZORPAY_SECRET` | Optional | Razorpay secret key |
| `RESEND_API_KEY` | Optional | Email via Resend |
| `CLOUDINARY_CLOUD_NAME` | Optional | Cloudinary media uploads |
| `CLOUDINARY_API_KEY` | Optional | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Optional | Cloudinary API secret |

---

## Build Commands Reference

```bash
# Backend
cd backend
npm install          # install dependencies
npm run build        # compile TypeScript → dist/
npm start            # start production server
npm run db:push      # push schema to database

# Frontend
cd frontend
npm install          # install dependencies
npm run dev          # start dev server with API proxy
npm run build        # build for production → dist/
npm run preview      # preview production build locally
```

---

## Security Notes

- Change `ADMIN_PASSWORD` to a strong unique password before going live
- Generate a secure `JWT_SECRET`: `openssl rand -base64 48`
- Set `ALLOWED_ORIGINS` to your exact frontend domain in production
- Never commit `.env` files to version control
