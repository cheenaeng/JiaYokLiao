import React, { useState } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';

import WeeklySchedule from './components/WeeklySchedule.jsx';
import MedicationRecordForm from './components/formControl/MedicationRecordForm.jsx';
import DisplayMedSchedule from './components/DisplayMedSchedule.jsx';
import { getFCMToken } from './firebasePermission.js';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';

export default function App() {
  const [allMedRecords, setMedRecords] = useState([]);
  const [userVerified, setVerification] = useState(false);
  console.log(allMedRecords);
  getFCMToken().then((token) => console.log(token));

  return (
    <ChakraProvider>
      <Container>
        <Registration />
        <Login setVerification={setVerification} />
        <WeeklySchedule />
        <DisplayMedSchedule allMedRecords={allMedRecords} setMedRecords={setMedRecords} />
        <MedicationRecordForm />
      </Container>

    </ChakraProvider>

  ); }
