import { CREATE_UNREGISTERED_MEMBER,
         DROP_UNREGISTERED_MEMBER,
         GET_UNREGISTERED_MEMBERS } from '../constants/unregistered_members'

let initialState = {
  unregistered_members: [],
};

const UnregisteredMemberReducer = (state = initialState, action) => {
switch (action.type) {
case GET_UNREGISTERED_MEMBERS: {
return { ...state, unregistered_members: action.value }
}
case CREATE_UNREGISTERED_MEMBER: {
return { ...state, unregistered_members: [...action.value] }
}
case DROP_UNREGISTERED_MEMBER: {
return { ...state, unregistered_members: [...action.value] }
}
default:{
return state;
}
}
};

export default UnregisteredMemberReducer;
