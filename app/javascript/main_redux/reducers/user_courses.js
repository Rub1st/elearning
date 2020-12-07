import { ADD_USER_COURSE, UPDATE_USER_COURSE, GET_USER_COURSES } from '../constants/user_courses'

let initialState = {
  userCourses: [],
  currentUserCourse: {},
};

const UserCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COURSES: {
      return { ...state, userCourses: action.value }
    }
    case ADD_USER_COURSE: {
      return { ...state, currentUserCourse: action.value}
    }
    case UPDATE_USER_COURSE: {
      return { ...state,
        userCourses: [...state.userCourses.filter(el => el.id !== action.value.id), action.value],
        currentUserCourse: action.value}
    }
    default:{
      return state;
    }
  }
};

export default UserCourseReducer;
