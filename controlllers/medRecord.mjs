import {
  format, compareAsc, parseISO, getDate, getMonth, getYear,
} from 'date-fns';
import cron from 'cron';
import admin from 'firebase-admin';
import stringify from 'json-stringify-safe';

const { CronJob } = cron;

// helper function to convert date
const convertDate = (date) => {
  const parsedDate = parseISO(date);

  const convertedDate = {
    dd: getDate(parsedDate),
    mm: getMonth(parsedDate)+1,
    yy: getYear(parsedDate),

  };
  return convertedDate;
};

const updateConsolidatedFreq = (data, frequencyTable, freqTiming) => {
  frequencyTable.days = data.freqOccurence?.qDayInterval;
  frequencyTable.weekDays = data?.numberOfDaysWeek;
  frequencyTable.monthlyInterval = data.freqOccurence?.qMonthInterval;
  frequencyTable.timing = freqTiming;
};

const cronExpressionFormatted = (frequencyData, timing) => {
  const asterik = '*';
  const cronExpression = [];
  for (let i = 0; i < 5; i += 1) {
    cronExpression.push(asterik);
  }
  // to assign the first 2 timing which are compuslory fields(i.e. occur at every 10.00pm for e.g.)

  cronExpression[0] = timing.mm;
  cronExpression[1] = timing.hh;

  if (frequencyData.days) {
    cronExpression[2] = `*/${frequencyData.days}`;
  }
  else if (frequencyData.weekDay) {
    cronExpression[4] = `*/${frequencyData.weekDays}`;
  }
  else if (frequencyData.monthlyInterval) {
    cronExpression[3] = `*/${frequencyData.monthlyInterval}`;
  }

  return cronExpression.join(' ');
};

export default function initMedRecordController(db) {
  const addFormData = async (request, response) => {
    try {
      console.log(request.body);
      const {
        medicationName, medDose, medQuantity, medInstructions, frequencyData, medTimings, doseUnit,
      } = request.body;

      // for end date stored as {ddEnd: , mmEnd: , yyEnd:}
      const formattedFrequency = {
        timing: [],
        days: '',
        weekDays: '',
        monthlyInterval: '',
        endDate: convertDate(frequencyData?.endingDate),
        startDate: convertDate(frequencyData.startingDate),
        rawData: frequencyData,
        allCronJobs: []
      };

      const formatedTime = medTimings.map((timing) => {
        const timingSplit = timing.split(':');
        const formatedTimeInHhMm = { mm: timingSplit[1], hh: timingSplit[0] };
        return formatedTimeInHhMm;
      });

      // default status of dose-taken --> not taken
      // [{medTiming:not-taken,medTiming:non-taken}]
      const doseTakenStatus = {};

      medTimings.forEach((timing) => {
        doseTakenStatus[timing] = '';
      });

      console.log(doseTakenStatus);

      updateConsolidatedFreq(frequencyData, formattedFrequency, formatedTime);



      const userFCMToken = await db.User.findOne({
        where: {
          id: request.cookies.userId,
        },
      });

      const allMedSchedules =  formattedFrequency.timing.map((time) => cronExpressionFormatted(formattedFrequency, time));

      // console.log(allMedSchedules, 'alllll medddd recordddd');

      // this is to create a cronjob for each of the timing
      const allJobs = allMedSchedules.map((schedule) => {
        const job = new CronJob(schedule, (() => {
          console.log(schedule);

          const payload = {
            notification: {
              title: 'Medication Reminder',
              body: `Reminder to take ${newRecord.medicationName}!`,
            },
          };
          const options = {
            priority: 'high',
          };
        
          admin.messaging().sendToDevice(userFCMToken.fcmToken, payload, options)
            .then((res) => {
              console.log('Successfully sent message:', res);
              // when message is fired, to send medication record to the front end to show notification on the app itself
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
        }), null, true, 'Asia/Singapore');
        job.start();

        return job;
      });
      const stringifiedJobs = stringify(allJobs)
      console.log(stringifiedJobs)

      formattedFrequency.allCronJobs = stringifiedJobs

      const newRecord = await db.MedicationRecord.create({
        medicationName,
        dose: medDose,
        quantity: medQuantity,
        specialInstructions: medInstructions,
        frequency: formattedFrequency,
        doseTaken: doseTakenStatus,
        userId: request.cookies.userId,
        medicationUnits: doseUnit,
      });
  
      response.send({ newRecord });
    }
    catch (error) {
      console.log(error);
    }
  };

  const editFormData = async (request, response) => {
    try {
      console.log(request.body);
      const {
        medicationName, medDose, medQuantity, medInstructions, frequencyData, medTimings, doseUnit, id 
      } = request.body;

   
      const foundData = await db.MedicationRecord.findOne({
        where: {
          id: id
        },
      });
      
      // for end date stored as {ddEnd: , mmEnd: , yyEnd:}
       const formattedFrequency = {
        timing: [],
        days: '',
        weekDays: '',
        monthlyInterval: '',
        endDate: convertDate(frequencyData?.endingDate),
        startDate: convertDate(frequencyData.startingDate),
        rawData: frequencyData,
        allCronJobs: foundData.allCronJobs
      };

      const formatedTime = medTimings.map((timing) => {
        const timingSplit = timing.split(':');
        const formatedTimeInHhMm = { mm: timingSplit[1], hh: timingSplit[0] };
        return formatedTimeInHhMm;
      });

      // default status of dose-taken --> not taken
      // [{medTiming:not-taken,medTiming:non-taken}]
      const doseTakenStatus = {};

      medTimings.forEach((timing) => {
        doseTakenStatus[timing] = '';
      });

      updateConsolidatedFreq(frequencyData, formattedFrequency, formatedTime);

      const newRecord = await db.MedicationRecord.update(
        { medicationName: medicationName},
        { dose: medDose}, 
        { quantity: medQuantity}, 
        {specialInstructions: medInstructions,}, 
        {   frequency: formattedFrequency,}, 
        { doseTaken: doseTakenStatus,},
        {  medicationUnits: doseUnit,},
        {  where:{
          id: id
        }}
      );

       const updatedDoseRecord = await db.MedicationRecord.update(
        { doseTaken: doseStatus },
        { where: { id: findChangedDoseRecord.id } },
      );


      const allMedSchedules = await newRecord.frequency.timing.map((time) => cronExpressionFormatted(newRecord.frequency, time));

      // this is to create a cronjob for each of the timing
      const allJobs = await allMedSchedules.map((schedule) => {
        const job = new CronJob(schedule, (() => {
          console.log(schedule);

          const payload = {
            notification: {
              title: 'Medication Reminder',
              body: `Reminder to take ${newRecord.medicationName}!`,
            },
          };
          const options = {
            priority: 'high',
          };

          admin.messaging().sendToDevice(userFCMToken.fcmToken, payload, options)
            .then((res) => {
              console.log('Successfully sent message:', res);
              // when message is fired, to send medication record to the front end to show notification on the app itself
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
        }), null, true, 'Asia/Singapore');
        job.start();

        return job;
      });
      response.send({ newRecord });
    }
    catch (error) {
      console.log(error);
    }
  };

  const findAllMedRecord = async (request, response) => {
    try {
      const allRecords = await db.MedicationRecord.findAll({
        where: {
          userId: request.cookies.userId,
        },
      });

      response.send({ allRecords });
    }
    catch (error) {
      console.log(error);
    }
  };

  const changeDoseStatus = async (request, response) => {
    try {
      console.log(request.body);
      const findChangedDoseRecord = await db.MedicationRecord.findOne({
        where: {
          id: request.body.record.id,
        },
      });

      console.log(findChangedDoseRecord);

      const doseStatus = findChangedDoseRecord.doseTaken;
      const timingOfMedDose = request.body.record.timeData.join(':');
      doseStatus[timingOfMedDose] = 'taken';

      const updatedDoseRecord = await db.MedicationRecord.update(
        { doseTaken: doseStatus },
        { where: { id: findChangedDoseRecord.id } },
      );

      response.send({ updatedDoseRecord });
    }
    catch (error) {
      console.log(error);
    }
  };

  const restartDoseStatus = async (request, response) => {
    try {
      const allMedRecords = await db.MedicationRecord.findAll();

      const allDoseTakenUpdatedRecords = await allMedRecords.map((record) => {
        const medRecordData = record.doseTaken;
        for (const doseTiming in medRecordData) {
          medRecordData[doseTiming] = '';
        }
        const updatedQuery = db.MedicationRecord.update(
          { doseTaken: medRecordData }, {
            where: { id: record.id },
          },
        );

        return updatedQuery;
      });

      const updatedResults = await Promise.all(allDoseTakenUpdatedRecords);

      response.send({ updatedResults });
    }
    catch (error) {
      console.log(error);
    }
  };

  const findEdit = async (request, response) => {
    try {
      const allMedRecords = await db.MedicationRecord.findOne({
        where:{
          id: request.params.id
        }
      })

      response.send({ allMedRecords });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    addFormData, findAllMedRecord, changeDoseStatus, restartDoseStatus,findEdit,editFormData
  };
}
