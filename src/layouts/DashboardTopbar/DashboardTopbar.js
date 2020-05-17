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
    <div className="dashboard-topbar d-f jc-c">
      <div className="container d-f ai-c jc-sb">
        <div className="d-f ai-c">
          <img src={require('../../assets/watermark-green.svg')} alt="Reddex" style={{width: '140px'}}/>
          <div id="headway" className="ml- mr-"></div>
        </div>


        <NavWidget/>
      </div>
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
