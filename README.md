# Progressive Student Dashboard

A full-stack learning analytics dashboard for students and mentors. Students can create an account, log in, track course progress, inspect lesson completion, view learning trends, receive recommendations, and export progress as CSV. Mentors can view student activity from a mentor-only dashboard section.

## Features

- Student and mentor sign up/login with JWT authentication
- Protected dashboard route on the frontend
- Summary cards for completed lessons, total lessons, time spent, and overall progress
- Learning trend line chart powered by activity events
- Completion distribution chart for completed vs pending lessons
- Course progress cards with lesson detail drill-down
- Role-aware mentor dashboard for student activity
- CSV export for student course progress
- PostgreSQL schema managed with Sequelize models, migrations, and seeders

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Recharts
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT
- bcryptjs
- json2csv

## Repository Structure

```text
progressive-student-dashboard/
  backend/
    migrations/              Sequelize migration files
    seeders/                 Sequelize seed data
    src/
      app.js                 Express app setup and route mounting
      server.js              Database bootstrap and server startup
      config/
        db.js                Sequelize connection and database creation
        database.js          Sequelize CLI config
      controllers/           Request handlers
      middleware/            JWT auth middleware
      models/                Sequelize models and associations
      routes/                API route definitions
      seed/                  Direct seed script
    .env.example
    MIGRATIONS.md
    README.md
  frontend/
    public/
    src/
      api/axios.js           Shared Axios client
      pages/Login.jsx        Login and sign up UI
      pages/Dashboard.jsx    Student and mentor dashboard UI
      App.jsx                Routes and protected route wrapper
      main.jsx               React entry point
      index.css              Tailwind/global styles
    .env.example
    README.md
  APPLICATION_DOC.md         Notion-ready documentation with screenshot placeholders
```

## Prerequisites

- Node.js 20.19 or newer
- npm
- PostgreSQL running locally or available through a connection URL

## Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Vite usually serves the frontend at:

```text
http://localhost:5173
```

## Environment Variables

### Backend `.env`

```env
PORT=5000
NODE_ENV=development
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=student_dashboard
DB_HOST=localhost
DB_PORT=5432
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/student_dashboard
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Scripts

### Backend

```bash
npm start              # Start with node
npm run dev            # Start with nodemon
npm run seed           # Run src/seed/seed.js
npm run migrate        # Run Sequelize migrations
npm run migrate:undo   # Undo latest migration
npm run migrate:undo:all
npm run seed:all       # Run Sequelize seeders
npm run seed:undo
npm run seed:undo:all
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production assets
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Reference

The backend API base URL is:

```text
http://localhost:5000/api
```

Protected endpoints require:

```http
Authorization: Bearer <token>
```

### Health

```http
GET /
```

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

Register body:

```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123",
  "role": "student"
}
```

Login body:

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

### Dashboard

All dashboard routes require authentication.

```http
GET /api/dashboard/summary
GET /api/dashboard/time-series
GET /api/dashboard/course-progress
GET /api/dashboard/completion-distribution
GET /api/dashboard/recommendations
GET /api/dashboard/mentor
GET /api/dashboard/export/csv
```

Notes:

- `/api/dashboard/mentor` requires `role: "mentor"`.
- `/api/dashboard/export/csv` returns `student-progress.csv`.

### Lessons

```http
GET /api/lessons/:courseId
```

Returns lessons for the selected course with completion status for the authenticated user.

## Database

The app uses PostgreSQL with Sequelize.

Core models:

- `User`: name, email, password hash, and role
- `Course`: title and description
- `Lesson`: title, duration, order, and course relationship
- `ActivityEvent`: event type, time spent, and user/course/lesson relationships

Associations:

- A course has many lessons.
- A user has many activity events.
- A course has many activity events.
- A lesson has many activity events.

For migration details, see [backend/MIGRATIONS.md](backend/MIGRATIONS.md).

## Frontend Flow

1. User opens `/login`.
2. User logs in or signs up.
3. Backend returns a JWT token and user object.
4. Frontend stores `token` and `user` in `localStorage`.
5. User is redirected to `/`.
6. `ProtectedRoute` allows dashboard access only when a token exists.
7. Dashboard loads summary, charts, progress, lessons, recommendations, and mentor data when applicable.

## Documentation

- [APPLICATION_DOC.md](APPLICATION_DOC.md): Notion-ready application documentation with screenshot placeholders.
- [backend/README.md](backend/README.md): Backend-specific documentation.
- [frontend/README.md](frontend/README.md): Frontend-specific documentation.
- [backend/MIGRATIONS.md](backend/MIGRATIONS.md): Migration and seeding guide.

## Known Notes

- `FRONTEND_URL` should match the Vite dev URL, usually `http://localhost:5173`.
- `VITE_API_URL` must include `/api`.
- Production frontend builds may warn about chunk size because charting dependencies are bundled into the app.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
