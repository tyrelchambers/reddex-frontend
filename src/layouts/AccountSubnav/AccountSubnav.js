import React from 'react'
import { NavLink } from 'react-router-dom';
import './AccountSubnav.scss';
const AccountSubnav = () => {
  const params = new URLSearchParams(window.location.search);
  return (
    <ul className="d-f ai-c mt+ account-subnav">
      <li className="mr-">
        <NavLink to="/dashboard/account?t=default_message" className="nav-tab" activeClassName="active-tab" isActive={() => {
          if ( params.get("t") === "default_message" ) {
            return true;
          }
        }}>
          Greeting Message
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/account?t=alt_message" className="nav-tab" activeClassName="active-tab" isActive={() => {
          if ( params.get("t") === "alt_message"  ) {
            return true;
          }
        }}>
          Recurring Message
        </NavLink>  
      </li>  
    </ul>
  )
}

export default AccountSubnav
