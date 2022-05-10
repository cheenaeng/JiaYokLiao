import React, { useEffect, useState } from 'react';
import { useToast, Box } from '@chakra-ui/react';

const convertTiming = (currentTime) => {
  let hour = currentTime.getHours();
  let min = currentTime.getMinutes();
  min < 10 ? min = `0${min}` : min = min;
  hour < 10 ? hour = `0${hour}` : hour = hour;
  const time = `${hour}:${min}`;
  return time;
};

function Notification({ medicationTodays }) {
  const toast = useToast();

  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      toast.closeAll();
      setDate(new Date());
    }, 10000); return () => {
      clearInterval(timer);
    };
  }, []);

  const currentConvertedTime = convertTiming(today);

  useEffect(() => {
    const updatedList = medicationTodays.filter((med) => med.timeData.join(':') === currentConvertedTime);
    updatedList.forEach((med) => (toast({
      title: 'Medication Reminder',
      description: `It's time to take ${med.medicationName}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })));
  }, [today]);

  return (
    <>
    </>
  );
}

export default Notification;
