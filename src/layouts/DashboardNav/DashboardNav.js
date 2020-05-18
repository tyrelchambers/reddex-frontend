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
      <ul className="container d-f ai-c">
        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/reading_list?t=approved" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">            
          <p>Reading List</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/submitted" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">            
          <p>Submitted</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/tags" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">            
          <p>Tag Manager</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/contacts" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">
            <p>Contacts</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/inbox" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">            
          <p>Inbox</p>
          </NavLink>
        </li>

        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/account?t=security" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">           
            <p>Account</p>
          </NavLink>
        </li>
        
        <li>
          <NavLink onClick={e => parent(e)} to="/dashboard/site" className="dash-nav-item" activeClassName="dash-nav-item-active ta-c">            
            <p>Site Builder</p>
          </NavLink>
        </li>

        <li>
          <Link to="/" className="dash-nav-item ta-c">            
            <p>Get Stories</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}


export default DashboardNav
