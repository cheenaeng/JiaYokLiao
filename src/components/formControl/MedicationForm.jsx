import React, { useState } from 'react';
import {
  Input, Select, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text, Textarea,
} from '@chakra-ui/react';
import FrequencyScheduler from './FrequencyScheduler.jsx';
import TimingScheduler from './TimingScheduler.jsx';
import SubmitForm from './SubmitForm.jsx';

const MedicationForm = () => {
  const initialFreqValues = {
    repeatFrequency: 'hourly',
    qHourInterval: '',
    qDayInterval: '',
    qWeekInterval: '',
    qMonthInterval: '',
  };

  const startEndDates = {
    startDate: new Date(),
    endDate: new Date(),
  };

  const [dates, setStartEndDates] = useState(startEndDates);
  const [frequencyInput, setFrequency] = useState(initialFreqValues);
  const [storedDays, setDays] = useState([]);

  // frequency input data
  const frequencyData = {
    freqOccurence: frequencyInput,
    numberOfDaysWeek: storedDays,
    startingDate: dates.startDate,
    endingDate: dates.endDate,
  };

  // rest of the data
  const initialFormValues = {
    medicationName: '',
    medDose: '',
    doseUnit: '',
    medQuantity: '',
    medInstructions: '',
    frequencyInfo: frequencyData,
  };
  const [formInput, setFormInput] = useState(initialFormValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  // to create drop down for dose dropdown
  const DropDownDose = () => (
    <HStack>
      <NumberInput name="medDose" value={formInput.medDose} onChange={(valueString) => setFormInput({ ...formInput, medDose: valueString })} min={0}>
        <NumberInputField type="number" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Select name="doseUnit" onChange={handleChange} value={formInput.doseUnit}>
        <option value="tablet"> Tablet</option>
        <option value="capsule"> Capsule</option>
        <option value="mL"> mL</option>
        <option value="sachet"> Sachet</option>
        <option value="unit"> Unit</option>
        <option value="drops"> Drop(s)</option>
        <option value="suppository"> Suppository</option>
        <option value="application  "> Application</option>
      </Select>
    </HStack>
  );

  // const QuantityInput = () => (

  // );

  console.log(formInput);
  return (
    <>
      <label className="form-label" size="sm"> Medication Name: </label>
      <Input name="medicationName" value={formInput.medicationName} type="text" onChange={handleChange} />

      <label className="form-label" size="sm"> Dose:</label>
      <DropDownDose />

      <label className="form-label" size="sm"> Quantity:</label>
      <HStack>
        <NumberInput name="medQuantity" value={formInput.medQuantity} onChange={(valueString) => setFormInput({ ...formInput, medQuantity: valueString })} min={0}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text>{formInput.doseUnit}</Text>
      </HStack>

      <label className="form-label" size="sm"> Frequency:</label>
      <FrequencyScheduler dates={dates} setStartEndDates={setStartEndDates} setFrequency={setFrequency} frequencyInput={frequencyInput} setDays={setDays} storedDays={storedDays} />

      <label className="form-label" size="sm"> Timing:</label>
      <TimingScheduler />

      <label className="form-label" size="sm"> Special Instructions:</label>
      <Textarea name="medInstructions" value={formInput.medInstructions} onChange={handleChange}> </Textarea>

      <SubmitForm formInput={formInput} />
    </>
  );
};

export default MedicationForm;
