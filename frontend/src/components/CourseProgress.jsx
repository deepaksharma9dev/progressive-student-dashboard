// Course progress component
// Display individual course progress

import React from 'react';

function CourseProgress({ courses }) {
  return (
    <div className="course-progress">
      <h2>Course Progress</h2>
      {courses && courses.length > 0 ? (
        <div className="courses-list">
          {courses.map((course, index) => (
            <div key={index} className="course-item">
              <div className="course-header">
                <h3>{course.name}</h3>
                <span className="progress-percentage">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
}

export default CourseProgress;
