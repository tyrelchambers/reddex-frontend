import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import SiteBuilderSubmissionForm from '../../../components/Forms/SiteBuilderSubmissionForm';
import HR from '../../../components/HR/HR';

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
      <HR />
      {config.submission_form &&
        <section className="custom-story-form mt+">
          <h2>Customize your submission form</h2>
          <p className="subtle mb+">This is what your visitor will see when they submit you a story. Customize it to fit it how you'd like.</p>
          <SiteBuilderSubmissionForm />
        </section>
      }
    </div>
  );
}

export default Forms;
