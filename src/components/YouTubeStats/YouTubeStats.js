import React, { useEffect, useState } from 'react'
import './YouTubeStats.scss';
import Axios from 'axios';

const YouTubeStats = () => {
  const [ yt, setYt ] = useState();
  
  useEffect(() => {
    getYtChannel()
  }, [])

  const getYtChannel = (channel = window.localStorage.getItem('youtube')) => {
    const ytLink = `https://www.googleapis.com/youtube/v3/channels?id=${channel}&part=snippet,statistics&key=${process.env.REACT_APP_YOUTUBE_KEY}`;
    return Axios.get(ytLink).then(res => {
      setYt(res.data.items[0])
      window.localStorage.setItem('youtube',channel)
    }).catch(console.log).then();
  }

  const getStatsHandler = e => {
    e.preventDefault();
    const input = document.querySelector("#youtubeInput").value;
    getYtChannel(input);
    
  }

  if (!yt) return null;

  if ( !window.localStorage.getItem('youtube') ) {
    return(
      <React.Fragment>
        <div className="d-f ai-c">
          <h1 className="dash-subtitle mr+ mb+">Youtube Stats</h1>
        </div>
        <form className="w-400px d-f ai-c mb+">
          <input placeholder="Enter youtube username to get stats.." id="youtubeInput" className="input mr-"></input>
          <button className="btn btn-secondary" onClick={e => getStatsHandler(e)}>Get Stats</button>
        </form>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="d-f ai-c">
        <h1 className="dash-subtitle mr+">Youtube Stats</h1>
      </div>
       
      <ul className="stat-list">
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




function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Stat = ({stat, label, icon}) => {
  return (
    <li className="stat-item">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-stats">
        <h3>{numberWithCommas(stat)}</h3>
        <h5>{label}</h5>
      </div>
    </li>
  )
}
export default YouTubeStats
