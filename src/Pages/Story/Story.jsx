import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import { getAxios } from '../../api';
import './Story.scss'

const Story = () => {
  const [story, setStory] = useState()

  const { id } = useParams()

  useEffect(() => {
    getAxios({
      url: `/submitted/${id}`
    }).then(res => {
      if (res) {
        setStory(res)
      }
    })
  }, [id]);

  if ( !story ) return null;

  return (
    <Dashboard>
      <div className="story-wrapper">
        <h2 className="mb+ ta-c">{story.story_title}</h2>
        <p className="mb+ ta-c">{story.author}</p>
        <p className="mb+ ta-c">{story.email}</p>
        <div  id="preview-body" style={{whiteSpace: 'pre-line'}} dangerouslySetInnerHTML={{__html: story.body}}></div>

        <div className="d-f fxd-c mt+">
          <h4 className="mb--">Tags</h4>
          <p>{story.tags}</p>
        </div>
      </div>
    </Dashboard>
  );
}

export default Story;
