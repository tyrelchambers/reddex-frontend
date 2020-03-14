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
import { toast } from 'react-toastify'
import Forms from '../Forms/Forms'
import Youtube from '../Timelines/Youtube/Youtube'
import Twitter from '../Timelines/Twitter/Twitter'
import HR from '../../../components/HR/HR'
import { MainButton } from '../../../components/Buttons/Buttons'
import Misc from '../Misc/Misc'
import tabs from '../tabs';
import Tabs from '../../../layouts/Tabs/Tabs'
import {getAxios } from '../../../api/index'

const SiteIndex = inject("SiteStore", "FormStore")(observer(({SiteStore, FormStore}) => {
  const pondRef = useRef()
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    window.twttr.widgets.load(
      document.querySelector(".share-wrapper")
    );
  }, []);

  useEffect(() => {
    if ( SiteStore.preview.subdomain ) {
      setActivated(true)
    }
  }, [SiteStore.preview.subdomain]);

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
    SiteStore.setSaving(true)
    await SiteStore.submit(pondRef);
    await FormStore.save(SiteStore.config.uuid)
    SiteStore.setSaving(false)

  }
  
    return (
      <Dashboard>
        <div className="pb-">
          <div className="mb+">
            <div className="d-f ai-c mb- site-index-header">
              <h1 className="mr+">Site Builder</h1>
              {SiteStore.preview.subdomain &&
                <a href={`https://${SiteStore.preview.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} rel="noopener noreferrer" target="_blank" className="td-n link"><i className="fas fa-external-link-square-alt mr---"></i> View your site</a>
              }
            </div>
            {(SiteStore.isSiteSaved && SiteStore.config.subdomain) &&
              <div className="d-f ai-c share-wrapper">
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-url={`https://${SiteStore.config.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`} data-text={`Check out my new webpage!`} data-via="ReddexApp" data-hashtags="newSite" data-show-count="false">Tweet</a>
                <p className="subtle ml-">Share your site!</p>
              </div>
            }
          </div>
          {(!SiteStore.preview.subdomain || !activated) &&
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
          {(SiteStore.preview.subdomain || activated) &&
            <>
              <div className="d-f">
                <Tabs url="/dashboard/site" data={tabs}/>

              </div>
              <SiteSaveStatus
                config={SiteStore.config}
                store={SiteStore}
                submitHandler={submitHandler}
                saving={SiteStore.saving}
              />
              <section  className="mt+ site-general-wrapper">
                {params.get('t') === "general" &&
                  <div style={{maxWidth: '600px'}}>
                    <h2>General Settings</h2>
                    <SiteBuilderForm 
                      configHandler={configHandler}
                      config={SiteStore.config}
                      pondRef={pondRef}
                      deleteImageHandler={SiteStore.deleteImageHandler}
                    />
  
                    <div className="mt- mb-">
                      <HR/>
                    </div>
  
                    <h2>Danger Zone</h2>
                    <p className="mb+ mt--- subtle">This is permanent. If you delete your site, you can create it again, but everything will be lost.</p>
                    <MainButton
                      value="Delete Site"
                      className="btn btn-tiertiary danger"
                      onClick={() => SiteStore.deleteSiteHandler(SiteStore.config.uuid)}
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
                    <Forms/>
                  </>
                }
  
                {params.get('t') === "timelines" &&
                  <>
                    <Youtube
                    />
                    <Twitter
                    />
                  </>
                }

                {params.get('t') === "misc" &&
                  <>
                    <Misc
                    />
                  </>
                }
              </section>
            </>
          }
        </div>
      </Dashboard>
    ) 
  
}));

export default SiteIndex;