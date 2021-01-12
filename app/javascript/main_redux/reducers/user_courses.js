import { ADD_USER_COURSE,
         UPDATE_USER_COURSE,
         GET_USER_COURSES,
         GET_CURRENT_COURSES,
         GET_FAVORITE_COURSES,
         GET_DONE_COURSES } from '../constants/user_courses'
import { toast } from 'react-toastify';
import { notify } from '../../components/utils/helpful_functions';

let initialState = {
  userCourses: [],
  doneCourses: [],
  currentCourses: [],
  favoriteCourses: [],
  currentUserCourse: {},
};

const UserCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COURSES: {
      return { ...state, userCourses: action.value }
    }
    case GET_DONE_COURSES: {
      return { ...state, doneCourses: action.value }
    }
    case GET_CURRENT_COURSES: {
      return { ...state, currentCourses: action.value }
    }
    case GET_FAVORITE_COURSES: {
      return { ...state, favoriteCourses: action.value }
    }
    case ADD_USER_COURSE: {
      notify(`Вы начали прохождение курса '${action.value.course.label}'!`, toast.info)
      notify(`Удачи! И помните: учение - свет!`, toast.info)

      return { ...state, currentUserCourse: action.value}
    }
    case UPDATE_USER_COURSE: {
      if(action.value.progress != 100 && action.value.progress != 0){
        notify(`Ваш прогресс: ${action.value.progress}%!`, toast.info)
        notify(`Ваши ответы верны на: ${action.value.correct}%!`, toast.info)
      }

      if(action.value.progress == 100 && action.value.correct > 90){
        notify(`Примите наши поздравления! Вы успешно завершили курс '${action.value.course.label}'!`, toast.info)
        notify(`Ваш сертификат уже ждет вас в разделе 'Мои сертификаты' в профиле!`, toast.info)
        notify(`Пожалуйста, оцените этот курс! Это может работе и развитию данной платформы.`, toast.info)
      }

      if(action.value.progress == 100 && action.value.correct <= 90){
        notify(`К сожалению вам не удалось успешно завершить курс '${action.value.course.label}'!`, toast.info)
        notify(`Попробуйте снова! Нельзя сдаваться на пути к знаниям!`, toast.info)
        notify(`Пожалуйста, оцените этот курс! Это может работе и развитию данной платформы.`, toast.info)
      }

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
