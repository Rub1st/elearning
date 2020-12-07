import React from 'react'
import { connect } from 'react-redux';
import './style.css'
import Courses from './courses'

const AdminAccount = (props) => {
  return(
    <div className='admin-window'>
            <Courses/>
    </div>
  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
    currentUser: state.users.currentUser,
  })
)(AdminAccount)
