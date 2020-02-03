import React from 'react'
import './MessageAuthors.scss';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';

const MessageAuthors = inject("ModalStore", "PostStore")(observer(({data, ModalStore, PostStore}) => {
  return (
    <div className="message-author-box mt+ mb+ animated fadeIn faster">
      <div className="message-author-box-header d-f jc-sb ai-c">
        <h3>You've selected {data.length} to message.</h3>
        <button className="btn btn-green p-" onClick={() => ModalStore.setIsOpen(true)}>Confirm Messages</button>

      </div>

      <div className="d-f fxd-c ai-c p-">
        <div className="message-author-body d-f jc-c pb-">
          <p className="subtle ta-c">Confirming messages will open a pop-up that will walk you through each message to make sure it's correct. It will not send any messages.</p>
        </div>

        <button className="btn btn-tiertiary danger" onClick={() => PostStore.clearSelectedPosts()}>Deselect All</button>
      </div>

    </div>
  )
}));






export default MessageAuthors;