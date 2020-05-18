import React, {useEffect, useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { getAxios } from '../../api';
import './TagsManager.scss'
import { toast } from 'react-toastify';
import HR from '../../components/HR/HR'
import { MainButton } from '../../components/Buttons/Buttons';
import WithNav from '../../layouts/WithNav/WithNav';
import { H1, H1Subtitle, H2, H2Subtitle } from '../../components/Headings/Headings';
import Dropdown from '../../components/Dropdown/Dropdown';

const TagsManager = () => {
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState()
  const [ openDropdown, setOpenDropdown] = useState("")

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
      <H1>Tag Manager</H1>
      <H1Subtitle>Manage all the tags you've created. You can create and delete tags here.</H1Subtitle>
      <WithNav>
        <H2>Create a tag</H2>
        <H2Subtitle>Tags must be unique. This means you can't have two of the same tags.</H2Subtitle>
        <div className="d-f ai-c tag-input h-36px mt-">
          <input type="text" className="form-input" placeholder="enter tag name" onChange={e => setTag(e.target.value)}/>
          <MainButton
            value="Add Tag"
            className="ml- btn btn-green h-100p p-"
            onClick={saveTag}
          />
        </div>

        <HR/>

        <H2>Created tags</H2>
        
        <div className="d-f fxw-w">
          {tags.map((x, id) => (
            <div className="d-f ai-c tag-item mt- can-delete" key={id} >
              <p className="fx-1">{x.tag}</p>
              <Dropdown
                triggerIcon={ <i className="fas fa-ellipsis-h"></i> }
                width="55px"
                identifier={x.uuid}
                showDropdown={() => {
                  if (openDropdown === x.uuid) {
                    return true
                  }
                }}
                toggleDropdown={() => {
                  setOpenDropdown(x.uuid)
                  if (openDropdown === x.uuid) {
                    setOpenDropdown("")
                  }
                }}
              >
                <button
                  onClick={() => {
                    setOpenDropdown("")
                    deleteTag(x.uuid, id)
                  }}
                >
                  Delete 
                </button>
              </Dropdown>
            </div>
          ))}
        </div>
      </WithNav>
    </Dashboard>
  );
}

export default TagsManager;
