import {
  ADD_USER_COURSE,
  UPDATE_USER_COURSE,
  GET_USER_COURSES,
  GET_CURRENT_COURSES,
  GET_FAVORITE_COURSES,
  GET_DONE_COURSES,
} from "../constants/user_courses";

export const addUserCourse = (courseAndUser) => ({
  type: ADD_USER_COURSE,
  value: courseAndUser,
});

export const updateUserCourse = (updatedCourse) => ({
  type: UPDATE_USER_COURSE,
  value: updatedCourse,
});

export const getUserCourses = (userCourses) => ({
  type: GET_USER_COURSES,
  value: userCourses,
});

export const getsDoneCourses = (userCourses) => ({
  type: GET_DONE_COURSES,
  value: userCourses,
});

export const getsCurrentCourses = (userCourses) => ({
  type: GET_CURRENT_COURSES,
  value: userCourses,
});

export const getsFavoriteCourses = (userCourses) => ({
  type: GET_FAVORITE_COURSES,
  value: userCourses,
});
