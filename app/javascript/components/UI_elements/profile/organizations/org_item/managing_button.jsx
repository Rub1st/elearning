import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { choose } from '../../../../../main_redux/actions/courses'
import { setCurrentOrganization } from '../../../../../main_redux/actions/organizations'
import { destroyDataElement } from '../../../../../main_redux/actions/server_connections'

const ManagingButton = (props) => {
  let {el} = props
  return(
    <>
    <Link style={{color: 'gray', marginLeft: '10px'}} to={`/user_id=${props.currentUser.id}/manage_organization_id=${el.id}`}
      onClick={() => props.setCurrentOrganization(el.id)}>
        {props.children}
    </Link>
    </>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    pages: state.pages.pages,
  }),
  dispatch => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    setCurrentCourse: (id) => dispatch(choose(id)),
    setCurrentOrganization: (id) => dispatch(setCurrentOrganization(id)),
  })
  )(ManagingButton)