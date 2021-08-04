import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { getAxios } from "../../api";
import "./TagsManager.scss";
import HR from "../../components/HR/HR";
import { MainButton, MinimalButton } from "../../components/Buttons/Buttons";
import WithNav from "../../layouts/WithNav/WithNav";
import {
  H1,
  H1Subtitle,
  H2,
  H2Subtitle,
} from "../../components/Headings/Headings";
import { deleteTag } from "../../api/deleteTag";
import { saveTag } from "../../api/saveTag";

const TagsManager = () => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();

  useEffect(() => {
    getAxios({
      url: "/tags/",
    }).then((res) => {
      if (res) {
        setTags([...res]);
      }
    });
  }, []);
  const saveHandler = async () => {
    const newTag = await saveTag(tag);
    setTags([...tags, newTag]);
  };
  return (
    <Dashboard>
      <H1>Tag Manager</H1>
      <H1Subtitle>
        Manage all the tags you've created. You can create and delete tags here.
      </H1Subtitle>
      <WithNav>
        <div className="bg shadow-md">
          <H2>Create a tag</H2>
          <H2Subtitle>
            Tags must be unique. This means you can't have two of the same tags.
          </H2Subtitle>
          <div className="flex items-center max-w-md h-36px mt-2">
            <input
              type="text"
              className="form-input"
              placeholder="enter tag name"
              onChange={(e) => setTag(e.target.value)}
            />
            <MainButton
              value="Add Tag"
              className="ml-2 btn btn-primary"
              onClick={() => saveHandler()}
            />
          </div>
        </div>

        <HR />

        <H2>Created tags</H2>

        <div className="flex flex-wrap gap-6 mt-4">
          {tags.map((x, id) => (
            <div
              className="flex items-center tag-item px-4 rounded-md"
              key={id}
            >
              <p className="text-2xl font-bold mr-4">{x.tag}</p>
              <MinimalButton
                onClick={() => {
                  deleteTag(x.uuid);
                }}
              >
                Delete
              </MinimalButton>
            </div>
          ))}
        </div>
      </WithNav>
    </Dashboard>
  );
};

export default TagsManager;
