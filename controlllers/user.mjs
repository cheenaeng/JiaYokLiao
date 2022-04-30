export default function initUser(db) {
  const addUser = async (request, response) => {
    try {
      const newUser = await db.User.create({
        email: request.body.email,
        password: request.body.password,
        username: request.body.username,

      });

      response.send({ newUser });
    }
    catch (error) {
      console.log(error);
    }
  };
  const findUser = async (request, response) => {
    try {
      const verifiedUser = await db.User.findOne({
        where: {
          email: request.body.email,
          password: request.body.password,
        },

      });

      response.send({ verifiedUser });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    addUser, findUser,
  };
}
