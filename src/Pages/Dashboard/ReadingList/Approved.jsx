import React, {useState, useEffect} from 'react'
import './ReadingList.scss';
import HR from '../../../components/HR/HR';
import { getAxios } from '../../../api';
import isEmpty from '../../../helpers/objIsEmpty'
import AddTagForm from '../../../components/Forms/AddTagForm'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { H2 } from '../../../components/Headings/Headings';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { MainButton } from '../../../components/Buttons/Buttons';

const Approved = ({list, callback, ModalStore, ReadingListStore}) => {
  const [ subredditFilter, setSubredditFilter ] = useState("");
  const [ tags, setTags ] = useState([])
  const [tag, setTag] = useState({})
  const [ headers, setHeaders] = useState([])
  const [ initialHeaders, setInitialHeaders] = useState([])
  const [ openDropdown, setOpenDropdown] = useState("")
  const [ keywords, setKeywords ] = useState("");
  const [ readingList, setReadingList ] = useState([])

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

  useEffect(() => {
    if (!keywords) {
      setReadingList(list)
    }
  }, [list, keywords]);

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

  const getPostsFromDatabase = async () => {

    const query = {
      ...(keywords && {keywords: keywords}),
    }

    return await getAxios({
      url: '/profile/reading_list?permission=true',
      params: {
        ...query
      }
    }).then(res => {
      if (res) {
        return setReadingList([...res.stories])
      }
    })

  }


  const Story = ({x}) => (
    <li className="reading-list-item-wrapper cell-row">
      <div className="reading-list-item grid grid-cols-5 gap-4 grid-flow-col ai-c">
        <a href={x.url} className="reading-list-title ellipses w-100pr font-bold col-span-2" target="_blank" rel="noopener noreferrer">{x.title}</a>
        <a href={`https://www.reddit.com/user/${x.author}`} target="_blank" rel="noopener noreferrer" className="td-n td-u-hv reading-list-author ellipses" style={{color: "inherit"}}>
          {x.author}
        </a>
        <p className="tt-c">{x.subreddit}</p>
        <p className="reading-time">
          {avgReadingTime(x.self_text)} minutes
        </p>
        <Dropdown
          triggerIcon={ <i className="fas fa-ellipsis-h"></i> }
          width="55px"
          identifier={x.uuid}
          showDropdown={() => {
            if (openDropdown === x.uuid) {
              return true
            }
          }}
          toggleDropdown={() => {
            setOpenDropdown(x.uuid)
            if (openDropdown === x.uuid) {
              setOpenDropdown("")
            }
          }}
        >
          <button onClick={() => {
            addToCompleted(x, true);
            callback(x);
            setOpenDropdown("")

          }}>
            Set as read
          </button>

          <button
            onClick={() => {
              setOpenDropdown("")

              ModalStore.setIsOpen(true)
              ModalStore.setRender(
                <div className="d-f fxd-c ai-c">
                  <h3 className="mb+">Add tag</h3>
                  <AddTagForm
                    story_uuid={x.uuid}
                  />
                </div>
              )
            }}
            
          >
            Add Tags
          </button>
        </Dropdown>
      </div>
      <div className="tag-list d-f ai-c" id="tagList" >
        {x.Tags ? x.Tags.map((t, id) => {
          return <p className="subtle d-f tag-small" key={id} onClick={() => removeTagFromStory(t)}>{t.tag}</p>
        }) : null}
      </div>
    </li>
  )
  
  const renderedList = headers.map((x, id) => {
    return (
      <React.Fragment key={id}>
        {readingList.map((y, id) => {
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
    <div className="fx-1">
      <div className="d-f ai-c h-36px mb+">
        <input type="text" className="search-large w-100pr max-w-xl" placeholder="Search by keywords..." value={keywords} onChange={e => setKeywords(e.target.value)}/> 

        <MainButton 
          className="btn btn-tiertiary p- ml-"
          onClick={() => {
            setKeywords("")
            setReadingList(list)
          }}
        >
          Clear
        </MainButton>

        <MainButton 
          className="btn btn-green p- ml-"
          onClick={getPostsFromDatabase}
          disabled={!keywords ? true : false}
        >
          Search
        </MainButton>
      </div>
      <div className="reading-list-filters d-f fxd-c jc-c mb-">
        <H2>Sort by subreddit</H2>
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

        {tags.length > 0 &&
          <>
            <div className="mt">
              <H2>Sort by tags</H2> 
            </div>     
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
          </>
        }
      </div>
      <HR/>
      <div className="grid grid-cols-5 gap-4 grid-flow-col">
        <p className="font-bold text-lg col-span-2">Title</p>
        <p className="font-bold text-lg">Author</p>
        <p className="font-bold text-lg">Subreddit</p>
        <p className="font-bold text-lg">Reading Time</p>
        <p className="font-bold text-lg">Actions</p>
      </div>
      <ul className="reading-list-list mt-">
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
