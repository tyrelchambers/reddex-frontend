import React, { useEffect} from 'react'
import './DashboardTopbar.scss';
import NavWidget from '../NavWidget/NavWidget';
import headwayConfig from '../../helpers/headwayConfig';

const DashboardTopbar = () => {
  useEffect(() => {
    headwayConfig()
  })

  return (
    <div className="d-f dashboard-topbar jc-sb">
      <div className="d-f">
        <NavToggle />
        <div id="headway" className="ml-"></div>
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

export default DashboardTopbar
