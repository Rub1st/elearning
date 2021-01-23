import {
  CREATE_COMMENT,
  CREATE_REPLY,
  UPDATE_COMMENT_INPUT,
  GET_COMMENTS,
  DROP_REPLY,
  DROP_COMMENT,
} from "../constants/comments.js";

let initialState = {
  comments: [],
  commentInput: "",
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS: {
      return { ...state, comments: action.value };
    }
    case UPDATE_COMMENT_INPUT: {
      return { ...state, commentInput: action.value };
    }
    case CREATE_COMMENT: {
      return { ...state, comments: action.value, commentInput: "" };
    }
    case CREATE_REPLY: {
      return { ...state, comments: action.value };
    }
    case DROP_REPLY: {
      return { ...state, comments: action.value };
    }
    case DROP_COMMENT: {
      return { ...state, comments: action.value };
    }
    default: {
      return state;
    }
  }
};

export default CommentReducer;
