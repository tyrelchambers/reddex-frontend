import React from 'react';
import Youtube from './Youtube/Youtube';
import Twitter from './Twitter/Twitter'
import Dashboard from '../../../Pages/Dashboard/Dashboard';
import WithNav from '../../../layouts/WithNav/WithNav';
import SiteBuilderWrapper from '../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper';
import tabs from '../tabs'
import { inject, observer } from 'mobx-react';
import { H1, H1Subtitle } from '../../../components/Headings/Headings';

const Timelines = ({SiteStore}) => {
  return (
    <Dashboard>
      <H1>Site Builder</H1>
      <H1Subtitle>Build your website and advertise what you do.</H1Subtitle>
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
          <Youtube />
          <Twitter/>
        </WithNav>
      </SiteBuilderWrapper>
    </Dashboard>
  );
}

export default inject("SiteStore")(observer(Timelines));
