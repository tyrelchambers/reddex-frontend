import React from 'react'
import './Modal.scss'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

export const Modal = inject("ModalStore")(observer(({children, ModalStore}) => {
  return (
    <div className='modal-wrapper animated fadeIn faster'>
      <div className="close-modal" onClick={() => {
        document.body.style.height = null;
        document.body.style.overflow = null;
        ModalStore.setIsOpen(false)}
      }>
        <i className="fas fa-times"></i>
      </div>
      
      <div className="modal-body">
        {children}

      </div>
    </div>
  )
}));
