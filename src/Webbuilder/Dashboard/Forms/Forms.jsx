import React, {useEffect} from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import HR from '../../../components/HR/HR';
import Quill from 'quill'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Forms.scss'
import { getAxios } from '../../../api';
import WithNav from '../../../layouts/WithNav/WithNav'
import Dashboard from '../../../Pages/Dashboard/Dashboard'
import SiteBuilderWrapper from '../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper'
import { H2Subtitle, H2, H1, H1Subtitle } from '../../../components/Headings/Headings';
import tabs from '../tabs'

const Forms = inject("SiteStore", "FormStore")(observer(({SiteStore, FormStore}) => {
  useEffect(() => {
    if (SiteStore.config.submission_form) {
      let quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Compose your rules...'
      });
  
      quill.on('editor-change', function(eventName, ...args) {
        if (eventName === 'text-change' || eventName === 'selection-change') {
          if (SiteStore.config.rules !== quill.root.innerHTML) {
            SiteStore.setConfig({rules: quill.root.innerHTML})
          } 
        }
      });
  
      quill.root.innerHTML = SiteStore.config.rules;
  
      return () => {
        quill = null;
      };
    }
  }, [SiteStore.config.submission_form]);

   useEffect(() => {

    if (SiteStore.config.uuid) {
      getAxios({
        url:'/submissionForm/',
        params: {
          sid: SiteStore.config.uuid
        }
      }).then(res => {
        if (res) {
          FormStore.setAuthor(res.OptionsAuthor)
          FormStore.setEmail(res.OptionsEmail)
          FormStore.setSentToOthers(res.OptionsSentToOther)
          FormStore.setTags(res.OptionsTag)
          FormStore.setStoryTitle(res.OptionsStoryTitle)
          FormStore.setOptionsId(res.uuid)
        }
      })
    }

  }, [SiteStore.config])

  const Module = ({data, name}) => (
    <div className="d-f ai-c form-module-wrapper">
      <label className="form-label">{data.label}</label>
      <div className="d-f ai-c">
        <input type="checkbox" name="email" id={`${name}-required`} checked={data.required} onChange={() => {
          FormStore.setState({
            [name]: {
              ...FormStore.state[name],
              required: !data.required
            }
            })
        }}/> 
        <p className="subtle mr-">Required</p>
      </div>
      <div className="d-f ai-c">
        <input type="checkbox" name="email" id={`${name}-enabled`} checked={data.enabled} onChange={() => FormStore.setState({
          [name]: {
            ...FormStore.state[name],
            enabled: !data.enabled
          }
          })}/> 
        <p className="subtle">Enabled</p>
      </div>
    </div>
  )
  return (
    <Dashboard>
      <H1>Site Builder</H1>
      <H1Subtitle>Build your website and advertise what you do.</H1Subtitle>
      <SiteBuilderWrapper>
        <WithNav tabs={tabs}>
          <div className="d-f">
            <div className="mt--- mr-">
              <ToggleStatus
                context="submissionForm"
                option="Inactive"
                disabledText="Active"
                setToggledHandler={() => {
                  SiteStore.setConfig({submission_form: !SiteStore.config.submission_form});
                }}
                toggled={SiteStore.config.submission_form ? true : false}
              />
            </div>
            <div className="d-f fxd-c">
              <H2>Submission Form</H2>
              <H2Subtitle>Activate this submission form to allow visitors to email you their own stories</H2Subtitle>
            </div>
            
          </div>
          <HR />
          {SiteStore.config.submission_form &&
            <div className="d-f submission-form-wrapper">
              <form className="form custom-story-form form-wide">
                <H2>Page Title</H2>
                <H2Subtitle>The page title is the name of your submission page. Make it whatever you like in order to convey what the visitor is doing on your page (eg: Story Submission)</H2Subtitle>
                <div className="field-group mt-">
                  <input type="text" className="form-input" name="submission_title" placeholder="Eg: Submit your story" value={SiteStore.config.submission_title} onChange={e => SiteStore.setConfig({[e.target.name]: e.target.value})}/>
                </div>


                <div className="rules-wrapper mt+">
                  <H2>Headline</H2>
                  <H2Subtitle>The headline is used to point out a particularly important piece of information (eg: Please read the guidelines for submitting a story)</H2Subtitle>

                  <div className="field-group">
                    <input type="text" name="headline" className="form-input" placeholder="Describe how you want to introduce the rules" value={SiteStore.config.headline} onChange={(e) => SiteStore.setConfig({[e.target.name]: e.target.value})}/>
                  </div>

                  <div className="mt+">
                    <H2>Rules for Submission</H2>
                    <H2Subtitle>Add your rules here. Can be point form or a normal sentence/paragraph. Whatever you choose.</H2Subtitle>
                    <div className="mt-">
                      <div className="rules-wrapper" id="editor">
                      
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modules-wrapper mt+">
                  <H2>Customize Modules</H2>

                  <div className="field-group">
                    <div className="d-f fxd-c">
                      <Module data={FormStore.state.OptionsEmail} name="OptionsEmail"/>
                      <Module data={FormStore.state.OptionsStoryTitle} name="OptionsStoryTitle"/>
                      <Module data={FormStore.state.OptionsSentToOther} name="OptionsSentToOther"/>
                      <Module data={FormStore.state.OptionsAuthor} name="OptionsAuthor"/>
                      <Module data={FormStore.state.OptionsTag} name="OptionsTag"/>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          }
        </WithNav>
      </SiteBuilderWrapper>
    </Dashboard>
  );
}));

export default Forms;
