import { CREATE_COMMENT,
         CREATE_REPLY,
         UPDATE_COMMENT_INPUT,
         GET_COMMENTS,
         DROP_COMMENT,
         DROP_REPLY} from '../constants/comments';


export const getComments = (comments) => ({
  type: GET_COMMENTS,
  value: comments,
})

export const createComment = (newComment) => ({
type: CREATE_COMMENT,
value: newComment,
})

export const createReply = (newReply) => ({
type: CREATE_REPLY,
value: newReply,
})

export const updateCommentInput = (newValue) => ({
  type: UPDATE_COMMENT_INPUT,
  value: newValue,
})

export const dropComment = (comments) => ({
  type: DROP_COMMENT,
  value: comments,
})

export const dropReply = (comments) => ({
  type: DROP_REPLY,
  value: comments,
})