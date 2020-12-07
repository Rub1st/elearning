import React from 'react'
import { connect } from 'react-redux'
import CourseInformationTemplate from '../../../../../../utils/course_information_template'

const UsesCountField = (props) => {
  return(
     <CourseInformationTemplate label={'people'} header={'usages'}>
        <span>{props.uses_count}</span>
      </CourseInformationTemplate>
  )
}

export default connect(
  state => ({
    uses_count: state.courses.currentCourse.uses_count,
})
)(UsesCountField)