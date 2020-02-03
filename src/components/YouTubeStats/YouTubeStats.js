import React, { useEffect, useState } from 'react'
import './YouTubeStats.scss';
import Axios from 'axios';
import isEmpty from '../../helpers/objIsEmpty';

const YouTubeStats = ({user}) => {
  const [ yt, setYt ] = useState("");
  const [ stats, setStats ] = useState({});
  useEffect(() => {
    getYtChannel()

  }, [])

  const getYtChannel = (channel = user.youtube_id) => {
    const ytLink = `https://www.googleapis.com/youtube/v3/channels?id=${channel}&part=snippet,statistics&key=${process.env.REACT_APP_YOUTUBE_KEY}`;
    return Axios.get(ytLink).then(res => {
      setStats({...res.data.items[0].statistics})
      window.localStorage.setItem('youtube',channel)
    }).catch(console.log);
  }

  const saveYoutubeId = async (id) => {
    const token = window.localStorage.getItem('token');

    return Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/youtube`, {
      youtube_id: id
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
        <div className="d-f fxd-c mt+">
          <h1 className="dash-subtitle mr+">Youtube Stats</h1>
          <p className="mb+">Example: https://www.youtube.com/channel/<span style={{color: '#F35627'}}>your-channel-id</span></p>
        </div>
        <form className="w-400px d-f ai-c mb-">
          <input placeholder="Enter youtube ID to get stats.." id="youtubeInput" className="input mr-" value={yt} onChange={e => setYt(e.target.value)}></input>
          <button className="btn btn-secondary" onClick={e => getStatsHandler(e)}>Get Stats</button>
        </form>
      </React.Fragment>
    );
  }

  return (
    <div className="mt+ mb+">
      <div className="d-f ai-c">
        <h1 className="dash-subtitle mr+">Youtube Stats</h1>
      </div>
       
      <ul className="stat-list">
        <Stat 
          stat={stats.subscriberCount}
          label="Subscribers"
          icon={<i className="fab fa-youtube"></i>}
        />

        <Stat 
          stat={stats.videoCount}
          label="Videos"
          icon={<i className="fas fa-video"></i>}
        />

        <Stat 
          stat={stats.viewCount}
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

      <div className="stat-stats w-100pr">
        <h3>{numberWithCommas(stat)}</h3>
        <h5>{label}</h5>
      </div>
    </li>
  )
}
export default YouTubeStats
