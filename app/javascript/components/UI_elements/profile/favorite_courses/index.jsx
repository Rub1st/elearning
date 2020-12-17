import React from 'react'
import { connect } from 'react-redux'
import { choose } from '../../../../main_redux/actions/courses';
import FavoriteCourse from './favorite_course'

const FavoriteCourses = (props) => {
  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            props.userCourses.filter(el => el.user.login === props.currentUser.login && el.is_favorite).map(el =>
            <li key={el.id} className='profile__course-item'>
              <FavoriteCourse el={el} newEl={{ id: el.id, user_course: { is_favorite: false, current_page: el.current_page }}}/>
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
)(FavoriteCourses)