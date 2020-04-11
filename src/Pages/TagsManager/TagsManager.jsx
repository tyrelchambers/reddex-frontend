import React, {useEffect, useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { getAxios } from '../../api';
import './TagsManager.scss'
import { toast } from 'react-toastify';

const TagsManager = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    getAxios({
      url: '/tags/'
    }).then(res => {
      if (res) {
        setTags([...res])
      }
    })
  }, []);

  const deleteTag = (uuid, id) => {
    getAxios({
      url: `/tags/${uuid}`,
      method: "delete"
    }).then(res => {
      if (res) {
        const clone = [...tags]
        clone.splice(id, 1);

        setTags([...clone])
        toast.success("Tag deleted")
      }
    })
  }

  return (
    <Dashboard>
      <h1>Tag Manager</h1>
      <p className="subtle mb+">Manage all the tags you've created.</p>

      <div className="tags-list">
        {tags.map((x, id) => (
          <div className="d-f ai-c tag-item mt-" key={id}>
            <i className="fas fa-times-circle" onClick={() => deleteTag(x.uuid, id)}></i>
            <p>{x.tag}</p>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}

export default TagsManager;
