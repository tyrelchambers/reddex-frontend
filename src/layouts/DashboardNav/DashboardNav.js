import React from 'react'
import './DashboardNav.scss';
import {NavLink, Link} from 'react-router-dom';

const DashboardNav = () => {
  const bodyWidth = document.body.clientWidth;
  const parent = e => {
    if (bodyWidth < 769) {
      e.target.closest('.dash-nav').classList.add('collapsed')
    }
  }
  return (
    <nav className={`dash-nav ${bodyWidth <= 768 ? "collapsed" : ""}`} id="dashNav">
      <ul >
        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/home" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-home"></i>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/reading_list?t=open" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-list"></i>
            <p>Reading List</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/contacts" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-user-astronaut"></i>
            <p>Contacts</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/inbox" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-at"></i>
            <p>Inbox</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/account?t=security" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-shield-alt"></i>
            <p>Account</p>
          </NavLink>
        </li>
        
        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/site" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-globe-americas"></i>
            <p>Site Builder</p>
          </NavLink>
        </li>

        <li>
          <Link to="/" className="dash-nav-item ta-c">
            <div className="nav-indicator"></div>
            <i className="fas fa-arrow-right"></i>
            <p>Get Stories</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}


export default DashboardNav
