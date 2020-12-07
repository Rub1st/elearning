import React from 'react'
import { connect } from 'react-redux'
import { choose } from '../../../../main_redux/actions/courses'
import RecCourse from './rec_course'

const RecommendedCourses = (props) => {
  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            props.courses
            .filter(el => el.course_status === 'ready' && el.approve_status === 'approved' && el.author.id !== props.currentUser.id &&
                          !props.userCourses.filter(e => e.course.id === el.id && e.user.id === props.currentUser.id).length &&
                          (el.access_type === 'opened' || (el.access_type === 'closed' && props.registered_members
                          .filter(e => e.organization.id === el.organization.id&& e.user.id === props.currentUser.id).length)))
                          .sort((a,b) => b.mark - a.mark).slice(0,5).map(el =>
            <li key={el.id} className='profile__course-item'>
             <RecCourse el={el}/>
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
    userCourses: state.userCourses.userCourses,
    registered_members: state.registered_members.registered_members,
  }),
  dispatch => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
  })
)(RecommendedCourses)