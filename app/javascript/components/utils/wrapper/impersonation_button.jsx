import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateImpersonation } from '../../../main_redux/actions/impersonations'
import { updateDataElement } from '../../../main_redux/actions/server_connections'
import { setImpersonationUser } from '../../../main_redux/actions/users'

const UpdateImpersonationButton = (props) => {
  let {el} = props
  let updatedImpersonation = {
    id: props.currentImpersonation.id,
    impersonation: {
      end: new Date(),
    }
  }
  return(
    <>
    <Link style={{color: 'gray', marginLeft: '10px'}}
      onClick={() => {
        props.setImpersonationUser(el);
        props.put(updatedImpersonation, 'impersonations', updateImpersonation);
      }}  to={`/user_id=${el.id}/home`}>
        {props.children}
    </Link>
    </>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    pages: state.pages.pages,
    currentImpersonation: state.impersonations.currentImpersonation,
  }),
  dispatch => ({
    setImpersonationUser: (user) => dispatch(setImpersonationUser(user)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
  )(UpdateImpersonationButton)