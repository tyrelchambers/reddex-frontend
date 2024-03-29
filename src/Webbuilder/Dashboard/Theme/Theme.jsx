import React from "react";
import SiteBuilderThemeForm from "../../../components/Forms/SiteBuilderThemeForm";
import { observer, inject } from "mobx-react";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import WithNav from "../../../layouts/WithNav/WithNav";
import SiteBuilderWrapper from "../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper";
import { H2, H1, H1Subtitle } from "../../../components/Headings/Headings";
import tabs from "../tabs";

const Theme = ({ SiteStore }) => {
  const configHandler = (e) => {
    SiteStore.setConfig({ [e.target.name]: e.target.value });
  };

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
                  className="no-underline"
                >
                  View your site
                </a>,
              ]
            : []
        }
      >
        <H2 className="mb-6">Colour Theme</H2>
        <SiteBuilderWrapper>
          <SiteBuilderThemeForm
            configHandler={configHandler}
            config={SiteStore.config}
          />
        </SiteBuilderWrapper>
      </WithNav>
    </Dashboard>
  );
};

export default inject("SiteStore")(observer(Theme));
