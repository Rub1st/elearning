import React, { useEffect } from 'react'
import SideBar from './sidebar'
import MainField from './main_field'
import { getData } from '../../../main_redux/actions/server_connections'
import { getComments } from '../../../main_redux/actions/comments'
import { getCourses } from '../../../main_redux/actions/courses'
import { getPages } from '../../../main_redux/actions/pages'
import { getTags } from '../../../main_redux/actions/tags'
import { getUserCourses } from '../../../main_redux/actions/user_courses'
import { getQuestions } from '../../../main_redux/actions/questions'
import { getTheories } from '../../../main_redux/actions/theories'
import './catalog.scss'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'

const Catalog = (props) => {

  useEffect(() => {
    props.set('courses', getCourses);
    props.set('comments', getComments);
    props.set('pages', getPages);
    props.set('tags', getTags);
    props.set('user_courses', getUserCourses);
    props.set('questions', getQuestions);
    props.set('theories', getTheories);
  }, []);

  return(
    <div className='catalog__position'>
      {
        !props.courses.length ?  <CircularProgress /> :
        <>
          <SideBar/>
          <MainField/>
        </>
      }
    </div>
  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Catalog)