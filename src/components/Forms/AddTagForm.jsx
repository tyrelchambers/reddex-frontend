import React, { useEffect } from 'react';
import { getAxios } from '../../api';
import { MainButton } from '../Buttons/Buttons';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const AddTagForm = ({story_id, ModalStore, story_tags}) => {
  const [tag, setTag] = React.useState("");
  const [tagList, setTagList] = React.useState([])
  const [selectedTags, setSelectedTags] = React.useState([])

  useEffect(() => {
    getAxios({
      url: '/tags/tag/',
      params: {
        tag
      }
    }).then(res => {
      if (res) {
        setTagList([...res])
      }
    })
  }, [tag]);

  useEffect(() => {
    const toDelete = story_tags.filter(x => !selectedTags.includes(x))
    console.log(toDelete)
  }, [selectedTags]);

  useEffect(() => {
    setSelectedTags([...story_tags])
  }, [])
    
  const saveTags = (e) => {
    e.preventDefault();

    // getAxios({
    //   url: '/tag_story/save',
    //   method: 'post',
    //   data: {
    //     story_id,
    //     tags: selectedTags
    //   }
    // }).then(res => {
    //   if (res) {
    //     ModalStore.setIsOpen(false)
    //   }
    // })
  }

  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="tag" className="form-label">Search for tag</label>
        <input type="text" className="form-input" name="tag" placeholder="Search for tag..." onChange={e => setTag(e.target.value)} autoFocus={true}/>
      </div>
      <div className="tags-list">
        {tagList.map((x, id) => (
          <Tag 
            x={x}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            key={id}
            id={x.uuid}
          />
        ))}
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
    </form>
  );
}

const Tag = ({x, selectedTags, setSelectedTags, id}) => {
  const [exists, setExists] = React.useState(false)

  useEffect(() => {
    for (let i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i].uuid === x.uuid) {
        setExists(true)
      }
    }
  
  }, [])

  return(
    <div className={`d-f ai-c tag-item mt- ${exists ? "exists" : ""}`} onClick={() => {
       if (exists) {
         const clone = [...selectedTags];
         clone.splice(clone.indexOf(id), 1)
         setSelectedTags([...clone])
         setExists(false)
       } else {
        setSelectedTags([...selectedTags, {...x}])
        setExists(true)
       }

    }}>
      {exists ? <i className="fas fa-check-circle"></i> : <i className="fas fa-circle"></i>}
      
      <p>{x.tag}</p>
    </div>
  )
}
export default inject("ModalStore")(observer(AddTagForm));
