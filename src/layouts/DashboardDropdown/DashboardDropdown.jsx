import React from 'react'
import './DashboardDropdown.scss';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const DashboardDropdown = inject("UserStore")(observer(({UserStore}) => {
  return (
    <ul className="dashboard-dropdown d-f fxd-c">
      <li>
        <Link to="/account/default_message" className="dropdown-link">Account</Link>
      </li>
      
      <li>
        <Link to="/" className="dropdown-link" onClick={() => {
          UserStore.signOut()
        }}>Sign Out</Link>
      </li>
    </ul>
  )
}));

export default DashboardDropdown
