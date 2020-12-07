import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import './style.css'
import { getUsers } from '../../../../main_redux/actions/users';
import { getCourses } from '../../../../main_redux/actions/courses';
import { getCertificates } from '../../../../main_redux/actions/certificates';
import { getComments } from '../../../../main_redux/actions/comments';
import { getOrganizations } from '../../../../main_redux/actions/organizations';
import { getPages } from '../../../../main_redux/actions/pages';
import { getTags } from '../../../../main_redux/actions/tags';
import { getUserAnswers } from '../../../../main_redux/actions/user_answers';
import { getUserCourses } from '../../../../main_redux/actions/user_courses';
import { getQuestions } from '../../../../main_redux/actions/questions';
import { getTheories } from '../../../../main_redux/actions/theories';
import { getRegisteredMembers } from '../../../../main_redux/actions/registered_members';
import { getUnregisteredMembers } from '../../../../main_redux/actions/unregistered_members';
import { getImpersonations } from '../../../../main_redux/actions/impersonations';
import { getData } from '../../../../main_redux/actions/server_connections';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    height: 400,
    width: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const elements = [
  { id: 0, label: 'home', to: '/home'},
  { id: 1, label: 'my courses', to: '/my_courses'},
  { id: 2, label: 'done courses', to: '/done_courses'},
  { id: 3, label: 'current courses', to: '/current_courses'},
  { id: 4, label: 'favorite courses', to: '/favorite_courses'},
  { id: 5, label: 'recommended courses', to: '/recomended_courses'},
  { id: 6, label: 'organizations', to: '/organizations'},
  { id: 7, label: 'certificates', to: '/certificates'},
  { id: 8, label: 'settings', to: '/settings'},
]

const SideBarProfile = (props) => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <ul>
        {
          elements.map(el =>
            <Link className={'profile__sidebar-item'} key={el.id} to={`/user_id=${props.currentUser.id}${el.to}`}>
              <ListItem button>
                <ListItemText primary={el.label}/>
              </ListItem>
            </Link>
            )
        }
      </ul>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(SideBarProfile);