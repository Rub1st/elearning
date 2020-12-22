import { SET_ERRORS, DROP_ERROR } from '../constants/errors'
import { toast } from 'react-toastify';
import { notify } from '../../components/utils/helpful_functions';

let initialState = {
  errors: [],
};

const ErrorReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_ERRORS: {

      return {...state, errors: action.value}
    }
    case DROP_ERROR: {

        notify(`${action.value.statusText} (${action.value.status})`,  toast.error)

      return state;
    }
    default:{
      return state;
    }
  }
};

export default ErrorReducer;