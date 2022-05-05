module.exports = {
  up: async (queryInterface) => {
    const medicationDetails = [
      {
        name_generic: 'atorvastatin',
        name_branded: JSON.stringify({ brandNames: ['lipitor'] }),
        additional_remarks: 'used to improve cholestrol levels and decrease risk for heart attack and stroke. To avoid grapefruit juice and alcohol while on this medication',
        med_strength: JSON.stringify({ medmed_strength: ['20mg', '40mg', '10mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'aspirin',
        name_branded: JSON.stringify({ brandNames: ['Bokey,Cardipirin'] }),
        additional_remarks: ' ',
        med_strength: JSON.stringify({ medmed_strength: ['100mg,300mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'clopidogrel ',
        name_branded: JSON.stringify({ brandNames: ['Plavix'] }),
        additional_remarks: 'for prevention of heart attack and stroke. Used as a blood thinner to reduce risk of blood clots',
        med_strength: JSON.stringify({ medmed_strength: ['75mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'simvastatin',
        name_branded: JSON.stringify({ brandNames: ['zocor'] }),
        additional_remarks: 'used to improve cholestrol levels and decrease risk for heart attack and stroke. To avoid grapefruit juice and alcohol while on this medication',
        med_strength: JSON.stringify({ medmed_strength: ['10mg,20mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'lovastatin ',
        name_branded: JSON.stringify({ brandNames: ['medostatin'] }),
        additional_remarks: 'used to improve cholestrol levels and decrease risk for heart attack and stroke. To avoid grapefruit juice and alcohol while on this medication',
        med_strength: JSON.stringify({ medmed_strength: ['20mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'glipizide ',
        additional_remarks: 'for high blood sugar. Avoid alcohol. Look out for low blood sugar symptoms. Take immediately before meals ',
        med_strength: JSON.stringify({ medmed_strength: ['5mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'metformin',
        name_branded: JSON.stringify({ brandNames: ['Glucophage'] }),
        additional_remarks: 'Control high blood sugar. Take after meals.',
        med_strength: JSON.stringify({ medmed_strength: ['250mg, 500mg,850mg, 500mgXR'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'linagliptin',
        name_branded: JSON.stringify({ brandNames: ['trajenta'] }),
        additional_remarks: 'Control high blood sugar.',
        med_strength: JSON.stringify({ medmed_strength: ['5mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'empagliflozin',
        name_branded: JSON.stringify({ brandNames: ['jardiance'] }),
        additional_remarks: 'Control high blood sugar.Kidney and heart protection',
        med_strength: JSON.stringify({ medmed_strength: ['25mg, 10mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'dapagliflozin',
        name_branded: JSON.stringify({ brandNames: ['forxiga'] }),
        additional_remarks: 'Control high blood sugar.Kidney and heart protection',
        med_strength: JSON.stringify({ medmed_strength: ['10mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'amoxicillin/clavunate',
        name_branded: JSON.stringify({ brandNames: ['augmentin'] }),
        additional_remarks: 'Antibiotic. Take it after food.',
        med_strength: JSON.stringify({ medmed_strength: ['[625mg,1000mg,228mg/5ml'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'amoxicllin',
        additional_remarks: 'antibiotic',
        med_strength: JSON.stringify({ medmed_strength: ['250mg,500mg,125mg/5ml'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'doxycycline',
        additional_remarks: 'antibiotiic. Take it after food. Reduce exposure to sunlight. Sit up right after taking the medication. ',
        med_strength: JSON.stringify({ medmed_strength: ['100mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'omeprazole',
        name_branded: JSON.stringify({ brandNames: ['zenpro'] }),
        additional_remarks: 'gastric medication. Take half an hour before food ',
        med_strength: JSON.stringify({ medmed_strength: ['20mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'clarithromycin',
        name_branded: JSON.stringify({ brandNames: ['klacid'] }),
        additional_remarks: '',
        med_strength: JSON.stringify({ medmed_strength: ['20mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'warfarin',
        name_branded: JSON.stringify({ brandNames: ['marevan'] }),
        additional_remarks: 'use as directed. Look our for bleeding risks and follow consistent vegetable intake',
        med_strength: JSON.stringify({ medmed_strength: ['3mg,5mg,1mg'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name_generic: 'cholecalciferol',
        med_strength: JSON.stringify({ medmed_strength: ['1000units,25000units'] }),
        created_at: new Date(),
        updated_at: new Date(),
      },

    ];

    const medicationsInfo = await queryInterface.bulkInsert(
      'medication_details',
      medicationDetails,
      { returning: true },
    );
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('medication_details', null, {});
  },
};
