'use strict';

// https://stackoverflow.com/questions/62667269/sequelize-js-how-do-we-change-column-type-in-migration
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'image',
          {
            allowNull: true,
            type: Sequelize.STRING,
          },
          {
            transaction,
          }
        ),
      ]);
    }),

  down: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'image',
          {
            allowNull: false,
            type: Sequelize.STRING,
          },
          {
            transaction,
          }
        ),
      ]);
    }),
};
