import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { choose, getCourses } from '../../../../main_redux/actions/courses'
import { getMyCourses, getRecommendedCourses } from '../../../../main_redux/actions/server_connections'
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar'
import RecCourse from './rec_course'

const RecommendedCourses = (props) => {

  useEffect(() => {
    props.set(getCourses);
  }, []);

  let filtered = props.courses
                .filter(el => el.course_status === 'ready' && el.approve_status === 'approved' && el.author.id !== props.currentUser.id &&
                              !props.userCourses.filter(e => e.course.id === el.id && e.user.id === props.currentUser.id).length &&
                              (el.access_type === 'opened' || (el.access_type === 'closed' && props.registered_members
                              .filter(e => e.organization.id === el.organization.id&& e.user.id === props.currentUser.id).length)))
                              .sort((a,b) => b.mark - a.mark)

  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            filtered.length ? filtered.slice(0,5).map(el =>
            <li key={el.id} className='profile__course-item'>
             <RecCourse el={el}/>
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
    userCourses: state.userCourses.userCourses,
    currentCourse: state.courses.currentCourse,
    registered_members: state.registered_members.registered_members,
  }),
  dispatch => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
    set: (setter) => dispatch(getRecommendedCourses(setter)),
  })
)(RecommendedCourses)