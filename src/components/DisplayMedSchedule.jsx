import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Button } from '@chakra-ui/react';
import {
  format, compareAsc, parseISO, getDay, isAfter, differenceInDays,
} from 'date-fns';

import cron from 'cron';

// const { CronJob } = cron;

// const cronExpressionFormatted = (frequencyData, timing) => {
//   const asterik = '*';
//   const cronExpression = [];
//   for (let i = 0; i < 5; i += 1) {
//     cronExpression.push(asterik);
//   }
//   // to assign the first 2 timing which are compuslory fields(i.e. occur at every 10.00pm for e.g.)

//   cronExpression[0] = timing.mm;
//   cronExpression[1] = timing.hh;

//   if (frequencyData.days) {
//     cronExpression[2] = `*/${frequencyData.days}`;
//   }
//   else if (frequencyData.weekDay) {
//     cronExpression[4] = `*/${frequencyData.weekDays}`;
//   }
//   else if (frequencyData.monthlyInterval) {
//     cronExpression[3] = `*/${frequencyData.monthlyInterval}`;
//   }

//   return cronExpression.join(' ');
// };

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

function DisplayMedSchedule({ allMedRecords, setMedRecords }) {
  const [medicationTodays, setTodayMedications] = useState([]);
  const [showJobsList, setList] = useState([]);

  useEffect(() => {
    axios.get('/allMeds').then((response) => {
      setMedRecords([...response.data.allRecords]);
      const allData = response.data.allRecords;

      const medicineToday = allData.filter((medRecord) => checkTodaysMedicines(medRecord));

      const individualTask = medicineToday.map((medicine) => {
        const eachTiming = medicine.frequency.timing.map((timeSchedule) => ({ ...medicine, timeData: [timeSchedule.hh, timeSchedule.mm] }));
        return eachTiming;
      });

      const todayDataFlattened = individualTask.flat(1);

      // sort the medications based on the timing
      todayDataFlattened.sort((a, b) => Number(a.timeData.join('')) - Number(b.timeData.join('')));

      setTodayMedications(todayDataFlattened);
    });
  }, []);

  // const allMedSchedules = allMedRecords.map((record) => {
  //   const timingSchedule = record.frequency.timing.map((time) => cronExpressionFormatted(record.frequency, time));

  //   return timingSchedule;
  // });

  // const flattedMedRecords = allMedRecords.flat(1);
  // const flattedSchedules = allMedSchedules.flat(1);

  // // this is to create a cronjob for each of the timing
  // const allJobs = flattedSchedules.map((schedule) => {
  //   const job = new CronJob(schedule, (() => {
  //     console.log('hiiii');
  //     console.log(schedule);
  //     setList[(prevList) => [...prevList, ...schedule]];
  //   }), null, true, 'Asia/Singapore');
  //   job.start();

  //   return job;
  // });

  // console.log(flattedSchedules);
  // console.log(showJobsList);

  // const listOfMeds = flattedMedRecords.filter((record) => {
  //   const listsOfFilteredRecord = flattedSchedules.filter((job, index) => job === record);
  //   return listsOfFilteredRecord;
  // });

  return (
    <List>
      {medicationTodays.map((med) => (
        <ListItem spacing={3} border="1px" borderColor="gray.200" mb={3} p={2}>
          <p>{med.medicationName}</p>
          <p>
            Scheduled Time:
            {' '}
            {med.timeData[0]}
            {med.timeData[1]}
          </p>
          <Button> Taken</Button>
        </ListItem>
      ))}
    </List>

  );
}

export default DisplayMedSchedule;

// next part -- if taken, to update row and say taken for today. create another column for taken
