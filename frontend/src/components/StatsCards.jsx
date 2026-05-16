// Stats cards component
// Display key statistics on the dashboard

import React from 'react';

function StatsCards({ stats }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Lessons</h3>
        <p className="stat-value">{stats?.totalLessons || 0}</p>
      </div>
      <div className="stat-card">
        <h3>Completed</h3>
        <p className="stat-value">{stats?.completedLessons || 0}</p>
      </div>
      <div className="stat-card">
        <h3>In Progress</h3>
        <p className="stat-value">{stats?.inProgressLessons || 0}</p>
      </div>
      <div className="stat-card">
        <h3>Average Score</h3>
        <p className="stat-value">{stats?.averageScore || 0}%</p>
      </div>
    </div>
  );
}

export default StatsCards;
