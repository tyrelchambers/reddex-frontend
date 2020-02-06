import React, {useEffect} from 'react';
import Rules from '../../Webbuilder/modules/Rules/Rules';
import Quill from 'quill'

const SiteBuilderSubmissionForm = ({state, setState, submitHandler}) => {
  useEffect(() => {
    let quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Compose your rules...'
    });

    window.quill = quill;
    return () => {
      quill = null;
    };
  }, []);
  return (
    <form className="form">
      <h3>Basics</h3>
      <div className="field-group">
        <label htmlFor="title" className="form-label">Page title</label>
        <input type="text" className="form-input" name="title" placeholder="Eg: Submit your story"/>
      </div>


      <div className="rules-wrapper">
        <h3>Rules</h3>
        <div className="field-group">
          <label htmlFor="headline" className="form-label">Headline</label>
          <input type="text" name="headline" className="form-input" placeholder="Describe how you want to introduce the rules" onChange={(e) => setState({...state, e})}/>
        </div>
        <div className="rules-wrapper" id="editor">
          
        </div>
      </div>
    </form>
  );
}

export default SiteBuilderSubmissionForm;
