import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { choose, getCourses, getsMyCourses, setDraftCourse } from '../../../../main_redux/actions/courses'
import { setCurrentDraftPage } from '../../../../main_redux/actions/pages'
import { getMyCourses } from '../../../../main_redux/actions/server_connections'
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar'
import MyCourse from './my_course'
import './style.css'

const MyCourses = (props) => {

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    props.set(getsMyCourses, currentPage);
  }, []);

  console.log(props.my_courses)

  return(
    <div className='profile__course-field'>
      <div className="d-flex">
          <button className="arrow-button" disabled={currentPage <= 0} onClick={() => {
              setCurrentPage(currentPage - 1);
              props.set(getsMyCourses, currentPage - 1)
            }}>
            <ArrowBackIos/>
          </button>
          <ul className='profile__course-list'>
          {
            props.my_courses.length ? props.my_courses.map(el =>
            <li key={el.id} className='profile__course-item'>
              <MyCourse el={el} newEl={{ id: el.id, course: { approve_status: 1}}}/>
            </li>) : <NoSearchResultSideBar/>
          }
        </ul>
        <button className="arrow-button" disabled={props.my_courses.length !== 3} onClick={() => {
              setCurrentPage(currentPage + 1);
              props.set(getsMyCourses, currentPage + 1)
            }}>
              <ArrowForwardIos/>
            </button>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
    pages: state.pages.pages,
    my_courses: state.courses.my_courses,
  }),
  dispatch => ({
    set: (setter, path) => dispatch(getMyCourses(setter, path)),
    setDraftCourse: (courseId) => dispatch(setDraftCourse(courseId)),
    setCurrentDraftPage: (pageId) => dispatch(setCurrentDraftPage(pageId)),
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
  })
)(MyCourses)