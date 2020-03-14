import React, { useEffect} from 'react'
import './DashboardTopbar.scss';
import NavWidget from '../NavWidget/NavWidget';
import headwayConfig from '../../helpers/headwayConfig';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const DashboardTopbar = ({SiteStore}) => {
  useEffect(() => {
    headwayConfig()
  })

  return (
    <div className="d-f dashboard-topbar jc-sb">
      <div className="d-f ai-c">
        <NavToggle />
        <div id="headway" className="ml- mr-"></div>
        {SiteStore.preview.subdomain &&
          <a href={`https://${SiteStore.preview.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} rel="noopener noreferrer" target="_blank" className="td-n link"><i className="fas fa-external-link-square-alt mr---"></i> View your site</a>
        }
      </div>


      <NavWidget/>
    </div>
  )
}


 const NavToggle = () => {
  return (
    <div className=" dash-nav-toggle" onClick={(e) => {
      document.querySelector("#dashNav").classList.toggle('collapsed');
      const bodyWidth = document.body.clientWidth;

      if ( bodyWidth <= 425 ) {
        document.querySelector(".topbar-account-widget").classList.toggle('collapsed');
      }

    }}>
    <span className="toggle-line"></span>
    <span className="toggle-line"></span>
    <span className="toggle-line"></span>
  </div>
  );
}

export default inject("SiteStore")(observer(DashboardTopbar))
