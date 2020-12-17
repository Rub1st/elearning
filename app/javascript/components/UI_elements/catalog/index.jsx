import React, { useEffect } from 'react'
import CourseList from './course_list'
import { getData } from '../../../main_redux/actions/server_connections'
import { getCourses } from '../../../main_redux/actions/courses'
import { getTags } from '../../../main_redux/actions/tags'
import './catalog.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import { getUsers } from '../../../main_redux/actions/users'
import { getOrganizations } from '../../../main_redux/actions/organizations'
import { getRegisteredMembers } from '../../../main_redux/actions/registered_members'
import { getUnregisteredMembers } from '../../../main_redux/actions/unregistered_members'
import { getUserCourses } from '../../../main_redux/actions/user_courses'

const Catalog = (props) => {

  useEffect(() => {
    props.set('courses', getCourses);
    props.set('tags', getTags);
    props.set('user_courses', getUserCourses);
    props.set('users', getUsers);
    props.set('organizations', getOrganizations);
  }, []);

  console.log(props.organizations)

  return(
    <div className='catalog__position'>
      {
        !props.connect_status ?  <CircularProgress /> :
        <div className="catalog__list">
          <CourseList/>
        </div>
      }
    </div>
  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
    connect_status: state.courses.connect_status,
    organizations: state.organizations.organizations,
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Catalog)