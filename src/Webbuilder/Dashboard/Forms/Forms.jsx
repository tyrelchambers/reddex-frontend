import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';

const Forms = ({config, setConfig}) => {
  const SubForm = () => (
    <div className="d-f">
      <div className="mt--- mr-">
        <ToggleStatus
          context="submissionForm"
          option="Inactive"
            disabledText="Active"
          setToggledHandler={() => {
            setConfig({...config, submission_form: !config.submission_form});
          }}
          toggled={config.submission_form ? true : false}
        />
      </div>
      <div className="d-f fxd-c">
        <h2>Submission Form</h2>
        <p className="mb- subtle">Activate this submission form to allow visitors to email you their own stories</p>
      </div>
      
    </div>
  )
  return (
    <div>
      <SubForm/>
    </div>
  );
}

export default Forms;
