module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users',
      'fcm_token', {
        type:
        Sequelize.STRING,
      });
  },

  down: async (queryInterface) => {
    // items table needs to be dropped first because items references categories
    await queryInterface.removeColumn('users, fcm_token');
  },
};
