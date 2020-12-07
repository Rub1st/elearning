import React from 'react'
import { Link } from 'react-router-dom'
import './profile_bar.css'
import '../../style/utils.css'
import { connect } from 'react-redux'
import { getData } from '../../../../main_redux/actions/server_connections'
import { getUsers } from '../../../../main_redux/actions/users'
import { getCourses } from '../../../../main_redux/actions/courses'
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

const ProfileBar = (props) => {

  return(
    <div className='profile-bar'>
      <Link to={`/user_id=${props.currentUser.id}/home`} className='link'>
        <span className='profile-label'>
          {props.currentUser.login}
        </span>
      </Link>
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
)(ProfileBar);