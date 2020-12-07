import { GET_IMPERSONATIONS,
         CREATE_IMPERSONATION,
        UPDATE_IMPERSONATION } from '../constants/impersonations'

export const getImpersonations = (impersonations) => ({
  type: GET_IMPERSONATIONS,
  value: impersonations,
})

export const createImpersonation = (impersonation) => ({
  type: CREATE_IMPERSONATION,
  value: impersonation,
})

export const updateImpersonation = (impersonation) => ({
  type: UPDATE_IMPERSONATION,
  value: impersonation,
})

