import React, { useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { toast } from "react-toastify";
import { MainButton } from "../../components/Buttons/Buttons";
import { getAxios } from "../../api";

const ResetPasswordConfirm = () => {
  const [email, setEmail] = useState("");

  const stateHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reset = await getAxios({
      url: "/reset/get_reset_token",
      method: "post",
      data: {
        email,
      },
      options: {
        withToken: false,
      },
    });

    if (!reset) return toast.error(reset);
  };
  return (
    <DisplayWrapper>
      <div className="mt-6 flex items-center flex-col">
        <h1>Reset Password</h1>
        <form className="form">
          <div className="field-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              onChange={stateHandler}
            />
          </div>

          <div className="flex justify-end">
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
};

export default ResetPasswordConfirm;
