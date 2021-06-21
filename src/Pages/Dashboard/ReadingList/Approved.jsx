import React, { useState, useEffect } from "react";
import "./ReadingList.scss";
import HR from "../../../components/HR/HR";
import { getAxios } from "../../../api";
import isEmpty from "../../../helpers/objIsEmpty";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { H2, H3 } from "../../../components/Headings/Headings";
import { MainButton, MinimalButton } from "../../../components/Buttons/Buttons";
import Story from "../../../components/Story/Story";
import { getPostsFromDatabase } from "../../../api/getPostsFromDatabase";
import ReadingListFilters from "../../../components/ReadingListFilters/ReadingListFilters";
import { addToCompleted } from "../../../api/addToCompleted";
import AddTagForm from "../../../components/Forms/AddTagForm";

const Approved = ({ list, ReadingListStore, ModalStore }) => {
  const [subredditFilter, setSubredditFilter] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});
  const [headers, setHeaders] = useState([]);
  const [initialHeaders, setInitialHeaders] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    getAxios({
      url: "/tag_story/",
    }).then((res) => {
      if (res) {
        setTags([...res]);
      }
    });

    getAxios({
      url: "/profile/reading_list?permission=true",
      params: {
        subreddit: subredditFilter ? subredditFilter : null,
        tag: isEmpty(tag) ? null : tag.tag,
      },
    }).then((res) => {
      if (res) {
        ReadingListStore.addToRead(res.stories);
        if (initialHeaders.length === 0) {
          setInitialHeaders(res.headers);
        }
        setHeaders(res.headers);
      }
    });
  }, [subredditFilter, tag]);

  useEffect(() => {
    if (!keywords) {
      setReadingList(list);
    }
  }, [list, keywords]);

  if (!list) return null;

  const getPosts = async () => {
    const query = {
      ...(keywords && { keywords: keywords }),
    };

    const stories = await getPostsFromDatabase(query);
    setReadingList([...stories]);
  };

  const renderedList = headers.map((x, id) => {
    return (
      <React.Fragment key={id}>
        {readingList.map((y, id) => {
          if (x === y.subreddit) {
            return (
              <Story key={`${y.post_id}_${id}`} story={y} story_id={id}>
                <div className="flex items-center gap-6">
                  <MinimalButton
                    className=""
                    onClick={() => {
                      addToCompleted(y, true);
                      ReadingListStore.transferStoryFromList(
                        y,
                        "toRead",
                        "completed"
                      );
                    }}
                  >
                    Set as read
                  </MinimalButton>

                  <MinimalButton
                    onClick={() => {
                      ModalStore.setIsOpen(true);
                      ModalStore.setRender(
                        <div className="d-f fxd-c ai-c">
                          <H2 className="mb+ font-bold">Add tag</H2>
                          <AddTagForm story_uuid={y.uuid} />
                        </div>
                      );
                    }}
                  >
                    Add Tags
                  </MinimalButton>
                </div>
              </Story>
            );
          }
        })}
      </React.Fragment>
    );
  });

  return (
    <>
      <div className="bg gap-4 grid ">
        <H3>Search reading list</H3>
        <div className="d-f ai-c mt-  reading-list-search">
          <input
            type="text"
            className="search-large w-100pr max-w-xl"
            placeholder="Search by keywords..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <div className="reading-list-search-actions">
            <MainButton
              className="btn btn-tiertiary p- ml-"
              onClick={() => {
                setKeywords("");
                setReadingList(list);
              }}
            >
              Clear
            </MainButton>

            <MainButton
              className="btn btn-green p- ml-"
              onClick={getPosts}
              disabled={!keywords ? true : false}
            >
              Search
            </MainButton>
          </div>
        </div>
      </div>
      <ReadingListFilters
        tags={tags}
        setTag={setTag}
        tag={tag}
        initialHeaders={initialHeaders}
        setInitialHeaders={setInitialHeaders}
        subredditFilter={subredditFilter}
        setSubredditFilter={setSubredditFilter}
      />
      <HR />

      <ul className="reading-list-list grid grid-cols-3 gap-4 mt-">
        {renderedList}
      </ul>
    </>
  );
};

export default inject("ModalStore", "ReadingListStore")(observer(Approved));
