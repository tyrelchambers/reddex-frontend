import React, {useEffect} from 'react'
import DashboardNav from '../../layouts/DashboardNav/DashboardNav';
import './Dashboard.scss';
import DashboardTopbar from '../../layouts/DashboardTopbar/DashboardTopbar';
import Loading from '../../components/Loading/Loading';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { getAxios } from '../../api';

const Dashboard = inject("ReadingListStore")(observer(({loading, children, ReadingListStore}) => {
  useEffect(() => {
    getAxios({
      url: '/profile/reading_list?permission=true'
    }).then(res => {
      if (res) {
        ReadingListStore.addToRead(res)
      }
    })

    getAxios({
      url: '/profile/stories/completed'
    }).then(res => {
      if (res) {
        ReadingListStore.setCompleted(res)
      }
    })

  }, [])

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
}));



export default Dashboard
