import { GET_THEORIES, CREATE_THEORY, DROP_THEORY } from '../constants/theories'

let initialState = {
  theories: [],
};

const TheoryPeducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEORIES: {
      return { ...state, theories: action.value }
    }
    case CREATE_THEORY: {
      return { ...state, theories: [ ...state.theories, action.value]}
    }
    case DROP_THEORY: {
      return { ...state, theories: action.value }
    }
    default:{
      return state;
    }
  }
};

export default TheoryPeducer;
