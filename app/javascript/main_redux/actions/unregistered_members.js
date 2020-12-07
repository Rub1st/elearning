import { GET_UNREGISTERED_MEMBERS,
         CREATE_UNREGISTERED_MEMBER,
         DROP_UNREGISTERED_MEMBER } from '../constants/unregistered_members'

export const getUnregisteredMembers = (members) => ({
type: GET_UNREGISTERED_MEMBERS,
value: members,
})

export const createUnregisteredMember = (members) => ({
type: CREATE_UNREGISTERED_MEMBER,
value: members,
})

export const dropUnregisteredMember = (members) => ({
type: DROP_UNREGISTERED_MEMBER,
value: members,
})