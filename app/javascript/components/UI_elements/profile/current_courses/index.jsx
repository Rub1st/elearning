import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { choose } from '../../../../main_redux/actions/courses'
import { getCurrentCourses } from '../../../../main_redux/actions/server_connections'
import { getsCurrentCourses } from '../../../../main_redux/actions/user_courses'
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar'
import CurrentCourse from './current_course'

const CurrentCourses = (props) => {
  console.log(props.userCourses)

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    props.set(getsCurrentCourses, currentPage);
  }, []);

  return(
    <div className='profile__course-field'>
      <div className="d-flex">
          <button className="arrow-button" disabled={currentPage <= 0} onClick={() => {
              setCurrentPage(currentPage - 1);
              props.set(getsCurrentCourses, currentPage - 1)
            }}>
            <ArrowBackIos/>
          </button>
          <ul className='profile__course-list'>
          {
            props.currentCourses.length ? props.currentCourses.map(el =>
            <li key={el.id} className='profile__course-item'>
             <CurrentCourse el={el}/>
            </li>) : <NoSearchResultSideBar/>
          }
          </ul>
        <button className="arrow-button" disabled={props.currentCourses.length !== 3} onClick={() => {
              setCurrentPage(currentPage + 1);
              props.set(getsCurrentCourses, currentPage + 1)
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
    userCourses: state.userCourses.userCourses,
    currentCourses: state.userCourses.currentCourses,
  }),
  dispatch => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
    set: (setter, currrentPage) => dispatch(getCurrentCourses(setter, currrentPage))
  })
)(CurrentCourses)