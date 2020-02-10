import React from 'react';
import './SubmittedItem.scss'
import moment from 'moment-timezone';

const SubmittedItem = ({data}) => {
  const zone =  moment.tz.guess();
  return (
    <div className="submitted-item-wrapper">
      <p>{data.story_title}</p>
      <p>{data.author}</p>
      <p>{data.tags}</p>
      <p>{moment.tz(data.created_at, zone).format("MMM Do, YYYY")}</p>
      <div className="actions"></div>
    </div>
  );
}

export default SubmittedItem;
