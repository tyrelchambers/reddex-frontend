import React from 'react';
import './SubmittedItem.scss'
import moment from 'moment-timezone';
import { MinimalButton } from '../Buttons/Buttons';
import { inject, observer } from 'mobx-react';

const SubmittedItem = inject("ModalStore")(observer(({ModalStore, data}) => {
  const zone =  moment.tz.guess();
  return (
    <div className="submitted-item-wrapper">
      <p>{data.story_title}</p>
      <p>{data.author}</p>
      <p>{data.tags}</p>
      <p>{moment.tz(data.created_at, zone).format("MMM Do, YYYY")}</p>
      <div className="actions">
        <i className="fas fa-ellipsis-h"></i>
        <div className="actions-dropdown">
          <MinimalButton
            onClick={() => {
              ModalStore.setTitle(data.story_title)
              ModalStore.setContent(data.body)
              ModalStore.setIsOpen(true)
            }}
          >
            View
          </MinimalButton>


        </div>
      </div>
    </div>
  );
}));

export default SubmittedItem;
