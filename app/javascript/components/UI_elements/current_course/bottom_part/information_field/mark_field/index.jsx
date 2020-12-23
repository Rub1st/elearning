import React from 'react'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import CourseInformationTemplate from '../../../../../utils/course_information_template'

const MarkField = (props) => {
  const { t, i18n } = useTranslation();
  return(
      <CourseInformationTemplate label={t("CurrentCourse.9")} header={t("CurrentCourse.8")}>
        <span>{props.mark == null ? '-' : props.mark}</span>
      </CourseInformationTemplate>
  )
}

export default connect(
  state => ({
    mark: state.courses.currentCourse.mark,
})
)(MarkField)