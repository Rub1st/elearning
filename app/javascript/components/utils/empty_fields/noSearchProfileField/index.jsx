import { SearchOutlined } from '@material-ui/icons'
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

const NoSearchProfileField = ({label}) => {
  const classes = useStyles();
  return(
    <div>
      <h6>По вашему запросу {label} не найдено</h6>
      <SearchOutlined className={classes.large}/>
    </div>
  )
}

export default NoSearchProfileField;