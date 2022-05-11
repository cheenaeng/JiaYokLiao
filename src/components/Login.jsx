import React from 'react';
import axios from 'axios';
import {
  Heading, Box, Input, FormControl, FormLabel, Button, Alert, Flex,
} from '@chakra-ui/react';

import { useFormik } from 'formik';
import { getFCMToken } from '../firebasePermission';

export default function Login({
  setVerification, setDashboardView, setRegistrationView, setLoginView,
}) {
  const goRegistrationView = () => {
    setRegistrationView(true);
    setLoginView(false);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },

    onSubmit: (values) => {
      // on submit will send a post request to database to register the user
      const userDetails = {
        email: values.email,
        password: values.password,
      };
      axios.post('/verifyUser', userDetails)
        .then((response) => {
          console.log(response.data);
          if (!response.data.verifiedUser) {
            console.log('error- verification is wrong');
          }
          setVerification((verified) => verified = true);
          getFCMToken().then((token) => {
            console.log(token);
            const userToken = {
              fcmToken: token,
            };
            axios.put('/addFCMToken', userToken)
              .then((res) => console.log(res.data))
              .catch((error) => console.log(error));
          });
          setDashboardView((prevView) => prevView = true);
          setLoginView(false);
        }).catch((error) => console.log(error));
    },
  });

  return (
    <>
      <Flex gap={3} mt={20} mb={2} justify="center">
        <div className="progress-circle left-circle-login"> </div>
        <div className="progress-circle right-circle-login"> </div>
      </Flex>
      <Box maxW="60vw" mx="auto" mb={20}>
        <Heading size="lg" className="log-header" textAlign="center" color="greenC.400" mb={2}> USER LOGIN</Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl mb={2}>
            <FormLabel htmlFor="email" fontSize="0.8em">Email Address</FormLabel>
            <Input name="email" type="email" variant="filled" size="sm" value={formik.values.email} onChange={formik.handleChange} />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel htmlFor="password" fontSize="0.8em">Password:</FormLabel>
            <Input name="password" type="password" variant="filled" size="sm" value={formik.values.password} onChange={formik.handleChange} />
          </FormControl>
          <Button type="submit" className="user-button" isFullWidth boxShadow="lg">
            Login
          </Button>
        </form>
        <Flex justify="center" mt={5}>
          <Button bg="none" fontSize="0.8em" variant="link" color="greenC.500" mx="auto" onClick={goRegistrationView}> No account? Click here to register </Button>
        </Flex>
      </Box>
    </>

  );
}
