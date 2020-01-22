import React, { useEffect, useState } from 'react'
import './YouTubeStats.scss';
import Axios from 'axios';
import isEmpty from '../../helpers/objIsEmpty';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const YouTubeStats = inject("UserStore")(observer(({UserStore}) => {
  const [ yt, setYt ] = useState("");
  const [ stats, setStats ] = useState({});
  useEffect(() => {
    getYtChannel()

  }, [])

  const getYtChannel = (channel = UserStore.getUser().youtubeId) => {
    const ytLink = `https://www.googleapis.com/youtube/v3/channels?id=${channel}&part=snippet,statistics&key=${process.env.REACT_APP_YOUTUBE_KEY}`;
    return Axios.get(ytLink).then(res => {
      setStats({...res.data.items[0].statistics})
      window.localStorage.setItem('youtube',channel)
    }).catch(console.log);
  }

  const saveYoutubeId = async (id) => {
    const token = window.localStorage.getItem('token');

    return Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/youtube`, {
      youtubeId: id
    }, {
      headers: {
        token
      }
    }).then().catch(console.log);
  }

  const getStatsHandler = e => {
    e.preventDefault();
    getYtChannel(yt);
    saveYoutubeId(yt);
  }

  if ( isEmpty(stats) ) {
    return(
      <React.Fragment>
        <form className="w-400px d-f ai-c mb+">
          <input placeholder="Enter youtube ID to get stats.." id="youtubeInput" className="input mr-" value={yt} onChange={e => setYt(e.target.value)}></input>
          <button className="btn btn-secondary" onClick={e => getStatsHandler(e)}>Get Stats</button>
        </form>
      </React.Fragment>
    );
  }

  return (
    <div className="mb+">       
      <ul className="stat-list">
        <Stat 
          stat={stats.subscriberCount}
          label="Subscribers"
          icon={<i className="fab fa-youtube stat-icon"></i>}
        />

        <Stat 
          stat={stats.videoCount}
          label="Videos"
          icon={<i className="fas fa-video stat-icon"></i>}
        />

        <Stat 
          stat={stats.viewCount}
          label="Views"
          icon={<i className="fas fa-eye stat-icon"></i>}
        /> 
      </ul>
    </div>
  )
}));




function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Stat = ({stat, label, icon}) => {
  return (
    <li className="stat-item">
      <div className="stat-stats w-100pr">
        <h3>{icon} {numberWithCommas(stat)}</h3>
        <h5>{label}</h5>
      </div>
    </li>
  )
}
export default YouTubeStats
