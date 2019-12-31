import React from 'react'
import './DashboardDropdown.scss';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { useAuth0 } from '../../react-auth0-spa';

const DashboardDropdown = inject("UserStore")(observer(({UserStore}) => {
  const {  logout } = useAuth0();

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
          <Link to="/" className="dropdown-link" onClick={() => logout()}>Sign Out</Link>
        </li>
      </ul>
    </div>
  )
}));

export default DashboardDropdown
