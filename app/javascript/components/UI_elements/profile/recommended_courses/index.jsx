import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { choose, getCourses, getsRecommendedCourses } from '../../../../main_redux/actions/courses'
import { getMyCourses, getRecommendedCourses } from '../../../../main_redux/actions/server_connections'
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar'
import RecCourse from './rec_course'

const RecommendedCourses = (props) => {

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    props.set(getsRecommendedCourses, currentPage);
  }, []);

  // let filtered = props.courses
  //               .filter(el => el.course_status === 'ready' && el.approve_status === 'approved' && el.author.id !== props.currentUser.id &&
  //                             !props.userCourses.filter(e => e.course.id === el.id && e.user.id === props.currentUser.id).length &&
  //                             (el.access_type === 'opened' || (el.access_type === 'closed' && props.registered_members
  //                             .filter(e => e.organization.id === el.organization.id&& e.user.id === props.currentUser.id).length)))
  //                             .sort((a,b) => b.mark - a.mark)

  return(
    <div className='profile__course-field'>
      <div className="d-flex">
        {
          props.recommended_courses.length ?
          <button className="arrow-button" disabled={currentPage <= 0} onClick={() => {
            setCurrentPage(currentPage - 1);
            props.set(getsRecommendedCourses, currentPage - 1)
          }}>
          <ArrowBackIos/>
        </button> : null
        }
          <ul className='profile__course-list'>
          {
            props.recommended_courses.length ? props.recommended_courses.map(el =>
            <li key={el.id} className='profile__course-item'>
             <RecCourse el={el}/>
            </li>) : <NoSearchResultSideBar/>
          }
        </ul>
        {
          props.recommended_courses.length ?
          <button className="arrow-button" disabled={props.recommended_courses.length !== 3} onClick={() => {
            setCurrentPage(currentPage + 1);
            props.set(getsRecommendedCourses, currentPage + 1)
          }}>
            <ArrowForwardIos/>
          </button> : null
        }
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
    userCourses: state.userCourses.userCourses,
    currentCourse: state.courses.currentCourse,
    registered_members: state.registered_members.registered_members,
    recommended_courses: state.courses.recommended_courses,
  }),
  dispatch => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
    set: (setter, page) => dispatch(getRecommendedCourses(setter, page)),
  })
)(RecommendedCourses)