import React, { useState } from 'react';
import {
  Input, Select, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text, Textarea, Heading, Button, Alert, AlertIcon, AlertTitle, AlertDescription, Box, CloseButton, Flex, FormControl, FormLabel, FormHelperText,
} from '@chakra-ui/react';

import axios from 'axios';
import FrequencyScheduler from './formControl/FrequencyScheduler.jsx';
import TimingScheduler from './formControl/TimingScheduler.jsx';

function MedicationForm({ setUserFormView, userFormView, medData }) {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [newRecord, setNewRecord] = useState([]);
  const [othersInput, setOthersInputField] = useState(false);

  const initialFreqValues = {
    repeatFrequency: 'hourly',
    qHourInterval: '',
    qTimesInterval: '',
    qDayInterval: '',
    qMonthInterval: '',
  };

  const startEndDates = {
    startDate: new Date(),
    endDate: '',
  };

  const initialFormValues = {
    medicationName: 'atorvastatin',
    medDose: '',
    doseUnit: 'tablet',
    medQuantity: '',
    medInstructions: '',
  };
  const [medTimings, setMedTiming] = useState([]);
  const [dates, setStartEndDates] = useState(startEndDates);
  const [frequencyInput, setFrequency] = useState(initialFreqValues);
  const [storedDays, setDays] = useState([]);
  const [endDateOption, selectEndOption] = useState('never');
  const [formInput, setFormInput] = useState(initialFormValues);
  const [tempValue, setTempValue] = useState('');

  // frequency input data
  const frequencyData = {
    freqOccurence: frequencyInput,
    numberOfDaysWeek: storedDays,
    startingDate: dates.startDate,
    endingDate: dates.endDate,
  };

  const clearAllData = () => {
    setMedTiming([]);
    setStartEndDates('');
    setFrequency(initialFreqValues);
    setDays([]);
    selectEndOption('never');
    setFormInput(initialFormValues);
  };

  // rest of the data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
    if (name === 'medicationName' && value === 'others') {
      setOthersInputField(true);
    }
    else {
      setOthersInputField(false); }
  };

  console.log(medData);

  function DropDownName() {
    return (
      <Flex pt="0" justify="left" align="center" w="full">
        <FormControl w="60">
          <FormLabel className="form-label">Medication Name:</FormLabel>
          <Select textTransform="capitalize" className="form-input-field" autoComplete="on" onChange={handleChange} value={formInput.medicationName} name="medicationName">
            {medData.map((med, mid) => (
              <option value={med.nameGeneric} key={`option-${mid}`} textTransform="capitalize">
                {`${med.nameGeneric} (${med.nameBranded ? med.nameBranded?.brandNames[0] : 'No brand'})`}
                {' '}
              </option>
            ))}

            <option value="others"> Others: Please state</option>
          </Select>
          <FormHelperText mb={2}>Choose one that selects</FormHelperText>

        </FormControl>
      </Flex>
    );
  }

  console.log(formInput);

  // to create drop down for dose dropdown
  function DropDownDose() {
    return (
      <HStack>
        <NumberInput name="medDose" value={formInput.medDose} onChange={(valueString) => setFormInput({ ...formInput, medDose: valueString })} min={0}>
          <NumberInputField className="form-input-field" type="number" />
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
          <option value="pessary"> Pessary</option>
          <option value="application"> Application</option>
        </Select>
      </HStack>
    );
  }

  const showSubmissionApplication = () => {
    const closeMessage = () => {
      setSubmissionStatus('');
    };

    if (newRecord) {
      console.log('heyy');
      const successAlert = (
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your record has been successfully saved
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={closeMessage}
          />
        </Alert>
      );
      setSubmissionStatus(successAlert);
    }
  };

  function SubmitForm() {
    const submitFormData = () => {
      const frequencyTimings = { medTimings };
      const frequencyInfo = { frequencyData };
      if (formInput.medicationName === 'others') {
        formInput.medicationName = tempValue;
      }
      console.log(formInput);
      const allData = { ...formInput, ...frequencyInfo, ...frequencyTimings };
      axios.post('/formData', allData)
        .then((response) => {
          clearAllData();
          console.log(response.data.newRecord);
          setNewRecord((prevRecord) => [...prevRecord, response.data.newRecord]);
          showSubmissionApplication();
        })
        .catch((error) => console.log(error));
    };
    return (
      <Flex justify="center">
        <Button className="user-button" mt={3} onClick={() => { submitFormData(); }} mb={10}>
          Submit Form
        </Button>
      </Flex>
    );
  }

  const handleOthersChange = (e) => {
    setTempValue(e.target.value);
  };
  console.log(formInput);
  console.log(medTimings);
  return (
    <>
      <Heading as="h1" textTransform="capitalize" className="form-main-header" p={2}>
        Record your medication
      </Heading>
      {submissionStatus}

      <DropDownName />
      {othersInput
      && <Input type="text" onChange={handleOthersChange} value={tempValue} />}
      <label className="form-label" size="sm"> Dose:</label>
      <DropDownDose />

      <label className="form-label" size="sm"> Quantity:</label>
      <HStack>
        <NumberInput name="medQuantity" value={formInput.medQuantity} onChange={(valueString) => setFormInput({ ...formInput, medQuantity: valueString })} min={0}>
          <NumberInputField className="form-input-field" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text textTransform="capitalize">{formInput.doseUnit === 'mL' || formInput.doseUnit === 'application' || formInput.doseUnit === 'drops' ? 'tube/bottle' : formInput.doseUnit}</Text>
      </HStack>

      <label className="form-label"> Frequency:</label>
      <FrequencyScheduler dates={dates} setStartEndDates={setStartEndDates} setFrequency={setFrequency} frequencyInput={frequencyInput} setDays={setDays} storedDays={storedDays} endDateOption={endDateOption} selectEndOption={selectEndOption} />

      <label className="form-label"> Timing:</label>
      <TimingScheduler medTimings={medTimings} setMedTiming={setMedTiming} />

      <label className="form-label"> Special Instructions:</label>
      <Textarea className="form-input-field" name="medInstructions" value={formInput.medInstructions} onChange={handleChange}> </Textarea>

      <SubmitForm />

    </>
  );
}

export default MedicationForm;
