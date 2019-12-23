import React, { useState, useEffect } from 'react'
import './SiteIndex.scss'
import Dashboard from '../../../Pages/Dashboard/Dashboard'
import SiteBuilderForm from '../../../components/Forms/SiteBuilderForm'
import { NavLink, Redirect } from 'react-router-dom'
import SiteBuilderThemeForm from '../../../components/Forms/SiteBuilderThemeForm'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import SiteSaveStatus from '../../../layouts/SiteSaveStatus/SiteSaveStatus'

const SiteIndex = inject("SiteStore")(observer(({SiteStore}) => {
  const [config, setConfig] = useState({
    subdomain: "",
    title: "",
    twitter: "",
    facebook: "",
    instagram: "",
    patreon: "",
    youtube: "",
    podcast: "",
    accent: "#000000",
    theme: "light"
  });

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
        <NavLink to="/dashboard/site?t=preview" activeClassName="tab-item-active" isActive={() => {
          if ( params.get('t') === "preview" ) {
            return true
          }
        }}>Preview Site</NavLink>
      </li>
    </ul>
  )

  return (
    <Dashboard>
      <Tabs />
      <SiteSaveStatus
        config={config}
        store={SiteStore}
      />
      <section style={{maxWidth: '600px'}} className="mt+">
        {params.get('t') === "general" &&
          <>
            <h2>General Settings</h2>
            <SiteBuilderForm 
              configHandler={configHandler}
              config={config}
            />
          </>
        }

        {params.get("t") === "theme" &&
          <>
            <h2 className="title">Colour Theme</h2>
            <SiteBuilderThemeForm 
              configHandler={configHandler}
              config={config}
            />
          </>
        }

        {params.get("t") === "preview" &&
          <>
            <h2 className="title">Site Preview</h2>
            
          </>
        }
      </section>
    </Dashboard>
  )
}));

export default SiteIndex;