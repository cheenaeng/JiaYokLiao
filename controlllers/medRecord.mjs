import {
  format, compareAsc, parseISO, getDate, getMonth, getYear,
} from 'date-fns';
import cron from 'cron';

const { CronJob } = cron;

// helper function to convert date
const convertDate = (date) => {
  const parsedDate = parseISO(date);

  const convertedDate = {
    dd: getDate(parsedDate),
    mm: getMonth(parsedDate),
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

export default function initMedRecordController(db) {
  const addFormData = async (request, response) => {
    try {
      console.log(request.body);
      const {
        medicationName, medDose, medQuantity, medInstructions, frequencyData, medTimings,
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

      const newRecord = await db.MedicationRecord.create({
        medicationName,
        dose: medDose,
        quantity: medQuantity,
        specialInstructions: medInstructions,
        frequency: formattedFrequency,
        doseTaken: doseTakenStatus,
        userId: 1,
      });

      response.send({ newRecord });
    }
    catch (error) {
      console.log(error);
    }
  };

  const findAllMedRecord = async (request, response) => {
    try {
      const allRecords = await db.MedicationRecord.findAll();

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

  return {
    addFormData, findAllMedRecord, changeDoseStatus, restartDoseStatus,
  };
}
