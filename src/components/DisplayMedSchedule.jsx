import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function DisplayMedSchedule({ allMedRecords, setMedRecords }) {
  const [showJobsList, setList] = useState([]);

  useEffect(() => {
    axios.get('/allMeds').then((response) => {
      setMedRecords([...response.data.allRecords]);
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

  console.log(listOfMeds);

  return (
    <div>
      {/* {showJobsList.filter((schedule) => (<p>{med.medicationName}</p>))} */}

    </div>
  );
}

export default DisplayMedSchedule;
