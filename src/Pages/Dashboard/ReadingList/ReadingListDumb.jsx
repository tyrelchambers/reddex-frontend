import React from 'react'
import './ReadingList.scss';
import Axios from 'axios';

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
          <div className="chat-actions d-f">
            <div className="chat-action-toggle" >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="chat-action-btn-wrapper d-f ai-c">
              <button className="chat-action primary ai-c" onClick={() => {
                addToCompleted(x, true);
              }}>
                <i className="fas fa-check mr-"></i>
                Set as read
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="reading-list-body">
        <p>{x.selftext}</p>
      </div>
    </li>
  )
  return (
    <div className="m+ fx-1">
      <h3>Accepted Stories</h3>
      <ul className="reading-list-list">
        {stories}
      </ul>
    </div>
  )
}

const addToCompleted = (data, bool) => {
  const token = window.localStorage.getItem('token');

  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/stories/completed`, {
    author: data.author,
    title: data.title,
    read: bool
  }, {
    headers: {
      token
    }
  })
  .then()
  .catch(console.log)
}

export default ReadingListDumb
