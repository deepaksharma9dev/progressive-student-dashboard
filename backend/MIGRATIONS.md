# Database Migrations Guide

This guide explains how to set up and manage the database schema using Sequelize migrations.

## Prerequisites

Ensure you have:
- PostgreSQL installed and running
- Node.js installed
- All dependencies installed (`npm install`)
- `.env` file configured with database credentials

## Environment Setup

Update your `.env` file with PostgreSQL connection details:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=student_dashboard
DB_HOST=localhost
DB_PORT=5432
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/student_dashboard
```

## Running Migrations

### 1. Run All Pending Migrations

```bash
npm run migrate
```

This will create all database tables based on the migration files:
- `users` - User accounts (students and mentors)
- `courses` - Course information
- `lessons` - Individual lessons within courses
- `activity_events` - User activity tracking

### 2. Check Migration Status

```bash
sequelize-cli db:migrate:status
```

### 3. Undo Last Migration

```bash
npm run migrate:undo
```

### 4. Undo All Migrations

```bash
npm run migrate:undo:all
```

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `name` - User full name
- `email` - Unique email address
- `password_hash` - Hashed password
- `role` - ENUM: 'student', 'mentor'
- `createdAt`, `updatedAt` - Timestamps

### Courses Table
- `id` - Primary key (auto-increment)
- `title` - Course title
- `description` - Course description
- `createdAt`, `updatedAt` - Timestamps

### Lessons Table
- `id` - Primary key (auto-increment)
- `title` - Lesson title
- `duration_minutes` - Duration in minutes (default: 30)
- `order_no` - Order within course
- `course_id` - Foreign key to courses
- `createdAt`, `updatedAt` - Timestamps

### Activity Events Table
- `id` - Primary key (auto-increment)
- `event_type` - ENUM: 'lesson_started', 'lesson_completed', 'time_spent'
- `time_spent_minutes` - Minutes spent (default: 0)
- `user_id` - Foreign key to users
- `course_id` - Foreign key to courses
- `lesson_id` - Foreign key to lessons
- `createdAt`, `updatedAt` - Timestamps

## Seeding the Database

### 1. Seed All Tables

```bash
npm run seed:all
```

This will populate the database with sample data:
- 3 test users (2 students, 1 mentor)
- 4 sample courses
- 9 lessons across courses
- Activity event records for testing

### 2. Undo All Seeds

```bash
npm run seed:undo:all
```

## Creating New Migrations

### Create a Migration File

```bash
sequelize-cli migration:create --name your-migration-name
```

This creates a new file in the `migrations` folder with up/down methods.

### Example Migration Structure

```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Code to run when migration is applied
    await queryInterface.createTable('table_name', {
      // column definitions
    });
  },

  async down(queryInterface, Sequelize) {
    // Code to run when migration is rolled back
    await queryInterface.dropTable('table_name');
  },
};
```

## Creating New Seeders

### Create a Seeder File

```bash
sequelize-cli seed:create --name seed-name
```

This creates a new file in the `seeders` folder.

### Example Seeder Structure

```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('table_name', [
      // data rows
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('table_name', null, {});
  },
};
```

## Best Practices

1. **Always use migrations** for schema changes
2. **Never modify** old migration files
3. **Create new migrations** for any schema modifications
4. **Test migrations** locally before deploying
5. **Keep seeders separate** from production data
6. **Use meaningful names** for migration files

## Troubleshooting

### Migration Fails with "relation already exists"
This usually means the table was already created. Check the `SequelizeMeta` table to see applied migrations.

### Seeds Not Inserting
Ensure migrations ran first, and foreign key references are correct.

### Connection Refused Error
Check that PostgreSQL is running and connection details in `.env` are correct.

## Integration with Server

The server will automatically sync models on startup:

```javascript
// In server.js
await sequelize.sync();
```

However, it's recommended to use migrations in production for more control.

## Development Workflow

1. Make database schema changes via migrations
2. Run migrations: `npm run migrate`
3. Create seeders for test data
4. Run seeders: `npm run seed:all`
5. Start development server: `npm run dev`

## Additional Resources

- [Sequelize Documentation](https://sequelize.org/)
- [Sequelize CLI](https://github.com/sequelize/cli)
