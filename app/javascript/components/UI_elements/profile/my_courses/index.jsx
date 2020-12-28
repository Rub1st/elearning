import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { choose, getCourses, setDraftCourse } from '../../../../main_redux/actions/courses'
import { setCurrentDraftPage } from '../../../../main_redux/actions/pages'
import { getMyCourses } from '../../../../main_redux/actions/server_connections'
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar'
import MyCourse from './my_course'
import './style.css'

const MyCourses = (props) => {

  useEffect(() => {
    props.set(getCourses);
  }, []);

  let filtered = props.courses.filter(el => el.author.login === props.currentUser.login)

  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            filtered.length ? filtered.map(el =>
            <li key={el.id} className='profile__course-item'>
              <MyCourse el={el} newEl={{ id: el.id, course: { approve_status: 1}}}/>
            </li>) : <NoSearchResultSideBar/>
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
    set: (setter) => dispatch(getMyCourses(setter)),
    setDraftCourse: (courseId) => dispatch(setDraftCourse(courseId)),
    setCurrentDraftPage: (pageId) => dispatch(setCurrentDraftPage(pageId)),
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
  })
)(MyCourses)