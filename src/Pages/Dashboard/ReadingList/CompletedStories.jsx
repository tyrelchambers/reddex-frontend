import React from 'react'
import './ReadingList.scss';
import Axios from 'axios';

const CompletedStories = ({list, ReadingListStore, callback, removeStoryFromDb}) => {
  const token = window.localStorage.getItem('token');

  const stories = list.map((x, id) => 
    <li key={id} className="reading-list-item opaque">
      <div className="d-f fxd-c reading-list-header ">
        <div className="d-f ai-c jc-sb reading-list-item-header-subheader">
          <h3 className="reading-list-title mr+">{x.title}</h3>
          <h4 className="reading-list-author">{x.author}</h4>
        </div>
        <div className="message-tags mt-">
          <a className="message-story-tag" target="_blank" href={x.url}>Link to story</a>
          <div className="chat-actions d-f">
            <div className="chat-action-btn-wrapper d-f">
              <button className="chat-action primary ai-c" onClick={() => {
                addToReadingList(x, false)
                callback(x);
              }}>
                <i className="fas fa-bookmark mr-"></i>
                Add back to Read List
              </button>

              <button className="chat-action primary ai-c" onClick={() => {
                ReadingListStore.removeStoryFromList("completed", x.postId);
                removeStoryFromDb(token, x.postId)
              }}>
                <i className="fas fa-bookmark mr-"></i>
                Remove from reading list
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
    <div className="m+ all-stories-wrapper fx-1">
      <h3>Completed Stories</h3>
      <ul className="reading-list-list ">
        {stories}
      </ul>
    </div>
  )
}

const addToReadingList = (data, bool) => {
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

export default CompletedStories;

