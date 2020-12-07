import React from 'react'
import { connect } from 'react-redux'
import { setCurrentOrganization } from '../../../../main_redux/actions/organizations';
import OrgItem from './org_item'

const Organization = (props) => {
  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            props.organizations.filter(el => el.registered_members.filter(el => el.user.id === props.currentUser.id).length).map(el =>
              <li key={el.id} className='profile__course-item'>
              <OrgItem el={el} newEl={{ id: el.id, organization: {approve_status: 1}}}/>
            </li>
            )
          }
        </ul>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
    registered_members: state.registered_members.registered_members,
    organizations: state.organizations.organizations,
  }),
  dispatch => ({
    setCurrentOrganization: (organizationId) => dispatch(setCurrentOrganization(organizationId))
  })
)(Organization)