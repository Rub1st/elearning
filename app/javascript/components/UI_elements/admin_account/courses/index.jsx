import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getData, updateDataElement } from '../../../../main_redux/actions/server_connections'
import EntitiesList from '../entities_list'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.css'
import CourseItem from './course_item'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field';
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field';
import {getCourses} from '../../../../main_redux/actions/courses'
import {getComments} from '../../../../main_redux/actions/comments'
import {getPages} from '../../../../main_redux/actions/pages'
import {getTags} from '../../../../main_redux/actions/tags'
import { getImpersonations } from '../../../../main_redux/actions/impersonations';
import { getUsers } from '../../../../main_redux/actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1550
  },
}));

let coursesFilter = (courses, status, searchQuery) => courses.filter(el => el.approve_status === status)
.filter(e => e.label.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery.length)

const Courses = (props) => {

  const classes = useStyles();

  useEffect(() => {
    props.set('courses', getCourses);
    props.set('comments', getComments);
    props.set('pages', getPages);
    props.set('tags', getTags);
    props.set('impersonations', getImpersonations);
    props.set('users', getUsers);
  }, []);

  const [value, setValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  return(
    <div>
      <EntitiesList label={'Courses'} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Pending Courses" className='button' onClick={() => setValue(0)}/>
          <Tab label="Approved Courses" className='button' onClick={() => setValue(1)}/>
          <Tab label="Rejected Courses" className='button' onClick={() => setValue(2)}/>
        </Tabs>
      </AppBar>
    </div>
    <div className='field'>
    {
      value === 0 ?
      <div>
        {
          coursesFilter(props.courses, 'pending', searchQuery).length ?
          <ul className='admin-course-list'>
            {
              coursesFilter(props.courses, 'pending', searchQuery).map(el =>
              <li key={el.key} className='admin-course-list-position'>
                <CourseItem el={el} choice={value} newEl2={{ id: el.id, course: {approve_status: 2}}} newEl={{ id: el.id, course: {approve_status: 1}}}/>
              </li>)
            }
          </ul> : !props.courses.filter(e => e.approve_status === 'pending').length ?
          <AdminModeEmptyField label={'курсов'}/> :
          <NoSearchResultsField label={'курсов'}/>
        }
    </div> :
      value === 1 ?
      <div>
        {
          coursesFilter(props.courses, 'approved', searchQuery).length ?
          <ul className='admin-course-list'>
            {
              coursesFilter(props.courses, 'approved', searchQuery).map(el =>
              <li key={el.key} className='admin-course-list-position'>
                <CourseItem el={el} choice={value} newEl={{ id: el.id, course: {approve_status: 1}}}/>
              </li>)
            }
          </ul> : !props.courses.filter(e => e.approve_status === 'approved').length ?
          <AdminModeEmptyField label={'курсов'}/> :
          <NoSearchResultsField label={'курсов'}/>
        }
      </div> :
      <div>
        {
          coursesFilter(props.courses, 'rejected', searchQuery).length ?
          <ul className='admin-course-list'>
            {
              coursesFilter(props.courses, 'rejected', searchQuery).map(el =>
              <li key={el.key} className='admin-course-list-position'>
                <CourseItem el={el} choice={value} newEl={{ id: el.id, course: {approve_status: 2}}}/>
              </li>)
            }
          </ul> : !props.courses.filter(e => e.approve_status === 'rejected').length ?
          <AdminModeEmptyField label={'курсов'}/> :
          <NoSearchResultsField label={'курсов'}/>
        }
      </div>
  }
    </div>
    </EntitiesList>
    </div>

  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
  }),
  dispatch => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Courses)