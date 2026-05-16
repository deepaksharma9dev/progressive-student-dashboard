'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: '$2a$10$YjNfcfXnBkIj0D0dxVwKAe1DP5tSl7j5VxqVZRZJn5L5Y5K5K5K5K', // password: password123
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password_hash: '$2a$10$YjNfcfXnBkIj0D0dxVwKAe1DP5tSl7j5VxqVZRZJn5L5Y5K5K5K5K',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Prof. Anderson',
        email: 'anderson@example.com',
        password_hash: '$2a$10$YjNfcfXnBkIj0D0dxVwKAe1DP5tSl7j5VxqVZRZJn5L5Y5K5K5K5K',
        role: 'mentor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
