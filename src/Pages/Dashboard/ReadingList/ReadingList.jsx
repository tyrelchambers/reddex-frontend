import React, { useEffect, useState } from 'react'
import './ReadingList.scss';
import Approved from './Approved';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import CompletedStories from './CompletedStories';
import { Redirect } from 'react-router-dom';
import ImportStoryForm from '../../../components/Forms/ImportStoryForm';
import tabs from './tabs';
import Dashboard from '../Dashboard';
import { getAxios } from '../../../api';
import RequestWithUrl from '../../../components/RequestWithUrl/RequestWithUrl';
import WithNav from '../../../layouts/WithNav/WithNav'
import { H1 } from '../../../components/Headings/Headings'

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
      PostStore.clearSelectedPosts();
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

  const optionalTabList = [
    <button
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
    >
      Import Story from URL
    </button>,

    <button
      onClick={() => {
        ModalStore.setIsOpen(true)
        ModalStore.setRender(
          <RequestWithUrl/>
        )
      }}
    >
      Request Permission Using URL
    </button>
  ]

  return (
    <Dashboard>
      <H1>Reading List</H1>
  
      <WithNav
        tabs={tabs}
        optionalTabs={optionalTabList}
      >
        <div className="d-f mobile-column">
          {params.get('t') === "approved" &&
            <Approved 
              list={ReadingListStore.getToRead()}
              callback={(v) => ReadingListStore.transferStoryFromList(v, "toRead", "completed")}
              ModalStore={ModalStore}
            />
          }

          {params.get('t') === "complete" &&   
            <CompletedStories 
              list={ReadingListStore.getCompleted()}
              ReadingListStore={ReadingListStore}
              callback={(v) => ReadingListStore.transferStoryFromList(v, "completed", "toRead")}
              removeStoryFromDb={removeStoryFromDb}
            />
          }
        </div>
      </WithNav>
    </Dashboard>
  )
}));

export default ReadingList
