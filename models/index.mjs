import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initIndicationModel from './Indication.mjs';
import initMedicationDetailModel from './Medication_detail.mjs';
import initUserModel from './User.mjs';
import initMedicationRecordModel from './Medication_Record.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Indication = initIndicationModel(sequelize, Sequelize.DataTypes);
db.MedicationDetail = initMedicationDetailModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.MedicationRecord = initMedicationRecordModel(sequelize, Sequelize.DataTypes);

db.MedicationRecord.belongsTo(db.User);
db.User.hasMany(db.MedicationRecord);

// one to one relationship
// db.MedicationRecord.hasOne(db.MedicationDetail);
// db.MedicationDetail.belongsTo(db.MedicationRecord);

// indication and medication detail tables are linked by medication_indication table
db.Indication.belongsToMany(db.MedicationDetail, { through: 'medication_details_indications' });
db.MedicationDetail.belongsToMany(db.Indication, { through: 'medication_details_indications' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
