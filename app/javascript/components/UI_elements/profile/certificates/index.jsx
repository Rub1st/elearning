import React from 'react'
import { connect } from 'react-redux'

const Certificates = (props) => {
  return(
    <div>
        <div>{props.currentUser.login + ' certificates'}</div>
        <ul>
          {
            props.certificates.filter(el => el.user.id === props.currentUser.id).map(el =>
              <li key={el.id}>
                {el.course.label}
              </li>)
          }
        </ul>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    certificates: state.certificates.certificates,
  })
)(Certificates)