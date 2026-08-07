# NourishBridge Backend

Node.js + Express + MongoDB API for the NourishBridge platform.

## Quick start

```bash
cd backend
cp .env.example .env   # edit values as needed
npm install
npm run dev            # development with nodemon
npm start              # production
```

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | — | API welcome |
| GET | `/api/v1/health` | — | Health + DB status |
| POST | `/api/v1/auth/register` | Public | Register (donor, volunteer, ngo) |
| POST | `/api/v1/auth/login` | Public | Login with email + password |
| POST | `/api/v1/auth/refresh` | Public | Exchange refresh token for new pair |
| POST | `/api/v1/auth/logout` | Public | Revoke refresh token |
| GET | `/api/v1/auth/me` | Bearer JWT | Current user profile |
| GET | `/api/v1/admin/dashboard` | Admin JWT | Platform admin dashboard |
| GET | `/api/v1/ngo/dashboard` | NGO JWT | NGO-scoped dashboard |
| GET | `/api/v1/volunteer/dashboard` | Volunteer JWT | Volunteer-scoped dashboard |

### Auth smoke test

```bash
node scripts/test-auth.js
```

Requires MongoDB and a running server (`npm run dev`).

### Register example (donor)

```json
POST /api/v1/auth/register
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass1",
  "confirmPassword": "SecurePass1",
  "phone": "9876543210",
  "role": "donor",
  "address": {
    "line1": "123 Main St",
    "city": "Hyderabad",
    "state": "Telangana",
    "pincode": "500081"
  },
  "profile": { "donorType": "individual" }
}
```

Response includes `user`, `accessToken`, and `refreshToken`. Admin accounts cannot self-register.

### Login / refresh / logout

```json
POST /api/v1/auth/login
{ "email": "jane@example.com", "password": "SecurePass1" }

POST /api/v1/auth/refresh
{ "refreshToken": "<refresh-token>" }

POST /api/v1/auth/logout
{ "refreshToken": "<refresh-token>" }
```

Protected routes: `Authorization: Bearer <accessToken>`

### Role-protected routes

All role routes apply JWT verification + role authorization via reusable middleware (`adminOnly`, `ngoOnly`, `volunteerOnly`).

```bash
node scripts/seed-admin.js          # create dev admin (cannot self-register)
node scripts/test-protected-routes.js
```

Seed admin defaults: `admin@nourishbridge.local` / `AdminPass123`

```bash
GET /api/v1/admin/dashboard
Authorization: Bearer <admin-access-token>

GET /api/v1/ngo/dashboard
Authorization: Bearer <ngo-access-token>

GET /api/v1/volunteer/dashboard
Authorization: Bearer <volunteer-access-token>
```

Unauthorized requests return **401** (missing/invalid token). Wrong role returns **403**.

## Environment

See `.env.example` for all variables. The frontend (Vite) runs separately on port 5173/5174 — CORS is pre-configured for those origins.

## Architecture

Clean layered structure under `src/` — controllers, services, models, routes.

### Database models (`src/models/`)

| Model | Collection | Purpose |
|-------|------------|---------|
| User | users | Base account (all roles) |
| Donor | donors | Donor profile (1:1 User) |
| Volunteer | volunteers | Volunteer profile (1:1 User) |
| NGO | ngos | NGO profile (1:1 User) |
| Donation | donations | Food donations workflow |
| FoodRequest | foodrequests | NGO food needs |
| Inventory | inventories | NGO stock batches |
| Delivery | deliveries | Pickup → drop-off tracking |
| Notification | notifications | User alerts |
| Report | reports | Generated exports |
| AuditLog | auditlogs | Immutable action log |

Models auto-register on server start via `import "./src/models/index.js"` in `server.js`.
