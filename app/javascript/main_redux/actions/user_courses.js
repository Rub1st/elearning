import { ADD_USER_COURSE, UPDATE_USER_COURSE, GET_USER_COURSES } from '../constants/user_courses'

export const addUserCourse = (courseAndUser) => ({
  type: ADD_USER_COURSE,
  value: courseAndUser,
})

export const updateUserCourse = (updatedCourse) => ({
  type: UPDATE_USER_COURSE,
  value: updatedCourse,
})

export const getUserCourses = (userCourses) => ({
  type: GET_USER_COURSES,
  value: userCourses,
})