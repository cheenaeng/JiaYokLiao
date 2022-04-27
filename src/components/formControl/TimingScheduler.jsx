import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, HStack, Select, Input,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker';

function TimingScheduler({ medTimings, setMedTiming }) {
  const [timingEls, changeTimingEls] = useState([]);

  // to store each of the value when the value of the time changesm, medTimings is an object

  // each of the timing div has a temporary time value that is changed when the input is changed
  const [timeIndex, changeIndex] = useState(0);
  const [tempStoreTiming, storeTimeTemp] = useState({});

  const Timing = ({ timingIndex }) => {
    const [tempTimeValue, onChangeTime] = useState('10:00');
    const timeDisplay = useRef(tempTimeValue);
    const copyTimingEls = [...timingEls];
    copyTimingEls[timingIndex - 1] = timeDisplay.current;
    useEffect(() => {
      tempStoreTiming[`time-${timingIndex}`] = timeDisplay.current.props.value;
      setMedTiming({ ...tempStoreTiming });
    }, [tempTimeValue]);

    return (
      <>
        <TimePicker ref={timeDisplay} onChange={onChangeTime} name={`time-${timingIndex}`} value={tempTimeValue} clockIcon={null} disableClock />
      </>
    );
  };

  const addNewTiming = () => {
    const newTimeindexCopy = timeIndex + 1;
    changeIndex(newTimeindexCopy);
    changeTimingEls((prevContent) => [...prevContent, (<Timing timingIndex={newTimeindexCopy} />)]);
    tempStoreTiming[`time-${newTimeindexCopy}`] = '';
  };

  const removeTiming = () => {
    const reducedTimeIndex = timeIndex - 1;
    changeIndex(reducedTimeIndex);
    const contentCopy = [...timingEls];
    contentCopy.pop();
    changeTimingEls(contentCopy);

    delete tempStoreTiming[`time-${timeIndex}`];
    setMedTiming({ ...tempStoreTiming });
  };

  return (
    <HStack>
      <Button onClick={addNewTiming}>
        +
      </Button>
      {timingEls}
      <Button onClick={removeTiming}>
        -
      </Button>
    </HStack>

  );
}

export default TimingScheduler;
