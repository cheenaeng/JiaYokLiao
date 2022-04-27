import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, HStack, Select, Input,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker';

function TimingScheduler({ medTimings, setMedTiming }) {
  const [timings, setTimings] = useState(['']);

  const addNewTiming = () => {
    const newAddedTimeArr = [...timings];
    newAddedTimeArr.push('');
    setTimings(newAddedTimeArr);
  };

  const onTimingChange = (newTiming, index) => {
    const newTimingsss = [...timings];
    newTimingsss[index] = newTiming;
    setTimings(newTimingsss);
    setMedTiming(newTimingsss);
  };

  const removeTiming = () => {
    const removedTiming = [...timings];
    removedTiming.pop();
    setTimings(removedTiming);
  };

  return (
    <HStack>
      <Button onClick={addNewTiming}>
        +
      </Button>
      {timings.map((timing, index) => <TimePicker onChange={(timing) => onTimingChange(timing, index)} value={timing} clockIcon={null} disableClock />)}
      <Button onClick={removeTiming}>
        -
      </Button>
    </HStack>

  );
}

export default TimingScheduler;
