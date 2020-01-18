import { renewRefreshToken } from "./renewRefreshToken";
import dateFns from 'date-fns';

const checkValidTokens = async () => {
  const expDate = window.localStorage.getItem("token_exp_date");
  const today = new Date(Date.now());
  
  if ( !expDate || today > expDate ) {
    await renewRefreshToken();
    window.localStorage.setItem('token_exp_date', dateFns.addHours(today, 1));
  }
  
  return true
}

export {
  checkValidTokens
}