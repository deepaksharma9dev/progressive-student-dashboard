// Donut chart component
// Display course distribution or completion stats

import React from 'react';

function DonutChart({ data }) {
  const total = data?.reduce((sum, item) => sum + item.value, 0) || 0;

  return (
    <div className="donut-chart">
      <h2>Course Distribution</h2>
      <div className="chart-container">
        <svg width="200" height="200" className="donut-svg">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="20"
          />
          {data && data.map((item, index) => (
            <circle
              key={index}
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={item.color}
              strokeWidth="20"
              strokeDasharray={`${(item.value / total) * 502} 502`}
              transform={`rotate(${
                (data
                  .slice(0, index)
                  .reduce((sum, i) => sum + (i.value / total) * 360, 0) - 90)
              } 100 100)`}
            />
          ))}
        </svg>
        <div className="chart-legend">
          {data &&
            data.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
