import React, {useEffect, useState} from 'react';
import { getAxios } from '../../../api';
import './StorySubmission.scss'
import SubmissionForm from '../../../components/Forms/SubmissionForm';
import { MainButton } from '../../../components/Buttons/Buttons';
import { inject, observer } from 'mobx-react';

// Public facing page

const StorySubmission = inject("FormStore", "SiteStore")(observer(({FormStore, SiteStore}) => {
  const [ loading, setLoading] = useState(true)

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: '/submissionForm/',
        params: {
          sid: SiteStore.config.uuid
        },
        options: {
          withToken: false
        }
      }).then(res => {
        FormStore.setState(res)
        setLoading(false)
      })
    }

    fn()
  }, []);

  if (loading) return null;

  return (
    <div className={`static-submit-wrapper ${SiteStore.config.theme}`}>
      {SiteStore.config.submission_title &&
        <h1>{SiteStore.config.submission_title}</h1>
      }
      {SiteStore.config.headline &&
        <h3 className="mt+ headline">{SiteStore.config.headline}</h3>
      }
      <div dangerouslySetInnerHTML={{__html: SiteStore.config.rules}} className="mt+" id="preview-body" style={{whiteSpace: 'pre-line'}}></div>
      <SubmissionForm
        data={FormStore.state}
      />

      <div className="d-f jc-fe">
        <MainButton
          className="btn btn-primary"
          onClick={(e) => FormStore.submit(SiteStore.config.uuid, e)}
        >
          Submit story
        </MainButton>
      </div>
    </div>
  );
}));

export default StorySubmission;
