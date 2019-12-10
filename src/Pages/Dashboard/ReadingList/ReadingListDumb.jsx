import React from 'react'
import './ReadingList.scss';
import Axios from 'axios';

const ReadingListDumb = ({list, setExpanded, callback}) => {
  if ( !list ) return null;
  const stories = list.map((x, id) => 
    <li key={id} className="reading-list-item">
      <div className="d-f" >
        
        <div className="d-f fxd-c fx-1 reading-list-item-header">
          <div className="d-f ai-c jc-sb reading-list-item-header-subheader">
            <div className="d-f ai-c w-100pr">
              <h3 className="reading-list-title mr-">{x.title}</h3>
              <div className="reading-info d-f mr+">
                <div className="reading-time">
                  <span>{avgReadingTime(x.selftext)}</span>
                  min read
                </div>
              </div>
            </div>
            
            <div className="d-f ai-c"> 
              <h4 className="reading-list-author">{x.author}</h4>
              <i className="fas fa-circle mr- ml- circle-divider"></i>
              <h4 className="reading-list-author">{x.subreddit}</h4>
            </div>
          </div>
          <div className="message-tags mt-">
            <a className="message-story-tag" target="_blank" href={x.url}>Link to story</a>
            <div className="chat-actions d-f">
              <div className="chat-action-btn-wrapper d-f ai-c">
                <button className="chat-action primary ai-c" onClick={() => {
                  addToCompleted(x, true);
                  callback(x);
                }}>
                  <i className="fas fa-check mr-"></i>
                  Set as read
                </button>
              </div>
            </div>
          </div>
        </div>
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


const avgReadingTime = (text) => {
  const wordsPerMinute = 200; // Average case.
  let result;
  
  let textLength = text.split(" ").length; // Split by words
  if(textLength > 0){
    let value = Math.ceil(textLength / wordsPerMinute);
    result = `~${value} `;
  }

  return result;
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
