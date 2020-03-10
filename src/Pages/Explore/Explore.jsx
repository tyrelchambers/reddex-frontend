import React, {useState, useEffect} from 'react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import './Explore.scss'
import { getAxios } from '../../api';

const Explore = () => {
  const [ channels, setChannels ] = useState([])

  useEffect(() => {
    getAxios({
      url: '/channels/',
      options: {
        withToken: false
      }
    }).then(res => {
      if ( res ) {
        setChannels([...res])
      }
    })
  }, []);

  const channelsList = channels.map((x, id) => (
    <a 
      className="channel-item" 
      href={`https://${x.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} 
      target="_blank" 
      rel="noreferrer noopener" 
      key={id}
      style={{
        background: `url(${x.thumbnail ? x.thumbnail : x.banner_url}) center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <div className="channel-item-body">
        <h2>{x.title}</h2>
      </div>
    </a>
  ))

  return (
    <DisplayWrapper>
      <div className="container explore-wrapper">
        <h1 className="ta-c">Explore different channels</h1>
        <p className="mt- ta-c">Explore the horror sites hosted by Reddex and maybe you'll find your new favourite channel to watch. Maybe take a shot at writing a story for them!</p>

        <div className="channels-list">
          {channelsList}
        </div>
      </div>
    </DisplayWrapper>
  );
}

export default Explore;
