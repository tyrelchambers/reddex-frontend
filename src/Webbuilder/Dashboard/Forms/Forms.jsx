import React, {useEffect} from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import HR from '../../../components/HR/HR';
import Quill from 'quill'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Forms.scss'
const Forms = inject("SiteStore")(observer(({SiteStore}) => {
  useEffect(() => {
    let quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Compose your rules...'
    });

    quill.on('editor-change', function(eventName, ...args) {
      if (eventName === 'text-change' || eventName === 'selection-change') {
        SiteStore.setConfig({rules: quill.root.innerHTML})
      }
    });

    quill.root.innerHTML = SiteStore.config.rules;


    window.quill = quill;
    return () => {
      quill = null;
    };
  }, []);

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
  return (
    <div>
      <SubForm/>
      <HR />
      {SiteStore.config.submission_form &&
        <div className="d-f">
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
          </form>

          <section className="form-preview">
            <h1 className="preview-title">{SiteStore.config.submission_title}</h1>
            <h3 className="preview-headline">{SiteStore.config.headline}</h3>
            <div dangerouslySetInnerHTML={{__html: SiteStore.config.rules}} id="preview-body" style={{whiteSpace: 'pre-line'}}></div>
          </section>
        </div>
      }
    </div>
  );
}));

export default Forms;
