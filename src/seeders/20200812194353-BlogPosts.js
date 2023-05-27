module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('blog_posts', [
      {
        id: 1,
        title: 'Consectetur excepteur.',
        content: `Veniam amet fugiat consectetur officia do quis aute amet.`,
        user_id: 1,
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:51.000Z'),
      },
      {
        id: 2,
        title: 'Ipsum amet amet magna id.',
        content:
          'Consequat in officia cupidatat veniam magna adipisicing qui dolor occaecat enim id sit ad.',
        user_id: 1,
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:51.000Z'),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('blog_posts', null, {});
  },
};
