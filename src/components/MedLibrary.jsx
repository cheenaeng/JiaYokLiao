import React, { useState } from 'react';
import {
  Heading, Text, Box, Input, Button, HStack,
  CloseButton,
} from '@chakra-ui/react';
import axios from 'axios';

function MedLibrary() {
  const [foundMedication, setMedicationFound] = useState([]);
  const [keyedMedicationName, setMedicationName] = useState('');
  const [medNotFound, setNotFound] = useState(false);

  const handleMedInput = (e) => {
    setMedicationName(e.target.value);
  };

  console.log(keyedMedicationName);
  const clearSearchData = () => {
    setMedicationName('');
  };

  const submitMedName = () => {
    const searchMedName = {
      inputName: keyedMedicationName,
    };

    console.log(searchMedName);
    axios.post('/findMedDetail', searchMedName)
      .then((response) => {
        console.log(response.data);
        if (response.data.allMedicationDetails.length === 0) {
          setNotFound(true);
          console.log('not found');
        }
        else {
          console.log(response.data.allMedicationDetails);
          console.log(JSON.parse(response.data.allMedicationDetails[0].medStrength));

          setNotFound(false);
          const formattedDisplayData = response.data.allMedicationDetails.map((detail) => (
            <Box className="med-list-display" p={4}>
              <Text textTransform="capitalize" className="display-title" mb={1}>
                {' '}
                Generic Name:
                {' '}
              </Text>
              <Text textTransform="capitalize" mb={2}>
                {detail.nameGeneric}
              </Text>
              <Text textTransform="capitalize" className="display-title" mb={1}>
                {' '}
                Brands Available:
                {' '}
              </Text>
              <Text textTransform="capitalize" mb={1}>
                {detail.nameBranded?.brandNames[0]}
              </Text>
              <Text textTransform="capitalize" className="display-title" mb={1}>
                {' '}
                Information:
                {' '}
              </Text>
              <Text textTransform="capitalize" mb={2}>
                {detail.additionalRemarks === ' ' ? 'No information to display' : detail.additionalRemarks}
              </Text>
              <Text textTransform="capitalize" className="display-title" mb={1}>
                {' '}
                Strengths Available:
                {' '}
              </Text>
              {(JSON.parse(detail.medStrength)?.medmed_strength).map((strength) => (
                <Text mb={2}>
                  {strength}
                </Text>
              ))}
              <Text textTransform="capitalize" className="display-title" mb={2}>
                {' '}
                Indications:
                {' '}
              </Text>
              <HStack>
                {detail.indications.map((indication, index) => (<Box textTransform="capitalize" className={`indication-box indication-box-${index}`}>{indication.indicationDetail}</Box>))}
              </HStack>
            </Box>
          ));
          setMedicationFound(formattedDisplayData);
        }
        // if no data
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Heading as="h1" textTransform="capitalize" id="form-main-header" p={2}> Medication Information</Heading>
      <Text color="greenC.300" p={2} id="indication-header">Search Medication:</Text>
      <Box>
        <HStack>
          <Input type="text" onChange={(e) => handleMedInput(e)} value={keyedMedicationName} className="form-input-field search-name-field" placeholder="Key in medication name" />
          <CloseButton id="clear-search" onClick={clearSearchData} />
          <Button id="med-name-search-btn" onClick={() => submitMedName()}> Enter</Button>
        </HStack>
        {medNotFound && (<Text mt={1} color="red.500"> Medication not found</Text>)}
      </Box>
      <Box className="medication-detail-container" mt={5} mb={10}>{foundMedication}</Box>

    </>
  );
}

export default MedLibrary;
