// Dashboard controller
// Handle dashboard data retrieval and analytics

const getStats = async (req, res) => {
  try {
    const stats = {
      totalLessons: 45,
      completedLessons: 23,
      inProgressLessons: 8,
      averageScore: 78.5
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const progress = {
      courses: [
        { name: 'JavaScript Basics', progress: 65 },
        { name: 'React Fundamentals', progress: 45 },
        { name: 'Node.js Backend', progress: 30 }
      ]
    };
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const recommendations = [
      'Focus on completing React module',
      'Review CSS Grid concepts',
      'Practice async/await patterns'
    ];
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStats,
  getProgress,
  getRecommendations
};
