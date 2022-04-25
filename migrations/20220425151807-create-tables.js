module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
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
    await queryInterface.createTable('medication_records', {
      id: {
        // allowNull is an example of a DB constraint
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medication_name: {
        type: Sequelize.STRING,
      },
      dose: {
        type: Sequelize.DECIMAL,
      },
      quantity: {
        type: Sequelize.DECIMAL,
      },
      frequency: {
        type: Sequelize.JSON,
      },
      special_instructions: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      photo: {
        type: Sequelize.STRING,
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
    await queryInterface.createTable('medication_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_generic: {
        type: Sequelize.STRING,
      },
      name_branded: {
        type: Sequelize.JSON,
      },
      additional_remarks: {
        type: Sequelize.STRING,
      },
      med_strength: {
        type: Sequelize.STRING,
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
    await queryInterface.createTable('indications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      indication_detail: {
        type: Sequelize.TEXT,
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
      medication_details_id: {
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

  down: async (queryInterface) => {
    // items table needs to be dropped first because items references categories
    await queryInterface.dropTable('medication_indications');
    await queryInterface.dropTable('indications');
    await queryInterface.dropTable('medication_details');
    await queryInterface.dropTable('medication_records');
    await queryInterface.dropTable('users');
  },
};
