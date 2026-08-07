# EmailPro — AI-Powered Email Outreach & Lead Generation

A full-stack SaaS starter: React + Vite + Tailwind frontend, Express + MongoDB backend, JWT auth, CSV/PDF uploads, and a dark glassmorphism UI.

```
emailpro/
├── frontend/     React + Vite + Tailwind (deploy to Vercel)
└── backend/      Express + MongoDB + JWT (deploy to Render)
```

## Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Routes:
- `/` — landing page
- `/login`, `/signup` — auth
- `/app` — dashboard (stats, delivery chart, activity)
- `/app/leads` — lead table, CSV upload, add lead, filters, pagination
- `/app/ai-generator` — AI email generator (mocked; wire to backend `/api/ai/generate-email`)
- `/app/campaigns` — campaign builder (rich text body, lead picker, schedule/send)
- `/app/analytics` — trend chart, funnel, country breakdown, top campaigns
- `/app/settings` — provider integrations, API key, team, theme toggle

The frontend currently runs on realistic **mock data** (`src/lib/dummyData.js`) so it's fully interactive out of the box. To connect it to the real API, add a `.env` with:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

and replace the dummy-data calls with `fetch`/`axios` calls to the endpoints listed below, using the JWT returned from `/api/auth/login`.

**Deploy to Vercel:**
1. Push this repo to GitHub.
2. Import the `frontend` folder as a new Vercel project (Framework: Vite).
3. Set `VITE_API_URL` as an environment variable pointing to your Render backend.
4. Deploy.

## Backend

```bash
cd backend
cp .env.example .env    # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev              # http://localhost:5000
```

### REST API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/me` | Current user (protected) |
| GET | `/api/leads` | List leads (search, source, page, limit) |
| POST | `/api/leads` | Add lead manually |
| PATCH | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |
| POST | `/api/leads/upload-csv` | Bulk import via CSV (`multipart/form-data`, field `file`) |
| GET | `/api/campaigns` | List campaigns |
| GET | `/api/campaigns/:id` | Get one campaign |
| POST | `/api/campaigns` | Create campaign (`attachment` file field optional) |
| PATCH | `/api/campaigns/:id` | Update campaign |
| DELETE | `/api/campaigns/:id` | Delete campaign |
| GET | `/api/analytics/overview` | Aggregate stats |
| GET | `/api/analytics/campaigns/top` | Top campaigns by open rate |
| POST | `/api/ai/generate-email` | AI subject/body/follow-up (mocked; see `controllers/aiController.js` for the real-LLM stub) |
| GET | `/api/settings/api-key` | Get API key |
| POST | `/api/settings/api-key/rotate` | Rotate API key |
| GET | `/api/settings/team` | Get team + members |
| POST | `/api/settings/team/invite` | Invite a team member |

All protected routes require `Authorization: Bearer <token>`.

### Sending real campaign emails (SMTP)

Campaign sending is fully wired to real SMTP via `nodemailer` — no more simulated stats. When you send a campaign immediately, the backend actually emails every selected lead.

1. Get SMTP credentials from any provider — SendGrid, Mailgun, Postmark, Amazon SES, Brevo, or your own mail server.
2. Add these to `backend/.env`:
   ```
   SMTP_HOST=smtp.yourprovider.com
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   SMTP_SECURE=false        # true only if using port 465
   FROM_NAME=EmailPro
   FROM_EMAIL=you@yourdomain.com
   ```
3. Restart the backend, then go to **Settings → Email sending (SMTP)** in the app and click **Test connection** to confirm it can authenticate before sending real campaigns.
4. Create a campaign and select leads — clicking "Send campaign" now actually dispatches one email per lead and reports real sent/bounced counts back in the UI.

Notes:
- Email body supports `{{business_name}}`, `{{first_name}}`, `{{country}}`, and `{{email}}` placeholders, filled in per-lead.
- **Scheduled** campaigns are saved with status `Scheduled` but are not auto-dispatched — there's no background job runner yet. To make scheduling actually fire emails at the chosen time, add a cron job (e.g. `node-cron`) or a queue (e.g. BullMQ + Redis) that polls for due campaigns and calls `sendCampaignEmails()` from `utils/mailer.js`.
- Many providers (Gmail included) require an **app password** rather than your normal account password, and may need "less secure app" / app-specific settings enabled.
- If you see leads flagged as bounced, check `failures` in the campaign-create response for the specific SMTP error per address (often invalid address format or provider rate limits).

### Wiring real AI generation

`controllers/aiController.js` currently returns deterministic mock content. A commented example for calling the Anthropic Messages API is included in that file — add `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`) to `.env` and swap in the real `fetch` call.

**Deploy to Render:**
1. Push this repo to GitHub.
2. New Web Service → root directory `backend` → build command `npm install` → start command `npm start`.
3. Add environment variables from `.env.example` (use a real MongoDB Atlas `MONGO_URI` and a strong `JWT_SECRET`).
4. Set `CLIENT_URL` to your deployed Vercel frontend URL for CORS.

## Notes

- Frontend ships with realistic dummy data so every screen is interactive without a backend running.
- Backend is structured (models/controllers/routes/middleware) but has not been run against a live MongoDB instance in this environment — test locally with MongoDB Atlas or `mongod` before deploying.
- Multer v2 is used for uploads (CSV for leads, PDF for campaign attachments), capped at 10MB.
