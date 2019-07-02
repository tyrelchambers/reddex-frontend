import React, {useState, useEffect } from 'react'
import './ConfirmModal.scss';
import { observer } from 'mobx-react-lite';
import ModalStore from '../../stores/ModalStore';
import ConfirmMessages from '../ConfirmMessages/ConfirmMessages';
import Axios from 'axios';
import { inject } from 'mobx-react';

const ConfirmModal = inject("UserStore", "ModalStore")(observer(({isOpen, data, UserStore}) => {
  const [ index, setIndex ] = useState(0);
  const [ user, setUser ] = useState({
    email: "",
    defaultMessage: ""
  });

  const _ = [
    {
    
        title: "THIS IS A TITLE",
        author: "ChapStique43"
      
    },
    {
     
        title: "THIS IS A TITLE",
      author: "StoriesAfterMidnight"
      
    }
  ]

  useEffect(() => {
    setIndex(0);
    getUserProfile(UserStore.getToken());
   
  }, [isOpen]);

  const getUserProfile = (token) => {
    Axios.get('http://localhost:3001/api/profile/auth', {
      headers: {
        "token": token
      }
    })
    .then(res => setUser({...res.data}))
    .catch(console.log);
  }

  if ( isOpen ) {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    return (
      <div className="modal-wrapper animated fadeIn faster">
        <div className="close-modal" onClick={() => {
          document.body.style.height = null;
          document.body.style.overflow = null;
          ModalStore.setIsOpen(false)}
        }>
          <i className="fas fa-times"></i>
        </div>

        <div className="modal-body">
          {index < data.length && 
            <React.Fragment>
              <h3 className="ta-c">Confirm Messages</h3>

              <div className="d-f ai-c modal-inner-body">
                <div className="increment">
                  {index > 0 && 
                    <button className="d-f fxd-c ai-c btn-increment" onClick={() => setIndex(index - 1)}>
                      <p>Previous</p>
                      <i className="fas fa-chevron-circle-left arrow mt-"></i>
                    </button>
                  }
                </div>

                <ConfirmMessages 
                  data={_[index]}
                  setIndex={setIndex}
                  index={index}
                  userProfile={user}
                  setUserProfile={(e) => setUser({...user, defaultMessage: e.target.value})}
                />
                
                <div className="increment">
                  {index < data.length - 1 &&
                    <button className="d-f fxd-c ai-c btn-increment" onClick={() => setIndex(index + 1)}>
                      <p>Next</p>
                      <i className="fas fa-chevron-circle-right arrow mt-"></i>
                    </button>
                  }
                </div>
              </div>  
            </React.Fragment>
          }    

          {index === data.length && 
            <EndOfList />
          }
        </div>
      </div>
    )
  } else {
    return null;
  }
}));

const EndOfList = () => {
  return (
    <div className="end-of-list d-f fxd-c jc-c ai-c">
      <h1>You've reached the end!</h1>
      <i className="fas fa-check"></i>
    </div>
  );
}

export default ConfirmModal;