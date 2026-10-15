# Skill2Hire — Frontend

React 19 + Vite 8 single-page app for the Skill2Hire platform.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8000` | Base URL of the Skill2Hire FastAPI backend |

Create a `frontend/.env` file to override it.

## Design system

All design tokens (colors, type, radii, shadows) live in `src/index.css` under the `--s2h-*` CSS variables.

- **Fonts:** Sora (display), DM Sans (body), JetBrains Mono (data labels)
- **Palette:** Ink `#062C30`, Teal `#0A7F72`, Amber `#F5A524`, Sky `#2563EB`
- **Shared components:** `src/components` (`Logo`, `Navbar`, `Footer`, `Button`, `Chip`, `MatchRing`, …)
