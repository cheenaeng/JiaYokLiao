import { resolve } from 'path';
import db from './models/index.mjs';
import initMedRecordController from './controlllers/medRecord.mjs';
import initUser from './controlllers/user.mjs';

export default function routes(app) {
  // special JS page. Include the webpack index.html file
  const MedRecord = initMedRecordController(db);
  const User = initUser(db);
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/formData', MedRecord.addFormData);
  app.get('/allMeds', MedRecord.findAllMedRecord);
  app.put('/updateDoseStatus', MedRecord.changeDoseStatus);
  app.put('/restartDoseStatus', MedRecord.restartDoseStatus);
  app.post('/registerUser', User.addUser);
  app.post('/verifyUser', User.findUser);

  // app.post('/subscribe', initUser.addSubscription);
}
