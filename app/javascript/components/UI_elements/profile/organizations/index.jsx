import React from 'react'
import { connect } from 'react-redux'
import { setCurrentOrganization } from '../../../../main_redux/actions/organizations';
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar';
import OrgItem from './org_item'

const Organization = (props) => {

  let filtered = props.organizations.filter(el => el.registered_members.filter(el => el.user.id === props.currentUser.id).length)

  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            filtered.length ? filtered.map(el =>
              <li key={el.id} className='profile__course-item'>
              <OrgItem el={el} newEl={{ id: el.id, organization: {approve_status: 1, name: el.name, description: el.description}}}/>
            </li>
            ) : <NoSearchResultSideBar entity={'организаций'}/>
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