import React from 'react'
import Dashboard from '../Dashboard';
import YouTubeStats from '../../../components/YouTubeStats/YouTubeStats';
import HR from '../../../components/HR/HR';

const Overview = () => {
  return (
    <Dashboard>
      <YouTubeStats/>
      <HR/>
    </Dashboard>
  )
}

export default Overview
