import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, HStack, Select,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker';

function TimingScheduler({ medTimings, setMedTiming }) {
  const [timingContent, addTimingContent] = useState([]);
  const [timingIndex, changeTimingIndex] = useState(0);
  const initialState = {};
  const [storedTiming, addTiming] = useState(initialState);
  const [changesTracked, trackchange] = useState(0);
  const [removedTiming, trackRemovedTiming] = useState(0);

  const Timing = ({ timeName }) => {
    const [tempTimeValue, onChangeTime] = useState('10:00');
    const timeDisplay = useRef();

    useEffect(() => {
      const { name, value } = timeDisplay.current.props;
      addTiming({ ...storedTiming, [name]: value });
      trackchange((num) => num += 1);
    }, [tempTimeValue]);
    return (
      <Box>
        <TimePicker ref={timeDisplay} onChange={onChangeTime} name={timeName} value={tempTimeValue} clockIcon={null} disableClock />
      </Box>
    );
  };

  useEffect(() => {
    setMedTiming({ ...medTimings, ...storedTiming });
  }, [changesTracked]);

  console.log(storedTiming);

  useEffect(() => {
    setMedTiming({ ...storedTiming });
  }, [removedTiming]);

  const handleAddTiming = () => {
    changeTimingIndex((index) => index += 1);
    addTimingContent((prevTiming) => [...prevTiming, (<Timing timeName={`time-${timingIndex}`} />)]);
  };

  console.log(timingIndex);

  const handleRemoveTiming = () => {
    const indexTime = timingIndex - 1;
    const storedTimingCopy = { ...storedTiming };
    delete storedTimingCopy[`time-${indexTime}`];
    addTiming(storedTimingCopy);
    setMedTiming({ ...storedTiming });
    changeTimingIndex((index) => index -= 1);
    const updatedTimingContent = [...timingContent];
    updatedTimingContent.pop();
    addTimingContent(updatedTimingContent);
    trackRemovedTiming((num) => num += 1);
  };
  console.log(storedTiming);

  return (
    <HStack>
      <Button onClick={() => { handleAddTiming(); }}> +</Button>
      {timingContent}
      {timingContent.length >= 1 && <Button onClick={() => { handleRemoveTiming(); }}>-</Button>}
    </HStack>

  );
}

export default TimingScheduler;
