import React, {useState} from 'react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper'
import { toast } from 'react-toastify';
import { MainButton } from '../../components/Buttons/Buttons';
import { getAxios } from '../../api/get';

const ResetPasswordConfirm = () => {
  const [ email, setEmail ] = useState("");

  const stateHandler = (e) => {
    setEmail(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const reset = await getAxios({
      url: '/reset/get_reset_token',
      method: 'post',
      data: email
    })
        
    if ( !reset ) return toast.error(reset)
  }
  return (
    <DisplayWrapper 
      hasHeader={true}
    >
      <div className="mt+ d-f ai-c fxd-c">
        <h1>Reset Password</h1>
        <form className="form">
          <div className="field-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" className="form-input" onChange={stateHandler}/>
          </div>

          <div className="d-f jc-fe">
          <MainButton
            value="Reset Password"
            className="btn btn-primary"
            onClick={submitHandler}
          />
          </div>
        </form>
      </div>
    </DisplayWrapper>
  );
}

export default ResetPasswordConfirm;
