import React from 'react';
import { Heading, Input } from '@chakra-ui/react';
import MedicationForm from './MedicationForm.jsx';

function MedicationRecordForm() {
  return (
    <>
      <Heading as="h1" size="2xl">
        Record your medication
      </Heading>
      <MedicationForm />
    </>
  );
}

export default MedicationRecordForm;
