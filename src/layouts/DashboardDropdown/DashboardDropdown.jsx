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
        
        <li className="d-f ai-c ">
          <Link onClick={() => {
            resetVisitorStatus()
          }} 
          to="#"
          className="dropdown-link">Download Subreddits</Link>
        </li>

        <li>
          <Link to="/signout" className="dropdown-link" >Sign Out</Link>
        </li>
      </ul>
    </div>
  )
}));

export default DashboardDropdown
