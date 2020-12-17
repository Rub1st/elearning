import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateDataElement } from '../../../../main_redux/actions/server_connections';
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

  const [passwordType, setPasswordType] = useState('password');
  const [newPasswordType, setNewPasswordType] = useState('password');

  const [fullName, setFullName] = useState(props.currentUser.full_name);
  const [image, setImage] = useState(avatar);
  const [login, setLogin] = useState(props.currentUser.login);
  const [email, setEmail] = useState(props.currentUser.email);
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');

  const { t, i18n } = useTranslation();

  let newUpdatedUser = { id: props.currentUser.id,
                         user: {
                          login: login,
                          full_name: fullName
                        }
  }

  return(
    <div className='home__position'>
    <div style={{marginLeft: '-50px'}} className='home__top-line'>
    <input accept="image/*" className={classes.input} onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    <Avatar className={classes.large} alt={props.currentUser.login} src={image} />
      <div style={{marginLeft: '-40px'}} className='home__main-user-info'>
        <TextField className='home__login' label={t('Profile.16')} value={login} variant="outlined" onChange={(e) => setLogin(e.target.value)}/>
        <TextField style={{marginTop: '20px'}} className='home__main-info-item' label={t('Profile.17')} value={fullName} variant="outlined" onChange={(e) => setFullName(e.target.value)}/>
        <TextField style={{marginTop: '20px'}} className='home__main-info-item' label={t('Profile.18')} value={email} variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
      </div>
    </div>
    <div style={{marginBottom: '15px', color: 'gray', marginLeft: '80px'}}>{t('Profile.19')}</div>
    <div className='home__second-line'>
      <div>
        <div style={{marginTop: '20px'}} className='d-flex'>
          <TextField label={t('Profile.20')} type={passwordType} value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
          <IconButton onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}>
            {
              passwordType === 'password' ?
              <VisibilityIcon/> : <VisibilityOffIcon/>
            }
          </IconButton>
        </div>
        <div style={{marginTop: '20px'}} className='d-flex'>
          <TextField label={t('Profile.21')} type={newPasswordType} value={newPassword} variant="outlined" onChange={(e) => setNewPassword(e.target.value)}/>
          <IconButton onClick={() => setNewPasswordType(newPasswordType === 'password' ? 'text' : 'password')}>
            {
              newPasswordType === 'password' ?
              <VisibilityIcon/> : <VisibilityOffIcon/>
            }
          </IconButton>
        </div>
      </div>
      <IconButton style={{marginLeft: '40px'}} onClick={() => props.put(newUpdatedUser, 'users', plug)}>
        <CheckCircleOutlineIcon className={classes.approve}/>
      </IconButton>
    </div>
  </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
  }),
  dispatch => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(Settings)