import React from 'react';
import './SubmittedItem.scss'
import moment from 'moment-timezone';
import {MinimalButton} from '../../components/Buttons/Buttons'

const SubmittedItem = ({data, deleteHandler}) => {
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
          <MinimalButton onClick={() =>window.location.pathname = `/dashboard/story/id=${data.uuid}`}>
            View
          </MinimalButton>
          <MinimalButton 
            classNames="danger-text"
            onClick={() => {
              deleteHandler(data.uuid)
            }}
          >
            Delete
          </MinimalButton>
        </div>
      </div>
    </div>
  );
};

export default SubmittedItem;
