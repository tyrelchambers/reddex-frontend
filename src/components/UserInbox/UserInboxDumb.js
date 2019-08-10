import React from 'react'
import dateFns from 'date-fns'
import moment from 'moment';
import './UserInbox.scss';

const UserInboxDumb = ({data, key, onClick}) => {

  if ( data.length === 0 ) return null;
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;

  const listItem = data.data.map(x => {

    const formatThreads = () => {
      const lastReply = x.data.replies.data.children[x.data.replies.data.children.length - 1].data
      return lastReply.author === currentUser.replace(/\s/g, "") ? `You: ${lastReply.body}` : lastReply.body;
    }

    return (
      <li key={x.data.id}  className="inbox-item d-f ai-c fx-2" onClick={() => onClick(x.data)}>
        <i className="fas fa-user inbox-item-img mr+"></i>
        <div className="d-f fxd-c w-100pr">
          <div className="d-f ai-c jc-sb fx-1">
            <h4>{x.data.dest}</h4>
            <p>{dateFns.format(moment.unix(x.data.created)._d, "MMM DD")}</p>
          </div>
          <p className="inbox-item-body">{formatThreads()}</p>
        </div>
      </li>
    );
  });

  return (
    <div key={key} className="inbox-left-wrapper">
      <ul>
        {listItem}
      </ul>
    </div>
  )
}

export default UserInboxDumb
