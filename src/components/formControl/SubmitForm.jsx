import React from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

function SubmitForm({ formInput }) {
  const submitFormData = () => {
    axios.post('/formData', formInput)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <Button onClick={submitFormData}>Submit Form</Button>
  );
}

export default SubmitForm;
