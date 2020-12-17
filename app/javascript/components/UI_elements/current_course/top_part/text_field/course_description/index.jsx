import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import './course_description.css'

const CourseDescription = (props) => {
  const {
    label,
    why_content,
    will_content } = props.currentCourse

    const { t, i18n } = useTranslation();

  return(
          <div className='course__description'>
            <h5 className='description-label'>
              {t("CurrentCourse.1")}
            </h5>
            <div className='description-content'>
              {why_content}
            </div>
            <h5 className='description-label'>
              {t("CurrentCourse.2")}
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



