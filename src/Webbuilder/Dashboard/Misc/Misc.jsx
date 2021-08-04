import React from "react";
import ToggleStatus from "../../../components/ToggleStatus/ToggleStatus";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import SiteBuilderWrapper from "../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper";
import WithNav from "../../../layouts/WithNav/WithNav";
import { H2, H2Subtitle } from "../../../components/Headings/Headings";
import tabs from "../tabs";

const Misc = inject(
  "SiteStore",
  "UserStore"
)(
  observer(({ SiteStore, UserStore }) => {
    return (
      <Dashboard>
        <WithNav
          tabs={tabs}
          optionalTabs={
            SiteStore.preview.subdomain && SiteStore.isSiteSaved
              ? [
                  <a
                    href={`https://${SiteStore.preview.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="no-underline"
                  >
                    View your site
                  </a>,
                ]
              : []
          }
        >
          {" "}
          <SiteBuilderWrapper>
            <div className="flex mt-2">
              <div className="mr-6 mt-2">
                <ToggleStatus
                  context="show_credit_link"
                  option="Hidden"
                  disabledText="Visible"
                  setToggledHandler={() => {
                    SiteStore.setConfig({
                      show_credit_link: !SiteStore.config.show_credit_link,
                    });
                  }}
                  toggled={SiteStore.config.show_credit_link ? true : false}
                />
              </div>
              <div className="flex flex-col">
                <H2>Show Reddex Credit Link</H2>
                <H2Subtitle>
                  This is the "Powered by Reddex" link in the footer of your
                  site. It helps other narrators see how your site is made (also
                  helps the site grow!).
                </H2Subtitle>
              </div>
            </div>
          </SiteBuilderWrapper>
        </WithNav>
      </Dashboard>
    );
  })
);

export default Misc;
