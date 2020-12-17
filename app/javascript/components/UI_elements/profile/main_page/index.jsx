import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../../photos/user_avatar.jpg'
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import { DateFormat } from '../../../utils/helpful_functions';
import { getUserCourses } from '../../../../main_redux/actions/user_courses';
import { getData } from '../../../../main_redux/actions/server_connections';
import { getOrganizations } from '../../../../main_redux/actions/organizations';
import { getUsers } from '../../../../main_redux/actions/users';
import { getComments } from '../../../../main_redux/actions/comments';
import { getCertificates } from '../../../../main_redux/actions/certificates';
import { getRegisteredMembers } from '../../../../main_redux/actions/registered_members';
import { getUnregisteredMembers } from '../../../../main_redux/actions/unregistered_members';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const MainPage = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.set('user_courses', getUserCourses);
    props.set('organizations', getOrganizations);
    props.set('users', getUsers);
    props.set('certificates', getCertificates);
  }, []);

  const { t, i18n } = useTranslation();

  return(
    <div className='home__position'>
      <div className='home__top-line'>
      <Avatar className={classes.large} alt={props.currentUser.login} src={avatar} />
        <div className='home__main-user-info'>
          <div className='home__login'>{props.currentUser.login}</div>
          <div className='home__main-info-item'>{props.currentUser.full_name}</div>
          <div className='home__main-info-item'>{props.currentUser.email}</div>
        </div>
      </div>
      <div className='home__second-line'>
        <div className='home__secondary-user-info'>
          {t('Profile.10')} {props.courses.filter(el => el.author.id === props.currentUser.id).length}
        </div>
        <div className='home__secondary-user-info'>
          {t('Profile.11')} {props.userCourses.filter(el => el.user.id === props.currentUser.id && el.is_favorite).length}
        </div>
        <div className='home__secondary-user-info'>
          {t('Profile.12')} {props.certificates.filter(el => el.user.id === props.currentUser.id).length}
        </div>
        <div className='home__secondary-user-info'>
          {t('Profile.13')} {props.organizations.filter(el => el.registered_members
            .filter(el => el.user.id === props.currentUser.id).length).length}
        </div>
        <div className='home__secondary-user-info'>
          {t('Profile.14')} {props.comments.filter(el => el.author.id === props.currentUser.id).length}
        </div>
        <div className='home__secondary-user-info'>
          {t('Profile.15')} {props.comments.map(el => el.replies).flat().filter(el => el.author.id === props.currentUser.id).length}
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
    comments: state.comments.comments,
    organizations: state.organizations.organizations,
    userCourses: state.userCourses.userCourses,
    users: state.users.users,
    certificates: state.certificates.certificates,
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(MainPage)