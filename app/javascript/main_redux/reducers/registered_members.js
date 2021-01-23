import {
  CREATE_REGISTERED_MEMBER,
  DROP_REGISTERED_MEMBER,
  GET_REGISTERED_MEMBERS,
} from "../constants/registered_members";
import { toast } from "react-toastify";
import { notify } from "../../components/utils/helpful_functions";

let initialState = {
  registered_members: [],
};

const RegisteredMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTERED_MEMBERS: {
      return { ...state, registered_members: action.value };
    }
    case CREATE_REGISTERED_MEMBER: {
      notify(`Зарегистрированный пользователь успешно добавлен!`, toast.info);

      return { ...state, registered_members: [...action.value] };
    }
    case DROP_REGISTERED_MEMBER: {
      notify(`Зарегистрированный пользователь успешно удален!`, toast.info);
      return { ...state, registered_members: [...action.value] };
    }
    default: {
      return state;
    }
  }
};

export default RegisteredMemberReducer;
