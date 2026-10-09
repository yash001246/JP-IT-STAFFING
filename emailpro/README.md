# EmailPro

**AI-powered email outreach and lead generation platform.** Manage leads, generate personalized emails, send real bulk campaigns, and track performance, all from one dashboard.

Built with React, Node.js, Express, and MongoDB. Email delivery via the Resend API. Deployed on Render.

**Live Demo:** `https://jp-it-staffing.onrender.com`
**API:** `https://emailpro-backend-ij9s.onrender.com`

---

## Features

- **Authentication:** JWT-based signup/login, bcrypt password hashing, protected routes, session persists on refresh
- **Lead Management:** add leads manually or bulk-import via CSV; server-side search, source filter, and pagination
- **AI Email Generator:** generates a subject line, personalized email, and follow-up from business name, industry, and product/service (template-based; ready to plug into an LLM API)
- **Campaign Builder:** compose subject and body with merge placeholders, select leads, attach a PDF, and send immediately or schedule
- **Analytics Dashboard:** total leads, emails sent, open rate, conversion rate, campaign trends, and top campaigns
- **Settings:** email provider connection test, API key view/rotate, team members, theme toggle
- **Responsive dark UI:** glassmorphism design with purple/blue gradient accents

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS, Recharts, Lucide Icons |
| Backend | Node.js, Express.js (REST API) |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Tokens, bcryptjs |
| Email | Resend API |
| Uploads | Multer (CSV leads, PDF attachments) |
| Hosting | Render (Web Service + Static Site) |

## Project Structure

```
emailpro/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # auth, leads, campaigns, analytics, ai, settings
│   ├── middleware/     # JWT auth, file upload, error handling
│   ├── models/         # User, Lead, Campaign, Team
│   ├── routes/         # REST route definitions
│   ├── utils/          # mailer (Resend), token generation
│   └── server.js
└── frontend/
    └── src/
        ├── components/ # ui, layout, charts
        ├── context/    # AuthContext
        ├── lib/        # api.js (fetch wrapper), dummy data
        └── pages/      # Landing, Login, Signup, Dashboard, Leads,
                        # AIGenerator, CampaignBuilder, Analytics, Settings
```

## How It Works

1. User signs up or logs in. The backend issues a JWT, which the frontend sends as a `Bearer` token on every request.
2. Leads are stored in MongoDB and queried with search, filter, and pagination params.
3. In the Campaign Builder, the user picks leads and writes the email. On send, the backend loops through each lead, fills placeholders (`{{business_name}}`, `{{first_name}}`, `{{country}}`, `{{email}}`), and sends via the Resend API.
4. The backend returns real sent/failed counts, which are saved on the campaign and shown in the dashboard and analytics.

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (free tier works)
- A Resend account and API key

### Backend

```bash
cd backend
npm install
cp .env.example .env     # then fill in the values below
npm run dev              # http://localhost:5000
```

`backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/emailpro
JWT_SECRET=<long random string>
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_NAME=EmailPro
FROM_EMAIL=onboarding@resend.dev
```

Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

`frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Reference

All routes except `/auth/register` and `/auth/login` require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/me` | Current user |
| GET | `/api/leads` | List leads (`search`, `source`, `page`, `limit`) |
| POST | `/api/leads` | Add a lead |
| PATCH | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |
| POST | `/api/leads/upload-csv` | Bulk import (multipart, field `file`) |
| GET | `/api/campaigns` | List campaigns |
| POST | `/api/campaigns` | Create and send/schedule a campaign (multipart, optional `attachment`) |
| GET | `/api/analytics/overview` | Aggregate stats |
| GET | `/api/analytics/campaigns/top` | Top campaigns by open rate |
| POST | `/api/ai/generate-email` | Generate subject, email, and follow-up |
| GET | `/api/settings/api-key` | Get API key |
| POST | `/api/settings/api-key/rotate` | Rotate API key |
| GET | `/api/settings/test-smtp` | Verify the email provider key |
| GET | `/api/health` | Health check |

## Deployment (Render)

**Backend (Web Service)**
- Root Directory: `backend` (adjust if nested, e.g. `emailpro/backend`)
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables: everything in the backend `.env` above. Render does not read your local `.env`, so add each one in the dashboard.
- In MongoDB Atlas, allow network access from `0.0.0.0/0`.

**Frontend (Static Site)**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment variable: `VITE_API_URL=https://<your-backend>.onrender.com/api`
- Rewrite rule: `/*` to `/index.html` (Rewrite), required for React Router.

After the frontend is live, set the backend's `CLIENT_URL` to the frontend URL to avoid CORS errors.

## Notes and Limitations

- **Email provider:** Render's free tier blocks outbound SMTP ports (25/465/587), so sending uses Resend's HTTPS API instead. Until you verify your own domain in Resend, mail can only be sent from `onboarding@resend.dev` and only to the email address your Resend account was created with.
- **Scheduled campaigns** are stored but not auto-dispatched yet. A cron job or queue (e.g. node-cron, BullMQ) is needed.
- **AI generator** is template-based. `controllers/aiController.js` includes a commented example for calling an LLM API.
- **File uploads** are saved to local disk, which is ephemeral on Render's free tier. Use S3 or Cloudinary for persistence.
- **Team members** on the Settings page are illustrative; the invite endpoint exists but does not send invitations.
- Render free web services sleep after inactivity, so the first request can be slow.

## License

MIT
