import React, { useState } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';

import WeeklySchedule from './components/WeeklySchedule.jsx';
import MedicationForm from './components/MedicationForm.jsx';
import DisplayMedSchedule from './components/DisplayMedSchedule.jsx';
import Notification from './components/Notification.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';

export default function App() {
  const [allMedRecords, setMedRecords] = useState([]);
  const [medicationTodays, setTodayMedications] = useState([]);
  const [userVerified, setVerification] = useState(false);
  const [userFormView, setUserFormView] = useState(true);
  const [dashboardView, setDashboardView] = useState(true);

  console.log(medicationTodays);

  return (
    <ChakraProvider>
      <Container>
        <Registration />
        <Login setVerification={setVerification} setDashboardView={setDashboardView} />
        {dashboardView && (
          <>
            <WeeklySchedule />
            <DisplayMedSchedule allMedRecords={allMedRecords} setMedRecords={setMedRecords} medicationTodays={medicationTodays} setTodayMedications={setTodayMedications} />
          </>
        ) }
        {userFormView
        && <MedicationForm userFormView={userFormView} setUserFormView={setUserFormView} />}
        <Notification medicationTodays={medicationTodays} />
      </Container>

    </ChakraProvider>

  ); }
