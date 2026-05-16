# Backend Documentation

Backend API for the Progressive Student Dashboard. It provides authentication, student progress analytics, lesson lookup, mentor reporting, and CSV export.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT authentication
- bcrypt password hashing

## Folder Structure

```text
backend/
  migrations/              Database migration files
  seeders/                 Sequelize seed data
  src/
    app.js                 Express app and route registration
    server.js              Database startup and HTTP listener
    config/
      db.js                Sequelize connection and database bootstrap
      database.js          Sequelize CLI config
    controllers/           Request handlers
    middleware/            Auth middleware
    models/                Sequelize models and associations
    routes/                API route definitions
    seed/                  Direct seed script
```

## Setup

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Update `.env` with your local PostgreSQL credentials.

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
FRONTEND_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## Scripts

```bash
npm start              # Start the API with node
npm run dev            # Start the API with nodemon
npm run seed           # Run src/seed/seed.js
npm run migrate        # Run pending Sequelize migrations
npm run migrate:undo   # Undo the latest migration
npm run seed:all       # Run Sequelize seeders
npm run seed:undo:all  # Undo all Sequelize seeders
```

## Database

The server connects through `src/config/db.js`. On startup, it:

1. Creates the configured PostgreSQL database if it does not exist.
2. Authenticates the Sequelize connection.
3. Runs `sequelize.sync()` to sync models.
4. Starts the Express server.

For schema-controlled workflows, use the migration commands documented in `MIGRATIONS.md`.

Main tables:

- `users`: student and mentor accounts
- `courses`: available courses
- `lessons`: lessons inside each course
- `activity_events`: lesson completion and time tracking events

## Authentication

Protected routes require a JWT in the request header:

```http
Authorization: Bearer <token>
```

Tokens are returned by the register and login endpoints.

## API Endpoints

### Health

```http
GET /
```

Returns API status.

### Auth

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

`role` is optional and defaults to `student`. Valid app roles are `student` and `mentor`.

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

- `/mentor` is available only to users with the `mentor` role.
- `/export/csv` returns a downloadable `student-progress.csv` file.

### Lessons

Lesson routes require authentication.

```http
GET /api/lessons/:courseId
```

Returns lessons for a course with completion status for the authenticated user.

## Response Shape

Most JSON endpoints follow this structure:

```json
{
  "status": true,
  "data": {}
}
```

Errors follow this structure:

```json
{
  "status": false,
  "message": "Error message",
  "error": "Detailed error when available"
}
```

## Development Notes

- Keep route definitions in `src/routes`.
- Keep request logic in `src/controllers`.
- Add shared request checks in `src/middleware`.
- Add database changes through migrations for repeatable setup.
- Run seeders after migrations when you need sample users, courses, lessons, and activity events.
