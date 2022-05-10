import { Op } from 'sequelize';

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

  const findDetail = async (request, response) => {
    console.log(request.body);
    try {
      const allMedicationDetails = await db.MedicationDetail.findAll({
        where: {
          nameGeneric: {
            [Op.like]: `${request.body.inputName}%`,
          },
        },
        include: db.Indication,
      });

      response.send({ allMedicationDetails });
    }
    catch (error) {
      console.log(error);
    }
  };
  return {
    findAllMedName, findDetail,
  };
}
