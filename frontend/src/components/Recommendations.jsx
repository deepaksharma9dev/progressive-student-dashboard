// Recommendations component
// Display personalized learning recommendations

import React from 'react';

function Recommendations({ recommendations }) {
  return (
    <div className="recommendations">
      <h2>Recommended Next Steps</h2>
      {recommendations && recommendations.length > 0 ? (
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <li key={index} className="recommendation-item">
              <span className="rec-number">{index + 1}</span>
              <span className="rec-text">{rec}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations at the moment. Keep up the great work!</p>
      )}
    </div>
  );
}

export default Recommendations;
