import { GET_QUESTIONS, CREATE_QUESTION, DROP_QUESTOIN } from '../constants/questions'

let initialState = {
  questions: [],
  currentQuestion: {},
};

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS: {
      return { ...state, questions: action.value }
    }
    case CREATE_QUESTION: {
      return { ...state, questions: [ ...state.questions.filter(el => el.id !== action.value.id), action.value], currentQuestion: action.value}
    }
    case DROP_QUESTOIN: {
      return { ...state, questions: action.value }
    }
    default:{
      return state;
    }
  }
};

export default QuestionReducer;
