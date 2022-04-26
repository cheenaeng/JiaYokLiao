export default function initMedRecordController(db) {
  const addFormData = async (request, response) => {
    try {
      console.log(request.body);
      const {
        medicationName, medDose, medQuantity, medInstructions, frequencyInfo,
      } = request.body;
      const newRecord = await db.MedicationRecord.create({
        medicationName,
        dose: medDose,
        quantity: medQuantity,
        specialInstructions: medInstructions,
        frequency: frequencyInfo,
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
