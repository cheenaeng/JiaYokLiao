/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  ChakraProvider, Container, extendTheme, Box, Heading, Center,
} from '@chakra-ui/react';
import axios from 'axios';
import NavBar from './components/NavBar.jsx';
import WeeklySchedule from './components/WeeklySchedule.jsx';
import MedicationForm from './components/MedicationForm.jsx';
import DisplayMedSchedule from './components/DisplayMedSchedule.jsx';
import Notification from './components/Notification.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import MedicationOverview from './components/MedicationOverview.jsx';
import MedLibrary from './components/MedLibrary.jsx';

export default function App() {
  const theme = extendTheme({
    colors: {
      greenC: {
        50: 'edf2f7',
        100: '#e7f4f2',
        200: '#bde6de',
        300: '#85d3c7',
        400: '#2a6b70',
        500: '#265272',
        0: '#eda6aa',
      },
    },
  });
  const [allMedRecords, setMedRecords] = useState([]);
  const [medicationTodays, setTodayMedications] = useState([]);
  const [medData, setMedData] = useState([]);
  const [userVerified, setVerification] = useState(true);

  const [registrationView, setRegistrationView] = useState(false);
  const [loginView, setLoginView] = useState(true);
  const [userFormView, setUserFormView] = useState(false);
  const [dashboardView, setDashboardView] = useState(false);
  const [medDetailsView, setMedDetailsView] = useState(false);
  const [medListView, setMedListView] = useState(false);

  useEffect(() => {
    axios.get('/allMedDetails')
      .then((response) => {
        console.log(response.data, 'responseeee');
        setMedData(response.data.allMedications);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {(registrationView || loginView) && (
      <Center className="main-box" boxShadow="lg" backgroundColor="greenC.400" borderBottomRadius="20">
        <Heading as="h1" color="greenC.0" className="proj-title" mx="auto"> Jia Y0k Liao</Heading>
      </Center>
      ) }
      <Container p={5}>
        {view
        && <Registration setRegistrationView={setRegistrationView} setLoginView={setLoginView} setVerification={setVerification} />}
        {loginView
        && <Login setVerification={setVerification} setDashboardView={setDashboardView} setRegistrationView={setRegistrationView} setLoginView={setLoginView} />}
        { dashboardView && (
          <>
            <WeeklySchedule setUserFormView={setUserFormView} setDashboardView={setDashboardView} />
            <DisplayMedSchedule allMedRecords={allMedRecords} setMedRecords={setMedRecords} medicationTodays={medicationTodays} setTodayMedications={setTodayMedications} />
          </>
        ) }

        {userFormView
        && <MedicationForm userFormView={userFormView} setUserFormView={setUserFormView} medData={medData} />}

        {medListView
        && <MedicationOverview medData={medData} />}

        {medDetailsView
        && <MedLibrary />}
      </Container>
      {(!registrationView && !loginView) && <NavBar setMedDetailsView={setMedDetailsView} setDashboardView={setDashboardView} setUserFormView={setUserFormView} setMedListView={setMedListView} />}
      {(!registrationView && !loginView) && <Notification medicationTodays={medicationTodays} />}
    </ChakraProvider>

  ); }
