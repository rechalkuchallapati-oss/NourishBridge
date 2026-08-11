# NourishBridge Deployment Guide

Production stack:

| Layer | Service |
|-------|---------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) or [Railway](https://railway.app) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| Images | [Cloudinary](https://cloudinary.com) (optional) |
| Email | [Brevo](https://www.brevo.com) SMTP |
| Maps | [Google Maps Platform](https://developers.google.com/maps) |

## 1. MongoDB Atlas

1. Create a free cluster and database user.
2. Allow access from anywhere (`0.0.0.0/0`) or your host IP range.
3. Copy the connection string into `MONGODB_URI`.

## 2. Backend (Render)

1. Connect this repository; set root directory to `backend`.
2. Build: `npm install`
3. Start: `node server.js`
4. Health check path: `/api/v1/health`
5. Copy variables from `backend/.env.production.example` into the Render dashboard.
6. Set `CORS_ORIGIN` to your Vercel URL (e.g. `https://nourishbridge.vercel.app`).
7. Enable `TRUST_PROXY=true` and `RATE_LIMIT_SKIP_IN_DEV=false`.

Alternatively use `backend/render.yaml` as a blueprint.

## 3. Frontend (Vercel)

1. Set root directory to `frontend`.
2. Build: `npm run build`
3. Output: `dist`
4. Environment variable:
   - `VITE_API_BASE_URL=https://your-api.onrender.com/api/v1`
   - `VITE_GOOGLE_MAPS_API_KEY` (optional)
5. Deploy — `vercel.json` handles SPA routing and security headers.

## 4. Post-deploy verification

```bash
# Health
curl https://your-api.onrender.com/api/v1/health

# CORS (from browser console on Vercel app)
fetch('https://your-api.onrender.com/api/v1/health').then(r => r.json())

# Run smoke tests locally against production (optional)
PORT=443 API=https://your-api.onrender.com/api/v1 node scripts/test-e2e-complete.js
```

Checklist:

- [ ] Login / register / refresh token
- [ ] Donation → NGO accept → volunteer → delivery
- [ ] Socket.IO connects (check browser Network → WS)
- [ ] File upload (profile image)
- [ ] Password reset email (Brevo)
- [ ] Admin dashboard loads real data
- [ ] Maps / QR on volunteer flow

## 5. Secrets policy

- **Never** commit `.env`, `.env.local`, or production credentials.
- Use platform secret managers (Render env vars, Vercel env vars).
- Rotate JWT and OTP secrets if ever exposed.
- Google Maps and Cloudinary keys belong in env vars only — never in frontend source except `VITE_*` public keys.

## 6. Local production build test

```powershell
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```
