import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateOrganization } from '../../../../../main_redux/actions/organizations';
import { createRegisteredMember, dropRegisteredMember } from '../../../../../main_redux/actions/registered_members';
import { destroyDataElement, postDataElement, updateDataElement } from '../../../../../main_redux/actions/server_connections'
import { createUnregisteredMember, dropUnregisteredMember } from '../../../../../main_redux/actions/unregistered_members';
import './style.css'
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemText, MenuItem, Paper, Select } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import CancelIcon from '@material-ui/icons/Cancel';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';
import ImpersonationButton from './impersonation_button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  approve: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    marginTop: 30,
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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        borderBottom: '1px solid gray',
      },
    },
  },
}));

const OrganizationManaging = (props) => {

  const [user, setUser] = useState(1);
  const [isManagerRegistered, setIsManagerRegistered] = useState(false);

  const [isManagerUnregistered, setIsManagerUnregistered] = useState(false);
  const [email, setEmail] = useState('');

  const [name, setName] = useState(props.currentOrganization.name);
  const [description, setDescription] = useState(props.currentOrganization.description)

  const [regMemberFilter, setRegMemberFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [unregMemberFilter, setUnregMemberFilter] = useState('')

  let newRegistered = {
    organization_id: props.currentOrganization.id,
    user_id: user,
    member_role: isManagerRegistered ? 0 : 1,
  }

  let newUnregistered = {
    organization_id: props.currentOrganization.id,
    email: email,
    code: parseInt(Math.random() * (99999999 - 10000000) + 10000000),
    member_role: isManagerUnregistered ? 0 : 1,
  }

  const classes = useStyles();

  let updatedOrganization = {
    id: props.currentOrganization.id,
    organization: {
      name: name,
      description: description,
      approve_status: 0,
    }
  }

  return(
    <div className='man_org-window'>
      <div className='man_org-label'>Управление организацией {props.currentOrganization.name}</div>
      <div className='man_org-field'>
        <Paper className='man_row-item'>
          <div className='man_row-title'>изменение информации</div>
            <TextField  style={{marginTop: '20px', width: '80%'}} variant="outlined" label='Название' value={name} onChange={(e) => setName(e.target.value)}/>
            <TextField
              style={{marginTop: '20px', width: '80%'}}
              label='Описание'
              multiline
              rows={10}
              value={description} onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
            <IconButton
              style={{marginTop: '20px', marginLeft: '35px'}}
              onClick={() => props.put(updatedOrganization, 'organizations', updateOrganization)}
             >
              <CheckCircleOutlineIcon className={classes.approve}/>
            </IconButton>
        </Paper>
        <Paper className='man_row-item'>
          <div className='man_row-title'>зарегистрированные пользователи</div>
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
                onChange={(e) => setRegMemberFilter(e.target.value)}
                value={regMemberFilter}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <ul style={{width: '90%', height: '200px'}} className='choose-managers-list'>
            {
              props.registered_members.filter(el => el.organization.id === props.currentOrganization.id && el.user.id !== props.currentUser.id &&
                  (el.user.login.toLowerCase().includes(regMemberFilter.toLowerCase()) || !regMemberFilter.length)).map(el =>
                <ListItem key={el.id} button >
                  <ListItemText>
                    {el.user.login}{` (${el.user.full_name})`}
                  </ListItemText>
                  <ImpersonationButton el={el}>
                      <FilterCenterFocusIcon/>
                  </ImpersonationButton>
                  <IconButton onClick={() => props.drop(el.id, 'registered_members', dropRegisteredMember)}>
                    <CancelIcon/>
                  </IconButton>
                </ListItem>)
            }
            </ul>
          <div>
            <div>добавление пользователя</div>
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
                    onChange={(e) => setUserFilter(e.target.value)}
                    value={userFilter}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  </div>
                  <div className='reg-create-form'>
                    <div style={{marginRight: '30px'}}>
                      <Checkbox color='primary' onChange={() => setIsManagerRegistered(!isManagerRegistered)}/>
                      <span>
                        менеджер
                      </span>
                    </div>
                    <Select
                      variant='outlined'
                      style={{marginTop: '-10px'}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    >
                      {
                        props.users.filter(el => el.id !== props.currentUser.id &&
                          (el.login.toLowerCase().includes(userFilter.toLowerCase()) || !userFilter.length))
                          .map(el =>
                          <MenuItem value={el.id} key={el.id}>
                            {el.login}
                          </MenuItem>)
                      }
                  </Select>
                  <IconButton
                    style={{marginLeft: '5px', marginTop: '-5px'}}
                    onClick={() => props.post(newRegistered, 'registered_members', createRegisteredMember)}>
                    <ControlPointIcon className={classes.approve}/>
                  </IconButton>
                  </div>
          </div>
        </Paper>
        <Paper className='man_row-item'>
          <div className='man_row-title'>незарегистрированные пользователи</div>
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
                onChange={(e) => setUnregMemberFilter(e.target.value)}
                value={unregMemberFilter}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
           <ul style={{width: '90%', height: '200px'}} className='choose-managers-list'>
            {
              props.unregistered_members.filter(el => el.organization.id === props.currentOrganization.id &&
                  (el.email.toLowerCase().includes(unregMemberFilter.toLowerCase()) || !unregMemberFilter.length)).map(el =>
                <ListItem key={el.id} button >
                  <ListItemText>
                    {el.email}
                  </ListItemText>
                  <IconButton onClick={() => props.drop(el.id, 'unregistered_members', dropUnregisteredMember)}>
                    <CancelIcon/>
                  </IconButton>
                </ListItem>)
            }
          </ul>
            <div>добавление пользователя по почте</div>
          <div style={{paddingTop: '20px'}}>
            <div className='d-flex'>
              <div style={{marginRight: '30px'}} className='d-flex'>
                <Checkbox style={{marginBottom: '15px'}} color='primary' onChange={() => setIsManagerUnregistered(!isManagerUnregistered)}/>
                <span style={{marginTop: '13px'}}>
                  менеджер
                </span>
              </div>
            <TextField label={'email'} variant='outlined' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <IconButton
              style={{marginLeft: '5px'}}
              onClick={() => props.post(newUnregistered, 'unregistered_members', createUnregisteredMember)}>
                    <ControlPointIcon className={classes.approve}/>
            </IconButton>
            </div>
          </div>
      </Paper>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    currentOrganization: state.organizations.currentOrganization,
    registered_members: state.registered_members.registered_members,
    unregistered_members: state.unregistered_members.unregistered_members,
    users: state.users.common_users,
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(OrganizationManaging)