import React from 'react'
import './ReadingList.scss';

const ReadingListDumb = ({list, setExpanded}) => {
  const stories = list.map((x, id) => 
    <li key={id} className="reading-list-item">
      <div className="d-f fxd-c reading-list-header " onClick={(e) => {
        e.target.closest('.reading-list-item').classList.toggle('reading-list-item-expanded');
        setExpanded(true)
      }}>
        <div className="d-f ai-c jc-sb">
          <h3 className="reading-list-title mr+">{x.title}</h3>
          <h4 className="reading-list-author">{x.author}</h4>
        </div>
        <div className="message-tags mt-">
          <a className="message-story-tag" target="_blank" href={x.url}>Link to story</a>
        </div>
      </div>
      
      <div className="reading-list-body">
        <p>{x.selftext}</p>
      </div>
    </li>
  )
  return (
    <div className="mt+">
      <ul className="reading-list-list">
        {stories}
      </ul>
    </div>
  )
}

export default ReadingListDumb
