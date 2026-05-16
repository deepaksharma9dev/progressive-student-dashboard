# Progressive Student Dashboard

A comprehensive learning management system designed to help students track their educational progress with real-time analytics, course management, and personalized recommendations.

## Project Structure

```
progressive-student-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── lesson.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── dashboard.controller.js
│   │   ├── seed/
│   │   │   └── seed.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   └── components/
    │       ├── StatsCards.jsx
    │       ├── TrendChart.jsx
    │       ├── CourseProgress.jsx
    │       ├── DonutChart.jsx
    │       └── Recommendations.jsx
    ├── package.json
    └── .env.example
```

## Features

- **User Authentication**: Secure registration and login system
- **Dashboard Analytics**: Real-time student performance metrics
- **Course Tracking**: Monitor progress across multiple courses
- **Learning Recommendations**: AI-powered personalized recommendations
- **Progress Visualization**: Charts and progress bars for visual insights

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
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

### Frontend
- React 18
- React Router for navigation
- Axios for HTTP requests
- CSS3 for styling

## Development Workflow

1. Backend changes require server restart
2. Frontend has hot reload enabled
3. Check `.env.example` files for required environment variables

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Video streaming support
- [ ] Peer collaboration features
- [ ] Integration with third-party tools

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please create an issue in the repository.