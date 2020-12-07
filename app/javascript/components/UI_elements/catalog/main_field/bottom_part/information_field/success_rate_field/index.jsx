import React from 'react'
import { connect } from 'react-redux'
import CourseInformationTemplate from '../../../../../../utils/course_information_template'

const SuccesRateField = (props) => {
  return(
      <CourseInformationTemplate label={'percents'} header={'success'}>
        <span>{props.success_rate}</span>
      </CourseInformationTemplate>
  )
}

export default connect(
  state => ({
    success_rate: state.courses.currentCourse.success_rate,
})
)(SuccesRateField)