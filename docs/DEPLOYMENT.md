# NourishBridge Production Deployment

## Architecture

| Service | Provider | Purpose |
|---------|----------|---------|
| Frontend | [Vercel](https://vercel.com) | React SPA |
| Backend API | [Render](https://render.com) or [Railway](https://railway.app) | Node.js / Express |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | Primary data store |
| Images | [Cloudinary](https://cloudinary.com) | Media CDN (optional migration from local uploads) |
| Email | [Brevo](https://www.brevo.com) | Transactional email (SMTP) |
| Maps | [Google Maps Platform](https://developers.google.com/maps) | Geocoding & directions (optional) |

## Backend (Render / Railway)

1. Connect repository, set root directory to `backend/`
2. Build: `npm install`
3. Start: `node server.js`
4. Set environment variables from `backend/.env.example`
5. Enable **TRUST_PROXY=true** behind the platform load balancer
6. Set **CORS_ORIGIN** to your Vercel frontend URL (e.g. `https://nourishbridge.vercel.app`)

### Required production env vars

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_ACCESS_SECRET=<min 32 chars>
JWT_REFRESH_SECRET=<min 32 chars>
OTP_SECRET=<min 32 chars>
CORS_ORIGIN=https://your-frontend.vercel.app
TRUST_PROXY=true
RATE_LIMIT_SKIP_IN_DEV=false
```

### Optional integrations

```
SMTP_HOST=smtp-relay.brevo.com
SMTP_USER=...
SMTP_PASS=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
GOOGLE_MAPS_API_KEY=...
```

## Frontend (Vercel)

1. Connect repository, set root directory to `frontend/`
2. Build: `npm run build`
3. Output: `dist`
4. `vercel.json` handles SPA rewrites

### Required env vars

```
VITE_API_BASE_URL=https://your-api.onrender.com/api/v1
VITE_GOOGLE_MAPS_API_KEY=   # optional
```

## MongoDB Atlas

1. Create a free M0 cluster
2. Add database user and network access (0.0.0.0/0 for cloud hosts or specific IPs)
3. Copy connection string to `MONGODB_URI`
4. Run seed once: `node scripts/seed-admin.js`

## Post-deploy checklist

- [ ] Admin login works
- [ ] CORS allows frontend origin
- [ ] HTTPS on both frontend and API
- [ ] Rate limiting active (`RATE_LIMIT_SKIP_IN_DEV=false`)
- [ ] JWT secrets are unique (not dev defaults)
- [ ] Smoke test: `node scripts/test-phases-9-11.js` against production URL

## Local development

```bash
# Backend
cd backend && cp .env.example .env && npm run dev

# Frontend
cd frontend && cp .env.example .env && npm run dev
```

Default API: `http://localhost:5000/api/v1`  
Default frontend: `http://localhost:5173`
