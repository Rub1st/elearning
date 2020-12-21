import React from 'react'
import './sidebar.css'
import { connect } from "react-redux";
import { choose } from '../../../../main_redux/actions/courses';
import { searchFilter } from '../../../utils/helpful_functions';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SideBarEmptyField from '../../../utils/empty_fields/sidebar_empty_field';
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar';
import { Link } from 'react-router-dom'
import RecCourse from '../../profile/recommended_courses/rec_course';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CourseList = (props) => {
  const classes = useStyles();
  let filtered_courses = props.courses.filter((el) => el.course_status === 'ready' && el.approve_status === 'approved')
  return(
    <div className={classes.root}>
      {
        filtered_courses.length ?
        <ul className="course_list">
        {
           filtered_courses.map(el =>
            <li key={el.id} className={'course_list-item'}>
              <RecCourse el={el}/>
            </li>
              )
        }
      </ul> : <NoSearchResultSideBar/>
      }

    </div>
  )
}

export default connect(
  state => ({
      courses: state.courses.courses,
      searchInput: state.courses.searchInput,
      currentCourse: state.courses.currentCourse,
  }),
  dispatch => ({
    changeCourse: (newID) => dispatch(choose(newID))
  })
)(CourseList);