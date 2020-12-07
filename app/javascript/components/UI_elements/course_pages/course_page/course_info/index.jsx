import React from 'react'
import { connect } from 'react-redux'
import './course_info.css'

const CourseInfo = (props) => {
  return(
    <div className='course-page__course-info'>
      <div>course: {props.currentUserCourse.course.label}</div>
      <div>author: {props.currentCourse.author.login}</div>
  </div>
  )
}

export default connect(
  state => ({
    currentCourse: state.courses.currentCourse,
    currentUserCourse: state.userCourses.currentUserCourse,
})
)(CourseInfo)