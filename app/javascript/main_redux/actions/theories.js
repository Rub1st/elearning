import { CREATE_THEORY, DROP_THEORY, GET_THEORIES } from '../constants/theories'

export const getTheories = (theories) => ({
  type: GET_THEORIES,
  value: theories,
})

export const createTheory = (theory) => ({
  type: CREATE_THEORY,
  value: theory,
})

export const dropTheory = (theories) => ({
  type: DROP_THEORY,
  value: theories,
})