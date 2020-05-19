import React from 'react';
import Youtube from './Youtube/Youtube';
import Twitter from './Twitter/Twitter'
import Dashboard from '../../../Pages/Dashboard/Dashboard';
import WithNav from '../../../layouts/WithNav/WithNav';
import SiteBuilderWrapper from '../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper';
import tabs from '../tabs'

const Timelines = () => {
  return (
    <Dashboard>
      <SiteBuilderWrapper>
        <WithNav tabs={tabs}>
          <Youtube />
          <Twitter/>
        </WithNav>
      </SiteBuilderWrapper>
    </Dashboard>
  );
}

export default Timelines;
