import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';

const Misc = ({config, setConfig}) => {
  return (
    <div>
      <div className="d-f">
        <div className="mr--- mt-">
          <ToggleStatus
            context="showCreditLink"
            option="Hidden"
            disabledText="Visible"
            setToggledHandler={() => {
              setConfig({...config, showCreditLink: !config.showCreditLink});
            }}
            toggled={config.showCreditLink ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Show Reddex Credit Link</h2>
          <p className="mt--">This is the "Powered by Reddex" link in the footer of your site. It helps other narrators see how your site is made.</p>
        </div>
      </div>
    </div>
  );
}

export default Misc;
