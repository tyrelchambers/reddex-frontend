import React from 'react'
import Dashboard from '../Dashboard';
import YouTubeStats from '../../../components/YouTubeStats/YouTubeStats';
import HR from '../../../components/HR/HR';
import { inject, observer } from 'mobx-react';

const Overview = inject("UserStore")(observer(({UserStore}) => {
  return (
    <Dashboard>
      <YouTubeStats
        user={UserStore.getUser()}
      />
      <HR/>
    </Dashboard>
  )
}));

export default Overview
