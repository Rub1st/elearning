import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postDataElement } from '../../../../../../main_redux/actions/server_connections'
import { addUserCourse, updateUserCourse } from '../../../../../../main_redux/actions/user_courses'
import Button from '@material-ui/core/Button';
import './start_button.css'

const StartButton = (props) => {

  let existed = props.userCourses.filter(el => el.user.id === props.currentUser.id && el.course.id === props.currentCourse.id)

  let userCourse = {
    course: props.currentCourse,
    user: props.currentUser,
    is_favorite: false,
    mark: null,
    progress: 0,
    correct: 100,
    current_page: 1,
  }

  let userCourseDB = {
    course_id: props.currentCourse.id,
    user_id: props.currentUser.id,
  }

  return(
    <div className='course__start-button-position'>
        <Link to={`/course_id=${props.currentCourse.id}`}
          className={'course__start-link'}
          onClick={() => {
            !existed.length && props.addUserCourse(userCourse);
            !existed.length ? props.post( userCourseDB, 'user_courses', updateUserCourse)
            : props.addUserCourse(existed[0])
          }}>
                <Button className={'course__start-button'} variant="contained" color="primary">

          <p style={{fontSize: '30px', marginTop: '16px'}}>
            { !existed.length ?
              "Let's do it!" : existed[0].progress === 100 ? "Try again" : "Continue" }
          </p>
          </Button>

        </Link>
    </div>
  )
}

export default connect(
  state => ({
    currentCourse: state.courses.currentCourse,
    currentUser: state.users.currentUser,
    userCourses: state.userCourses.userCourses,
}),
  dispatch => ({
  post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
  addUserCourse: (currentUserCourse) => dispatch(addUserCourse(currentUserCourse))
})
)(StartButton);