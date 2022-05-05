import React, { useState } from 'react';
import {
  Box, Button, HStack,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker-input';
import 'react-time-picker-input/dist/components/TimeInput.css';


function EditedTimeSchedule({ medTimings, setMedTiming }) {
  const [timings, setTimings] = useState(['']);
  console.log(medTimings)

  const addNewTiming = () => {
    const newAddedTimeArr = [...timings];
    newAddedTimeArr.push('');
    console.log(newAddedTimeArr)
    setTimings([...newAddedTimeArr]);
    setMedTiming([...newAddedTimeArr])
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
    medTimings.pop()
    setMedTiming(medTimings)
  };

  return (
    <HStack>
      <Button onClick={addNewTiming}>
        +
      </Button>
      {medTimings.map((timing, index) => <TimePicker onChange={(timing) => onTimingChange(timing, index)} value={timing} />)}
      <Button onClick={removeTiming}>
        -
      </Button>
    </HStack>

  );
}

export default EditedTimeSchedule;
