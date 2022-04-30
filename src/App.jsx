import React, { useState } from 'react';
import { ChakraProvider, Container, Button } from '@chakra-ui/react';

import WeeklySchedule from './components/WeeklySchedule.jsx';
import MedicationRecordForm from './components/formControl/MedicationRecordForm.jsx';
import DisplayMedSchedule from './components/DisplayMedSchedule.jsx';

export default function App() {
  const [allMedRecords, setMedRecords] = useState([]);
  console.log(allMedRecords);

  return (
    <ChakraProvider>
      <Container>
        <button>Click Here</button>
        <WeeklySchedule />
        <DisplayMedSchedule allMedRecords={allMedRecords} setMedRecords={setMedRecords} />
        <MedicationRecordForm />
      </Container>

    </ChakraProvider>

  ); }
