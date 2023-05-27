module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        display_name: 'Steven G. Rogers',
        email: 'steve@avengers.com',
        password: '1st avenger',
        image: 'https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br',
      },
      {
        id: 2,
        display_name: 'Anthony E. Stark',
        email: 'tony@avengers.com',
        password: '123456',
        image: 'https://cdn.shopify.com/s/files/1/0513/5692/6151/files/oculos-tony-stark-vingadores-edith-loja-da-ciencia-9_480x480.png?v=1616287934',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
