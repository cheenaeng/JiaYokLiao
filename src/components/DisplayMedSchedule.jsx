import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List, ListItem, Button, Text, Badge, HStack, Heading, Box, Icon,
} from '@chakra-ui/react';
import { getDay, isAfter, differenceInDays } from 'date-fns';
import { MdDone } from 'react-icons/md';
import cron from 'cron';

const { CronJob } = cron;

const checkTodaysMedicines = (record) => {
  const todayDate = new Date();
  const dayOfToday = getDay(todayDate);
  const differenceDays = differenceInDays(todayDate, record.frequency.rawData.startingDate);
  const COMMAND = record.frequency.rawData.freqOccurence.repeatFrequency;

  if (!record.frequency.rawData.endingDate || !isAfter(todayDate, record.frequency.rawData.endingDate)) {
    let result;
    switch (COMMAND) {
      case 'hourly':
        console.log('yesss');
        result = true;
        break;
      case 'weekly':
        if (record.frequency.weekDays.includes(dayOfToday.toString())) {
          result = true;
        }
        break;
      case 'daily':
        if (differenceDays % record.frequency.days === 0) {
          result = true;
        }
        break;
      case 'monthly': {
        if (differenceDays % (record.frequency.monthlyInterval * 30) === 0) {
          result = true;
        }
        break;
      }
      default:
        result = false;
    }
    return result;
  }
  return false;
};

function DisplayMedSchedule({ setMedRecords, medicationTodays, setTodayMedications }) {
  const [takenStatus, setTakenStatus] = useState(0);
  const [todayRecords, setTodayRecords] = useState([]);

  useEffect(() => {
    axios.get('/allMeds').then((response) => {
      setMedRecords([...response.data.allRecords]);
      const allData = response.data.allRecords;

      const medicineToday = allData.filter((medRecord) => checkTodaysMedicines(medRecord));
      setTodayRecords(medicineToday);
      const individualTask = medicineToday.map((medicine) => {
        const eachTiming = medicine.frequency.timing.map((timeSchedule) => ({ ...medicine, timeData: [timeSchedule.hh, timeSchedule.mm] }));
        return eachTiming;
      });

      const todayDataFlattened = individualTask.flat(1);

      // sort the medications based on the timing
      todayDataFlattened.sort((a, b) => Number(a.timeData.join('')) - Number(b.timeData.join('')));
      setTodayMedications(todayDataFlattened);
    });
  }, [takenStatus]);

  const updateDoseStatus = (e, index) => {
    const changedTask = medicationTodays[index];
    const dataChanged = {
      record: changedTask,
    };
    axios.put('/updateDoseStatus', dataChanged)
      .then((response) => {
        setTakenStatus((num) => num += 1);
      });
  };

  // this cron job will update at every midnight to not taken status
  const job = new CronJob('0 0 * * *', (() => {
    console.log('heyyy');
    axios.put('/restartDoseStatus').then((response) => {
      console.log('updated to default again');
      setTakenStatus((num) => num += 1);
    });
  }), null, true, 'Asia/Singapore');
  job.start();
  console.log(medicationTodays, 'today');

  return (
    <>
      <Heading as="h2" size="md" className="main-page-sub-header" pl={2} pt={4}>
        {' '}
        Today
        {' '}
        {todayRecords.length}
        {' '}
        medications
      </Heading>
      <Text pl={2} pb={2} color="greenC.300" id="reminder-header"> Reminder</Text>
      <List className="display-meds-all">
        {medicationTodays.map((med, index) => (
          <ListItem spacing={7} border="1px" borderColor="gray.200" mb={3} p={2} className="list-medication-display" boxShadow="md">
            <Box>
              <Text textTransform="capitalize" className="medication-name-title">{med.medicationName}</Text>
              <Text className="medication-date-title">
                {' '}
                {med.frequency.startDate.dd}
                /
                {med.frequency.startDate.mm}
                /
                {med.frequency.startDate.yy}
                {' '}
                -
                {med.frequency.endDate.dd ? `${med.frequency.endDate.dd}/${med.frequency.endDate.mm}/${med.frequency.endDate.yy}` : '(No end date)'}
              </Text>
              <Text className="medication-timing-title">
                Scheduled Time:
                {' '}
                {med.timeData[0]}
                {med.timeData[1]}
              </Text>

              <HStack className="medication-quantity-title">
                <Text>Quantity:</Text>
                {' '}
                <Text color={Number(med.quantity) <= 10 && 'greenC.0'}>{med.quantity}</Text>
                {Number(med.quantity <= 10)
              && (
              <Badge colorScheme="red">LOW</Badge>
              )}
              </HStack>
              <Text className="medication-dose-title">
                Dose:
                Take/Use/Apply
                {' '}
                {med.dose}
                {' '}
                {med.medicationUnits}
              </Text>
            </Box>
            <Box>
              <Button onClick={(e) => { updateDoseStatus(e, index); }} isDisabled={true && med.doseTaken[med.timeData.join(':')] === 'taken'} mt={5} className="taken-button">
                <Icon as={MdDone} className="taken-icon" />
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default DisplayMedSchedule;
