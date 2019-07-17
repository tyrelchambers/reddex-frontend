import React, {useState, useEffect } from 'react'
import './ConfirmModal.scss';
import { observer } from 'mobx-react-lite';
import ConfirmMessages from '../ConfirmMessages/ConfirmMessages';
import Axios from 'axios';
import { inject } from 'mobx-react';

const ConfirmModal = inject("UserStore", "ModalStore", "PostStore")(observer(({UserStore, ModalStore, PostStore}) => {
  const [ index, setIndex ] = useState(0);
  const [ user, setUser ] = useState({});
  const [ postData, setPostData ] = useState([]);

  useEffect(() => {
    const selectedPosts = PostStore.getSelectedPosts();

    setIndex(0);
    setUser({...UserStore.currentUser});
    setPostData([...selectedPosts]);
  }, []);

  if ( ModalStore.isOpen ) {
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
                    data={postData[index]}
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
const removeMessagedAuthor = (list, index, setPostData) => {
  const data = [...list];
  data.splice(index, 1);
  return setPostData([...data]);
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