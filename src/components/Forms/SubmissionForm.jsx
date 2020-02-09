import React, {useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import Quill from 'quill'
import '../../components/Forms/forms.scss'

const SubmissionForm = inject("FormStore")(observer(({FormStore, data}) => {
  useEffect(() => {
    let quill = new Quill('#editor_static', {
      theme: 'snow',
      placeholder: 'Compose your epic...'
    });

    // quill.on('editor-change', function(eventName, ...args) {
    //   if (eventName === 'text-change' || eventName === 'selection-change') {
    //     FormStore.setState({body: quill.root.innerHTML})
    //   }
    // });

    window.quill = quill;
    return () => {
      quill = null;
    };
  }, []);
  return (
    <form className="form">
      {data.story_title.enabled &&
        <div className="field-group">
          <label htmlFor="title" className="form-label">Title {data.story_title.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" name="story_title" placeholder="Title of your story..." required={data.story_title.required} onChange={(e) => FormStore.setState({
          [e.target.name]: {
            ...FormStore.state[e.target.name],
            value: e.target.value
          }
          })}/>
        </div>
      }
      
      {data.author.enabled &&
        <div className="field-group">
          <label htmlFor="author" className="form-label">Author {data.author.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" placeholder="Your name..." name="author" required={data.author.required} onChange={(e) => FormStore.setState({
          [e.target.name]: {
            ...FormStore.state[e.target.name],
            value: e.target.value
          }
          })}/>
        </div>
      }

      {data.email.enabled &&
        <div className="field-group">
          <label htmlFor="email" className="form-label">Email {data.email.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" placeholder="Email..." name="email" required={data.email.required} onChange={(e) => FormStore.setState({
          [e.target.name]: {
            ...FormStore.state[e.target.name],
            value: e.target.value
          }
          })}/>
        </div>
      }

      <div className="field-group">
        <label htmlFor="story_body" className="form-label">Compose your epic</label>
        <div id="editor_static" name="story_body"></div>
      </div>

      {data.tags.enabled &&
        <div className="field-group">
          <label htmlFor="tags" className="form-label">Tags {data.tags.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" name="tags" placeholder="Tags separated by commas..."  required={data.tags.required} onChange={(e) => FormStore.setState({
            [e.target.name]: {
              ...FormStore.state[e.target.name],
              value: e.target.value
            }
            })}/>
        </div>
      }
      
      {data.sent_to_others.enabled &&
        <div className="field-group">
          <label htmlFor="sent_to_authors" className="form-label">Was this sent to anyone else? {data.sent_to_others.required && <span className="required">*</span>}</label>
          <div className="d-f ta-l fxd-c">
             <div className="d-f ai-c">
              <input type="radio" name="sent_to_others" id="sentYes" onChange={(e) => FormStore.setState({
                [e.target.name]: {
                  ...FormStore.state[e.target.name],
                  value: true
                }
                })}/>
              <p className="subtle ml-">Yes</p>
             </div>
            <div className="d-f ai-c">
              <input type="radio" name="sent_to_others" id="sentNo" onChange={(e) => FormStore.setState({
                [e.target.name]: {
                  ...FormStore.state[e.target.name],
                  value: false
                }
                })}/>
              <p className="subtle ml-">No</p>
            </div>
          </div>
        </div>
      }

      
    </form> 
  );
}));

export default SubmissionForm;

