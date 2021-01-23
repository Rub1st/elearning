import { GET_TAGS, PLUG, CREATE_TAG, EDIT_TAG } from "../constants/tags";

let initialState = {
  tags: [],
};

const TagReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAGS: {
      return { ...state, tags: action.value };
    }
    case CREATE_TAG: {
      return { ...state, tags: action.value };
    }
    case EDIT_TAG: {
      return { ...state, tags: action.value };
    }
    case PLUG: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default TagReducer;
