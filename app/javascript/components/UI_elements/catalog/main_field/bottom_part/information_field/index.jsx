import React from 'react'
import AuthorField from './author_field'
import MarkField from './mark_field'
import UsesCountField from './uses_count_field'
import SuccessRateField from './success_rate_field'
import './information_field.css'

const InformationField = () => {
  return(
    <div className='course__information-page'>
      <AuthorField/>
      <MarkField/>
      <UsesCountField/>
      <SuccessRateField/>
    </div>
  )
}

export default InformationField