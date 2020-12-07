import { CREATE_PAGE,
         DROP_PAGE,
         UPDATE_PAGE,
         SET_CURRENT_DRAFT_PAGE,
         GET_PAGES } from '../constants/pages'

let initialState = {
  pages: [],
  currentDraftPage: {}
};

const PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGES: {
      return { ...state, pages: action.value }
    }
    case CREATE_PAGE: {
      return { ...state, pages: [...state.pages, action.value], currentDraftPage: action.value }
    }
    case UPDATE_PAGE: {
      return { ...state, pages: [action.value, ...state.pages.filter(el => el.id !== action.value.id)], currentDraftPage: action.value }
    }
    case DROP_PAGE: {
      return { ...state, pages: action.value };
    }
    case SET_CURRENT_DRAFT_PAGE: {
      return { ...state, currentDraftPage: state.pages.find(el => el.id === action.value)}
    }
    default:{
      return state;
    }
  }
};

export default PageReducer;
