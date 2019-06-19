export const fieldValidation = ({ email, password, confirmPassword} = {}) => {
  const errors = [];

  if ( !email ) {
    errors.push("Email can't be blank");
  }

  if ( !password ) {
    errors.push("Password must be provided");
  }

  if ( errors.length > 0 ) return errors;

  return true;
}

export const fieldValidationSignup = ({ email, password, confirmPassword }) => {
  const errors = [];

  if ( !email ) {
    errors.push("Email can't be blank");
  }

  if ( !password ) {
    errors.push("Password must be provided");
  }

  if ( !confirmPassword ) {
    errors.push("Please confirm password");
  }

  if ( confirmPassword !== password) {
    errors.push("Passwords must match");
  }

  if ( errors.length > 0 ) return errors;

}