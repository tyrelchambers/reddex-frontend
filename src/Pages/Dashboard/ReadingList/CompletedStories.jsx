import React from 'react'
import './ReadingList.scss';
import Axios from 'axios';

const CompletedStories = ({list, ReadingListStore, callback, removeStoryFromDb}) => {
  if ( !list ) return null;

  const token = window.localStorage.getItem('token');

  const masterList = [];

  list.map(x => {
    if ( x.subreddit ) {
      if ( masterList[x.subreddit] ) {
        masterList[x.subreddit].push(x)
      } else {
        masterList[x.subreddit] = [];
        masterList[x.subreddit].push(x)
      }
    } else {
      if (masterList["Uncategorized"]) {
        masterList["Uncategorized"].push(x)
      } else {
        masterList["Uncategorized"] = [];
        masterList["Uncategorized"].push(x)
      } 
    }
  });

  const Story = ({x}) => (
    <li className="reading-list-item opaque">
      <div className="d-f fxd-c reading-list-header ">
        <div className="d-f ai-c jc-sb reading-list-item-header-subheader">
          <h3 className="reading-list-title mr+">{x.title}</h3>
          <h4 className="reading-list-author">{x.author}</h4>
        </div>
        <div className="message-tags mt-">
          <a className="message-story-tag" target="_blank" rel="noopener noreferrer" href={x.url}>Link to story</a>
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
                ReadingListStore.removeStoryFromList("completed", x.post_id);
                removeStoryFromDb(token, x.post_id)
              }}>
                <i className="fas fa-bookmark mr-"></i>
                Remove from reading list
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )

   
  const renderedList = Object.keys(masterList).map((key, id) => {
    return (
      <React.Fragment key={id}>
        <h3 className="tt-c thin">{key}</h3>
        {masterList[key].map((x, id) => <Story x={x} key={id}/>)}
      </React.Fragment>
    )
  })

  return (
    <div className="m+ all-stories-wrapper fx-1">
      <ul className="reading-list-list ">
        {renderedList}
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

