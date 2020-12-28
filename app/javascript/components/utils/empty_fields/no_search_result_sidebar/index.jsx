import { SentimentDissatisfied } from '@material-ui/icons'
import React from 'react'
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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

const NoSearchResultSideBar = ({entity}) => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  if(entity === undefined){
    entity = t("EmptyField.2")
  }

  return(
    <div className='admin_empty_field'>
      <h3 className='admin_empty_content'>{`${t("EmptyField.1")} ${entity}`}</h3>
      <SentimentDissatisfied className={classes.large}/>
    </div>
  )
}

export default NoSearchResultSideBar;