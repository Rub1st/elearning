import React from 'react'
import LeftBar from './left_bar'
import ProfileBar from './profile_bar'
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './wrapper.css'
import { connect } from 'react-redux';
import { updateInput } from '../../../main_redux/actions/courses';
import '../style/utils.css'
import { getData, logout } from '../../../main_redux/actions/server_connections';
import { setImpersonationUser } from '../../../main_redux/actions/users';
import { BackspaceOutlined, DirectionsRunOutlined } from '@material-ui/icons';
import UpdateImpersonationButton from './impersonation_button'
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 10,
    marginRight: 30,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Wrapper = (props) => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          E-learning
        </Typography>
        <LeftBar/>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => props.updateInput(e.target.value)}
              value={props.searchInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
              <AccountCircle />
          </div>
         <ProfileBar/>
         {
           props.impersonation ?
           <UpdateImpersonationButton el={props.impersonationUser}>
              <BackspaceOutlined/>
           </UpdateImpersonationButton> :
           <IconButton onClick={() => props.logout()}>
             <DirectionsRunOutlined/>
           </IconButton>
         }
      </Toolbar>
    </AppBar>
    {props.children}
  </div>
  )
}

export default connect(
  state => ({
      searchInput: state.courses.searchInput,
      currentUser: state.users.currentUser,
      impersonation: state.users.impersonation,
      impersonationUser: state.users.impersonationUser,
  }),
  dispatch => ({
    updateInput: (newValue) => dispatch(updateInput(newValue)),
    set: (path, setter) => dispatch(getData(path, setter)),
    setImpersonationUser: (user) => dispatch(setImpersonationUser(user)),
    logout: () => dispatch(logout()),
  })
)(Wrapper)
