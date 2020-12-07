import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createOrganization } from '../../../main_redux/actions/organizations';
import { postDataElement } from '../../../main_redux/actions/server_connections';
import { plug } from '../../../main_redux/actions/tags';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './style.css'
import { makeStyles, fade } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

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
    marginLeft: 10,
    marginRight: 30,
    marginTop: 10,
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

const CreateOrganization = (props) => {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [managers, setManagers] = useState([])
  const [approve, setApprove] = useState(false)
  const [filter, setFilter] = useState('')
  return(
    <div className='create-organization-window'>
      <div className='create-organization-label'>
        Создание организации
      </div>
      <div className='create-organization-field'>
        <Paper className='create-organization-description'>
          <h4>Зачем нужны организации?</h4>
          <p>Организации помогают пользователям объединяться в сообщества по интересам, что в свою очередь делает процесс поиска курсов и обучения по ним в разы легче и интереснее.</p>
          <h4>Как создать свою организацию?</h4>
          <p>Создать свою собственную организацию очень просто! Для этого вам нужно просто напросто ввести ее название и описание, далее, подтвердив введенные данные, у вас также есть возможность выбрать из остальных пользователей еще менеджеров помимо вас для своей организации. Это необязательно. Как только все выше перечисленное выполнено смело нажимайте на кружочек с галочкой (тот, что снизу). Органиция попадет в список администраторов для одобрения, как только ее одобрят вы сможете создавать от ее лица курсы.</p>
          <h4>Управление организациями</h4>
          <p>В профиле в разделе "организации" вам будут доступны все организациями, в которых вы состоите, те, менеджером которых являетесь, имеют кнопку в виде джойстика. Нажав на нее вам откроется область, в которой вы можете добавлять и удалять пользователей, а также изменять название и описание организации</p>
          <h5>Удачи! И помните: учение - свет!</h5>
        </Paper>
        <div className='create-organization-form'>
          <TextField disabled={approve} variant="outlined" label='Название' value={name} onChange={(e) => setName(e.target.value)}/>
          <div>
            <TextField
              disabled={approve}
              style={{marginTop: '20px', width: '80%'}}
              label='Описание'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
            <IconButton
              disabled={approve || !name.length || !description.length}
              style={{marginTop: '60px', marginLeft: '15px'}}
              onClick={() => {
              props.post({
                name: name,
                description: description,
              }, 'organizations', createOrganization);
              setApprove(!approve);
            }}>
              <CheckCircleOutlineIcon className={classes.approve}/>
            </IconButton>
          </div>
          <hr/>
          <div className='d-flex'>
            <div style={{marginRight: '30px', marginLeft: '15px', marginTop: '13px', color: 'gray'}}>
              Выберите менеджеров для организации
            </div>
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
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
          <div className='d-flex'>
          <ul className='choose-managers-list'>
          {
            props.users.filter(el => el.id !== props.currentUser.id && (el.login.toLowerCase().includes(filter.toLowerCase()) || !filter.length)).map(el =>
              <ListItem key={el.id} button >
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={() => setManagers( managers.includes(el) ? managers.filter(e => e.id !== el.id) : [...managers, el])}
                  />
                <ListItemText>
                  {el.login}{` (${el.full_name})`}
                </ListItemText>
              </ListItem>)
          }
          </ul>
          {
            name.length && description.length && approve ?
            <Link
              style={{marginTop: '200px', marginLeft: '15px'}}
                to={`/user_id=${props.currentUser.id}/organizations`}
                onClick={() => {
                  managers.map(el => props.post({
                                                  user_id: el.id,
                                                  organization_id: props.currentDraftOrganization.id,
                                                  member_role: 0,
                                                }, 'registered_members', plug));
                                      props.post({
                                        user_id: props.currentUser.id,
                                        organization_id: props.currentDraftOrganization.id,
                                        member_role: 0,
                                      }, 'registered_members', plug);
                                              }}>
              <CheckCircleOutlineIcon className={classes.approve}/>
            </Link> :
            <IconButton disabled={true} style={{marginTop: '200px', marginLeft: '15px'}}>
              <CheckCircleOutlineIcon className={classes.approve}/>
            </IconButton>
          }
            <hr/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    users: state.users.common_users,
    currentDraftOrganization: state.organizations.currentDraftOrganization,
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter))
  })
)(CreateOrganization);