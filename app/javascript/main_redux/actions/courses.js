import { GET_COURSE,
         UPDATE_SEARCH_INPUT,
         CREATE_COURSE,
         SET_DRAFT_COURSE,
         UPDATE_COURSE,
         GET_COURSES,
         UPDATE_COURSE_APPROVE_STATUS,
         DROP_COURSE } from '../constants/courses';

export const getCourses = (courses) => ({
  type: GET_COURSES,
  value: courses,
})

export const dropCourse = (courses) => ({
  type: DROP_COURSE,
  value: courses,
})

export const updateCourseApproveStatus = (courses) => ({
  type: UPDATE_COURSE_APPROVE_STATUS,
  value: courses,
})

export const choose = (course) => ({
  type: GET_COURSE,
  value: course,
})

export const updateInput = (newValue) => ({
  type: UPDATE_SEARCH_INPUT,
  value: newValue,
})

export const createCourse = (newValue) => ({
  type: CREATE_COURSE,
  value: newValue,
})

export const setDraftCourse = (courseId) => ({
  type: SET_DRAFT_COURSE,
  value: courseId,
})

export const updateCourseStatus = (status) => ({
  type: UPDATE_COURSE,
  value: status,
})