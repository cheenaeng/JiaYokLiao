import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Grid, GridItem, Select, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button,
} from '@chakra-ui/react';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

const DaysDisplay = () => {
  const [storedDays, setDays] = useState([]);

  const handleClickDays = (e) => {
    console.log(e.target.className);
    if (e.target.className.includes('clicked')) {
      const newStoredDays = storedDays.filter((day) => day !== e.target.value);
      setDays(newStoredDays);
      e.target.classList.remove('clicked');
    }
    else {
      setDays((prevDays) => [...prevDays, e.target.value]);
      e.target.classList.add('clicked');
    }
  };

  const allDaysWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const buttonDay = allDaysWeek.map((day) => (
    <Button mr={1} onClick={handleClickDays} value={day}>
      {day}
    </Button>
  ));

  return buttonDay;
};

function FrequencyScheduler() {
  const initialFreqValues = {
    repeatFrequency: 'hourly',
    qHourInterval: '',
    qDayInterval: '',
    qWeekInterval: '',
    qMonthInterval: '',

  };
  const [startDate, setStartDate] = useState(new Date());
  const [frequencyInput, setFrequency] = useState(initialFreqValues);

  // to handle frequency input control change
  const handleFreqChange = (e) => {
    const { name, value } = e.target;
    setFrequency({ ...frequencyInput, [name]: value });
  };

  const HourlyOutput = () => (
    <>
      <GridItem colSpan={1}>
        <Text>Every</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <NumberInput name="qInterval" value={frequencyInput.qHourInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qHourInterval: valueString })} min={1} max={12}>
          <NumberInputField type="number" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
      <GridItem colSpan={1}>
        <Text>Hours(s)</Text>
      </GridItem>
    </>
  );

  const DailyOutput = () => (
    <>
      <GridItem colSpan={1}>
        <Text>Every</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <NumberInput name="qWeekInterval" value={frequencyInput.qWeekInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qWeekInterval: valueString })} min={1}>
          <NumberInputField type="number" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
      <GridItem colSpan={1}>
        <Text>week(s)</Text>
      </GridItem>
    </>
  );

  const WeeklyOutput = () => (
    <>
      <GridItem colSpan={1}>
        <Text>Every</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <NumberInput name="qDayInterval" value={frequencyInput.qDayInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qDayInterval: valueString })} min={1}>
          <NumberInputField type="number" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
      <GridItem colSpan={1}>
        <Text>week(s)</Text>
      </GridItem>
      <GridItem colSpan={4}>
        <DaysDisplay />
      </GridItem>
    </>
  );

  const MonthlyOutput = () => (
    <>
      <GridItem colSpan={1}>
        <Text>Every</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <NumberInput name="qMonthInterval" value={frequencyInput.qMonthInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qMonthInterval: valueString })} min={1}>
          <NumberInputField type="number" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
      <GridItem colSpan={1}>
        <Text>month(s)</Text>
      </GridItem>
    </>
  );

  const VariedFreqControl = () => {
    const COMMAND = frequencyInput.repeatFrequency;
    let output;
    switch (COMMAND) {
      case 'hourly':
        output = (<HourlyOutput />);
        break;
      case 'daily':
        output = (<DailyOutput />);
        break;
      case 'weekly':
        output = (<WeeklyOutput />);
        break;
      case 'monthly':
        output = (<MonthlyOutput />);
        break;
      default:
        output = `${COMMAND} cannot be read`;
    }
    return output;
  };

  console.log(frequencyInput.repeatFrequency);

  return (
    <>
      <Grid
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem rowSpan={1} colSpan={1} mb={2}>
          <label htmlFor="startDate"> Start date: </label>
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <DatePicker
            wrapperClassName="datePicker"
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </GridItem>
        <GridItem rowSpan={3} colSpan={1} mb={2}>
          <label htmlFor="repeat"> Repeat: </label>
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <Select name="repeatFrequency" onChange={handleFreqChange} value={frequencyInput.repeatFrequency}>
            <option value="hourly"> Hourly</option>
            <option value="daily"> Daily</option>
            <option value="weekly"> Weekly</option>
            <option value="monthly"> Monthly</option>
          </Select>
        </GridItem>
        {/* depending on the repeat frequency, different controls will appear */}
        <VariedFreqControl />
      </Grid>
    </>

  );
}

export default FrequencyScheduler;
