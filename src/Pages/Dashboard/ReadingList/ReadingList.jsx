import React, { useEffect, useState } from 'react'
import './ReadingList.scss';
import Approved from './Approved';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import CompletedStories from './CompletedStories';
import { Redirect } from 'react-router-dom';
import { MinimalButton } from '../../../components/Buttons/Buttons';
import ImportStoryForm from '../../../components/Forms/ImportStoryForm';
import tabs from './tabs';
import Tabs from '../../../layouts/Tabs/Tabs';
import Dashboard from '../Dashboard';
import { getAxios } from '../../../api';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import RequestWithUrl from '../../../components/RequestWithUrl/RequestWithUrl';

const ReadingList = inject("ReadingListStore", "ModalStore", "PostStore")(observer(({ReadingListStore, ModalStore, PostStore}) => {  
  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    const fn = async () => {
      

      await getAxios({
        url: '/profile/stories/completed'
      }).then(res => {
        if (res) {
          ReadingListStore.setCompleted(res)
        }
      })
  
    }

    
    fn();
    return () => {
      PostStore.setSelectedPosts([])
      setRefresh(false)
    }
  }, [refresh]);

  const removeStoryFromDb = (item) => {
    getAxios({
      url: '/profile/stories/remove',
      method:'delete',
      params: {
        uuid: item
      }
    })
  }

  const params = new URLSearchParams(window.location.search);

  if ( !params.get('t') ) {
    return <Redirect to="/dashboard/reading_list?t=open" />
  }

  return (
    <Dashboard>
      <div className="d-f ai-c mobile-column">
        <Tabs url="/dashboard/reading_list" data={tabs}/>

        
        <MinimalButton
          onClick={() => {
            ModalStore.setIsOpen(true)
            ModalStore.setRender(
              <>
                <h2 className="ta-c">Import A Story </h2>
                <div className="d-f jc-c">
                  <ImportStoryForm
                    buttonText="Import Story"
                    icon={<i className="fas fa-check mr-"></i>}
                  />
                </div>
              </>
            )
          }}
          classNames="mobile-margin ml- minimal-btn bg"
        >
          <i className="fas fa-plus mr-"></i>
          Import Story from URL
        </MinimalButton>

        <MinimalButton
          onClick={() => {
            ModalStore.setIsOpen(true)
            ModalStore.setRender(
              <RequestWithUrl/>
            )
          }}
          classNames="mobile-margin ml- minimal-btn bg"
        >
          <i className="fas fa-plus mr-"></i>
          Request Permission With URL
        </MinimalButton>
      </div>
      <div className="d-f mobile-column">
        {params.get('t') === "open" &&
          <Approved 
            list={ReadingListStore.getToRead()}
            callback={(v) => ReadingListStore.transferStoryFromList(v, "toRead", "completed")}
            ModalStore={ModalStore}
          />
        }

        {params.get('t') === "completed" &&   
          <CompletedStories 
            list={ReadingListStore.getCompleted()}
            ReadingListStore={ReadingListStore}
            callback={(v) => ReadingListStore.transferStoryFromList(v, "completed", "toRead")}
            removeStoryFromDb={removeStoryFromDb}
          />
        }
      </div>
    </Dashboard>
  )
}));

export default ReadingList
