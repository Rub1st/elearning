import { GET_REGISTERED_MEMBERS,
         CREATE_REGISTERED_MEMBER,
         DROP_REGISTERED_MEMBER } from '../constants/registered_members'

export const getRegisteredMembers = (members) => ({
  type: GET_REGISTERED_MEMBERS,
  value: members,
})

export const createRegisteredMember = (members) => ({
  type: CREATE_REGISTERED_MEMBER,
  value: members,
})

export const dropRegisteredMember = (members) => ({
  type: DROP_REGISTERED_MEMBER,
  value: members,
})