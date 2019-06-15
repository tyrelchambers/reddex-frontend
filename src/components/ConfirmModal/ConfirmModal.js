import React, { useContext, useState, useEffect } from 'react'
import './ConfirmModal.scss';
import { observer } from 'mobx-react-lite';
import ModalStore from '../../stores/ModalStore';
import ConfirmMessages from '../ConfirmMessages/ConfirmMessages';

const ConfirmModal = observer(({isOpen, data}) => {
  const modalStore = useContext(ModalStore);
  const [ index, setIndex ] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [isOpen]);

  if ( isOpen ) {
    return (
      <div className="modal-wrapper">
        <div className="close-modal" onClick={() => modalStore.setIsOpen(false)}>
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
                  data={data[index]}
                  setIndex={setIndex}
                  index={index}
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
});

const EndOfList = () => {
  return (
    <div className="end-of-list d-f fxd-c jc-c ai-c">
      <h1>You've reached the end!</h1>
      <i className="fas fa-check"></i>
    </div>
  );
}

export default ConfirmModal;