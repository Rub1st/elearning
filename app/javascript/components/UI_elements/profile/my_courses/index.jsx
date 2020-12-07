import React from 'react'
import { connect } from 'react-redux'
import { choose, setDraftCourse } from '../../../../main_redux/actions/courses'
import { setCurrentDraftPage } from '../../../../main_redux/actions/pages'
import MyCourse from './my_course'
import './style.css'

const MyCourses = (props) => {
  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            props.courses.filter(el => el.author.login === props.currentUser.login).map(el =>
            <li key={el.id} className='profile__course-item'>
              <MyCourse el={el} newEl={{ id: el.id, course: { approve_status: 1}}}/>
            </li>)
          }
        </ul>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
    pages: state.pages.pages,
  }),
  dispatch => ({
    setDraftCourse: (courseId) => dispatch(setDraftCourse(courseId)),
    setCurrentDraftPage: (pageId) => dispatch(setCurrentDraftPage(pageId)),
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
  })
)(MyCourses)