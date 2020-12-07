import { GET_QUESTIONS, CREATE_QUESTION, DROP_QUESTOIN } from '../constants/questions'

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  value: questions,
})

export const createQuestion = (question) => ({
  type: CREATE_QUESTION,
  value: question,
})

export const dropQuestion = (questions) => ({
  type: DROP_QUESTOIN,
  value: questions,
})