import React from 'react';
import SiteBuilderThemeForm from '../../../components/Forms/SiteBuilderThemeForm';
import { observer, inject } from 'mobx-react';
import Dashboard from '../../../Pages/Dashboard/Dashboard';
import WithNav from '../../../layouts/WithNav/WithNav';
import SiteBuilderWrapper from '../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper';
import { H2, H1, H1Subtitle } from '../../../components/Headings/Headings';
import tabs from '../tabs'

const Theme = ({SiteStore}) => {

  const configHandler = (e) => {
    SiteStore.setConfig({[e.target.name]: e.target.value})
  }

  return (
    <Dashboard>
      <H1>Site Builder</H1>
      <H1Subtitle>Build your website and advertise what you do.</H1Subtitle>
      <WithNav tabs={tabs}>
        <SiteBuilderWrapper>
        <H2>Colour Theme</H2>
        <div className="mt+">
          <SiteBuilderThemeForm 
            configHandler={configHandler}
            config={SiteStore.config}
          />
        </div>
        </SiteBuilderWrapper>
      </WithNav>
    </Dashboard>
  );
}

export default inject("SiteStore")(observer(Theme));
