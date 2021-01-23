import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, fade } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import './style.css'
import { Search } from '@material-ui/icons';
import { Badge, IconButton, InputBase } from '@material-ui/core';
import { logout, searchData } from '../../../../main_redux/actions/server_connections';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    width: 220,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: 30,
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const EntitiesList = (props) => {
  const classes = useStyles();

  const entities = [
    { id: 0, name: 'Courses', to: '/courses', badgeContent: props.courses.filter(el => el.approve_status === 'pending').length },
    { id: 1, name: 'Users', to: '/users', badgeContent: props.users.filter(el => el.user_status === 'pending').length },
    { id: 2, name: 'Organizations', to: '/organizations', badgeContent: props.organizations.filter(el => el.approve_status === 'pending').length},
    { id: 3, name: 'Tags', to: '/tags', badgeContent: 0 },
    { id: 4, name: 'Comments', to: '/comments', badgeContent: 0 },
    { id: 5, name: 'Impersonations', to: '/impersonations', badgeContent: 0 },
  ]

  let {searchQuery, path, setter} = props

  const enter_listener = event => {
    if (event.key === 'Enter') {
      props.search(searchQuery , path, setter)
    }
  }

  return(
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className='inside-header-position'>
          <Typography variant="h6" noWrap>
            E-learning
          </Typography>
          <Typography variant="h6" noWrap>
            {props.label}
          </Typography>
          <div className='d-flex'>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={enter_listener}
                onChange={(e) => props.setSearchQuery(e.target.value)}
                value={searchQuery}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Link>
              <IconButton  onClick={() => props.logout()}>
                <DirectionsRunOutlinedIcon/>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className='general-row'>
        <div className='list-position'>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
        {
          entities.map(el =>
          <Link to={`/catalog${el.to}`} key={el.id}>
            <Badge style={{marginTop: '35px'}} color="secondary" badgeContent={el.badgeContent}>
              <Tab label={el.name}/>
            </Badge>
            </Link>)
        }
  </Tabs>
        </div>
        <div className='field-position'>
          {
              !props.connect_status ?
              <CircularProgress/> :
              props.children
          }
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
    currentUser: state.users.currentUser,
    organizations: state.organizations.organizations,
    users: state.users.users,
    impersonations: state.impersonations.impersonations,
    comments: state.comments.comments,
    connect_status: state.courses.connect_status,
  }),
  dispatch => ({
    logout: () => dispatch(logout()),
    search: (obj, path, setter) => dispatch(searchData(obj, path, setter)),
  })
)(EntitiesList)