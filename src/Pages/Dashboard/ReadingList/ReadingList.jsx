import React, { useEffect, useState } from 'react'
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
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

const ReadingList = inject("ReadingListStore", "ModalStore")(observer(({ReadingListStore, ModalStore}) => {  
  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: '/profile/reading_list?permission=true'
      }).then(res => {
        if (res) {
          ReadingListStore.addToRead(res)
        }
      })

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
                  />
                </div>
              </>
            )
          }}
          classNames="mobile-margin ml-"
        >
          <i className="fas fa-plus mr-"></i>
          Import Story from URL
        </MinimalButton>
      </div>
      <div className="d-f mobile-column">
        {params.get('t') === "open" &&
          <ReadingListDumb 
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
