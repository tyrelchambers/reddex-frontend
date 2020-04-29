import React, {useEffect, useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { getAxios } from '../../api';
import './TagsManager.scss'
import { toast } from 'react-toastify';
import HR from '../../components/HR/HR'
import { ThirdButton } from '../../components/Buttons/Buttons';

const TagsManager = () => {
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState()

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


const saveTag = () => {
  getAxios({
    url: '/tags/save',
    method: 'post',
    data: {
      tag
    }
  }).then(res => {
    if (res) {
      setTags([...tags, res])
      toast.success("Tag saved")
    }
  })
}

  return (
    <Dashboard>
      <h1>Tag Manager</h1>
      <p className="subtle mb+">Manage all the tags you've created. You can create and delete the tags you've created.</p>
               
      <div className="bg">
        <h3>Create A Tag</h3>
        <p className="subtle mb">Tags must be unique. This means you can't have two of the same tags.</p>

        <div className="d-f ai-c tag-input">
          <input type="text" className="form-input" placeholder="enter tag name" onChange={e => setTag(e.target.value)}/>
          <ThirdButton
            text="Add Tag"
            classNames="ml-"
            onClick={saveTag}
          />
        </div>
      </div>
      <HR 
        classes="mb+ mt+"
      />
      <h3>Created Tags</h3>
      <div className="d-f fxw-w">
        {tags.map((x, id) => (
          <div className="d-f ai-c tag-item mt- can-delete" key={id} onClick={() => deleteTag(x.uuid, id)}>
            <i className="fas fa-times-circle" ></i>
            <p>{x.tag}</p>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}

export default TagsManager;
