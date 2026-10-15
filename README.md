<p align="center">
  <img src="./github-logo.png" alt="Skill2Hire Logo" width="200" />
</p>

<h1 align="center">Skill2Hire</h1>

<p align="center">
  <strong>From skill to hired — a skill-first hiring platform that ranks jobs and candidates by how well they actually fit.</strong>
</p>

<hr />

## Overview

Skill2Hire started as a Python backend API built to explore advanced backend architecture and data processing. Once the core matching engine proved robust, it grew into a full-stack product: a FastAPI service paired with a React frontend that puts the matching engine in front of candidates and employers.

The result is a clean, fast hiring platform where candidates upload a resume and instantly see ranked jobs, and employers see pre-scored applicants instead of a pile of resumes.

## Key Features

### Candidate Experience
- **Intelligent Onboarding:** Upload a PDF resume and the system extracts and categorizes skills automatically (PyPDF2 / pdfplumber).
- **Smart Match Dashboard:** Active jobs are ranked by a TF-IDF + cosine-similarity **Match Score** that compares the candidate's skills against each job's requirements.
- **Frictionless Applications:** One-click apply, with real-time status tracking (Applied, Reviewing, Accepted, Rejected) and the ability to withdraw.

### Employer Experience
- **Job Management:** Create, pause, close and manage listings with salary ranges, locations and structured skill arrays.
- **Applicant Tracking:** Applicant cards show match scores and statuses, with quick actions to move candidates through the pipeline.

### Platform & UI
- **Skill2Hire Design System:** A single token-driven stylesheet (`frontend/src/index.css`, `--s2h-*` variables) keeps every screen consistent — ink + teal palette, squared geometry, Sora / DM Sans / JetBrains Mono typography.
- **Responsive by default:** Landing, auth, onboarding and both dashboards adapt from mobile to desktop.
- **Secure Authentication:** JWT-based auth with bcrypt password hashing and email login.

---

## Tech Stack

**Frontend**
- React 19 (Vite 8)
- React Router DOM
- Tailwind CSS 4 (utilities) + custom CSS-variable design system
- Framer Motion, Phosphor Icons

**Backend**
- FastAPI (Python 3.11)
- SQLAlchemy (ORM) & Alembic (migrations)
- PostgreSQL
- scikit-learn (TF-IDF matching), PDF parsing
- Passlib & python-jose (JWT auth)

---

## Project Structure

```
Skill2Hire/
├── app/               # FastAPI application (routers, models, schemas, utils)
├── alembic/           # Database migrations
├── tests/             # Pytest suite (auth, jobs, applications, matching)
├── frontend/          # React + Vite client
│   ├── public/        # Logo, favicon, avatars
│   └── src/           # Components, pages, context, API client, design system
├── live_seeder.sql    # Optional demo data for a live database
├── requirements.txt
└── .env.example
```

---

## Local Development Setup

### 1. Backend

1. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1   # Windows
   # source .venv/bin/activate     # macOS / Linux
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure the environment:
   - Copy `.env.example` to `.env`.
   - Set `DATABASE_URL` to your local PostgreSQL instance and choose a strong `SECRET_KEY`.
   - `FRONTEND_ORIGINS` is a comma-separated list of origins allowed by CORS (defaults to the local Vite server and the Skill2Hire Netlify site).

4. Run migrations:
   ```bash
   alembic upgrade head
   ```

5. Start the API:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend runs on `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
The app runs on `http://localhost:5173`. To point it at a different API, set `VITE_API_BASE_URL` in `frontend/.env` (see `frontend/.env.example`).

### 3. Tests

```bash
pytest
```

---

## Deployment Notes

- **Frontend:** build with `npm run build` (output in `frontend/dist`). `frontend/public/_redirects` enables SPA routing on Netlify.
- **Backend:** set all variables from `.env.example` in your host, and add your deployed frontend URL to `FRONTEND_ORIGINS`.

---

<p align="center">Built with care. <strong>Skill2Hire</strong> — let your skills do the talking.</p>
