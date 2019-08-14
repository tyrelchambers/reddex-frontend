import React from 'react'
import './DashboardNav.scss';
import {NavLink, Link} from 'react-router-dom';

const DashboardNav = () => {
  return (
    <nav className="dash-nav" id="dashNav">
      <NavToggle />
      <ul >
        <li>
          <NavLink to="/dashboard/home" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-home"></i>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reading_list" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-file-alt"></i>
            <p>Stories</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inbox" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-inbox"></i>
            <p>Inbox</p>
          </NavLink>
        </li>
        <li>
          <Link to="/" className="dash-nav-item">
            <i className="fas fa-download"></i>
            <p>Get Stories</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const NavToggle = () => {
  return (
    <div className="d-f fxd-c jc-sb dash-nav-toggle" onClick={(e) => {
      document.querySelector("#dashNav").classList.toggle('collapsed');
      e.target.classList.toggle('closed')
    }}>
      <i className="fas fa-angle-double-right"></i>
    </div>
  );
}

export default DashboardNav
