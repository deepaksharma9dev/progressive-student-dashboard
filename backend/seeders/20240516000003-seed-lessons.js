'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lessons', [
      // JavaScript Basics (course_id: 1)
      {
        title: 'Introduction to Variables',
        duration_minutes: 45,
        order_no: 1,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Understanding Functions',
        duration_minutes: 60,
        order_no: 2,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Control Flow and Loops',
        duration_minutes: 50,
        order_no: 3,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // React Fundamentals (course_id: 2)
      {
        title: 'React Components',
        duration_minutes: 55,
        order_no: 1,
        course_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'State and Props',
        duration_minutes: 65,
        order_no: 2,
        course_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'React Hooks',
        duration_minutes: 70,
        order_no: 3,
        course_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Node.js Backend (course_id: 3)
      {
        title: 'Getting Started with Node.js',
        duration_minutes: 40,
        order_no: 1,
        course_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Express.js Basics',
        duration_minutes: 50,
        order_no: 2,
        course_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Database Integration',
        duration_minutes: 75,
        order_no: 3,
        course_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  },
};
