import React, {useEffect, useState} from 'react';
import { getAxios } from '../../../api';
import './StorySubmission.scss'
import SubmissionForm from '../../../components/Forms/SubmissionForm';
import { MainButton } from '../../../components/Buttons/Buttons';
import { inject, observer } from 'mobx-react';

// Public facing page

const StorySubmission = inject("FormStore")(observer(({FormStore}) => {
  const [config, setConfig] = useState();
  const params = new URLSearchParams(window.location.search)

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: '/submissionForm/',
        params: {
          sid: params.get('sid')
        }
      }).then(res => {
        setConfig(res)
        document.querySelector('body').className = `theme-${res.theme}`

      })
    }

    fn()
  }, []);


  if (!config) return null;

 

  return (
    <div className={`static-submit-wrapper ${config.theme}`}>
      {config.submission_title &&
        <h1>{config.submission_title}</h1>
      }
      {config.headline &&
        <h3 className="mt+ headline">{config.headline}</h3>
      }
      <div dangerouslySetInnerHTML={{__html: config.rules}} className="mt+" id="preview-body" style={{whiteSpace: 'pre-line'}}></div>

      <SubmissionForm
        data={config}
      />

      <div className="d-f jc-fe">
        <MainButton
          className="btn btn-primary"
          onClick={(e) => FormStore.submit(params.get('sid'), e)}
        >
          Submit story
        </MainButton>
      </div>
    </div>
  );
}));

export default StorySubmission;
