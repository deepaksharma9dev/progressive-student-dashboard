# Progressive Student Dashboard

A full-stack learning analytics dashboard for students and mentors. Students can create an account, log in, track course progress, inspect lesson completion, view learning trends, receive course recommendations, and export progress as CSV. Mentors can view student activity from a mentor-only dashboard section.

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

<<<<<<< HEAD
## Tech Stack
=======
## Getting Started

### Prerequisites

- Node.js (v20.19 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Dashboard
- `GET /api/dashboard/stats` - Get user statistics
- `GET /api/dashboard/progress` - Get course progress
- `GET /api/dashboard/recommendations` - Get learning recommendations

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons/:id/complete` - Mark lesson as complete

## Technologies Used

### Backend
- Node.js / Express.js
- MongoDB (recommended)
- JWT for authentication
- CORS for cross-origin requests
>>>>>>> bedb63fd0b004adc2a13f412276312aeba617c49

### Frontend

- React 19
- Vite
- React Router
- Axios
- Recharts
- Tailwind CSS
- Lucide React

### Backend

<<<<<<< HEAD
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
      controllers/
        auth.controller.js
        dashboard.controller.js
        lesson.controller.js
      middleware/
        auth.js              JWT authentication middleware
      models/
        User.js
        Course.js
        Lesson.js
        ActivityEvent.js
        index.js             Model associations
      routes/
        auth.routes.js
        dashboard.routes.js
        lesson.routes.js
      seed/
        seed.js              Direct seed script
    .env.example
    MIGRATIONS.md
    README.md
  frontend/
    public/
    src/
      api/
        axios.js             Shared Axios client
      pages/
        Login.jsx            Login and sign up UI
        Dashboard.jsx        Student and mentor dashboard UI
      App.jsx                Routes and protected route wrapper
      main.jsx               React entry point
      index.css              Tailwind/global styles
    .env.example
    README.md
  APPLICATION_DOC.md         Notion-ready project documentation
```

## Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL running locally or available through a connection URL

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

The server creates the configured database if it does not already exist, authenticates Sequelize, syncs models, and starts Express.

### 2. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend usually runs on:

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

## Available Scripts

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

All frontend API calls use the base URL:

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

Returns a simple API running message.

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

Successful auth responses include:

```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": 1,
      "name": "Student Name",
      "email": "student@example.com",
      "role": "student"
    }
  }
}
```

### Dashboard

All dashboard routes are protected.

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

- `/api/dashboard/mentor` requires the authenticated user to have `role: "mentor"`.
- `/api/dashboard/export/csv` returns `student-progress.csv`.

### Lessons

```http
GET /api/lessons/:courseId
```

Returns lessons for the selected course with completion status for the logged-in user.

## Database

The app uses PostgreSQL with Sequelize. Core models are:

- `User`: name, email, password hash, and role (`student` or `mentor`)
- `Course`: course title and description
- `Lesson`: title, duration, order, and course relationship
- `ActivityEvent`: event type, time spent, and relationships to user/course/lesson

Associations:

- A course has many lessons.
- A user has many activity events.
- A course has many activity events.
- A lesson has many activity events.

For migration-specific workflow, see [backend/MIGRATIONS.md](backend/MIGRATIONS.md).

## Frontend Flow

1. User opens `/login`.
2. User logs in or creates an account.
3. Backend returns a JWT token and user object.
4. Frontend stores `token` and `user` in `localStorage`.
5. User is redirected to `/`.
6. `ProtectedRoute` allows dashboard access only when a token exists.
7. Dashboard loads summary, charts, course progress, recommendations, lessons, and mentor data when applicable.

## Local Storage

The frontend stores:

```text
token  JWT from the backend
user   JSON string containing id, name, email, and role
```

Logout clears local storage and redirects to `/login`.

## Documentation Files

- [APPLICATION_DOC.md](APPLICATION_DOC.md): Notion-ready application documentation with screenshot placeholders.
- [backend/README.md](backend/README.md): Backend-specific setup and API notes.
- [frontend/README.md](frontend/README.md): Frontend-specific setup and UI notes.
- [backend/MIGRATIONS.md](backend/MIGRATIONS.md): Migration and seeding guide.

## Known Development Notes

- Make sure `FRONTEND_URL` in the backend matches the Vite dev URL, usually `http://localhost:5173`.
- The frontend Axios base URL must include `/api`.
- Use migrations and seeders when you need a repeatable database setup.
- The production frontend build may warn about large chunks because charting and UI dependencies are bundled together.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
=======
## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please create an issue in the repository.
>>>>>>> bedb63fd0b004adc2a13f412276312aeba617c49
