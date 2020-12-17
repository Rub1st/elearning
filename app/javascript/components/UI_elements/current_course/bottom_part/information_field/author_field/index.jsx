import React from 'react'
import { connect } from 'react-redux'
import CourseInformationTemplate from '../../../../../utils/course_information_template'
import './author_field.css'
import avatar from '../../../../../../photos/user_avatar.jpg'
import { useTranslation } from 'react-i18next'

const AuthorField = (props) => {
  const { t, i18n } = useTranslation();
  return(
      <CourseInformationTemplate label={props.author.login} header={t("CurrentCourse.7")}>
        <img className='course__author-avatar' src={avatar} alt='Akira'/>
      </CourseInformationTemplate>
  )
}

export default connect(
  state => ({
    author: state.courses.currentCourse.author,
})
)(AuthorField)