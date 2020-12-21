import { SET_ERRORS, DROP_ERROR } from '../constants/errors'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let initialState = {
  errors: [],
};

const ErrorReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_ERRORS: {

      return {...state, errors: action.value}
    }
    case DROP_ERROR: {

      console.log(action.value);

      toast.error(`${action.value.statusText} (${action.value.status})`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      return state;
    }
    default:{
      return state;
    }
  }
};

export default ErrorReducer;