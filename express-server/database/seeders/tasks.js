//write seeders for tasks
//
// Compare this snippet from express-server/database/seeders/20230130095602-create-task.js:
// 'use strict';


// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert('tasks', [

//       {
//         title: 'Learn React',
//         isCompleted: false,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         title: 'Learn Node',
//         isCompleted: false,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         title: 'Learn Express',
//         isCompleted: false,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         title: 'Learn Sequelize',
//         isCompleted: false,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         title: 'Learn React Native',
//         isCompleted: false,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },

//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('tasks', null, {});
//   }
// };
//