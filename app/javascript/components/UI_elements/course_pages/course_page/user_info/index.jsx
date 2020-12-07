import React from 'react'
import { connect } from 'react-redux'
import './user_info.css'

const UserInfo = (props) => {
  console.log(props.currentUserCourse.correct)
  return(
    <div className='course-page__user-info'>
      <div>Progress: {props.currentUserCourse.progress === 100 ? 0 : props.currentUserCourse.progress}%</div>
      <div>Correct: {props.currentUserCourse.correct === null ? 0 : props.currentUserCourse.correct}%</div>
    </div>
  )
}

export default connect(
  state => ({
    currentUserCourse: state.userCourses.currentUserCourse,
})
)(UserInfo);