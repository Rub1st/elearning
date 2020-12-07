import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createImpersonation } from '../../../../../main_redux/actions/impersonations'
import { postDataElement } from '../../../../../main_redux/actions/server_connections'
import { setImpersonationUser } from '../../../../../main_redux/actions/users'

const ImpersonationButton = (props) => {
  let {el} = props
  let newImpersonation = {
    manager_id: props.currentUser.id,
    common_id: el.user.id,
    start: new Date(),
    end: new Date(),
    organization_id: el.organization.id,
  }
  return(
    <>
    <Link style={{color: 'gray', marginLeft: '10px'}}
      onClick={() => {
        props.setImpersonationUser(el.user);
        props.post(newImpersonation, 'impersonations', createImpersonation);
      }}  to={`/user_id=${el.user.id}/home`}>
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
    setImpersonationUser: (user) => dispatch(setImpersonationUser(user)),
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
  })
  )(ImpersonationButton)