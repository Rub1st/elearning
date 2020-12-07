import { CREATE_ORGANIZATION,
         SET_CURRENT_ORGANIZATION,
         GET_ORGANIZATIONS,
         UPDATE_ORGANIZATION } from '../constants/organizations'

let initialState = {
  organizations: [],
  currentOrganization: {},
  currentDraftOrganization: {},
};

const OrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS: {
      return { ...state, organizations: action.value }
    }
    case CREATE_ORGANIZATION: {
      return { ...state, organizations: [...state.organizations, action.value], currentDraftOrganization: action.value }
    }
    case SET_CURRENT_ORGANIZATION: {
      return { ...state, currentOrganization: state.organizations.find(el => el.id === action.value)}
    }
    case UPDATE_ORGANIZATION: {
      return { ...state, organizations: [...state.organizations.filter(el => el.id !== action.value.id), action.value], currentOrganization: action.value}
    }
    default:{
      return state;
    }
  }
};

export default OrganizationReducer;
