import React from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

function SubmitForm() {
  const submitFormData = () => {
    
    axios.post('/formData', formDetails);
  };
  return (
    <Button onClick={submitFormData}>Submit Form</Button>
  );
}

export default SubmitForm;
