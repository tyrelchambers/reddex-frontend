import React from 'react'
import DashboardNav from '../../layouts/DashboardNav/DashboardNav';
import './Dashboard.scss';
import DashboardTopbar from '../../layouts/DashboardTopbar/DashboardTopbar';
import Loading from '../../components/Loading/Loading';

const Dashboard = ({loading, children}) => {
  return (
    <div className="d-f dashboard-wrapper">
      <DashboardNav />
      
      <main className="dashboard-inner" id="#dashboard-inner-slide">
        <DashboardTopbar />

        {loading &&
          <Loading />
        }

        {!loading &&
          <div className={`p+ dashboard-page-wrapper animated fadeIn faster`}>
            {children}
          </div>
        }
      </main>
    </div>
  )
};



export default Dashboard
