export default function initMedDetails(db) {
  const findAllMedName = async (request, response) => {
    try {
      console.log('find all meds');
      const allMedications = await db.MedicationDetail.findAll();

      response.send({ allMedications });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    findAllMedName,
  };
}
