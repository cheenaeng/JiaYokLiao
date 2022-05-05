import React, { useEffect, useState } from 'react';
import {
  Heading, Box, List,
  ListItem, HStack, Button
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import EditForm from './EditForm.jsx';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import axios from 'axios';

const frequencyData = (freqData) => {
  const COMMAND = freqData.rawData.freqOccurence.repeatFrequency;

  const allTimings = freqData.timing.map((time) => `${time.hh}:${time.mm}`);
  let statement = `at ${allTimings}`;
  switch (COMMAND) {
    case 'hourly':
      statement += ' everyday';
      break;

    case 'daily':
      statement += ` every ${freqData.rawData.freqOccurence.qDayInterval} days`;
      break;

    case 'monthly':
      statement += ` every ${freqData.rawData.freqOccurence.qMonthlyInterval} months`;
      break;

    default:
      statement = '';
  }
  return statement;
};

function MedicationOverview({medData}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [medicationEdit,setMedicationEdit]=useState([])
  const [userRecord, setUserMedRecord] = useState([]);
  useEffect(() => {
    axios.get('/allMeds').then((response) => {
      console.log(response.data);
      setUserMedRecord(response.data.allRecords); });
  }, []);

  const showEditForm = (e,med) => {
    onOpen()
    setMedicationEdit([med])
  };

  return (
    <>
      <Heading as="h1" size="2xl"> Your Medication List:</Heading>
      <List>
        {userRecord.map((med) => (
          <ListItem>
            <HStack justifyContent="space-between">
              <Heading as="h3" size="l" textTransform="capitalize">
                {' '}
                Medication Name:
                {med.medicationName}
              </Heading>
              <HStack>
                <Button onClick={(e)=>showEditForm(e,med)}>
                  <EditIcon className="modify-icons" />
                </Button>
                <Button>
                  <DeleteIcon onClick={showEditForm} value={med.id} className="modify-icons" />
                </Button>
              </HStack>
            </HStack>
            <Box>
              {' '}
              Dose: Take/Use
              {' '}
              {med.dose}
              {' '}
              {med.medicationUnits}
              {' '}
              {frequencyData(med.frequency)}
            </Box>
            <Box>
              Special Instructions:
              {!med.specialInstructions ? 'nil' : med.specialInstructions }
            </Box>
            <Box>
              Quantity Left:
              {' '}
              {med.quantity}
            </Box>
            <Box>
              Start Date:
              {' '}
              {`${med.frequency.startDate.dd}/${med.frequency.startDate.mm}/${med.frequency.startDate.yy}`}
            </Box>
            {med.frequency.endDate.dd
            && (
            <Box>
              End Date:
              {' '}
              {`${med.frequency.endDate.dd}/${med.frequency.endDate.mm}/${med.frequency.endDate.yy}`}
            </Box>
            )}
          </ListItem>
        ))}
      </List>
       <Modal onClose={onClose} size='full' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Medication </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <EditForm medicationEdit={medicationEdit} medData={medData}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MedicationOverview;
