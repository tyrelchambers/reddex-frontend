import React, {useState, useEffect} from 'react'
import './ReadingList.scss';
import HR from '../../../components/HR/HR';
import { getAxios } from '../../../api';
import isEmpty from '../../../helpers/objIsEmpty'

const ReadingListDumb = ({list, callback}) => {
  const [state, setState] = useState([]);
  const [ filter, setFilter ] = useState("");
  const [ tags, setTags ] = useState([])
  const [tag, setTag] = useState({})
  useEffect(() => {
   formatStateData()
  }, [list]);

  useEffect(() => {
    getAxios({
      url: '/tags/'
    }).then(res => {
      if (res) {
        setTags([...res])
      }
    })
  }, [])

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


  const Story = ({x}) => (
    <li className="reading-list-item">
      <div className="d-f fxd-c fx-1 reading-list-item-header">
        <div className="d-f ai-c jc-sb reading-list-item-header-subheader">
          <h3 className="reading-list-title mr- w-100pr">{x.title}</h3>
          <h4 className="reading-list-author">{x.author}</h4>
        </div>

        <div className="message-tags">
          <a className="message-story-tag" target="_blank" rel="noopener noreferrer" href={x.url}>Link to story</a>
          <div className="chat-actions d-f">
            <div className="chat-action-btn-wrapper d-f ai-c">
              <button className="chat-action primary ai-c whs-nw" onClick={() => {
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
              <p className="subtle">{x.subreddit}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )

  const Filters = () => {
    const headers = []
    Object.keys(state).map(x => headers.push(x))

    return(
      <div className="reading-list-filters d-f fxd-c jc-c mt- mb-">
        <p className="subtle font-bold">Sort your reading list by subreddits</p>      
        <div className="header-items">
          {filter.length > 0 &&
            <i className="fas fa-times ml- mr-" onClick={() => setFilter("")}></i>
          }
          {headers.map((x,id) => (
            <button 
              key={id}
              className={`reading-list-filter ${filter === x ? "active" : ""}`} 
              onClick={() => setFilter(x)}
            >{x}</button>
          ))}
        </div>
      
      </div>
    )
  }
  
  const renderedList = Object.keys(state).filter(x => {
    if (filter.length > 0) {
      return x === filter;
    }
    return x
  }).map((key, id) => {
    return (
      <React.Fragment key={id}>
        <h3 className="tt-c thin">{key}</h3>
        {state[key].map((x, id) => <Story x={x} key={id}/>)}
      </React.Fragment>
    )
  })  

  const sortedByTags = list.map((x, id) => {
    if (tag.story_id === x.uuid) {
      return <Story key={id} x={x}/>
    }

    return null;
  })

  return (
    <div className="m+ fx-1">
      
      <Filters />
      <div className="reading-list-filters d-f fxd-c jc-c mt- mb-">

        <p className="subtle font-bold">Sort by tags</p>      
        <div className="header-items">
          {!isEmpty(tag) &&
            <i className="fas fa-times ml- mr-" onClick={() => setTag("")}></i>
          }
          {tags.map((x, id) => (
            <button 
              key={id}
              className={`reading-list-filter ${tag.tag === x.tag ? "active" : ""}`} 
              onClick={() => setTag(x)}
            >{x.tag}</button>
          ))}
        </div>
      </div>
      <p className="subtle mb-">
        <strong>Note: </strong>
        sorting by tag takes priority if both a subreddit and a tag are specified.
      </p>
      <HR/>
      <ul className="reading-list-list mt+">
        {!isEmpty(tag) ? sortedByTags : renderedList}
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
  getAxios({
    url: '/profile/stories/completed',
    method: 'post',
    data: {
      uuid: data.uuid,
      read: bool
    }
  })
}

export default ReadingListDumb
