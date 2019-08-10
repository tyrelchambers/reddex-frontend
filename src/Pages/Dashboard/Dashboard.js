import React from 'react'
import DashboardNav from '../../layouts/DashboardNav/DashboardNav';
import './Dashboard.scss';
import DashboardTopbar from '../../layouts/DashboardTopbar/DashboardTopbar';
import Loading from '../../components/Loading/Loading';

const Dashboard = (props) => {
  return (
    <div className="d-f dashboard-wrapper">
      <DashboardNav />
      
      <main className="dashboard-inner">
        <DashboardTopbar />

        {props.loading &&
          <Loading />
        }

        {!props.loading &&
          <div className="p+">
            {props.children}
          </div>
        }
      </main>
    </div>
  )
}



export default Dashboard
