import React from 'react'
import CourseDescription from './course_description'
import CourseLabel from './course_label'
import CourseTags from './course_tags'
import './text_field.css'

const TextField = () => {
  return(
        <div className='course__text-field'>
          <CourseLabel/>
          <CourseDescription/>
          <CourseTags/>
        </div>
  )
}

export default TextField