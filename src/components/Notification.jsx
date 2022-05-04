import React from 'react';
import { useToast } from '@chakra-ui/react';

function Notification({ medicationTodays }) {
  const currentTime = new Date();

  // to check time every minute
  setInterval(() => {
    const hour = currentTime.getHours();
    let min = currentTime.getMinutes();
    min < 10 ? min = `0${min}` : min = min;
    const time = `${hour}:${min}`;
    console.log(time);
    const currentMedList = medicationTodays.filter((med) => med.timeData.join(':') === time);
    console.log(currentMedList);
  }, 60000);

  return (

    <div>Notification</div>
  );
}

export default Notification;
