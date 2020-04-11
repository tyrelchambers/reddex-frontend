import React, {useState} from 'react'
import './forms.scss'
import { MainButton } from '../Buttons/Buttons'
import { toast } from 'react-toastify';
import { getImportedStory } from '../../api/get';
import { is_url } from '../../helpers/isURL';
import { getAxios } from '../../api';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const ImportStoryForm = ({ReadingListStore, ModalStore}) => {
  const [tags, setTags] = React.useState([])
  const [ url, setURL ] = useState();
  const [ saving, setSaving ] = useState(false);

  const addTagHandler = (e) => {
    if (e && e.which === 188 && e.target.value && e.target.value !== ",") {
      setTags([...tags, e.target.value.substring(0, e.target.value.length - 1)])
      e.target.value = ""
    }
  }

  const removeTag = (id) => {
    const clone = [...tags]
    clone.splice(id, 1)
    
    setTags([...clone])
  }

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
    
    const storyId = await getAxios({
      url: '/profile/save_story',
      method: 'post',
      data
    }).then(res => {
      if(res) {
        ReadingListStore.addToRead([...ReadingListStore.toRead, res])
        toast.success("Story added to list")
        return res;
      }
    })

    saveTags(storyId.uuid, tags)

    ModalStore.setIsOpen(false);
    setSaving(false);
  }
  
  const saveTags = (story_id, tags) => {
    getAxios({
      url: '/tags/save',
      method: 'post',
      data: {
        story_id,
        tags
      }
    })
  }

  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="url" className="form-label">Story URL</label>
        <input type="url" className="form-input" name="url" placeholder="Paste URL here..." onChange={e => setURL(e.target.value)} autoFocus={true}/>
      </div>
      <div className="field-group m0 mb-">
        <label htmlFor="" className="form-label">Tags</label>
        <input type="text" className="form-input" placeholder="press comma to save tag" id="tag" onKeyUp={e => addTagHandler(e)}/>
      </div>
      <div className="d-f fxw-w">
        {tags.map((x, id) => (
          <p className="tag" key={id} onClick={() => removeTag(id)}>{x}</p>
        ))}
      </div>
      <div className="d-f ai-c jc-fe">
        <MainButton
          className="btn btn-primary" 
          value="Import Story"
          onClick={e => saveStoryFromURL(e)}
          loading={saving}
        >
          <i className="fas fa-check mr-"></i>
        </MainButton>
      </div>
    </form>
  )
}

export default inject("ReadingListStore", "ModalStore")(observer(ImportStoryForm));