import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createOrganization } from '../../../main_redux/actions/organizations';
import { postDataElement, searchData } from '../../../main_redux/actions/server_connections';
import { plug } from '../../../main_redux/actions/tags';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './style.css'
import { makeStyles, fade } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemText, Tooltip } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { getUsers } from '../../../main_redux/actions/users';
import { PhotoCamera } from '@material-ui/icons';
import { serialize } from 'object-to-formdata';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
    marginLeft: -30,
  },
  approve: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  picture: {
    width: theme.spacing(12, 24),
    height: theme.spacing(12),
    marginTop: '-50px',
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
  const [image, setImage] = useState(null)

  const [approve, setApprove] = useState(false)
  const [filter, setFilter] = useState('')

  const { t, i18n } = useTranslation();

  const enter_listener = event => {
    if (event.key === 'Enter') {
      props.search(filter , 'users', getUsers)
    }
  }

  let newOrganization = {
    name: name,
    description: description,
    certificate_template: image,
  }

  let formData = serialize({
    organization: newOrganization
  })

  return(
    <div className='create-organization-window'>
      <div className='create-organization-label'>
        {t('Organization.1')}
      </div>
      <div className='create-organization-field'>
        <Paper className='create-organization-description'>
          <h4>{t('Organization.2')}</h4>
          <p>{t('Organization.3')}</p>
          <h4>{t('Organization.4')}</h4>
          <p>{t('Organization.5')}</p>
          <h4>{t('Organization.6')}</h4>
          <p>{t('Organization.7')}</p>
          <h5>{t('General.1')}</h5>
        </Paper>
        <div className='create-organization-form'>
          <div className="first-row-organization-form">
          <TextField variant="outlined"
                     label={t('Organization.Placeholders.1')}
                     error={props.errors.name != undefined}
                     helperText={props.errors.name != undefined ? props.errors.name[0] : null}
                     value={name} onChange={(e) => setName(e.target.value)}/>
          <div className='d-flex'>
                <input accept="image/*" className={classes.input} onChange={(e) => setImage(e.target.files[0])} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera/>
                  </IconButton>
                </label>
                {
                  image !== null ?
                  <p>{t('Organization.8')}</p> : null
                }
              </div>
          </div>
          <div>
            <TextField
              style={{marginTop: '20px', width: '80%'}}
              label={t('Organization.Placeholders.2')}
              multiline
              rows={4}
              value={description}
              error={props.errors.description != undefined}
              helperText={props.errors.description != undefined ? props.errors.description[0] : null}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
            <Tooltip title={t("Tooltip.6")}>
              <IconButton
                style={{marginTop: '60px', marginLeft: '15px'}}
                onClick={() => {
                props.post(formData, 'organizations', createOrganization);
                setApprove(!approve)
              }}>
                <CheckCircleOutlineIcon className={classes.approve}/>
              </IconButton>
            </Tooltip>
          </div>
          <hr/>
          <div className='d-flex'>
            <div style={{marginRight: '30px', marginLeft: '15px', marginTop: '13px', color: 'gray'}}>
              {t('Organization.9')}
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={t('Search.1')}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={enter_listener}
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
          <div className='d-flex'>
          <ul className='choose-managers-list'>
          {
            props.users.length ? props.users.map(el =>
              <ListItem key={el.id} button >
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={() => setManagers( managers.includes(el) ? managers.filter(e => e.id !== el.id) : [...managers, el])}
                  />
                <ListItemText>
                  {el.login}{` (${el.full_name})`}
                </ListItemText>
              </ListItem>) : <div className='empty_field'>{t('EmptyField.9')}</div>
          }
          </ul>
          {
            name.length && description.length && approve ?
            <Tooltip title={t("Tooltip.7")}>
              <Link
              style={{marginTop: '180px', marginLeft: '15px'}}
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
              </Link>
            </Tooltip>
             :
            <IconButton disabled={true} style={{marginTop: '180px', marginLeft: '15px'}}>
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
    errors: state.errors.errors,
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    search: (obj, path, setter) => dispatch(searchData(obj, path, setter)),
  })
)(CreateOrganization);