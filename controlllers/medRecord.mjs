import later from '@breejs/later';
import { format, compareAsc, parseISO } from 'date-fns';

export default function initMedRecordController(db) {
  const addFormData = async (request, response) => {
    try {
      console.log(request.body);
      const {
        medicationName, medDose, medQuantity, medInstructions, frequencyData, medTimings,
      } = request.body;

      // general function that can be used for all cases(hourly,daily,weekly)
      // const allMedTimings = Object.values(medTimings);
      // const timingSchedule = allMedTimings.map((timing) => {
      //   const splittedTimes = timing.split(':');
      //   return ({ h: [...splittedTimes[0]], m: [splittedTimes[1]] });
      // });

      // // if end date is provided then add the exception date
      // if (frequencyData.isEndDate !== 'never') {
      //   const parsedEndDate = parseISO(frequencyData.endingDate);
      //   // this is to create the date where the schedule is no longer valid, aka end date
      //   const exceptionTiming = [{ D: [format(parsedEndDate, 'd')], M: [format(parsedEndDate, 'M')], Y: [format(parsedEndDate, 'yyyy')] }];
      //   const finalTimingSchedule = {
      //     schedules: timingSchedule, exceptions: exceptionTiming,
      //   };
      //   console.log(finalTimingSchedule);
      // }

      const COMMAND = frequencyData.freqOccurence.repeatFrequency;
      let schedule;
      switch (COMMAND) {
        case 'hourly':

          break;

        default:
          schedule = `${COMMAND} undefined`;
      }

      console.log(schedule);

      const medScheduleTimings = { medTimings };

      const newRecord = await db.MedicationRecord.create({
        medicationName,
        dose: medDose,
        quantity: medQuantity,
        specialInstructions: medInstructions,
        frequency: { ...frequencyData, ...medScheduleTimings },
      });

      response.send({ newRecord });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    addFormData,
  };
}
