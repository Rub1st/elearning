import React from 'react'
import { connect } from 'react-redux'
import { choose } from '../../../../main_redux/actions/courses';
import DoneCourse from './done_course'
import './style.css'

const DoneCourses = (props) => {
  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            props.userCourses.filter(el => el.user.login === props.currentUser.login && el.progress === 100).map(el =>
            <li key={el.id} className='profile__course-item'>
              <DoneCourse el={el}/>
            </li>)
          }
        </ul>
    </div>

  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    userCourses: state.userCourses.userCourses,
  }),
  dispatch => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
  })
)(DoneCourses)