import React, {useState, useEffect} from 'react'
import './ReadingList.scss';
import Axios from 'axios';
import { SelectField2 } from '../../../components/SelectField/SelectField';

const ReadingListDumb = ({list, callback}) => {
  const [state, setState] = useState([]);
  const [sortVals, setSortVals] = useState([])
  useEffect(() => {
   formatStateData()
  }, [list]);

  useEffect(() => {
    parseSubreddits()

  }, [state]);

  if ( !list ) return null;

  const formatStateData = () => {
    const masterList = [];

    list.map((x, id) => {
      
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
      if (id === list.length - 1) {
        setState(masterList)
      }
    });
  }

  const parseSubreddits = () => {
    const keys = [];
    Object.keys(state).map(x => keys.push(x))
    setSortVals([...keys])
  }

  const Story = ({x}) => (
    <li className="reading-list-item">
      <div className="d-f fxd-c fx-1 reading-list-item-header">
        <div className="d-f ai-c jc-sb reading-list-item-header-subheader">
          <h3 className="reading-list-title mr- w-100pr">{x.title}</h3>
          <h4 className="reading-list-author">{x.author}</h4>
            {x.subreddit &&
              <>
                <i className="fas fa-circle mr- ml- circle-divider"></i>
                <h4 className="reading-list-author">{x.subreddit}</h4>
              </>
            }
        </div>

        <div className="message-tags mt-">
          <a className="message-story-tag" target="_blank" rel="noopener noreferrer" href={x.url}>Link to story</a>
          <div className="chat-actions d-f">
            <div className="chat-action-btn-wrapper d-f ai-c">
              <button className="chat-action primary ai-c" onClick={() => {
                addToCompleted(x, true);
                callback(x);
              }}>
                <i className="fas fa-check mr-"></i>
                Set as read
              </button>
              <div className="reading-time">
                <span>{avgReadingTime(x.self_text)}</span>
                min read
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
  
  const renderedList = Object.keys(state).map((key, id) => {
    return (
      <React.Fragment key={id}>
        <h3 className="tt-c thin">{key}</h3>
        {state[key].map((x, id) => <Story x={x} key={id}/>)}
      </React.Fragment>
    )
  })


  return (
    <div className="m+ fx-1">
      <SelectField2
        label="Sort by subreddit"
        data={sortVals}
      />
      <ul className="reading-list-list">
        {renderedList}
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
