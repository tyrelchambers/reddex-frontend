import React, {useEffect, useState} from 'react';
import { getAxios } from '../../../api';
import './StorySubmission.scss'
import SubmissionForm from '../../../components/Forms/SubmissionForm';
import { MainButton } from '../../../components/Buttons/Buttons';
import { inject, observer } from 'mobx-react';

// Public facing page

const StorySubmission = inject("FormStore")(observer(({FormStore}) => {
  const [ loading, setLoading] = useState(true)
  const params = new URLSearchParams(window.location.search)

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: '/submissionForm/',
        params: {
          sid: params.get('sid')
        }
      }).then(res => {
        FormStore.setState(res)
        document.querySelector('body').className = `theme-${res.theme}`
        setLoading(false)
      })
    }

    fn()
  }, []);

  if (loading) return null;

  return (
    <div className={`static-submit-wrapper ${FormStore.state.theme}`}>
      {FormStore.state.submission_title &&
        <h1>{FormStore.state.submission_title}</h1>
      }
      {FormStore.state.headline &&
        <h3 className="mt+ headline">{FormStore.state.headline}</h3>
      }
      <div dangerouslySetInnerHTML={{__html: FormStore.state.rules}} className="mt+" id="preview-body" style={{whiteSpace: 'pre-line'}}></div>

      <SubmissionForm
        data={FormStore.state}
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
