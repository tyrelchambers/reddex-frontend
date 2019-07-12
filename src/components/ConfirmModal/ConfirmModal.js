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

  const [ postData, setPostData ] = useState([]);

  useEffect(() => {
    setIndex(0);
    getUserProfile(UserStore.getToken());
    setPostData([...data]);
  }, [isOpen]);

  const getUserProfile = (token) => {
    Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/auth`, {
      headers: {
        "token": token
      }
    })
    .then(res => setUser({...res.data}))
    .catch(console.log);
  }

  if ( isOpen ) {
    document.body.style.height = "100%";
    document.body.style.minHeight = "100vh";
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
          {index < postData.length && 
            <React.Fragment>
              <h3 className="ta-c">Confirm Messages</h3>

              <div className=" modal-inner-body">
                <div className="d-f ai-c">
                  <Decrement 
                    index={index}
                    setIndex={setIndex}
                  />

                  <ConfirmMessages 
                    data={data[index]}
                    setIndex={setIndex}
                    index={index}
                    userProfile={user}
                    setUserProfile={(e) => setUser({...user, defaultMessage: e.target.value})}
                    removeMessagedAuthor={() => {
                      removeMessagedAuthor(postData, postData.indexOf(postData[index]), setPostData);
                      setIndex(0);
                    }}
                  />
                  
                  <Increment 
                    index={index}
                    postData={postData}
                    setIndex={setIndex}
                  />
                </div>
                <div className="mobile-switch d-f jc-sb mt+">
                  <Decrement 
                      index={index}
                      setIndex={setIndex}
                    />

                    <Increment 
                      index={index}
                      postData={postData}
                      setIndex={setIndex}
                    />
                </div>
              </div>  
            </React.Fragment>
          }    

          {index === postData.length && 
            <EndOfList />
          }
        </div>
      </div>
    )
  } else {
    return null;
  }
}));

const Decrement = ({index, setIndex}) => {
  return(
    <div className="increment mobile-increment">
      {index > 0 && 
        <button className="d-f fxd-c ai-c btn-increment" onClick={() => setIndex(index - 1)}>
          <p>Previous</p>
          <i className="fas fa-chevron-circle-left arrow mt-"></i>
        </button>
      }
    </div>
  )
}

const Increment = ({index, postData, setIndex}) => {
  return (
    <div className="increment mobile-increment">
        {index < postData.length - 1 &&
          <button className="d-f fxd-c ai-c btn-increment" onClick={() => setIndex(index + 1)}>
            <p>Next</p>
            <i className="fas fa-chevron-circle-right arrow mt-"></i>
          </button>
        }
      </div>
  );
}
const removeMessagedAuthor = (list, index, set_) => {
  const data = [...list];
  data.splice(index, 1);
  return set_([...data]);
}

const EndOfList = () => {
  return (
    <div className="end-of-list d-f fxd-c jc-c ai-c">
      <h1>You've reached the end!</h1>
      <i className="fas fa-check"></i>
    </div>
  );
}

export default ConfirmModal;