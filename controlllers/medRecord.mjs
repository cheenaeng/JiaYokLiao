import {
  format, compareAsc, parseISO, getDate, getMonth, getYear,
} from 'date-fns';

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
      const consolidatedFrequency = {
        timing: [],
        days: '',
        weekDays: '',
        monthlyInterval: '',
        endDate: convertDate(frequencyData?.endingDate),
        startDate: convertDate(frequencyData.startingDate),
      };

      const formatedTime = medTimings.map((timing) => {
        const timingSplit = timing.split(':');
        const formatedTimeInHhMm = { mm: timingSplit[1], hh: timingSplit[0] };
        return formatedTimeInHhMm;
      });

      updateConsolidatedFreq(frequencyData, consolidatedFrequency, formatedTime);

      const newRecord = await db.MedicationRecord.create({
        medicationName,
        dose: medDose,
        quantity: medQuantity,
        specialInstructions: medInstructions,
        frequency: consolidatedFrequency,
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

  return {
    addFormData, findAllMedRecord,
  };
}
