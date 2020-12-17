import React from 'react'
import { Link } from 'react-router-dom'
import './left_bar.css'
import '../../style/utils.css'
import { connect } from 'react-redux'
import { getData } from '../../../../main_redux/actions/server_connections'
import { getUsers } from '../../../../main_redux/actions/users'
import { getCertificates } from '../../../../main_redux/actions/certificates'
import { getComments } from '../../../../main_redux/actions/comments'
import { getOrganizations } from '../../../../main_redux/actions/organizations'
import { getPages } from '../../../../main_redux/actions/pages'
import { getTags } from '../../../../main_redux/actions/tags'
import { getUserAnswers } from '../../../../main_redux/actions/user_answers'
import { getUserCourses } from '../../../../main_redux/actions/user_courses'
import { getQuestions } from '../../../../main_redux/actions/questions'
import { getTheories } from '../../../../main_redux/actions/theories'
import { getRegisteredMembers } from '../../../../main_redux/actions/registered_members'
import { getUnregisteredMembers } from '../../../../main_redux/actions/unregistered_members'
import { getImpersonations } from '../../../../main_redux/actions/impersonations'
import { createReport } from '../../../../main_redux/actions/reports'
import { useTranslation } from 'react-i18next'


const LeftBar = (props) => {

  const { t, i18n } = useTranslation();

  const items = [
    {id:0, label: 'Catalog.1', link:'/'},
    {id:1, label: 'Course.1', link:'/create_course'},
    {id:2, label: 'Organization.1', link:'/create_organization'}
  ]

  return(
    <div className='left_bar_position'>
      {
        items.map(el =>
        <Link to={el.link} className='link_position link' key={el.id}>
          {t(el.label)}
        </Link>)
      }
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(LeftBar);