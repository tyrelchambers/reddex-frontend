import React from 'react'
import './DashboardNav.scss';
import {NavLink, Link} from 'react-router-dom';

const DashboardNav = () => {
  return (
    <nav className="dash-nav ">
      <NavToggle />
      <ul >
        <li>
          <NavLink to="/dashboard/home" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-home"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reading_list" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-file-alt"></i>
            Stories
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inbox" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-inbox"></i>
            Inbox
          </NavLink>
        </li>
        <li>
          <Link to="/" className="dash-nav-item">
            <i className="fas fa-download"></i>
            Get Stories
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const NavToggle = () => {
  return (
    <div className="d-f fxd-c jc-sb dash-nav-toggle">
      <div className="d-f jc-sb">
        <div className="nav-dot"></div>
        <div className="nav-dot"></div>
      </div>
      <div className="d-f jc-sb">
        <div className="nav-dot"></div>
        <div className="nav-dot"></div>
      </div>
    </div>
  );
}

export default DashboardNav
