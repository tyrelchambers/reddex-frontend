import React from 'react'
import './ReadingList.scss';
import Axios from 'axios';

const ReadingListDumb = ({list, setExpanded, callback}) => {
  if ( !list ) return null;
  const stories = list.map((x, id) => 
    <li key={id} className="reading-list-item">
      <div className="d-f" >
        <i className="fas fa-chevron-down mt-- mr+mt+ mr+" onClick={(e) => {
          const body = document.querySelector("#bodySec");
          const header = document.querySelector('.reading-list-item-header');
          body.classList.toggle('expanded');
          header.classList.toggle('expanded');
          setExpanded(true)
        }}></i>
        
        <div className="d-f fxd-c fx-1 reading-list-item-header">
          <div className="d-f ai-c jc-sb ">
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
      
      <div className="reading-list-body" id="bodySec">
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
