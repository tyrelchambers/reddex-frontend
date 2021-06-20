import React, { useState } from "react";
import "./SubmittedItem.scss";
import moment from "moment-timezone";
import Dropdown from "../Dropdown/Dropdown";

const SubmittedItem = ({ data, deleteHandler }) => {
  const [openDropdown, setOpenDropdown] = useState("");
  const zone = moment.tz.guess();

  return (
    <li className="cell-row submitted-item-wrapper grid-cols-4 grid gap-3 ">
      <p className="font-bold" title={data.story_title}>
        {data.story_title}
      </p>
      <p title={data.author}>{data.author}</p>
      <p title={data.tags}>{data.tags}</p>
      <div className="d-f jc-fe">
        <Dropdown
          triggerIcon={<i className="fas fa-ellipsis-h"></i>}
          width="55px"
          identifier={data.uuid}
          showDropdown={() => {
            if (openDropdown === data.uuid) {
              return true;
            }
          }}
          toggleDropdown={() => {
            setOpenDropdown(data.uuid);
            if (openDropdown === data.uuid) {
              setOpenDropdown("");
            }
          }}
        >
          <button
            onClick={() =>
              (window.location.pathname = `/dashboard/story/id=${data.uuid}`)
            }
          >
            View
          </button>
          <button
            classNames="danger-text"
            onClick={() => {
              deleteHandler(data.uuid);
            }}
          >
            Delete
          </button>
        </Dropdown>
      </div>
    </li>
  );
};

export default SubmittedItem;
