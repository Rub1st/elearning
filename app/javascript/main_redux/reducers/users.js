import { UPDATE_USER,
         GET_USERS,
         SET_CURRENT_USER,
         CREATE_USER,
         DROP_USER,
         SET_IMPERSONATION_USER,
         UPDATE_USER_STATUS } from '../constants/users';

let initialState = {
  users: [],
  common_users: [],
  currentUser: '',
  impersonationUser: {},
  impersonation: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: action.value, common_users: action.value.filter(el => el.user_role === 'common' && el.user_status === 'approved' ) }
    }
    case DROP_USER: {
      return { ...state, common_users: action.value }
    }
    case SET_CURRENT_USER: {
      return { ...state, currentUser: action.value, impersonationUser: action.value }
    }
    case CREATE_USER: {
      return { ...state, common_users: [...action.value] }
    }
    case UPDATE_USER: {
      return { ...state, common_users: [...state.users.filter(el => el.id !== state.currentUser.id), action.value], currentUser: {...action.value} }
    }
    case UPDATE_USER_STATUS: {
      let users = [...state.users.filter(el => el.id !== action.value.id), action.value]
      return { ...state, common_users: users, users: users }
    }
    case SET_IMPERSONATION_USER: {
      state = { ...state, impersonation: !state.impersonation, currentUser: action.value }
      console.log(state);
      return state;
    }
    default:{
      return state;
    }
  }
};

export default UserReducer;
