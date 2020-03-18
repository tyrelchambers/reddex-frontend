import React, {useState, useEffect} from 'react';
import SocialBar from './modules/SocialBar/SocialBar';
import './Static.scss'
import Youtube from 'react-youtube'
import Axios from 'axios';
import Twitter from '../Static/modules/Timelines/Twitter/Twitter';
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import PatreonBadge from '../../layouts/PatreonBadge/PatreonBadge';

const Static = inject("SiteStore", "UserStore")(observer(({SiteStore, UserStore}) => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [videoIds, setVideoIds] = useState();

  useEffect(() => {
    setConfig(SiteStore.config)
  }, []);

 

  useEffect(() => {
    const getYT = async () => {
      const ytId = config.youtube_id;
      if ( ytId) {
        const link = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${ytId}&key=${process.env.REACT_APP_YOUTUBE_KEY}`
        const vid = await Axios.get(link).then(res => res.data.items);
        setVideoIds(vid)
      }
      setLoading(false)

    }

    getYT();

  }, [config]);

  if (loading) return null;

  const videos = videoIds ? videoIds.map((x, id) => (
    <Youtube 
      key={id}
      videoId={x.id.videoId}
      className="static-youtube-item"
    />
  )) : null

  return (
    <div className={`static-wrapper ${config.theme}`}>
      <header className={`static-header ${config.theme}`} style={{
        borderTopWidth: "3px",
        borderTopColor: config.accent,
        borderTopStyle:  'solid'
      }}>
        <div className="d-f">
          <h2 style={{
            color: config.accent
          }}>{config.title}</h2>
          <PatreonBadge theme={config.accent}/>
        </div>

        <div className="static-header-right">
          { config.submission_form &&           
            <Link to={`/submit`} className="static-nav-link">Submit a Story</Link>
          }
          <SocialBar
            config={config}
          />
        </div>
      </header>
      {config.banner_url && <section className={`static-hero ${config.theme}`} style={{backgroundImage: `url(${config.banner_url})`}}>
      </section>}

      {config.introduction && 
        <section className={`static-intro-wrapper ${config.theme}`}>
         <div className="container center d-f jc-c">
          <div className="d-f fxd-c ai-c">
            <h2 className="mb-">About Me</h2>
            <p className={`static-intro ${config.theme}`}>{config.introduction}</p>
          </div>
         </div>
        </section>
      }

      {(config.youtube_id && config.youtube_timeline) &&
         <>
          <h2 className="mb- ta-c mt+">Latest Youtube Videos</h2>
          <div className="static-youtube-wrapper container center">  
            {videos}
          </div>
         </>
      }
      <footer className="d-f fxd-c jc-c mt+ pb- static-footer">
        {(config.twitter_timeline && config.twitter_id) &&
            <section className="static-twitter-timeline d-f fxd-c ai-c">
              <Twitter
                config={config}
              />
            </section>
          }
        {config.show_credit_link &&
          <p className="ta-c mt+ credit-link">Powered by <a href="https://reddex.app">Reddex</a></p>
        }

        {UserStore.patron.patreon_tier === "pro" &&
          <div className="d-f patreon-footer jc-c mt- ai-c">
            <PatreonBadge />
            <p>supporter of Reddex on <a href="https://www.patreon.com/reddex/" target="_blank" rel="noopener noreferrer">Patreon</a></p>
          </div>
        }
      </footer>
    </div>
  );
}));

export default Static;
