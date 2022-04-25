import React, { useState } from 'react';
import {
  Box, Button, HStack, Select,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker';

const Timing = () => {
  const [timeValue, onChangeTime] = useState('10:00');
  return (
    <Box>
      <TimePicker onChange={onChangeTime} value={timeValue} clockIcon={null} disableClock />
    </Box>
  );
};

function TimingScheduler() {
  const [timingAdded, addTimes] = useState(0);
  const timingContent = [];
  const handleAddTiming = (e) => {
    addTimes((prevTime) => prevTime += 1);
  };

  const handleRemoveTiming = (e) => {
    addTimes((prevTime) => prevTime -= 1);
  };
  for (let i = 0; i < timingAdded; i += 1) {
    timingContent.push((<Timing />));
  }
  return (
    <HStack>
      <Button onClick={() => { handleAddTiming(); }}> +</Button>
      {timingContent}
      {timingContent.length >= 1 && <Button onClick={() => { handleRemoveTiming(); }}> -</Button>}
    </HStack>

  );
}

export default TimingScheduler;
