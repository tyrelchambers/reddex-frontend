import React from 'react'
import './MessageAuthors.scss';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';

const MessageAuthors = inject("ModalStore", "PostStore")(observer(({data, ModalStore, PostStore}) => {
  return (
    <div className="message-author-box mt+ mb+">
      <div className="message-author-box-header d-f jc-sb ai-c">
        <h3>You've selected {data.length} to message.</h3>
        <button className="btn btn-primary" onClick={() => ModalStore.setIsOpen(true)}>Confirm Messages</button>

      </div>

      <div className="d-f fxd-c ai-c">
        <div className="message-author-body p- d-f jc-c">
          <p className="subtle mt+">Confirming messages will open a pop-up that will walk you through each message to make sure it's correct. It will not send any messages.</p>
        </div>

        <button className="btn btn-tiertiary danger as-c mt- mb-" onClick={() => PostStore.clearSelectedPosts()}>Deselect All</button>
      </div>

    </div>
  )
}));






export default MessageAuthors;