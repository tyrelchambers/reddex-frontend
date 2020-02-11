import React from 'react';
import './SubmittedItem.scss'
import moment from 'moment-timezone';
import {Link} from 'react-router-dom'

const SubmittedItem = ({data}) => {
  const zone =  moment.tz.guess();
  return (
    <div className="submitted-item-wrapper">
      <p title={data.story_title}>{data.story_title}</p>
      <p title={data.author}>{data.author}</p>
      <p title={data.tags}>{data.tags}</p>
      <p title={moment.tz(data.created_at, zone).format("MMM Do, YYYY")}>{moment.tz(data.created_at, zone).format("MMM Do, YYYY")}</p>
      <div className="actions">
        <i className="fas fa-ellipsis-h"></i>
        <div className="actions-dropdown">
          <Link to={`/dashboard/story/id=${data.uuid}`} className="link">View</Link>


        </div>
      </div>
    </div>
  );
};

export default SubmittedItem;
