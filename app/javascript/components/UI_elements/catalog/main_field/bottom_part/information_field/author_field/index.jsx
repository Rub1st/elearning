import React from 'react'
import { connect } from 'react-redux'
import CourseInformationTemplate from '../../../../../../utils/course_information_template'
import './author_field.css'
import avatar from '../../../../../../../photos/user_avatar.jpg'

const AuthorField = (props) => {
  return(
      <CourseInformationTemplate label={props.author.login} header={'creator'}>
        <img className='course__author-avatar' src={avatar} alt='Akira'/>
      </CourseInformationTemplate>
  )
}

export default connect(
  state => ({
    author: state.courses.currentCourse.author,
})
)(AuthorField)