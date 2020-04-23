import React, { useEffect, useState } from 'react';
import { getAxios } from '../../api';
import { MainButton } from '../Buttons/Buttons';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const AddTagForm = ({ModalStore, story_uuid}) => {
  const [tag, setTag] = React.useState("");
  const [availableTags, setAvailableTags] = useState([])
  const [toAdd, setToAdd] = useState([])

  useEffect(() => {
    getAxios({
      url: `/tags/${story_uuid}/available`
    }).then(res => {
      if (res) {
        setAvailableTags([...res])
      }
    })
    
  }, [])
    
  const saveTags = (e) => {
    e.preventDefault();

    getAxios({
      url: '/tag_story/save',
      method: 'post',
      data: {
        story_uuid,
        tags: toAdd
      }
    }).then(res => {
      if (res) {
        ModalStore.setIsOpen(false)
        window.location.reload()
      }
    })
  }

  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="tag" className="form-label">Search for tag</label>
        <input type="text" className="form-input" name="tag" placeholder="Search for tag..." onChange={e => setTag(e.target.value)} autoFocus={true}/>
      </div>
      <div className="d-f ai-c jc-fe">
        <MainButton
          className="btn btn-primary" 
          value="Add Tag"
          onClick={e => saveTags(e)}
          
        >
          <i className="fas fa-check mr-"></i>
        </MainButton>
      </div>

      <h3>Available tags</h3>
      <div className="d-f fxw-w">
        {availableTags.filter(x => x.tag.includes(tag)).map((x, id) => (
          <Tag
            key={id}
            x={x}
            id={id}
            toAdd={toAdd}
            setToAdd={setToAdd}
          />
        ))}
      </div>
    </form>
  );
}


const Tag = ({x, id, toAdd, setToAdd}) => {
  const [isAdded, setIsAdd] = useState(false)

  return(
    <div className={`d-f ai-c tag-item mt- ${isAdded ? "to-add" : ""}`} onClick={() => {
       if (isAdded) {
         const clone = [...toAdd];
         clone.splice(clone.indexOf(id), 1)
         setToAdd([...clone])
         setIsAdd(false)
       } else {
        setToAdd([...toAdd, {...x}])
        setIsAdd(true)

       }

    }}>
      {isAdded ? <i className="fas fa-check-circle"></i> : <i className="fas fa-circle"></i>}
      
      <p>{x.tag}</p>
    </div>
  )
}

export default inject("ModalStore")(observer(AddTagForm));
