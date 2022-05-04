// axios.get('http://localhost:3004/allusers')
//   .then((response) => {
//     const allUsersData = response.data.allUsers;
//     const allUsersFcmData = allUsersData.map((data) => data.fcmToken);
//     allUsersFcmData.forEach((fcmToken) => {
//       admin.messaging().sendToDevice(fcmToken, payload, options)
//         .then((response) => {
//           console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//           console.log('Error sending message:', error);
//         });
//     });
//   })
//   .catch((error) => console.log(error));

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
      response.cookie('userId', verifiedUser.id);
      console.log(request.cookies);
      response.send({ verifiedUser });
    }
    catch (error) {
      console.log(error);
    }
  };

  const addFCM = async (request, response) => {
    try {
      console.log(request.cookies.userId);
      const updatedUserToken = await db.User.update({ fcmToken: request.body.fcmToken }, {
        where: {
          id: request.cookies.userId,
        },
      });

      response.send({ updatedUserToken });
    }
    catch (error) {
      console.log(error);
    }
  };
  const getAllUser = async (request, response) => {
    try {
      console.log('looking at all users');
      const allUsers = await db.User.findAll();

      response.send({ allUsers });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    addUser, findUser, addFCM, getAllUser,
  };
}
