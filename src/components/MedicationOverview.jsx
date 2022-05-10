import React, { useEffect, useState, useRef } from 'react';
import {
  Heading, Box, List, Flex, Icon,
  ListItem, HStack, Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { MdOutlineAdd } from 'react-icons/md';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import axios from 'axios';
import EditForm from './EditForm.jsx';

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

function MedicationOverview({ medData }) {
  const cancelRef = useRef();
  const [editStatus, updateEditStatus] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDeleteModal, onClose: onCloseModal } = useDisclosure();
  const [medicationEdit, setMedicationEdit] = useState([]);
  const [userRecord, setUserMedRecord] = useState([]);
  const [recordToDelete, setDeleteMedRecord] = useState([]);
  useEffect(() => {
    axios.get('/allMeds').then((response) => {
      updateEditStatus(false);
      console.log(response.data);
      setUserMedRecord(response.data.allRecords); });
  }, [editStatus]);

  const showEditForm = (e, med) => {
    onOpen();
    setMedicationEdit([med]);
  };

  const showEditAlert = (med) => {
    onOpenDeleteModal();
    setDeleteMedRecord([med]);
  };

  const deleteRecord = () => {
    console.log('delete');
    axios.delete(`/record/${recordToDelete[0].id}`)
      .then((response) => {
        console.log(response.data);
        updateEditStatus(true);
        onCloseModal();
      })
      .catch((error) => console.log(error));
  };

  console.log(editStatus);

  return (
    <>
      <Flex p={1} justify="end">
        <Icon as={MdOutlineAdd} className="add-button" />
      </Flex>
      <Heading as="h1" textTransform="capitalize" id="form-main-header" p={3} mb={4}> Your Medication List:</Heading>
      <List mb={10} spacing={5}>
        {userRecord.map((med) => (
          <ListItem
            className="medication-list"
            p={2}
            boxShadow="lg"
          >
            <HStack justifyContent="space-between">
              <Heading as="h3" size="l" textTransform="capitalize">
                {' '}
                Name:
                {med.medicationName}
              </Heading>
              <HStack>
                <Button className="modify-icons-buttons" onClick={(e) => showEditForm(e, med)}>
                  <EditIcon className="modify-icons" />
                </Button>
                <Button className="modify-icons-buttons">
                  <DeleteIcon onClick={() => showEditAlert(med)} value={med.id} className="modify-icons" />
                </Button>
              </HStack>
            </HStack>
            <Box>
              <span className="display-list-title">
                Dose:
              </span>
              {' '}
              Take/Use
              {' '}
              {med.dose}
              {' '}
              {med.medicationUnits}
              {' '}
              {frequencyData(med.frequency)}
            </Box>
            <Box>
              <span className="display-list-title">
                Special Instructions:
              </span>
              {' '}
              {!med.specialInstructions ? 'Nil' : med.specialInstructions }
            </Box>
            <Box>
              <span className="display-list-title">
                Quantity Left:
              </span>
              {' '}
              {med.quantity}
            </Box>
            <Box>
              <span className="display-list-title">
                Start Date:
              </span>
              {' '}
              {`${med.frequency.startDate.dd}/${med.frequency.startDate.mm}/${med.frequency.startDate.yy}`}
            </Box>
            {med.frequency.endDate.dd
            && (
            <Box>
              <span className="display-list-title">
                End Date:
              </span>
              {' '}
              {`${med.frequency.endDate.dd}/${med.frequency.endDate.mm}/${med.frequency.endDate.yy}`}
            </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform="capitalize" className="form-main-header" p={3}>Edit Medication Record </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditForm medicationEdit={medicationEdit} medData={medData} updateEditStatus={updateEditStatus} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={5}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Record
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseModal}>
                Cancel
              </Button>
              <Button colorScheme="pink" onClick={() => { deleteRecord(); }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default MedicationOverview;
