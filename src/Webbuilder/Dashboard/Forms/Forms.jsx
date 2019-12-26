import React, {useState} from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';

const Forms = ({config, setConfig}) => {
  const SubForm = () => (
    <>
      <h2>Submission Form</h2>
      <p className="mb-">Activate this submission form to allow visitors to email you their own stories</p>
      <ToggleStatus
        context="submissionForm"
        option="Activate"
        setToggledHandler={() => {
          setConfig({...config, submissionForm: !config.submissionForm});
        }}
        toggled={config.submissionForm ? true : false}
      />
    </>
  )
  return (
    <div>
      <SubForm/>
    </div>
  );
}

export default Forms;
