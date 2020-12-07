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
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '30px',
  },
}));

const NoSearchResultSideBar = () => {
  const classes = useStyles();
  return(
    <div>
      <h6>По вашему запросу доступных вам курсов не найдено</h6>
      <SearchOutlined className={classes.large}/>
    </div>
  )
}

export default NoSearchResultSideBar;