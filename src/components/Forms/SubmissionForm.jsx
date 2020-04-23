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

    window.quill = quill;
    return () => {
      quill = null;
    };
  }, []);

  if (!data) return null;
  return (
    <form className="form">
      {data.OptionsStoryTitle.enabled &&
        <div className="field-group">
          <label htmlFor="OptionsStoryTitle" className="form-label">Title {data.OptionsStoryTitle.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" name="OptionsStoryTitle" placeholder="Title of your story..." required={data.OptionsStoryTitle.required} onChange={(e) => FormStore.setState({
          [e.target.name]: {
            ...FormStore.state[e.target.name],
            value: e.target.value
          }
          })}/>
        </div>
      }
      
      {data.OptionsAuthor.enabled &&
        <div className="field-group">
          <label htmlFor="OptionsAuthor" className="form-label">Author {data.OptionsAuthor.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" placeholder="Your name..." name="OptionsAuthor" required={data.OptionsAuthor.required} onChange={(e) => {
            FormStore.setState({
              [e.target.name]: {
                ...FormStore.state[e.target.name],
                value: e.target.value
              }
              })
          }}/>
        </div>
      }

      {data.OptionsEmail.enabled &&
        <div className="field-group">
          <label htmlFor="OptionsEmail" className="form-label">Email {data.OptionsEmail.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" placeholder="Email..." name="OptionsEmail" required={data.OptionsEmail.required} onChange={(e) => FormStore.setState({
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

      {data.OptionsTag.enabled &&
        <div className="field-group">
          <label htmlFor="OptionsTag" className="form-label">Tags {data.OptionsTag.required && <span className="required">*</span>}</label>
          <input type="text" className="form-input" name="OptionsTag" placeholder="Tags separated by commas..."  required={data.OptionsTag.required} onChange={(e) => FormStore.setState({
            [e.target.name]: {
              ...FormStore.state[e.target.name],
              value: e.target.value
            }
            })}/>
        </div>
      }
      {data.OptionsSentToOther.enabled &&
        <div className="field-group">
          <label htmlFor="OptionsSentToOther" className="form-label">Was this sent to anyone else? {data.OptionsSentToOther.required && <span className="required">*</span>}</label>
          <div className="d-f ta-l fxd-c">
             <div className="d-f ai-c">
              <input type="radio" name="OptionsSentToOther" id="sentYes" onChange={(e) => FormStore.setState({
                [e.target.name]: {
                  ...FormStore.state[e.target.name],
                  value: true
                }
                })}/>
              <p className="subtle ml-">Yes</p>
             </div>
            <div className="d-f ai-c">
              <input type="radio" name="OptionsSentToOther" id="sentNo" onChange={(e) => FormStore.setState({
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

