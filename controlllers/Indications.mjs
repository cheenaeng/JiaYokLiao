export default function initIndications(db) {
  const getAllIndications = async (request, response) => {
    try {
      console.log('find all meds');
      const allIndications = await db.Indication.findAll();

      response.send({ allIndications });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    getAllIndications,
  };
}
