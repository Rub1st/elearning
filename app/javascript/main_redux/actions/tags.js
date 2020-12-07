import { GET_TAGS, PLUG, CREATE_TAG, EDIT_TAG } from '../constants/tags'


export const getTags = (tags) => ({
  type: GET_TAGS,
  value: tags,
})

export const createTag = (tags) => ({
  type: CREATE_TAG,
  value: tags,
})

export const editTag = (tags) => ({
  type: EDIT_TAG,
  value: tags,
})

export const plug = (tags) => ({
  type: PLUG,
  value: tags,
})