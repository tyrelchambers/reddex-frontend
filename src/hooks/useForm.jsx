import React, {useState} from 'react';

export const useForm = (initialValues) => {
  const [state, setState] = useState(initialValues);

  return [
    state,
    e => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
  ]
}