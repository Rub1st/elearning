import { GET_THEORIES, CREATE_THEORY, DROP_THEORY } from '../constants/theories'
import { toast } from 'react-toastify';
import { notify } from '../../components/utils/helpful_functions';

let initialState = {
  theories: [],
};

const TheoryPeducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEORIES: {
      return { ...state, theories: action.value }
    }
    case CREATE_THEORY: {
      notify(`Параграф '${action.value.title}' успешно добавлен!`, toast.info)
      return { ...state, theories: [ ...state.theories, action.value]}
    }
    case DROP_THEORY: {
      notify(`Параграф успешно удален!`, toast.info)
      return { ...state, theories: action.value }
    }
    default:{
      return state;
    }
  }
};

export default TheoryPeducer;
