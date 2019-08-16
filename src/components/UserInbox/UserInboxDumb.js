import React from 'react'
import dateFns from 'date-fns'
import moment from 'moment';
import './UserInbox.scss';

const UserInboxDumb = ({data, key, onClick}) => {

  if ( data.length === 0 ) return null;

  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;
  const listItem = data.data.map(x => {

    const formatThreads = () => {
      let lastReply;

      if ( x.data.replies.length === 0 ) {
        lastReply = x.data;      
      } else {
        lastReply = x.data.replies.data.children[x.data.replies.data.children.length - 1].data
      }

      return lastReply.author === currentUser.replace(/\s/g, "") ? `You: ${lastReply.body}` : lastReply.body;

    }

    return (
      <li key={x.data.id}  className="inbox-item d-f ai-c fx-2" name={x.data.name} onClick={(e) => {
        removeActiveClasses();
        e.target.closest('.inbox-item').classList.add('selected-inbox-message');
        onClick(x.data);
      }}>
        <i className="fas fa-user inbox-item-img mr+"></i>
        <div className="d-f fxd-c fx-1 ">
          <div className="d-f ai-c jc-sb fx-1 inbox-item-header-mobile">
            <h4>{x.data.dest}</h4>
            <p>{dateFns.format(moment.unix(x.data.created_utc)._d, "MMM DD")}</p>
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

const removeActiveClasses = () => {
  const el = document.querySelectorAll('.selected-inbox-message');
  if (el) {
    el.forEach(x => {
      x.classList.remove('selected-inbox-message');
    })
  }
}

export default UserInboxDumb