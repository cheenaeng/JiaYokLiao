import React from 'react';
import axios from 'axios';
import {
  Heading, Box, Input, FormControl, FormLabel, Button, Flex,
} from '@chakra-ui/react';

import { useFormik } from 'formik';

export default function Registration({ setLoginView, setRegistrationView, setVerification = { setVerification } }) {
  const goLoginView = () => {
    setLoginView(true);
    setRegistrationView(false);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: '',
      username: '',
    },
    onSubmit: (values) => {
      // on submit will send a post request to database to register the user
      const userDetails = {
        email: values.email,
        password: values.password,
        username: values.username,
      };
      axios.post('/registerUser', userDetails)
        .then((response) => {
          console.log(response.data);
          setRegistrationView(false);
          setLoginView(true);
        });
    },
  });

  return (
    <>
      <Flex gap={3} mt={10} mb={2} justify="center">
        <div className="progress-circle left-circle-registration"> </div>
        <div className="progress-circle right-circle-registration"> </div>
      </Flex>
      <Box maxW="60vw" mx="auto" mb={20}>
        <Heading size="lg" className="log-header" textAlign="center" color="greenC.400" mb={2}> REGISTRATION</Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl mb={2}>
            <FormLabel htmlFor="email" fontSize="0.8em">Email Address</FormLabel>
            <Input name="email" type="email" variant="filled" size="sm" value={formik.values.email} onChange={formik.handleChange} />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel htmlFor="username" fontSize="0.8em">Username:</FormLabel>
            <Input name="username" type="text" variant="filled" size="sm" value={formik.values.username} onChange={formik.handleChange} />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel htmlFor="password" fontSize="0.8em">Password:</FormLabel>
            <Input name="password" type="password" variant="filled" size="sm" value={formik.values.password} onChange={formik.handleChange} />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel htmlFor="passwordAgain" fontSize="0.8em">Retype password:</FormLabel>
            <Input name="passwordAgain" type="password" variant="filled" size="sm" value={formik.values.passwordAgain} onChange={formik.handleChange} />
          </FormControl>
          <Button type="submit" className="user-button" isFullWidth>
            Register
          </Button>
        </form>
        <Flex justify="center" mt={5}>
          <Button bg="none" fontSize="0.8em" variant="link" color="greenC.500" mx="auto" onClick={goLoginView}> Click here to go back to Login page </Button>
        </Flex>
      </Box>
    </>

  );
}
