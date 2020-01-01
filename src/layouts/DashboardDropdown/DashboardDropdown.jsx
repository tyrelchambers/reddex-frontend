import React from 'react'
import './DashboardDropdown.scss';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const DashboardDropdown = inject("UserStore")(observer(({UserStore}) => {
  const resetVisitorStatus = () =>{
    window.localStorage.setItem("new_visitor", null);
  }
  return (
    <div className="dropdown-wrapper">
      <ul className="dashboard-dropdown d-f fxd-c">
       <li className="d-f ai-c ">
          <Link to="/dashboard/home"
            className="dropdown-link"
          >Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/account?t=default_message" className="dropdown-link">Account</Link>
        </li>
        
        <li className="d-f ai-c ">
          <Link onClick={() => {
            resetVisitorStatus()
          }} 
          to="#"
          className="dropdown-link">Reset Visitor Status</Link>
        </li>

        <li>
          <Link to="/" className="dropdown-link" onClick={() => {
            UserStore.signOut()
          }}>Sign Out</Link>
        </li>
      </ul>
    </div>
  )
}));

export default DashboardDropdown
