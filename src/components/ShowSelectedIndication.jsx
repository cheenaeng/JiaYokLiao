import React from 'react';
import {
  Heading, Text,
} from '@chakra-ui/react';

function ShowSelectedIndication({ selectedIndication }) {
  return (
    <>
      <Heading as="h1" textTransform="capitalize" id="form-main-header" p={2}> Medications</Heading>
      <Text color="greenC.300" p={2} mb={2} id="indication-header">
        Indication:
        {' '}
        <Text>
          {' '}
          {selectedIndication[0].indicationDetail}
        </Text>
      </Text>

    </>
  );
}

export default ShowSelectedIndication;
