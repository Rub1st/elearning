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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SideBar = (props) => {
  const classes = useStyles();

  let filtered_courses = props.courses.filter((el) => searchFilter(el, props.searchInput) && el.course_status === 'ready' && el.approve_status === 'approved')
  return(
    <div className={classes.root}>
      {
        filtered_courses.length ?
        <ul>
        {
           filtered_courses.map(el =>
             (<ListItem button key={el.id} onClick={() => props.changeCourse(el.id)}>
               <ListItemText primary={el.label}/>
             </ListItem>))
        }
      </ul> : !props.courses.filter((el) => el.course_status === 'ready' && el.approve_status === 'approved').length ?
      <SideBarEmptyField/> : <NoSearchResultSideBar/>
      }

    </div>
  )
}

export default connect(
  state => ({
      courses: state.courses.courses,
      searchInput: state.courses.searchInput,
  }),
  dispatch => ({
    changeCourse: (newID) => dispatch(choose(newID))
  })
)(SideBar);