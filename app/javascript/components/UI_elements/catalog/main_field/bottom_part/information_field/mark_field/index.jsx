import React from 'react'
import { connect } from 'react-redux'
import CourseInformationTemplate from '../../../../../../utils/course_information_template'

const MarkField = (props) => {
  return(
      <CourseInformationTemplate label={'points'} header={'mark'}>
        <span>{props.mark}</span>
      </CourseInformationTemplate>
  )
}

export default connect(
  state => ({
    mark: state.courses.currentCourse.mark,
})
)(MarkField)