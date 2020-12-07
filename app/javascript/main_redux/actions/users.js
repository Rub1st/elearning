import { UPDATE_USER,
         GET_USERS,
         SET_CURRENT_USER,
         CREATE_USER,
         DROP_USER,
         SET_IMPERSONATION_USER,
         UPDATE_USER_STATUS } from '../constants/users'

export const updateUser = (newUser) => ({
  type: UPDATE_USER,
  value: newUser,
})

export const getUsers = (users) => ({
  type: GET_USERS,
  value: users,
})

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  value: user,
})

export const createUser = (users) => ({
  type: CREATE_USER,
  value: users,
})

export const dropUser = (users) => ({
  type: DROP_USER,
  value: users,
})

export const setImpersonationUser = (user) => ({
  type: SET_IMPERSONATION_USER,
  value: user,
})

export const updateUserStatus = (user) => ({
  type: UPDATE_USER_STATUS,
  value: user,
})