import React from "react";
import Youtube from "./Youtube/Youtube";
import Twitter from "./Twitter/Twitter";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import WithNav from "../../../layouts/WithNav/WithNav";
import SiteBuilderWrapper from "../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper";
import tabs from "../tabs";
import { inject, observer } from "mobx-react";
import { H1, H1Subtitle } from "../../../components/Headings/Headings";

const Timelines = ({ SiteStore }) => {
  return (
    <Dashboard>
      <H1>Site Builder</H1>
      <H1Subtitle>Build your website and advertise what you do.</H1Subtitle>
      <WithNav
        tabs={tabs}
        optionalTabs={
          SiteStore.preview.subdomain && SiteStore.isSiteSaved
            ? [
                <a
                  href={`https://${SiteStore.preview.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="td-n"
                >
                  View your site
                </a>,
              ]
            : []
        }
      >
        {" "}
        <SiteBuilderWrapper>
          <Youtube />
          <Twitter />
        </SiteBuilderWrapper>
      </WithNav>
    </Dashboard>
  );
};

export default inject("SiteStore")(observer(Timelines));
