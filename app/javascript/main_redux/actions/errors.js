import { SET_ERRORS, DROP_ERROR } from "../constants/errors";

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  value: errors,
});

export const dropError = (error) => ({
  type: DROP_ERROR,
  value: error,
});
