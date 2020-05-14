import React, {useState} from 'react'
import './forms.scss'
import { MainButton } from '../Buttons/Buttons'
import { toast } from 'react-toastify';
import { getImportedStory } from '../../api/get';
import { is_url } from '../../helpers/isURL';
import { getAxios } from '../../api';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const ImportStoryForm = ({ModalStore, buttonText, icon}) => {
  const [ url, setURL ] = useState();
  const [ saving, setSaving ] = useState(false);


  const saveStoryFromURL = async (e) => {
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
      permission: true
    }
    
    await getAxios({
      url: '/profile/save_story',
      method: 'post',
      data
    }).then(res => {
      if(res) {
        toast.success("Story added to list")
        return res;
      }
    })
    window.location.reload()
    ModalStore.setIsOpen(false);
    setSaving(false);
  }
  

  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="url" className="form-label">Story URL</label>
        <input type="url" className="form-input" name="url" placeholder="Paste URL here..." onChange={e => setURL(e.target.value)} autoFocus={true}/>
      </div>
      <div className="d-f ai-c jc-fe">
        <MainButton
          className="btn btn-primary" 
          value={buttonText}
          onClick={e => saveStoryFromURL(e)}
          loading={saving}
        >
          {icon}
        </MainButton>
      </div>
    </form>
  )
}

export default inject("ModalStore")(observer(ImportStoryForm));