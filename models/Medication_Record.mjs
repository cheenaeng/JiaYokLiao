export default function initMedicationRecordModel(sequelize, DataTypes) {
  return sequelize.define(
    'medication_record',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      medicationName: {
        type: DataTypes.DECIMAL,
      },
      dose: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.STRING,
      },
      frequency: {
        type: DataTypes.JSON,
      },
      specialInstructions: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      photo: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
