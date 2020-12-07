import React from 'react'
import { connect } from 'react-redux'
import './course_description.css'

const CourseDescription = (props) => {
  const {
    label,
    why_content,
    will_content } = props.currentCourse

  return(
          <div className='course__description'>
            <h5 className='description-label'>
              {`Why Learn ${label}?`}
            </h5>
            <div className='description-content'>
              {why_content}
            </div>
            <h5 className='description-label'>
              Take-Away Skills:
            </h5>
            <div className='description-content'>
              {will_content}
            </div>
          </div>
  )
}

export default connect(
  state => ({
      currentCourse: state.courses.currentCourse,
  })
)(CourseDescription);