import React from 'react'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import './style.css'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    borderRadius: '30px',
  },
}));

const AdminModeEmptyField = ({label}) => {
  const classes = useStyles();
  return(
    <div className='admin_empty_field'>
      <h3 className='admin_empty_content'>Здесь пока что нет {label}</h3>
      <SentimentDissatisfiedIcon className={classes.large}/>
    </div>
  )
}

export default AdminModeEmptyField;