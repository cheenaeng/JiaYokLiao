import { resolve } from 'path';
import db from './models/index.mjs';
import initMedRecordController from './controlllers/medRecord.mjs';
import initUser from './controlllers/user.mjs';
import initMedDetails from './controlllers/MedDetails.mjs';

export default function routes(app) {
  // special JS page. Include the webpack index.html file
  const MedRecord = initMedRecordController(db);
  const User = initUser(db);
  const MedDetails = initMedDetails(db);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/formData', MedRecord.addFormData);
  app.put('/formData', MedRecord.editFormData);
  app.get('/allMeds', MedRecord.findAllMedRecord);
  app.put('/updateDoseStatus', MedRecord.changeDoseStatus);
  app.put('/restartDoseStatus', MedRecord.restartDoseStatus);
  app.post('/registerUser', User.addUser);
  app.post('/verifyUser', User.findUser);
  app.put('/addFCMToken', User.addFCM);
  app.get('/allusers', User.getAllUser);
  app.get('/allMedDetails', MedDetails.findAllMedName);
  app.get('/medicationEdit/:id', MedRecord.findEdit)
}
