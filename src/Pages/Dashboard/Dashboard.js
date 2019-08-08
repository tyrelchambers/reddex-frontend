import React from 'react'
import DashboardNav from '../../layouts/DashboardNav/DashboardNav';
import './Dashboard.scss';
import DashboardTopbar from '../../layouts/DashboardTopbar/DashboardTopbar';

const Dashboard = (props) => {
  return (
    <div className="d-f">
      <DashboardNav />
      
      <main className="dashboard-inner">
        <DashboardTopbar />

        <div className="p+">
          {props.children}
        </div>
      </main>
    </div>
  )
}



export default Dashboard
