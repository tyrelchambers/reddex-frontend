import React from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import HR from '../../../components/HR/HR';
import Dashboard from '../../../Pages/Dashboard/Dashboard';
import SiteBuilderWrapper from '../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper';
import WithNav from '../../../layouts/WithNav/WithNav';
import { H2, H2Subtitle } from '../../../components/Headings/Headings';
import tabs from '../tabs'

const Misc = inject("SiteStore", "UserStore")(observer(({SiteStore, UserStore}) => {
  return (
    <Dashboard>
      <SiteBuilderWrapper>
        <WithNav 
          tabs={tabs}
          optionalTabs={SiteStore.preview.subdomain && SiteStore.isSiteSaved ? [
            <a href={`https://${SiteStore.preview.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} rel="noopener noreferrer" target="_blank" className="td-n">View your site</a>,
            <div className="d-f ai-c share-wrapper">
              <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-url={`https://${SiteStore.config.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} data-text={`Check out my new webpage!`} data-via="ReddexApp" data-hashtags="newSite" data-show-count="false">Tweet</a>
            </div>
          ]:  []}
        >
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
              <H2>Show Reddex Credit Link</H2>
              <H2Subtitle>This is the "Powered by Reddex" link in the footer of your site. It helps other narrators see how your site is made (also helps the site grow!).</H2Subtitle>
            </div>
          </div>

          <HR classes="mt+"/>

          {UserStore.patron.patreon_tier === "basic" &&
            <div className="d-f mt+">
              <div className="d-f fxd-c">
                <H2>Reddex Supporter</H2>
                <H2Subtitle>Thank you so much for supporting Reddex.</H2Subtitle>
              </div>
            </div>
          }

          {UserStore.patron.patreon_tier === "pro" &&
            <div className="d-f mt+">
              <div className="d-f fxd-c">
                <H2>Reddex Pro Supporter</H2>
                <H2Subtitle>A badge has been added to your website to show everyone how awesome you are.</H2Subtitle>
              </div>
            </div>
          }
        </WithNav>
      </SiteBuilderWrapper>
    </Dashboard>
  );
}))

export default Misc;
