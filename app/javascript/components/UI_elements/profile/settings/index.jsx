import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateDataElement, updateDataElementWithFormData } from '../../../../main_redux/actions/server_connections';
import { plug } from '../../../../main_redux/actions/tags';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../../photos/user_avatar.jpg';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import { serialize } from 'object-to-formdata';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  approve: {
    width: theme.spacing(16),
    height: theme.spacing(12),
  },
}));

const Settings = (props) => {
  const classes = useStyles();

  const [fullName, setFullName] = useState(props.currentUser.full_name);
  const [image, setImage] = useState(null);
  const [login, setLogin] = useState(props.currentUser.login);
  const [certificate, setCertificate] = useState(null);

  const { t, i18n } = useTranslation();

  let newUpdatedUser = { login: login,
                         full_name: fullName,
                         avatar: image,
                         certificate_template: certificate,
                        }

  let formData = serialize({
    user: newUpdatedUser,
  })

  return(
    <div className='home__position'>
    <div style={{marginLeft: '-50px', marginTop: '30px', marginBottom: '30px'}} className='home__top-line'>
    <input className={classes.input} onChange={(e) => setImage(e.target.files[0])} id="icon-image-file" type="file" />
      <label htmlFor="icon-image-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    <Avatar className={classes.large} alt={props.currentUser.login} src={props.users.find(e => e.id === props.currentUser.id).avatar_url} />
      <div style={{marginLeft: '-40px'}} className='home__main-user-info'>
        <TextField className='home__login' label={t('Profile.16')}
                   error={props.errors.login != undefined}
                   helperText={props.errors.login != undefined ? props.errors.login[0] : null}
                   value={login} variant="outlined" onChange={(e) => setLogin(e.target.value)}/>
        <TextField style={{marginTop: '20px'}}
                   className='home__main-info-item'
                   label={t('Profile.17')}
                   error={props.errors.full_name != undefined}
                   helperText={props.errors.full_name != undefined ? props.errors.full_name[0] : null}
                   value={fullName} variant="outlined" onChange={(e) => setFullName(e.target.value)}/>
      </div>
    </div>
    <hr/>
    <div style={{marginLeft: '-50px'}} className='home__top-line'>
    <input className={classes.input} onChange={(e) => setCertificate(e.target.files[0])} id="icon-certificate-file" type="file" />
      <label htmlFor="icon-certificate-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <embed src={props.users.find(e => e.id === props.currentUser.id).certificate_template_url} width="350" height="250"/>
    </div>
        <Button style={{marginTop: '50px'}} variant="outlined" color="primary" onClick={() => {
          props.put(formData, props.currentUser.id, 'users', plug);
          if(fullName != '' && login != '')
          {
            location.href = '/users/sign_in'
          }
        }
        }>
          save changes
        </Button>
  </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    users: state.users.users,
    errors: state.errors.errors,
  }),
  dispatch => ({
    put: (obj, id, path, setter) => dispatch(updateDataElementWithFormData(obj, id, path, setter)),
  })
)(Settings)