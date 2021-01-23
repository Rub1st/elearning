import { GET_USER_ANSWERS } from "../constants/user_answers";

let initialState = {
  userAnswers: [],
};

const UserAnswerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ANSWERS: {
      return { ...state, userAnswers: action.value };
    }
    default: {
      return state;
    }
  }
};

export default UserAnswerReducer;
