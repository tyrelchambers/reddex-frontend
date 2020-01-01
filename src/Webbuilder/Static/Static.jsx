import React, {useState, useEffect} from 'react';
import { getWebsiteFromProfile } from '../../api/get';
import SocialBar from './modules/SocialBar/SocialBar';
import './Static.scss'
import SubmissionForm from '../../components/Forms/SubmissionForm';
import Youtube from 'react-youtube'
import Axios from 'axios';
import HR from '../../components/HR/HR';
import Twitter from '../Static/modules/Timelines/Twitter/Twitter';
import { submitStoryForm } from '../../api/post';

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
      const siteConfig = await getWebsiteFromProfile(subdomain);
      setConfig(siteConfig);
    }
    fn();
  }, []);

  useEffect(() => {
    const getYT = async () => {
      const ytId = config.youtubeId;
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
      subdomain: config._id
    }
    
    await submitStoryForm(payload)
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
        <div className={`static-site-name ${config.theme}`}>
          <SocialBar
            config={config}
          />
          <h2>{config.title}</h2>
        </div>
      </header>
      <section className={`static-hero ${config.theme}`} style={{backgroundImage: `url(${config.bannerURL})`}}>
      </section>

      {config.introduction && 
        <section className={`static-intro-wrapper ${config.theme}`}>
         <div className="container center d-f ">
          {(config.twitterTimeline && config.twitterId) &&
            <section className="static-twitter-timeline d-f fxd-c ai-c mr+">
              <Twitter
                config={config}
              />
            </section>
          }
          <div className="d-f fxd-c">
            <h2 className="mb-">About Me</h2>
            <p className={`static-intro ${config.theme}`}>{config.introduction}</p>
          </div>
         </div>
        </section>
      }

      {(config.youtubeId && config.youtubeTimeline) &&
         <>
          <h2 className="mb- ta-c mt+">Latest Youtube Videos</h2>
          <div className="static-youtube-wrapper container center">  
            {videos}
          </div>
         </>
      }

      <div className="container center">
      <HR/>
      </div>

      {config.submissionForm &&
        <section className={`static-forms ${config.theme}`}>
          <h2>Send your story</h2>
          <SubmissionForm
            subForm={subForm}
            setSubForm={setSubForm}
            submitFormHandler={submitFormHandler}
          />
        </section>
      }

      <footer className="d-f jc-c mt+ pb- static-footer">
        {config.showCreditLink &&
          <p className="ta-c">Powered by <a href="https://reddex.app">Reddex</a></p>
        }
      </footer>
    </div>
  );
};

export default Static;
