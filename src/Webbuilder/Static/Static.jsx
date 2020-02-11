import React, {useState, useEffect} from 'react';
import SocialBar from './modules/SocialBar/SocialBar';
import './Static.scss'
import SubmissionForm from '../../components/Forms/SubmissionForm';
import Youtube from 'react-youtube'
import Axios from 'axios';
import Twitter from '../Static/modules/Timelines/Twitter/Twitter';
import { toast } from 'react-toastify';
import { getAxios } from '../../api';
import { Link } from 'react-router-dom'

const Static = () => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [videoIds, setVideoIds] = useState();
  const [subForm, setSubForm] = useState({
    email: "",
    senderName: "",
    message: "",
    sentToOthers: false
  });

  useEffect(() => {
    const subdomain = window.location.host.split('.')[0];
    const fn = async () => {
      const siteConfig = await getAxios({
        url: '/site/',
        params: {
          subdomain
        }
      })
      
      setConfig(siteConfig);
    }
    fn();
  }, []);

  useEffect(() => {
    document.querySelector('body').className = `theme-${config.theme}`
  }, [config]);

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

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...subForm,
      subdomain: config.subdomain
    }
    
    await getAxios({
      url: '/submissionForm/submit',
      data: payload
    })
    .then(res => toast.success("Story submitted"))
  }

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
        <h2 style={{
          color: config.accent
        }}>{config.title}</h2>
          <div className="d-f">
            { config.submission_form &&           
              <Link to={`/submit?sid=${config.uuid}`} className="static-nav-link">Submit a Story</Link>
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
          <p className="ta-c mt+">Powered by <a href="https://reddex.app">Reddex</a></p>
        }
      </footer>
    </div>
  );
};

export default Static;
