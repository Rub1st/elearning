import {
  CREATE_PAGE,
  DROP_PAGE,
  UPDATE_PAGE,
  SET_CURRENT_DRAFT_PAGE,
  GET_PAGES,
} from "../constants/pages";

export const getPages = (pages) => ({
  type: GET_PAGES,
  value: pages,
});

export const setCurrentDraftPage = (pageId) => ({
  type: SET_CURRENT_DRAFT_PAGE,
  value: pageId,
});

export const createPage = (newPageAndCourseId) => ({
  type: CREATE_PAGE,
  value: newPageAndCourseId,
});

export const updatePage = (newTitle) => ({
  type: UPDATE_PAGE,
  value: newTitle,
});

export const dropPage = (pageId) => ({
  type: DROP_PAGE,
  value: pageId,
});
