import React, {useEffect} from 'react';
import { MainButton } from '../Buttons/Buttons';
import { inject, observer } from 'mobx-react';
import Quill from 'quill'

const SubmissionForm = inject("FormStore")(observer(({FormStore, data}) => {
  useEffect(() => {
    let quill = new Quill('#editor_static', {
      theme: 'snow',
      placeholder: 'Compose your epic...'
    });

    quill.on('editor-change', function(eventName, ...args) {
      if (eventName === 'text-change' || eventName === 'selection-change') {
        FormStore.setConfig({body: quill.root.innerHTML})
      }
    });

    window.quill = quill;
    return () => {
      quill = null;
    };
  }, []);
  return (
    <form className="form">
      {data.title.enabled &&
        <div className="field-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-input" placeholder="Title of your story..."/>
        </div>
      }
      
      {data.author.enabled &&
        <div className="field-group">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" className="form-input" placeholder="Your name..."/>
        </div>
      }

      {data.email.enabled &&
        <div className="field-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-input" placeholder="Email..."/>
        </div>
      }

      <div className="field-group">
        <label htmlFor="story_body" className="form-label">Compose your epic</label>
        <div id="editor_static" name="story_body"></div>
      </div>

      {data.tags.enabled &&
        <div className="field-group">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input type="text" className="form-input" placeholder="Tags separated by commas..."/>
        </div>
      }
      
      {data.sent_to_others.enabled &&
        <div className="field-group">
          <label htmlFor="sent_to_authors" className="form-label">Was this sent to anyone else?</label>
          <div className="d-f ta-l fxd-c">
             <div className="d-f ai-c">
              <input type="radio" name="sent_to_others" id="sentYes"/>
              <p className="subtle ml-">Yes</p>
             </div>
            <div className="d-f ai-c">
              <input type="radio" name="sent_to_others" id="sentNo"/>
              <p className="subtle ml-">No</p>
            </div>
          </div>
        </div>
      }
    </form> 
  );
}));

export default SubmissionForm;

