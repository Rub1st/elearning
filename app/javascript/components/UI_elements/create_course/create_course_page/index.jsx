import { Paper } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next';
import CreateCourseForm from './create_course_form'
import './create_course_page.css'

const CreateCoursePage = () => {

  const { t, i18n } = useTranslation();

  return(
    <div className='create-course-page__window'>
      <div className='create-course-label'>
        { t('Course.1') }
      </div>
      <div className='create-course-page__field'>
        <div className='create-course-page__discription'>
          <Paper className='create-organization-description'>
            <h4>{ t('Course.2') }</h4>
            <p>{ t('Course.3') }</p>
            <h4>{ t('Course.4') }</h4>
            <p>{ t('Course.5') }</p>
            <h4>{ t('Course.6') }</h4>
            <p>{ t('Course.7') }</p>
            <h5>{ t('General.1') }</h5>
          </Paper>
        </div>
        <div className='create-course-page__create-form'>
          <CreateCourseForm/>
        </div>
      </div>
    </div>
  )
}

export default CreateCoursePage;