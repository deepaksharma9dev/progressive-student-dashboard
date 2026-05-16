'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses', [
      {
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals including variables, functions, and control structures.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'React Fundamentals',
        description: 'Master React components, state management, and hooks.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Node.js Backend',
        description: 'Build scalable backend applications using Node.js and Express.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Web Design Principles',
        description: 'Learn responsive design and UI/UX best practices.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});
  },
};
