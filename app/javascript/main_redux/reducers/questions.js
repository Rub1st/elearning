import { GET_QUESTIONS, CREATE_QUESTION, DROP_QUESTOIN } from '../constants/questions'
import { toast } from 'react-toastify';
import { notify } from '../../components/utils/helpful_functions';

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
      notify(`Вопрос '${action.value.title.length ? action.value.title : 'Без имени'}' успешно добавлен!`, toast.info)

      return { ...state, questions: [ ...state.questions.filter(el => el.id !== action.value.id), action.value], currentQuestion: action.value}
    }
    case DROP_QUESTOIN: {
      notify(`Вопрос успешно удален!`, toast.info)

      return { ...state, questions: action.value }
    }
    default:{
      return state;
    }
  }
};

export default QuestionReducer;
