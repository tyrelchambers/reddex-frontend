import React from 'react'
import { NavLink } from 'react-router-dom';
import './AccountSubnav.scss';
const AccountSubnav = () => {
  return (
    <ul className="d-f ai-c mt+ account-subnav">
      <li className="mr-">
        <NavLink to="/account/default_message" className="nav-tab" activeClassName="active-tab">
          Default Message
        </NavLink>
      </li>
      <li>
        <NavLink to="/account/alt_message" className="nav-tab" activeClassName="active-tab">
          Alternative Message
        </NavLink>  
      </li>  
    </ul>
  )
}

export default AccountSubnav
