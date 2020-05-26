import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import { getAxios } from '../../api';
import './Story.scss'
import WithNav from '../../layouts/WithNav/WithNav'

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
      <WithNav>
        <div className="story-wrapper">
          <h2 className="mb+ ta-c font-bold text-xl">{story.story_title}</h2>
          <p className="mb+ ta-c italic">By: {story.author}</p>
          <div  id="preview-body" style={{whiteSpace: 'pre-line'}} dangerouslySetInnerHTML={{__html: story.body}}></div>
        </div>
      </WithNav>
    </Dashboard>
  );
}

export default Story;
