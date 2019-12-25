import React, {useState, useEffect} from 'react';
import { getWebsiteFromProfile } from '../../api/get';
import SocialBar from './modules/SocialBar/SocialBar';
import './Static.scss'

const Static = () => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});

  useEffect(() => {
    const subdomain = window.location.host.split('.')[0];
    
    const fn = async () => {
      const siteConfig = await getWebsiteFromProfile(subdomain);
      setConfig(siteConfig);
      setLoading(false);
    }

    fn();

  }, []);

  // accent: "#000000"
  // theme: "light"
  // _id: "5e021edb8a79c40e27f24b6a"
  // user_id: "5d3c8b45a70e544177cb8c8a"
  // createdAt: "2019-12-24T14:21:15.045Z"
  // updatedAt: "2019-12-24T15:25:27.588Z"
  // __v: 0
  // facebook: ""
  // instagram: ""
  // patreon: ""
  // podcast: ""
  // subdomain: "storiesaftermidnight"
  // title: ""
  // twitter: "imtyrelchambers"
  // youtube: ""

  if (loading) return null;

  return (
    <div className="static-wrapper">
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
    </div>
  );
}

export default Static;
