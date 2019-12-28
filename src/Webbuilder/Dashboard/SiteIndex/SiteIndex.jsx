import React, { useState, useEffect, useRef } from 'react'
import './SiteIndex.scss'
import Dashboard from '../../../Pages/Dashboard/Dashboard'
import SiteBuilderForm from '../../../components/Forms/SiteBuilderForm'
import { NavLink, Redirect } from 'react-router-dom'
import SiteBuilderThemeForm from '../../../components/Forms/SiteBuilderThemeForm'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import SiteSaveStatus from '../../../layouts/SiteSaveStatus/SiteSaveStatus'
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus'
import { addDomainAlias, activateWebsite, updateWebsite } from '../../../api/post'
import { toast } from 'react-toastify'
import { getWebsiteWithToken } from '../../../api/get'
import { deleteImageFromStorage } from '../../../api/delete'
import Forms from '../Forms/Forms'
import Youtube from '../Timelines/Youtube/Youtube'
import Twitter from '../Timelines/Twitter/Twitter'

const SiteIndex = inject("SiteStore", "UserStore")(observer(({SiteStore, UserStore}) => {
  const pondRef = useRef()
  const defaultImg = "https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
  const [config, setConfig] = useState({
    subdomain: "",
    title: "",
    twitter: "",
    facebook: "",
    instagram: "",
    patreon: "",
    youtube: "",
    podcast: "",
    introduction: "",
    bannerURL: "",
    submissionForm: false,
    youtubeId: "",
    youtubeTimeline: false,
    twitterId: "",
    twitterTimeline: false,
    accent: "#000000",
    theme: "light"
  });
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const yt = UserStore.currentUser.youtubeId;

    const fn = async () => {
      await getWebsiteWithToken().then(res => {
        if (res) {
          setActivated(true)
          setConfig({...config, ...res, youtubeId: yt})
          SiteStore.setPreview({...res})
          setLoading(false);
        }
      });
    }
    fn();
    
  }, []);

  const configHandler = (e) => {
    setConfig({...config, [e.target.name]: e.target.value});
  }
  const params = new URLSearchParams(window.location.search);

  if ( !params.get('t') ) {
    return <Redirect to="/dashboard/site?t=general" />
  }

  const Tabs = () => (
    <ul className="tabs-wrapper">
      <li className="tabs-item">
        <NavLink to="/dashboard/site?t=general" activeClassName="tab-item-active" isActive={() => {
          if (params.get('t') === "general") {
            return true;
          }
        }}>General Settings</NavLink>
      </li>
      <li className="tabs-item">
        <NavLink to="/dashboard/site?t=theme" activeClassName="tab-item-active" isActive={() => {
          if ( params.get('t') === "theme" ) {
            return true
          }
        }}>Colour Theme</NavLink>
      </li>
      <li className="tabs-item">
        <NavLink to="/dashboard/site?t=forms" activeClassName="tab-item-active" isActive={() => {
          if ( params.get('t') === "forms" ) {
            return true
          }
        }}>Submission Forms</NavLink>
      </li>
      <li className="tabs-item">
        <NavLink to="/dashboard/site?t=timelines" activeClassName="tab-item-active" isActive={() => {
          if ( params.get('t') === "timelines" ) {
            return true
          }
        }}>Timelines</NavLink>
      </li>
    </ul>
  )

  const activateSiteHandler = async () => {
    await activateWebsite().then(console.log);
    toast.success("Site activated")
    setActivated(true)
  }

  const submitHandler = async () => {
    if ( !config.subdomain ) {
      return toast.error("Subdomain can't be empty");
    }

    if ( config.introduction > 1000 ) {
      return toast.error("Introduction is too long")
    }

    let bannerURL = config.bannerURL || "";

    if ( pondRef.current && pondRef.current.getFiles().length > 0 ) {
      bannerURL = await processFiles()
    }

    const payload = {
      ...config,
      bannerURL
    }

    SiteStore.setPreview(payload)
    await addDomainAlias(config.subdomain);
    await updateWebsite(payload).then(res => toast.success("Changes saved")).catch(console.log);
  }

  const processFiles = async () => {
    const banner = await pondRef.current.processFiles().then(files => {
      return files[0].serverId;
    });
    return banner;
  }

  const deleteImageHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...config,
      bannerURL: ""
    }
    await deleteImageFromStorage(config.bannerURL).then(console.log);
    await updateWebsite(payload).then(res => toast.success("Changes saved")).catch(console.log);
  }

  if (loading) return null;

  return (
    <Dashboard>
      <h1 className="mb+">Site Builder</h1>
      {!activated &&
        <div className="mt- d-f ai-c">
          <p className="mr-">Activate website</p>
          <ToggleStatus
            context="activate-site"
            option="Activate"
            setToggledHandler={activateSiteHandler}
            toggled={activated ? true : false}
          />
        </div>
      }
      {activated &&
        <>
          <Tabs />
          <SiteSaveStatus
            config={config}
            store={SiteStore}
            submitHandler={submitHandler}
          />
          <section  className="mt+">
            {params.get('t') === "general" &&
              <div style={{maxWidth: '600px'}}>
                <h2>General Settings</h2>
                <SiteBuilderForm 
                  configHandler={configHandler}
                  config={config}
                  pondRef={pondRef}
                  deleteImageHandler={deleteImageHandler}
                />
              </div>
            }
    
            {params.get("t") === "theme" &&
              <>
                <div style={{maxWidth: '600px'}}>
                  <h2>Colour Theme</h2>
                  <SiteBuilderThemeForm 
                    configHandler={configHandler}
                    config={config}
                  />
                </div>
    
                <h2 className="mb- mt+">Site Preview</h2>
                {!config.subdomain &&
                  <p>Please enter a subdomain in General Settings to view your site</p>
                }

                {(config.subdomain && !window.location.host.includes("localhost")) &&
                  <iframe src={`http://${config.subdomain}.reddex.app`} frameBorder="0" className="site-preview-window"></iframe>
                }
              </>
            }

            {params.get('t') === "forms" &&
              <>
                <Forms 
                  config={config}
                  setConfig={setConfig}
                />
              </>
            }

            {params.get('t') === "timelines" &&
              <>
                <Youtube
                  config={config}
                  setConfig={setConfig}
                  store={UserStore}
                />
                <Twitter
                  config={config}
                  setConfig={setConfig}
                />
              </>
            }
          </section>
        </>
      }
    </Dashboard>
  )
}));

export default SiteIndex;