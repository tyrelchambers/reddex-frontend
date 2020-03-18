import React, {useState, useEffect} from 'react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import './Explore.scss'
import { getAxios } from '../../api';
import PatreonBadge from '../../layouts/PatreonBadge/PatreonBadge'

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

  

  const channelsList = channels.map((x, id) => <Channel x={x} key={id} />)

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

const Channel = ({x}) => {
  const [tier, setTier] = useState()

  useEffect(() => {
    getAxios({
      url: '/profile/patreon_tier',
      params: {
        user_id: x.user_id
      }
    }).then(res => {
      if (res) {
        setTier(res)
      }
    })
  }, []);

  return (
    <a 
      className="channel-item" 
      href={`https://${x.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} 
      target="_blank" 
      rel="noreferrer noopener" 
      style={{
        background: `url(${x.thumbnail ? x.thumbnail : x.banner_url}) center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <div className="channel-item-body d-f ai-c">
        <h2 className="mr-">{x.title}</h2>
        {tier &&
          tier.patreon_tier === "pro" &&
            <PatreonBadge />
          }
        }
      </div>
    </a>
  )
}

export default Explore;
