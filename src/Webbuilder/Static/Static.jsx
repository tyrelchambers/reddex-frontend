import React, {useState, useEffect} from 'react';
import { getWebsiteFromProfile } from '../../api/get';
import SocialBar from './modules/SocialBar/SocialBar';
import './Static.scss'
import SubmissionForm from '../../components/Forms/SubmissionForm';

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

      <p className={`static-intro ${config.theme}`}>{config.introduction}</p>


      {config.submissionForm &&
        <section className="static-forms">
          <h2>Send your story</h2>
          <SubmissionForm />
        </section>
      }
    </div>
  );
}

export default Static;
