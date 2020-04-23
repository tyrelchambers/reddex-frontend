import React, {useEffect} from 'react'
import DashboardNav from '../../layouts/DashboardNav/DashboardNav';
import './Dashboard.scss';
import DashboardTopbar from '../../layouts/DashboardTopbar/DashboardTopbar';
import Loading from '../../components/Loading/Loading';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { getAxios } from '../../api';

const Dashboard = inject("FormStore", "UserStore", "SiteStore")(observer(({loading, children, UserStore, SiteStore, FormStore}) => {
  useEffect(() => {
    const yt = UserStore.currentUser.youtube_id;

    const fn = async () => {
     
  
     
      await getAxios({
        url: '/site/config'
      })
      .then(res => {
        if (res) {
          SiteStore.setInitial({...res, youtube_id: res.youtube_id || yt})
          SiteStore.setPreview({subdomain: res.subdomain})
          FormStore.setOptionsId(res.SubmissionFormOption.uuid)
          SiteStore.setActivated(true)
        }
      })

      await getAxios({
        url: '/patreon/getUserIdentity'
      }).then(res => {
        if (res) {
          UserStore.setPatron(res)

        }
      })
    }


    fn();
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
