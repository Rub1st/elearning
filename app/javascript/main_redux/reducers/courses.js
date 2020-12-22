import { GET_COURSE,
         UPDATE_SEARCH_INPUT,
         CREATE_COURSE,
         GET_COURSES,
         SET_DRAFT_COURSE,
         UPDATE_COURSE,
         UPDATE_COURSE_APPROVE_STATUS,
         DROP_COURSE } from "../constants/courses";
import { toast } from 'react-toastify';
import { notify } from "../../components/utils/helpful_functions";

let initialState = {
  courses: [],
  searchInput: '',
  currentCourse: {},
  currentDraftCourse: {},
  connect_status: false,
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES: {
      return { ...state, courses: action.value, connect_status: true }
    }
    case DROP_COURSE: {
      return { ...state, courses: action.value }
    }
    case UPDATE_COURSE_APPROVE_STATUS: {
      notify(`Статус курса '${action.value.label}' успешно изменен!`, toast.info)

      return { ...state, courses: [...state.courses.filter(el => el.id !== action.value.id), action.value] }
    }
    case GET_COURSE: {
      return { ...state, currentCourse: state.courses.find(el => el.id === action.value) };
    }
    case UPDATE_SEARCH_INPUT: {
      return { ...state, searchInput: action.value}
    }
    case UPDATE_COURSE: {
      if (action.value.course_status === 'draft') notify(`Заявка курса '${action.value.label}' успешно обновлена! пожалуйста, продолжите процесс создания курса.`, toast.info)
      else {
        notify(`Изменения успешно внесены в содержимое курса '${action.value.label}'!`, toast.info)
        notify(`Ожидайте одобрения администратором!`, toast.info)
      }

      return { ...state, courses: [ action.value, ...state.courses.filter(el => el.id !== action.value.id)],
              currentDraftCourse: action.value, currentCourse: action.value }
    }
    case CREATE_COURSE: {
      notify(`Заявка на создание курса '${action.value.label}' успешно сформирована! пожалуйста, продолжите процесс создания курса.`, toast.info)

      return {...state, courses: [ action.value, ...state.courses], currentDraftCourse: action.value }
    }
    case SET_DRAFT_COURSE: {
      notify(`Открыт режим управления курсом '${state.courses.find(el => el.id === action.value).label}'!`, toast.info)
      return { ...state, currentDraftCourse: state.courses.find(el => el.id === action.value) }
    }
    default:{
      return state;
    }
  }
};

export default CourseReducer;
