import React, { useEffect, useState } from "react";
import "./ReadingList.css";
import Approved from "./Approved";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import CompletedStories from "./CompletedStories";
import ImportStoryForm from "../../../components/Forms/ImportStoryForm";
import tabs from "./tabs";
import Dashboard from "../Dashboard";
import { getAxios } from "../../../api";
import RequestWithUrl from "../../../components/RequestWithUrl/RequestWithUrl";
import WithNav from "../../../layouts/WithNav/WithNav";
import { H1 } from "../../../components/Headings/Headings";

const ReadingList = inject(
  "ReadingListStore",
  "ModalStore",
  "PostStore"
)(
  observer(({ ReadingListStore, ModalStore, PostStore }) => {
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const fn = async () => {
        await getAxios({
          url: "/profile/stories/completed",
        }).then((res) => {
          if (res) {
            ReadingListStore.setCompleted(res);
          }
        });
      };

      fn();
      return () => {
        PostStore.clearSelectedPosts();
        setRefresh(false);
      };
    }, [refresh]);

    const params = new URLSearchParams(window.location.search);

    const optionalTabList = [
      <button
        onClick={() => {
          ModalStore.setIsOpen(true);
          ModalStore.setRender(
            <>
              <h2 className="text-center">Import A Story </h2>
              <div className="flex justify-center">
                <ImportStoryForm
                  buttonText="Import Story"
                  icon={<i className="fas fa-check mr-2"></i>}
                />
              </div>
            </>
          );
        }}
      >
        Import Story from URL
      </button>,

      <button
        onClick={() => {
          ModalStore.setIsOpen(true);
          ModalStore.setRender(<RequestWithUrl />);
        }}
      >
        Request Permission Using URL
      </button>,
    ];

    return (
      <Dashboard>
        <H1>Reading List</H1>

        <WithNav tabs={tabs} optionalTabs={optionalTabList}>
          {params.get("t") === "approved" && (
            <Approved list={ReadingListStore.getToRead()} />
          )}

          {params.get("t") === "complete" && (
            <CompletedStories list={ReadingListStore.getCompleted()} />
          )}
        </WithNav>
      </Dashboard>
    );
  })
);

export default ReadingList;
