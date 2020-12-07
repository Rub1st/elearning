import { GET_IMPERSONATIONS,
         CREATE_IMPERSONATION,
        UPDATE_IMPERSONATION } from '../constants/impersonations'

let initialState = {
  impersonations: [],
  currentImpersonation: {},
};

const ImpersonationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMPERSONATIONS: {
      return { ...state, impersonations: action.value }
    }
    case CREATE_IMPERSONATION: {
      return { ...state, impersonations: [...state.impersonations, action.value], currentImpersonation: action.value}
    }
    case UPDATE_IMPERSONATION: {
      return { ...state, impersonations: action.value, currentImpersonation: {}}
    }
    default:{
      return state;
    }
  }
};

export default ImpersonationReducer;
