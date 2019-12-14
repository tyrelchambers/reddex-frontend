import React from 'react'
import DashboardNav from '../../layouts/DashboardNav/DashboardNav';
import './Dashboard.scss';
import DashboardTopbar from '../../layouts/DashboardTopbar/DashboardTopbar';
import Loading from '../../components/Loading/Loading';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const Dashboard = inject("ReadingListStore")(observer(({loading, children, ReadingListStore}) => {
  return (
    <div className="d-f dashboard-wrapper">
      <DashboardNav />
      
      <main className="dashboard-inner" id="#dashboard-inner-slide">
        <DashboardTopbar />

        {loading &&
          <Loading />
        }

        {!loading &&
          <div className={`p+ dashboard-page-wrapper`}>
            {children}
          </div>
        }
      </main>
    </div>
  )
}));



export default Dashboard
