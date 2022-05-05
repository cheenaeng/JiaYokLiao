module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('medication_records',
      'medication_units', {
        type:
        Sequelize.STRING,
      });
  },

  down: async (queryInterface) => {
    // items table needs to be dropped first because items references categories
    await queryInterface.removeColumn('medication_records, medication_units');
  },
};
