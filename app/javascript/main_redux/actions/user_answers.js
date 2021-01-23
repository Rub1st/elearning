import { SAVE_USER_ANSWER, GET_USER_ANSWERS } from "../constants/user_answers";

export const saveUserAnswer = (questionAndUserAndAnswer) => ({
  type: SAVE_USER_ANSWER,
  value: questionAndUserAndAnswer,
});

export const getUserAnswers = (userAnswers) => ({
  type: GET_USER_ANSWERS,
  value: userAnswers,
});
