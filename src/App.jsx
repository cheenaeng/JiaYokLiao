import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import WeeklySchedule from './components/WeeklySchedule.jsx';
import MedicationRecordForm from './components/formControl/MedicationRecordForm.jsx';

export default function App() {
  const input = 1;
  return (

    <ChakraProvider>
      <Container>
        {input === 0
        && <WeeklySchedule />}
        <MedicationRecordForm />
      </Container>
    </ChakraProvider>
  ); }
