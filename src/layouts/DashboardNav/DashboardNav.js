import React from 'react'
import './DashboardNav.scss';
import {NavLink, Link} from 'react-router-dom';

const DashboardNav = () => {
  const bodyWidth = document.body.clientWidth;
  return (
    <nav className={`dash-nav ${bodyWidth <= 768 ? "collapsed" : ""}`} id="dashNav">
      <ul >
        <li>
          <NavLink to="/dashboard/home" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <i className="fas fa-home"></i>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reading_list" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <i className="fas fa-glasses"></i>
            <p>Stories</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inbox" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <i className="fas fa-inbox"></i>
            <p>Inbox</p>
          </NavLink>
        </li>
        <li>
          <Link to="/" className="dash-nav-item ta-c">
            <i className="fas fa-download"></i>
            <p>Get Stories</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}


export default DashboardNav
