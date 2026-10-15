 <div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:6A11CB,100:9B5DE5&text=Skill2Hire&fontSize=55&fontColor=ffffff&fontAlignY=38&desc=Skill-First%20Hiring%20Platform&descAlignY=58&descSize=18" width="100%" alt="Skill2Hire Header" />

# Skill2Hire

### From skill to hired.

**A skill-first hiring platform that connects candidates with relevant opportunities through intelligent resume analysis, job matching, and applicant ranking.**

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=500&size=19&duration=3000&pause=1000&color=9B5DE5&center=true&vCenter=true&width=600&lines=Discover+Jobs+That+Match+Your+Skills;Make+Hiring+Smarter+with+AI+Techniques;Turn+Skills+into+Opportunities" alt="Typing SVG" />

</div>

---

## About Skill2Hire

Skill2Hire is a full-stack recruitment platform designed to make hiring more relevant, efficient, and skill-focused. Combining a **React frontend** with a **FastAPI backend**, it enables candidates to upload resumes, discover matching jobs, and track applications while helping employers manage job listings and evaluate applicants.

Using **TF-IDF vectorization and cosine similarity**, the platform calculates match scores based on candidate skills and job requirements, making it easier to identify relevant opportunities and suitable applicants.

## Features

### Candidate Portal
- **Resume Parsing:** Extract skills and information from uploaded PDF resumes.
- **Smart Job Matching:** Rank job opportunities using TF-IDF and cosine similarity.
- **Match Scores:** Understand how closely your skills align with job requirements.
- **Easy Applications:** Apply for jobs and withdraw applications when needed.
- **Application Tracking:** Monitor application statuses from submission to final decision.

### Employer Portal
- **Job Management:** Create, update, pause, and close job listings.
- **Applicant Ranking:** Review candidates with skill-based match scores.
- **Application Tracking:** Manage applicants through different recruitment stages.
- **Structured Job Listings:** Define skills, locations, and salary ranges.

### Platform Highlights
- JWT-based authentication and bcrypt password hashing.
- Responsive interface for mobile and desktop.
- Centralized design system with an ink-and-teal visual palette.
- REST API architecture powered by FastAPI.
- PostgreSQL database integration with SQLAlchemy and Alembic.
- Automated tests for authentication, jobs, applications, and matching.

## Tech Stack

<div align="center">

**Frontend**

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,css,js" alt="Frontend Technologies" />

**Backend & Database**

<img src="https://skillicons.dev/icons?i=python,fastapi,postgres,sqlalchemy" alt="Backend Technologies" />

**Tools & Libraries**

<img src="https://skillicons.dev/icons?i=git,github,vscode" alt="Development Tools" />

</div>

| Category | Technologies |
|---|---|
| Frontend | React 19, Vite 8, React Router DOM |
| Styling & UI | Tailwind CSS 4, Custom CSS Variables, Framer Motion, Phosphor Icons |
| Backend | Python 3.11, FastAPI |
| Database & ORM | PostgreSQL, SQLAlchemy |
| Database Migrations | Alembic |
| Matching Engine | scikit-learn, TF-IDF, Cosine Similarity |
| Resume Processing | PyPDF2, pdfplumber |
| Authentication | JWT, bcrypt, Passlib, python-jose |
| Testing | Pytest |

## Project Structure

```text
Skill2Hire/
│
├── app/                    # FastAPI backend application
│   ├── routers/            # API route handlers
│   ├── models/             # Database models
│   ├── schemas/            # Request and response schemas
│   └── utils/              # Shared utilities and helpers
│
├── alembic/                # Database migration configuration
│
├── tests/                  # Automated backend test suite
│
├── frontend/               # React + Vite frontend
│   ├── public/              # Logo, favicon, and static assets
│   └── src/                 # Components, pages, context, API client
│
├── live_seeder.sql         # Optional demonstration database data
├── requirements.txt        # Python dependencies
├── .env.example            # Environment configuration template
└── README.md               # Project documentation
```

## How It Works

1. **Create an Account** — Candidates and employers access their respective portals.
2. **Upload a Resume** — Candidates provide a PDF resume for skill extraction.
3. **Analyze Skills** — The backend processes candidate skills and job requirements.
4. **Calculate Match Scores** — TF-IDF and cosine similarity determine job relevance.
5. **Discover Opportunities** — Candidates explore ranked jobs and submit applications.
6. **Manage Recruitment** — Employers review scored applicants and update application statuses.

## Project Goals

- Make recruitment more focused on skills and relevant qualifications.
- Reduce the effort required to identify suitable job opportunities.
- Help employers prioritize relevant applicants.
- Provide a centralized interface for job discovery and recruitment management.
- Demonstrate full-stack development, REST API design, database management, and text-similarity techniques.

## Future Enhancements

- Semantic matching using transformer-based embeddings.
- Explainable match scores with skill-gap analysis.
- Personalized job recommendations.
- Advanced candidate filtering and recruitment analytics.
- Enhanced resume insights and application recommendations.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=120&color=0:9B5DE5,100:6A11CB&section=footer" width="100%" alt="Purple Footer Wave" />

**Skill2Hire — Let your skills do the talking.**

*Built to make hiring smarter, simpler, and more skill-focused.*

</div>
