module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('medication_records',
      'dose_taken', {
        type:
        Sequelize.JSON,
      });
  },

  down: async (queryInterface) => {
    // items table needs to be dropped first because items references categories
    await queryInterface.removeColumn('medication_records, dose_taken');
  },
};
