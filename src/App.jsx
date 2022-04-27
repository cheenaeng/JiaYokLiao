import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import WeeklySchedule from './components/WeeklySchedule.jsx';
import MedicationRecordForm from './components/formControl/MedicationRecordForm.jsx';

const later = require('@breejs/later');

export default function App() {
  const input = 1;
  const schedule = later.parse.recur().on('08:00:00', '09:00:00').time();

  console.log(schedule);

  return (
    <ChakraProvider>
      <Container>
        <WeeklySchedule />
        <MedicationRecordForm />

      </Container>
    </ChakraProvider>
  ); }
