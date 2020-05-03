import { renewRefreshToken } from "./renewRefreshToken";
import dateFns from 'date-fns';

const checkValidTokens = async () => {
  const expDate = window.localStorage.getItem("token_exp_date");
  const today = Date.now();
  if ( !expDate || dateFns.differenceInHours(today, expDate) >= 1) {
    console.log('called2')
    await renewRefreshToken().then(res => {
      if (res) {
        window.localStorage.setItem('token_exp_date', dateFns.addHours(today, 1));
      }
    })
  }

  return true
}

export {
  checkValidTokens
}