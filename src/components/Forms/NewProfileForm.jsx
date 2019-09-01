import React from 'react'
import './forms.scss';
import { MainButton } from '../Buttons/Buttons';
import { PictureUpload, FileUpload } from '../FileUpload/FileUpload';

const NewProfileForm = ({state, stateHandler, submitHandler, fileUploadHandler, profilePictureHandler}) => {
  const token = window.localStorage.getItem('token');

  return (
    <form className="form">
      <h3 className="mt+">Profile Images</h3>

      <div className="d-f jc-c">
        <PictureUpload
          token={token}
          profilePictures={profilePictureHandler}
        />
      </div>

      <div className="field-group">
        <label htmlFor="firstName" className="form-label">Cover Image</label>
        <FileUpload
          maxFiles={1}
          allowMultiple={false}
          token={token}
          files={fileUploadHandler}
        />
      </div>

      <h3 className="mt+">The Basics</h3>

      <div className="field-group">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input type="text" className="form-input" placeholder="John" name="firstName" value={state["firstName"]} onChange={stateHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input type="text" className="form-input" placeholder="Smith" name="lastName" value={state["lastname"]} onChange={stateHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-input" placeholder="JohnSmith123" name="username" value={state["username"]} onChange={stateHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="headline" className="form-label">Headline</label>
        <input type="text" className="form-input" placeholder="A short snippet of who you are" name="headline" value={state["headline"]} onChange={stateHandler}/>
      </div>

      <h3 className="mt+">Social Media</h3>
      <div className="field-group">
        <label htmlFor="website" className="form-label">Website</label>
        <input type="text" className="form-input" placeholder="yoursite.com" name="website" value={state["website"]} onChange={stateHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="twitter" className="form-label">Twitter</label>
        <input type="text" className="form-input" placeholder="@twitter" name="twitter" value={state["twitter"]} onChange={stateHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="facebook" className="form-label">Facebook</label>
        <input type="text" className="form-input" placeholder="@facebook" name="facebook" value={state["facebook"]} onChange={stateHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="youtube" className="form-label">Youtube</label>
        <input type="text" className="form-input" placeholder="@youtube" name="youtube" value={state["youtube"]} onChange={stateHandler}/>
      </div>

      <div className="d-f jc-c">
        <MainButton 
          className="btn btn-primary" 
          onClick={submitHandler}
          value="Create Profile"
          loading={false}
        />
      </div>
    </form>
  )
}

export default NewProfileForm
