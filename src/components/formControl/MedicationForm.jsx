import React, { useState } from 'react';
import {
  Input, Select, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text,
} from '@chakra-ui/react';
import FrequencyScheduler from './FrequencyScheduler.jsx';

const MedicationForm = () => {
  const initialFormValues = {
    medicationName: '',
    medDose: '',
    doseUnit: '',
    medQuantity: '',
  };
  const [formInput, setFormInput] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
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

  const QuantityInput = () => (
    <HStack>
      <NumberInput name="medQuantity" value={formInput.medQuantity} onChange={(valueString) => setFormInput({ ...formInput, medQuantity: valueString })} min={0}>
        <NumberInputField type="number" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text>{formInput.doseUnit}</Text>
    </HStack>
  );
  console.log(formInput);
  return (
    <>
      <label className="form-label" size="sm"> Medication Name: </label>
      <Input name="medicationName" value={formInput.medicationName} type="text" onChange={handleChange} />

      <label className="form-label" size="sm"> Dose:</label>
      <DropDownDose />

      <label className="form-label" size="sm"> Quantity:</label>
      <QuantityInput />

      <label className="form-label" size="sm"> Frequency:</label>
      <FrequencyScheduler />
    </>
  );
};

export default MedicationForm;
