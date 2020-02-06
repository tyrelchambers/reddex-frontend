import React, { useState, useEffect, useRef } from 'react'
import './SiteIndex.scss'
import Dashboard from '../../../Pages/Dashboard/Dashboard'
import SiteBuilderForm from '../../../components/Forms/SiteBuilderForm'
import { Redirect } from 'react-router-dom'
import SiteBuilderThemeForm from '../../../components/Forms/SiteBuilderThemeForm'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import SiteSaveStatus from '../../../layouts/SiteSaveStatus/SiteSaveStatus'
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus'
import { addDomainAlias } from '../../../api/post'
import { toast } from 'react-toastify'
import { deleteDomainAlias } from '../../../api/put'
import Forms from '../Forms/Forms'
import Youtube from '../Timelines/Youtube/Youtube'
import Twitter from '../Timelines/Twitter/Twitter'
import HR from '../../../components/HR/HR'
import { MainButton } from '../../../components/Buttons/Buttons'
import Misc from '../Misc/Misc'
import tabs from '../tabs';
import Tabs from '../../../layouts/Tabs/Tabs'
import {getAxios } from '../../../api/index'
const SiteIndex = inject("SiteStore", "UserStore")(observer(({SiteStore, UserStore}) => {
  const pondRef = useRef()
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ saving, setSaving ] = useState(false);
  useEffect(() => {
    const yt = UserStore.currentUser.youtube_id;
    const fn = async () => {
      await getAxios({
        url: '/site/config'
      })
      .then(res => {
        if (res) {
          setActivated(true)
          SiteStore.setConfig({...res, youtube_id: res.youtube_id || yt})
          SiteStore.setPreview({subdomain: res.subdomain})
          SiteStore.setChanges(false)
        }
        setLoading(false);
      })
    }
    fn();
    
  }, []);

  const configHandler = (e) => {
 
    SiteStore.setConfig({[e.target.name]: e.target.value})
  }
  const params = new URLSearchParams(window.location.search);

  if ( !params.get('t') ) {
    return <Redirect to="/dashboard/site?t=general" />
  }

  const activateSiteHandler = async () => {
    await getAxios({
      url: '/site/activate',
      method: 'post'
    })
    .then(res => SiteStore.setConfig({...res}));
    
    toast.success("Site activated")
    setActivated(true)
  }

  const submitHandler = async () => {
    setSaving(true)
    const data = {...SiteStore.config} 
    if ( !data.subdomain ) {
      return toast.error("Subdomain can't be empty");
    }
    data.subdomain = data.subdomain.trim().replace(/\W/g, "-").toLowerCase();
    
   

    if ( data.introduction > 1000 ) {
      return toast.error("Introduction is too long")
    }

    let banner_url = data.banner_url || "";

    if ( pondRef.current && pondRef.current.getFiles().length > 0 ) {
      banner_url = await processFiles()
    }

    if (!banner_url) {
      banner_url = "https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80"
    }
    const payload = {
      ...data,
      banner_url
    }

    if ( data.subdomain !== SiteStore.preview.subdomain ) {
      await deleteDomainAlias(SiteStore.preview.subdomain)
      await addDomainAlias(data.subdomain);
    }

    SiteStore.setChanges(false)
    
    await getAxios({
      url: '/site/update',
      method: 'post',
      data: payload
    })
    .then(res => toast.success("Changes saved"));

    setSaving(false)
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
      ...SiteStore.config,
      banner_url: ""
    }

    if ( !SiteStore.config.banner_url.match(/unsplash/gi) ) {
      await getAxios({
        url: '/upload/revert',
        method: 'delete',
        params: {
          url: SiteStore.config.banner_url
        }
      })
      SiteStore.setConfig({banner_url: ""})
    } else {
      SiteStore.setConfig({banner_url: ""})
    }
    await getAxios({
      url: '/site/update',
      method: 'post',
      data: payload
    })
    .then(res => toast.success("Changes saved"));

  }

  const deleteSiteHandler = async (uuid) => {
    const toDelete = window.confirm("Are you sure you want to delete?");
    
    if (toDelete) {
      await deleteDomainAlias(SiteStore.config.subdomain)
      
      getAxios({
        url: '/site/delete',
        method: 'delete',
        params: {
          uuid
        }
      })
      
      window.location.reload();
    }
  }

  if (loading) return null;



  if ( window.innerWidth >= 1024 ) {
    return (
      <Dashboard>
        <div className="pb-">
          <div className="d-f ai-c mb+">
            <h1 className="mr+">Site Builder</h1>
            {SiteStore.config.subdomain &&
               <a href={`https://${SiteStore.config.subdomain}.reddex.app`} rel="noopener noreferrer" target="_blank" className="td-n link"><i className="fas fa-external-link-square-alt mr---"></i> View your site (refresh to see changes)</a>
            }
          </div>
  
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
              <div className="d-f">
                <Tabs url="/dashboard/site" data={tabs}/>

              </div>
              <SiteSaveStatus
                config={SiteStore.config}
                store={SiteStore}
                submitHandler={submitHandler}
                saving={saving}
              />
              <section  className="mt+ site-general-wrapper">
                {params.get('t') === "general" &&
                  <div style={{maxWidth: '600px'}}>
                    <h2>General Settings</h2>
                    <SiteBuilderForm 
                      configHandler={configHandler}
                      config={SiteStore.config}
                      pondRef={pondRef}
                      deleteImageHandler={deleteImageHandler}
                    />
  
                    <div className="mt- mb-">
                      <HR/>
                    </div>
  
                    <h2>Danger Zone</h2>
                    <p className="mb+ mt--- subtle">This is permanent. If you delete your site, you can create it again, but everything will be lost.</p>
                    <MainButton
                      value="Delete Site"
                      className="btn btn-tiertiary danger"
                      onClick={() => deleteSiteHandler(SiteStore.config.uuid)}
                    >
                      <i className="fas fa-trash"></i>
                      
                    </MainButton>
                  </div>
                }
        
                {params.get("t") === "theme" &&
                  <>
                    <div style={{maxWidth: '600px'}}>
                      <h2>Colour Theme</h2>
                      <SiteBuilderThemeForm 
                        configHandler={configHandler}
                        config={SiteStore.config}
                      />
                    </div>
        
                  </>
                }
  
                {params.get('t') === "forms" &&
                  <>
                    <Forms 
                      config={SiteStore.config}
                      setConfig={SiteStore.setConfig}
                    />
                  </>
                }
  
                {params.get('t') === "timelines" &&
                  <>
                    <Youtube
                      config={SiteStore.config}
                      setConfig={SiteStore.setConfig}
                      store={UserStore}
                    />
                    <Twitter
                      config={SiteStore.config}
                      setConfig={SiteStore.setConfig}
                    />
                  </>
                }

                {params.get('t') === "misc" &&
                  <>
                    <Misc
                      config={SiteStore.config}
                      setConfig={SiteStore.setConfig}
                    />
                  </>
                }
              </section>
            </>
          }
        </div>
      </Dashboard>
    ) 
  } else {
    return (
      <>
        <h1>Screen size too small</h1>
        <p>Please use your desktop to edit your site.</p>
      </>
    )
  }
}));

export default SiteIndex;