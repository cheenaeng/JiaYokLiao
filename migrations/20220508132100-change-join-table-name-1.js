module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('medication_indications');

    await queryInterface.createTable('medication_details_indications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      indication_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'indications',
          key: 'id',
        },
      },
      medication_detail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medication_details',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('medication_indications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      indication_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'indications',
          key: 'id',
        },
      },
      medication_detail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medication_details',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.dropTable('medication_details_indications');
  },

};
