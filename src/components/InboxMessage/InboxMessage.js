import React from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';

const InboxMessage = ({data}) => {
  if ( isEmpty(data) ) return null;
  console.log(data)

  const msgArr = [];
  
  const dataObj = {
    author: data.author,
    body: data.body,
    created: data.created
  }

  data.replies.data.children.map(x => {
    msgArr.push({
      author: x.data.author,
      body: x.data.body,
      created: x.data.created
    });
  });

  msgArr.push(dataObj);

  return (
    <div className="inbox-message-wrapper fx-1 ml+">
      <main>
        <div className="d-f fxd-c">
          <h2>{data.subject}</h2>
          <p className="mb-">From: {data.dest}</p>
          <HR/>
        </div>
        <InboxChat 
          data={msgArr}
        />
      </main>
    </div>
  )
}

export default InboxMessage
