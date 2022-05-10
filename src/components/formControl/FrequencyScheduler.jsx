import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Grid, GridItem, Select, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import parseISO from 'date-fns/parseISO';

function FrequencyScheduler({
  dates, setStartEndDates, frequencyInput, setFrequency, storedDays, setDays, endDateOption, selectEndOption,
}) {
  // to handle frequency input control change
  const handleFreqChange = (e) => {
    const { name, value } = e.target;
    setFrequency({ ...frequencyInput, [name]: value });
  };
  const allDaysWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const initialClickedStatus = allDaysWeek.map((day) => false);
  const [clickStatus, setClickStatus] = useState(initialClickedStatus);

  // to return buttons that shows all the days of a week
  const DaysDisplay = () => {
    const handleClickDays = (e) => {
      if (storedDays.includes(e.target.value)) {
        const newStoredDays = storedDays.filter((day) => day !== e.target.value);
        setDays(newStoredDays);
        const copyClickedStatus = [...clickStatus];
        copyClickedStatus[e.target.value] = false;
        setClickStatus(copyClickedStatus);
      }
      else {
        setDays((prevDays) => [...prevDays, e.target.value]);
        const copyClickedStatus = [...clickStatus];
        copyClickedStatus[e.target.value] = true;
        console.log(copyClickedStatus);
        setClickStatus(copyClickedStatus);
      }
    };
    console.log(clickStatus[3]);

    const buttonDay = allDaysWeek.map((day, index) => (
      <Button mr={1} mb={2} onClick={handleClickDays} value={index} className={`${clickStatus[index] && 'clicked'} days-buttons`}>
        {day}
      </Button>
    ));

    return buttonDay;
  };

  function HourlyOutput() {
    return (
      <>
        <GridItem rowSpan={2} colSpan={1} mt={2}>
          <Text>Every</Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <NumberInput name="qInterval" value={frequencyInput.qHourInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qHourInterval: valueString })} min={1} max={12}>
            <NumberInputField type="number" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Text ml={2} mt={2}>Hours(s)</Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <NumberInput name="qTimesInterval" value={frequencyInput.qTimesInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qTimesInterval: valueString })} min={1} max={12}>
            <NumberInputField type="number" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Text ml={2}>Times(s) a day</Text>
        </GridItem>
      </>
    );
  }

  function DailyOutput() {
    return (
      <>
        <GridItem rowSpan={2} colSpan={1} mt={2}>
          <Text>Every</Text>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}>
          <NumberInput name="qDayInterval" value={frequencyInput.qDayInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qDayInterval: valueString })} min={1}>
            <NumberInputField type="number" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} mt={2} ml={2}>
          <Text>Day(s)</Text>
        </GridItem>
      </>
    );
  }

  function WeeklyOutput() {
    return (
      <GridItem rowSpan={2} colSpan={4}>
        <DaysDisplay />
      </GridItem>
    );
  }

  function MonthlyOutput() {
    return (
      <>
        <GridItem rowSpan={2} colSpan={1}>
          <Text mt={2}>Every</Text>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}>
          <NumberInput name="qMonthInterval" value={frequencyInput.qMonthInterval} onChange={(valueString) => setFrequency({ ...frequencyInput, qMonthInterval: valueString })} min={1}>
            <NumberInputField type="number" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <Text mt={2} ml={2}>Month(s)</Text>
        </GridItem>
      </>
    );
  }

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

  const handleEndDate = (e) => {
    selectEndOption(e.target.value);
  };

  return (
    <Grid
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(5, 1fr)"
    >
      <GridItem rowSpan={1} colSpan={1} mb={2}>
        <label htmlFor="startDate"> Start date: </label>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4}>
        <DatePicker
          name="startDate"
          wrapperClassName="datePicker"
          id="start-date-field"
          className="start-end-date form-input-field"
          selected={dates.startDate}
          onChange={(date) => setStartEndDates({ ...dates, startDate: date })}
          isClearable
          showYearDropdown
          scrollableMonthYearDropdown
        />
      </GridItem>
      <GridItem rowSpan={3} colSpan={1} mb={2} alignItems="center" mt={2}>
        <label htmlFor="repeat"> Repeat: </label>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4}>
        <Select name="repeatFrequency" onChange={handleFreqChange} value={frequencyInput.repeatFrequency}>
          <option value="hourly"> Hourly or 'X' times a day</option>
          <option value="daily"> Daily</option>
          <option value="weekly"> Weekly</option>
          <option value="monthly"> Monthly</option>
        </Select>
      </GridItem>
      {/* depending on the repeat frequency, different controls will appear */}
      <VariedFreqControl />
      <GridItem rowSpan={2} colSpan={1} mb={2} mr={2} mt={2}>
        <label htmlFor="selectEndDate">End date: </label>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4} mb={2}>
        <Select className="form-input-field" name="selectEndDate" onChange={handleEndDate} value={endDateOption} mt={2}>
          <option value="never"> Never</option>
          <option value="onDate"> On date</option>
        </Select>
      </GridItem>
      {endDateOption === 'onDate' && (
      <DatePicker
        id="end-date-field"
        rowSpan={1}
        colSpan={4}
        name="endDate"
        wrapperClassName="datePicker"
        selected={dates.endDate}
        onChange={(date) => setStartEndDates({ ...dates, endDate: date })}
        isClearable
        showYearDropdown
        scrollableMonthYearDropdown
        placeholderText="Select date"
        className="form-input-field start-end-date"
      />
      )}
    </Grid>

  );
}

export default FrequencyScheduler;
