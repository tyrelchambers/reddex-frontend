import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';

const Misc = ({config, setConfig}) => {
  return (
    <div>
      <div className="d-f">
        <div className="mr--- mt-">
          <ToggleStatus
            context="show_credit_link"
            option="Hidden"
            disabledText="Visible"
            setToggledHandler={() => {
              setConfig({...config, show_credit_link: !config.show_credit_link});
            }}
            toggled={config.show_credit_link ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Show Reddex Credit Link</h2>
          <p className="mt-- subtle">This is the "Powered by Reddex" link in the footer of your site. It helps other narrators see how your site is made (also helps the site grow!).</p>
        </div>
      </div>
    </div>
  );
}

export default Misc;
