import React, {useState, useEffect} from 'react';
import './RecentlySearched.scss'
import { getAxios } from '../../api';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const RecentlySearched = ({PostStore, executeFetch}) => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    getAxios({
      url: "/recently_searched"
    }).then(res => {
      if (res) {
        setData([...res])
      }
    })

  }, [])
  return (
    <div className="recently-searched">
      <h3>Frequently Searched</h3>

      <div className="d-f ai-c term-list">
        {data.sort((a,b) => b.count - a.count).map((x, id) => (
          <p className="searched-term" key={id} onClick={() => {
            PostStore.setSubreddit(x.subreddit.replace(/\s/g, '').trim().toLowerCase())
            executeFetch()
          }}>{x.subreddit}</p>
        ))}
      </div>
    </div>
  );
}

export default inject("PostStore")(observer(RecentlySearched));
