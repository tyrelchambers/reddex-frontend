import React, {useState, useEffect} from 'react'
import './ReadingList.scss';
import HR from '../../../components/HR/HR';
import { getAxios } from '../../../api';
import isEmpty from '../../../helpers/objIsEmpty'
import { MinimalButton } from '../../../components/Buttons/Buttons';
import AddTagForm from '../../../components/Forms/AddTagForm'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const Approved = ({list, callback, ModalStore, ReadingListStore}) => {
  const [ subredditFilter, setSubredditFilter ] = useState("");
  const [ tags, setTags ] = useState([])
  const [tag, setTag] = useState({})
  const [ headers, setHeaders] = useState([])
  const [ initialHeaders, setInitialHeaders] = useState([])

  useEffect(() => {
    getAxios({
      url: '/tag_story/'
    }).then(res => {
      if (res) {
        setTags([...res])
      }
    })

    getAxios({
      url: '/profile/reading_list?permission=true',
      params: {
        subreddit: subredditFilter ? subredditFilter : null,
        tag: isEmpty(tag) ? null : tag.tag
      }
    }).then(res => {
      if (res) {
        ReadingListStore.addToRead(res.stories)
        if (initialHeaders.length === 0) {
          setInitialHeaders(res.headers)
        }
        setHeaders(res.headers)
      }
    })

  }, [subredditFilter, tag])

  if ( !list ) return null;

  const removeTagFromStory = (t) => {
    getAxios({
      url:"/tag_story/remove",
      method: "delete",
      data: {
        tag: t
      }
    }).then(res => {
      if (res) {
        window.location.reload()
      }
    })
  }
  const Story = ({x, storyId}) => (
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
            </div>
            <p className="subtle">{x.subreddit}</p>
          </div>
        </div>
      </div>
      <div className="d-f ai-c reading-list-tags">

        {x.Tags ? x.Tags.map((t, id) => {
          return <p className="subtle d-f tag-small" key={id} onClick={() => removeTagFromStory(t)}>{t.tag}</p>
        }) : null}
        <MinimalButton
          classNames="whs-nw ml-"
          onClick={() => {
            ModalStore.setIsOpen(true)
            ModalStore.setRender(
              <div className="d-f fxd-c ai-c">
                <h3>Add a tag to story</h3>
                <AddTagForm
                  story_id={storyId}
                  story_uuid={x.uuid}
                />
              </div>
            )
          }}
          
        >
          <i className="fas fa-plus mr---"></i> 
          Add Tags
        </MinimalButton>
      </div>
    </li>
  )

  
  const renderedList = headers.map((x, id) => {
    return (
      <React.Fragment key={id}>
        <h3 className="tt-c">{x}</h3>
        {list.map((y, id) => {
          if (x === y.subreddit) {
            return (
              <Story key={`${y.post_id}_${id}`} x={y} story_id={id}/>
            )
          }
        })}
      </React.Fragment>
    )
  })  


  return (
    <div className="m+ fx-1">
      
      <div className="reading-list-filters d-f fxd-c jc-c mt- mb-">
        <p className="subtle font-bold">Sort by subreddit</p>
        <div className="header-items">
          {subredditFilter &&
            <i className="fas fa-times ml- mr-" onClick={() => setSubredditFilter("")}></i>
          }
          {initialHeaders.map((x, id) => (
            <button 
              key={id}
              className={`reading-list-filter ${subredditFilter === x ? "active" : ""}`} 
              onClick={() => setSubredditFilter(x)}
            >{x}</button>
          ))}
        </div>
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
  getAxios({
    url: '/profile/stories/completed',
    method: 'post',
    data: {
      uuid: data.uuid,
      read: bool
    }
  })
}

export default inject("ReadingListStore")(observer(Approved))
