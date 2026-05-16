'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('activity_events', [
      {
        event_type: 'lesson_started',
        time_spent_minutes: 0,
        user_id: 1,
        course_id: 1,
        lesson_id: 1,
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-10'),
      },
      {
        event_type: 'lesson_completed',
        time_spent_minutes: 45,
        user_id: 1,
        course_id: 1,
        lesson_id: 1,
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-10'),
      },
      {
        event_type: 'lesson_started',
        time_spent_minutes: 0,
        user_id: 1,
        course_id: 1,
        lesson_id: 2,
        createdAt: new Date('2024-05-11'),
        updatedAt: new Date('2024-05-11'),
      },
      {
        event_type: 'time_spent',
        time_spent_minutes: 30,
        user_id: 1,
        course_id: 1,
        lesson_id: 2,
        createdAt: new Date('2024-05-11'),
        updatedAt: new Date('2024-05-11'),
      },
      {
        event_type: 'lesson_started',
        time_spent_minutes: 0,
        user_id: 1,
        course_id: 2,
        lesson_id: 4,
        createdAt: new Date('2024-05-12'),
        updatedAt: new Date('2024-05-12'),
      },
      {
        event_type: 'time_spent',
        time_spent_minutes: 20,
        user_id: 1,
        course_id: 2,
        lesson_id: 4,
        createdAt: new Date('2024-05-12'),
        updatedAt: new Date('2024-05-12'),
      },
      {
        event_type: 'lesson_started',
        time_spent_minutes: 0,
        user_id: 2,
        course_id: 2,
        lesson_id: 4,
        createdAt: new Date('2024-05-11'),
        updatedAt: new Date('2024-05-11'),
      },
      {
        event_type: 'lesson_completed',
        time_spent_minutes: 55,
        user_id: 2,
        course_id: 2,
        lesson_id: 4,
        createdAt: new Date('2024-05-11'),
        updatedAt: new Date('2024-05-11'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activity_events', null, {});
  },
};
