import React from 'react'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '30px',
  },
}));

const SideBarEmptyField = ({label}) => {
  const classes = useStyles();
  return(
    <div>
      <h6>У вас пока что нет доступных вам курсов</h6>
      <SentimentDissatisfiedIcon className={classes.large}/>
    </div>
  )
}

export default SideBarEmptyField;