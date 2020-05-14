import React from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { MainButton } from '../Buttons/Buttons';
import { getImportedStory } from '../../api/get';
import { is_url } from '../../helpers/isURL';
import { toast } from 'react-toastify';
import { inject, observer } from 'mobx-react';

const RequestWithUrl = ({PostStore}) => {
  const [ url, setURL ] = React.useState("");
  const [ saving, setSaving ] = React.useState(false); 
  const [ proceed, setProceed ] = React.useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!url) return toast.error("No url provided");

    setSaving(true)
    const formattedURL = `${url.match(/[\s\S]+\//ig)}.json`;

    if ( !is_url(formattedURL) ) {
      toast.error("Improper URL format, try again")
      return false;
    }
    
    const story = await getImportedStory(formattedURL);

    const data = {
      author: story.author,
      title: story.title,
      self_text: story.selftext,
      ups: story.ups,
      url: story.url,
      num_comments: story.num_comments,
      created: story.created_utc,
      link_flair_text: story.link_flair_text,
      post_id: story.id,
      subreddit: story.subreddit,
      permission: false
    }
    
    await PostStore.setSelectedPosts(data)
    
    setProceed(true)
  }

  if (!proceed) {
    return (
      <div className="d-f fxd-c ai-c">
        <h3>Request Permission &amp; Import</h3>
        <p className="subtle ta-c mt- mb-">Use this form to import a story and request permission to read. This would be used for if you found a story on Reddit and wanted to ask permission to read it, if you couldn't find it in the list on the home page.</p>
        <form className="form ml-a mr-a">
          <div className="field-group">
            <label htmlFor="url" className="form-label">Enter URL</label>
            <input type="url" className="form-input" name="url" placeholder="input url..." value={url} onChange={e => setURL(e.target.value)}/>
          </div>

          <div className="d-f ai-c jc-fe">
            <MainButton
              className="btn btn-primary" 
              value="Request permission"
              loading={saving}
              onClick={e => submitHandler(e)}
            >
              <i className="fas fa-arrow-right"></i>
            </MainButton>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <ConfirmModal/>
    )
  }
}

export default inject("PostStore")(observer(RequestWithUrl));
