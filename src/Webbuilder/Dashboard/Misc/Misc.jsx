import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const Misc = inject("SiteStore")(observer(({SiteStore}) => {
  return (
    <div>
      <div className="d-f">
        <div className="mr--- mt-">
          <ToggleStatus
            context="show_credit_link"
            option="Hidden"
            disabledText="Visible"
            setToggledHandler={() => {
              SiteStore.setConfig({show_credit_link: !SiteStore.config.show_credit_link});
            }}
            toggled={SiteStore.config.show_credit_link ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Show Reddex Credit Link</h2>
          <p className="mt-- subtle">This is the "Powered by Reddex" link in the footer of your site. It helps other narrators see how your site is made (also helps the site grow!).</p>
        </div>
      </div>
    </div>
  );
}))

export default Misc;
