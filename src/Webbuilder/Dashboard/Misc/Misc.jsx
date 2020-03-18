import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import HR from '../../../components/HR/HR';

const Misc = inject("SiteStore", "UserStore")(observer(({SiteStore, UserStore}) => {
  return (
    <div>
      <div className="d-f mt-">
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

      <HR classes="mt+"/>

      {UserStore.patron.patreon_tier === "basic" &&
        <div className="d-f mt+">
          <div className="d-f fxd-c">
            <h2>Reddex Supporter</h2>
            <p className="mt-- subtle">Thank you so much for supporting Reddex.</p>
          </div>
        </div>
      }

      {UserStore.patron.patreon_tier === "pro" &&
        <div className="d-f mt+">
          <div className="d-f fxd-c">
            <h2>Reddex Pro Supporter</h2>
            <p className="mt-- subtle">A badge has been added to your website to show everyone how awesome you are.</p>
          </div>
        </div>
      }
    </div>
  );
}))

export default Misc;
