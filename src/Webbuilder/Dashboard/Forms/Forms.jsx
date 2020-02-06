import React, {useEffect} from 'react';
import ToggleStatus from '../../../components/ToggleStatus/ToggleStatus';
import HR from '../../../components/HR/HR';
import Quill from 'quill'
const Forms = ({config, setConfig}) => {
  useEffect(() => {
    let quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Compose your rules...'
    });

    quill.on('editor-change', function(eventName, ...args) {
      if (eventName === 'text-change') {
        // args[0] will be delta
        console.log(args)
      } else if (eventName === 'selection-change') {
        // args[0] will be old range
      }
    });

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
            setConfig({...config, submission_form: !config.submission_form});
          }}
          toggled={config.submission_form ? true : false}
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
      {config.submission_form &&
        <div className="d-f">
          <form className="form custom-story-form mt+">
            <h2>Customize your submission form</h2>
            <p className="subtle mb+">This is what your visitor will see when they submit you a story. Customize it to fit it how you'd like.</p>
            <h3>Basics</h3>
            <div className="field-group">
              <label htmlFor="title" className="form-label">Page title</label>
              <input type="text" className="form-input" name="submission_title" placeholder="Eg: Submit your story" value={config.submission_title} onChange={e => setConfig({...config, e})}/>
            </div>


            <div className="rules-wrapper">
              <h3>Rules</h3>
              <div className="field-group">
                <label htmlFor="headline" className="form-label">Headline</label>
                <input type="text" name="headline" className="form-input" placeholder="Describe how you want to introduce the rules" value={config.headline} onChange={(e) => setConfig({...config, e})}/>
              </div>

              <p className="subtle mb-">Add your rules here. Can be point form or a normal sentence/paragraph. Whatever you choose.</p>
              <div className="rules-wrapper" id="editor">
                
              </div>
            </div>
          </form>

          <section className="form-preview">

          </section>
        </div>
      }
    </div>
  );
}

export default Forms;
