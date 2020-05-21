import React, {useState} from 'react'
import './ReadingList.scss';
import { getAxios } from '../../../api';
import Dropdown from '../../../components/Dropdown/Dropdown';

const CompletedStories = ({list, ReadingListStore, callback, removeStoryFromDb}) => {
  const [ openDropdown, setOpenDropdown] = useState("")

  if ( !list ) return null;

  const Story = ({x}) => (
    <li className="reading-list-item-wrapper cell-row">
       <div className="reading-list-item grid grid-cols-5 gap-4 grid-flow-col ai-c">
        <a href={x.url} className="reading-list-title ellipses w-100pr font-bold col-span-2">{x.title}</a>
        <a href={`https://www.reddit.com/user/${x.author}`} target="_blank" rel="noopener noreferrer" className="td-n td-u-hv reading-list-author ellipses" style={{color: "inherit"}}>
          {x.author}
        </a>
        <p className="tt-c">{x.subreddit}</p>

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
            addToReadingList(x, false)
            setOpenDropdown("")

            callback(x);
          }}>
            Add back to Read List
          </button>

          <button onClick={() => {
            ReadingListStore.removeStoryFromList("completed", x.post_id);
            setOpenDropdown("")
            removeStoryFromDb(x.uuid)
          }}>
            Permanently delete
          </button>
        </Dropdown>
      </div>
    </li>
  )


  return (
    <div className="all-stories-wrapper fx-1">
      <div className="grid grid-cols-4 gap-4 grid-flow-col">
        <p className="font-bold col-span-2">Title</p>
        <p className="font-bold">Author</p>
        <p className="font-bold">Subreddit</p>
        <p className="font-bold">Actions</p>
      </div>
      <ul className="reading-list-list ">
        {list.map(x => <Story x={x}/>)}
      </ul>
    </div>
  )
}

const addToReadingList = (data, bool) => {
  getAxios({
    url: '/profile/stories/completed',
    method: 'post',
    data: {
      uuid: data.uuid,
      read: bool
    }
  })
}

export default CompletedStories;

