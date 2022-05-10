import React, { useState } from 'react';
import {
  Box, Button, HStack,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker-input';
import 'react-time-picker-input/dist/components/TimeInput.css';

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
    <HStack className="timing-div">
      <Button onClick={addNewTiming}>
        +
      </Button>
      {timings.map((timing, index) => <TimePicker onChange={(timing) => onTimingChange(timing, index)} value={timing} />)}
      <Button onClick={removeTiming}>
        -
      </Button>
    </HStack>

  );
}

export default TimingScheduler;
