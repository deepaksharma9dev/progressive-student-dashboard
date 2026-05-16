# Frontend Documentation

Frontend app for the Progressive Student Dashboard. It provides login, sign up, protected dashboard UI, progress charts, course progress cards, lesson details, mentor overview, and CSV export action.

## Tech Stack

- React 19
- Vite
- React Router
- Axios
- Recharts
- Tailwind CSS
- Lucide React icons

## Folder Structure

```text
frontend/
  public/
    favicon.svg
    icons.svg
  src/
    api/
      axios.js          Shared Axios client
    assets/             Static frontend assets
    pages/
      Login.jsx         Login and sign up screen
      Dashboard.jsx     Student and mentor dashboard
    App.jsx             App routes and protected route wrapper
    main.jsx            React entry point
    index.css           Tailwind and global styles
    App.css             App-level styles
```

## Setup

Use Node.js 20.19 or newer.

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

If `.env.example` is not present, create `.env` manually:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production assets
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Environment Variables

Vite exposes only variables prefixed with `VITE_`.

```env
VITE_API_URL=http://localhost:5000/api
```

The Axios client in `src/api/axios.js` uses `VITE_API_URL` as its base URL and automatically attaches the saved JWT token:

```http
Authorization: Bearer <token>
```

## Routing

Routes are defined in `src/App.jsx`.

```text
/login  Public login page
/       Protected dashboard page
```

`ProtectedRoute` checks for a `token` in `localStorage`. Users without a token are redirected to `/login`.

## API Usage

The dashboard calls these backend endpoints:

```text
POST /auth/register
POST /auth/login
GET /dashboard/summary
GET /dashboard/time-series
GET /dashboard/course-progress
GET /dashboard/completion-distribution
GET /dashboard/recommendations
GET /dashboard/mentor
GET /dashboard/export/csv
GET /lessons/:courseId
```

The Axios base URL already includes `/api`, so `api.get("/dashboard/summary")` resolves to:

```text
http://localhost:5000/api/dashboard/summary
```

## Local Storage

The app expects these values after login or sign up:

```text
token  JWT returned by the backend
user   JSON string with id, name, email, and role
```

Logout clears local storage and redirects the user to `/login`.

## Dashboard Behavior

The dashboard loads summary data, learning trends, course progress, completion distribution, and recommendations when it mounts.

Students see:

- Summary cards
- Learning trend chart
- Completion chart
- Course progress
- Lesson details
- Recommendation panel

Mentors also see:

- Student activity table from `/dashboard/mentor`

## Styling

Tailwind is configured through:

```text
tailwind.config.js
postcss.config.js
src/index.css
```

Use the existing utility-class style when adding UI. The dashboard currently uses light panels, slate text, blue primary actions, and responsive grid layouts.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the built app:

```bash
npm run preview
```

Deploy the generated `dist/` directory to your frontend host and set `VITE_API_URL` to the deployed backend API URL before building.
