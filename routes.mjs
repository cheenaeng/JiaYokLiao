import { resolve } from 'path';
import db from './models/index.mjs';
import initMedRecordController from './controlllers/medRecord.mjs';

export default function routes(app) {
  // special JS page. Include the webpack index.html file
  const MedRecord = initMedRecordController(db);
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/formData', MedRecord.addFormData);
  app.get('/allMeds', MedRecord.findAllMedRecord);
}
