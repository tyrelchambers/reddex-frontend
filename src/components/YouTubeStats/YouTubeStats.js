import React, { useEffect, useState } from 'react'
import './YouTubeStats.scss';
import Axios from 'axios';

const YouTubeStats = ({channel = "UCGB-bGTeEWfGKLNx2Wi9ytQ"}) => {
  const [ yt, setYt ] = useState();
  const ytLink = `https://www.googleapis.com/youtube/v3/channels?id=${channel}&part=snippet,statistics&key=${process.env.REACT_APP_YOUTUBE_KEY}`;

  const getYtChannel = () => {
    return Axios.get(ytLink).then(res => setYt(res.data.items[0])).catch(console.log).then();
  }

  useEffect(() => {
    const _ = async () => {
      await getYtChannel();
    }
    _();
  }, [channel])

  if (!yt) return null;

  return (
    <div>
      <div className="d-f ai-c">
        <h1 className="dash-subtitle mr+">Youtube Stats</h1>
        <a href={`https://youtube.com/channel/${channel}`} target="_blank" className="external-link"><i className="fas fa-link mr--"></i> View Channel</a>
      </div>
      
      <ul>
        <Stat 
          stat={yt.statistics.subscriberCount}
          label="Subscribers"
          icon={<i className="fab fa-youtube"></i>}
        />

        <Stat 
          stat={yt.statistics.videoCount}
          label="Videos"
          icon={<i className="fas fa-video"></i>}
        />

        <Stat 
          stat={yt.statistics.viewCount}
          label="Views"
          icon={<i className="fas fa-eye"></i>}
        /> 
      </ul>
    </div>
  )
}

const Stat = ({stat, label, icon}) => {
  return (
    <li>
      <div>
        {icon}
      </div>

      <div className="stat-stats">
        <h3>{stat}</h3>
        <h5>{label}</h5>
      </div>
    </li>
  )
}
export default YouTubeStats
