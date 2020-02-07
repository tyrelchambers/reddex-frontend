import React, {useEffect, useState} from 'react';
import { getAxios } from '../../../api';
import './StorySubmission.scss'
import SubmissionForm from '../../../components/Forms/SubmissionForm';
// Public facing page

const StorySubmission = () => {
  const [config, setConfig] = useState();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search)
    const fn = async () => {
      await getAxios({
        url: '/submissionForm/',
        params: {
          sid: id.get('sid')
        }
      }).then(res => setConfig(res))
    }

    fn()
  }, []);

  if (!config) return null;

  return (
    <div className="static-submit-wrapper">
      <h1>{config.submission_title}</h1>
      <h3 className="mt+">{config.headline}</h3>
      <div dangerouslySetInnerHTML={{__html: config.rules}} className="mt+" id="preview-body" style={{whiteSpace: 'pre-line'}}></div>

      <SubmissionForm
        data={config}
      />
    </div>
  );
}

export default StorySubmission;
