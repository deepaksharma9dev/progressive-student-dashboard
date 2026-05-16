// Trend chart component
// Display progress trends over time

import React from 'react';

function TrendChart({ data }) {
  return (
    <div className="trend-chart">
      <h2>Learning Trend</h2>
      <div className="chart-placeholder">
        {data && data.length > 0 ? (
          <canvas id="trendCanvas"></canvas>
        ) : (
          <p>No trend data available</p>
        )}
      </div>
      <p className="chart-description">
        This chart shows your learning progress over the last 30 days
      </p>
    </div>
  );
}

export default TrendChart;
