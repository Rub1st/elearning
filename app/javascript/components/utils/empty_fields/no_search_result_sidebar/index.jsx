import { SentimentDissatisfied } from '@material-ui/icons'
import React from 'react'
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

const NoSearchResultSideBar = () => {
  const classes = useStyles();
  return(
    <div className='admin_empty_field'>
      <h3 className='admin_empty_content'>Мы не нашли для вас курсов</h3>
      <SentimentDissatisfied className={classes.large}/>
    </div>
  )
}

export default NoSearchResultSideBar;