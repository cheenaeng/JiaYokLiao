import React from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

function SubmitForm({ formInput, frequencyData, medTimings }) {
  const submitFormData = () => {
    const frequencyTimings = { medTimings };
    const frequencyInfo = { frequencyData };
    const allData = { ...formInput, ...frequencyInfo, ...frequencyTimings };
    axios.post('/formData', allData)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <Button onClick={submitFormData}>Submit Form</Button>
  );
}

export default SubmitForm;
