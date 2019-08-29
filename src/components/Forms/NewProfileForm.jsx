import React from 'react'
import './forms.scss';
import { MainButton } from '../Buttons/Buttons';

const NewProfileForm = ({stateHandler}) => {
  return (
    <form className="form">
      <h3 className="mt+">The Basics</h3>
      <div className="field-group">
        <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
        <input type="text" className="form-input" placeholder="Homer" name="profilePicture"/>
      </div>

      <div className="field-group">
        <label htmlFor="firstName" className="form-label">Banner Picture</label>
        <input type="text" className="form-input" placeholder="Homer" name="firstName"/>
      </div>

      <div className="field-group">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input type="text" className="form-input" placeholder="John" name="firstName"/>
      </div>

      <div className="field-group">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input type="text" className="form-input" placeholder="Smith" name="lastName"/>
      </div>

      <div className="field-group">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-input" placeholder="JohnSmith123" name="username"/>
      </div>

      <div className="field-group">
        <label htmlFor="headline" className="form-label">Headline</label>
        <input type="text" className="form-input" placeholder="A short snippet of who you are" name="headline"/>
      </div>

      <h3 className="mt+">Social Media</h3>
      <div className="field-group">
        <label htmlFor="website" className="form-label">Website</label>
        <input type="text" className="form-input" placeholder="yoursite.com" name="website"/>
      </div>

      <div className="field-group">
        <label htmlFor="twitter" className="form-label">Twitter</label>
        <input type="text" className="form-input" placeholder="@twitter" name="twitter"/>
      </div>

      <div className="field-group">
        <label htmlFor="facebook" className="form-label">Facebook</label>
        <input type="text" className="form-input" placeholder="@facebook" name="facebook"/>
      </div>

      <div className="field-group">
        <label htmlFor="youtube" className="form-label">Youtube</label>
        <input type="text" className="form-input" placeholder="@youtube" name="youtube"/>
      </div>

      <div className="d-f jc-c">
        <MainButton 
          className="btn btn-primary" 
          
          value="Create Profile"
          loading={false}
        />
      </div>
    </form>
  )
}

export default NewProfileForm
