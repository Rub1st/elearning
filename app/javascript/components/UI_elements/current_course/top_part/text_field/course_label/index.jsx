import React from 'react'
import { connect } from 'react-redux'
import { postDataElement, updateDataElement } from '../../../../../../main_redux/actions/server_connections'
import { updateUserCourse } from '../../../../../../main_redux/actions/user_courses'
import './course_label.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { toast } from 'react-toastify'
import { notify } from '../../../../../utils/helpful_functions'
import { useTranslation } from 'react-i18next'

const CourseLabel = (props) => {
  let existed = props.userCourses.filter(el => el.user.id === props.currentUser.id && el.course.id === props.currentCourse.id)

  let newUserCourse = {
    course_id: props.currentCourse.id,
    user_id: props.currentUser.id,
    is_favorite: true,
    progress: 0,
  }

  const { t, i18n } = useTranslation();

  return (
  <div>
    <h4 className='course__label'>
      {props.currentCourse.label}
      {
        (!existed.length || !existed[0].is_favorite) &&
        <FormControlLabel style={{marginLeft: '35px'}} onClick={() => {
          !existed.length ?
          props.post(newUserCourse, 'user_courses', updateUserCourse) :
          props.put({ id: existed[0].id, user_course: { is_favorite: true, current_page: existed[0].current_page, progress: existed[0].progress  } }, 'user_courses', updateUserCourse);

          notify(`Курс добавлен в избранное`, toast.info)
        }}
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="add to favorite" />}
        />
      }
    </h4>
    <div>
    </div>
  </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    currentCourse: state.courses.currentCourse,
    userCourses: state.userCourses.userCourses
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter))
  })
)(CourseLabel);