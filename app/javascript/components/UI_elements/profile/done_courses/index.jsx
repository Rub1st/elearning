import React from 'react'
import { connect } from 'react-redux'
import { choose } from '../../../../main_redux/actions/courses';
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar';
import DoneCourse from './done_course'
import './style.css'

const DoneCourses = (props) => {

  let filtered = props.userCourses.filter(el => el.user.login === props.currentUser.login && el.progress === 100)

  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            filtered.length ? filtered.map(el =>
            <li key={el.id} className='profile__course-item'>
              <DoneCourse el={el}/>
            </li>) : <NoSearchResultSideBar/>
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