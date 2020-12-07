import React from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../../photos/user_avatar.jpg'
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import { DateFormat } from '../../../utils/helpful_functions';

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

  return(
    <div className='home__position'>
      <div className='home__top-line'>
      <Avatar className={classes.large} alt={props.currentUser.login} src={avatar} />
        <div className='home__main-user-info'>
          <div className='home__login'>{props.currentUser.login}</div>
          <div className='home__main-info-item'>{props.currentUser.full_name}</div>
          <div className='home__main-info-item'>{DateFormat(props.currentUser.birthday).split(' ')[1]}</div>
          <div className='home__main-info-item'>{props.currentUser.email}</div>
        </div>
      </div>
      <div className='home__second-line'>
        <div className='home__secondary-user-info'>
          количество курсов: {props.courses.filter(el => el.author.id === props.currentUser.id).length}
        </div>
        <div className='home__secondary-user-info'>
          количество избранных курсов: {props.userCourses.filter(el => el.user.id === props.currentUser.id && el.is_favorite).length}
        </div>
        <div className='home__secondary-user-info'>
          количество сертификатов: {props.certificates.filter(el => el.user.id === props.currentUser.id).length}
        </div>
        <div className='home__secondary-user-info'>
          количество организаций: {props.organizations.filter(el => el.registered_members
            .filter(el => el.user.id === props.currentUser.id).length).length}
        </div>
        <div className='home__secondary-user-info'>
          количество комментариев: {props.comments.filter(el => el.author.id === props.currentUser.id).length}
        </div>
        <div className='home__secondary-user-info'>
          количество ответов: {props.comments.map(el => el.replies).flat().filter(el => el.author.id === props.currentUser.id).length}
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
    certificates: state.certificates.certificates,
  })
)(MainPage)