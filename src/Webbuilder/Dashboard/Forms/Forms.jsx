import React, {useEffect} from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import HR from '../../../components/HR/HR';
import Quill from 'quill'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Forms.scss'
import SubmissionForm from '../../../components/Forms/SubmissionForm';

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

      FormStore.getOptions(SiteStore.config.uuid);
  
      quill.root.innerHTML = SiteStore.config.rules;
  
      return () => {
        quill = null;
      };
    }
  }, [SiteStore.config.submission_form]);


  const SubForm = () => (
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
        <h2>Submission Form</h2>
        <p className="mb- subtle">Activate this submission form to allow visitors to email you their own stories</p>
      </div>
      
    </div>
  )

  const Module = ({data, name}) => (
    <div className="d-f ai-c form-module-wrapper">
      <label className="form-label">{data.label}</label>
      <div className="d-f ai-c">
        <input type="checkbox" name="email" id={`${name}-required`} checked={data.required} onChange={() => FormStore.setState({
          [name]: {
            ...FormStore.state[name],
            required: !data.required
          }
          })}/> 
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
    <div>
      <SubForm/>
      <HR />
      {SiteStore.config.submission_form &&
        <div className="d-f submission-form-wrapper">
          <form className="form custom-story-form mt+">
            <h2>Customize your submission form</h2>
            <p className="subtle mb+">This is what your visitor will see when they submit you a story. Customize it to fit it how you'd like.</p>
            <h3>Basics</h3>
            <div className="field-group">
              <label htmlFor="title" className="form-label">Page title</label>
              <input type="text" className="form-input" name="submission_title" placeholder="Eg: Submit your story" value={SiteStore.config.submission_title} onChange={e => SiteStore.setConfig({[e.target.name]: e.target.value})}/>
            </div>


            <div className="rules-wrapper">
              <h3>Rules</h3>
              <div className="field-group">
                <label htmlFor="headline" className="form-label">Headline</label>
                <input type="text" name="headline" className="form-input" placeholder="Describe how you want to introduce the rules" value={SiteStore.config.headline} onChange={(e) => SiteStore.setConfig({[e.target.name]: e.target.value})}/>
              </div>

              <p className="subtle mb-">Add your rules here. Can be point form or a normal sentence/paragraph. Whatever you choose.</p>
              <div className="rules-wrapper" id="editor">
                
              </div>
            </div>

            <div className="modules-wrapper mt+">
              <h3>Customize Modules</h3>

              <div className="field-group">
                <div className="d-f fxd-c">
                  <Module data={FormStore.state.email} name="email"/>
                  <Module data={FormStore.state.story_title} name="story_title"/>
                  <Module data={FormStore.state.sent_to_others} name="sent_to_others"/>
                  <Module data={FormStore.state.author} name="author"/>
                  <Module data={FormStore.state.tags} name="tags"/>

                </div>
              </div>
            </div>
          </form>

          <section className="form-preview">
            {SiteStore.config.submission_title &&
              <h1 className="preview-title">{SiteStore.config.submission_title}</h1>
            }
            {SiteStore.config.headline &&
              <h3 className="preview-headline">{SiteStore.config.headline}</h3>
            }
            <div dangerouslySetInnerHTML={{__html: SiteStore.config.rules}} id="preview-body" style={{whiteSpace: 'pre-line'}}></div>
          
            <div className="d-f fxd-c ai-c">
            <SubmissionForm
              data={FormStore.state}
            />
            </div>
          </section>
        </div>
      }
    </div>
  );
}));

export default Forms;
