import React from 'react'
import QuestionItem from './question_item'
import './questions_list.css'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const QuestionsList = ({practiceList}) => {
  const classes = useStyles();

  return(
        <div className='course-page__questions-list-position'>
          <h3 className='course-page__questions-title'>Practice</h3>
          <div className={classes.root}>
          <ul className='course-page__questions-list'>
            {
              practiceList.map(el => <li key={el.id}>
                <QuestionItem el={el}/>
              </li>)
            }
          </ul>
          </div>
        </div>
  )
}

export default QuestionsList;