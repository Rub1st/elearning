import React from 'react'
import TheoryItem from './theory_item';
import './theory_list.css'
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

const TheoryList = ({theoryList}) => {
  const classes = useStyles();

  return(
        <div className='course-page__theory-position'>
          <h3 className='course-page__theory-title'>Theory</h3>
          <div className={classes.root}>
          <ul className='course-page__theory-list'>
            {
              theoryList.map(el =>
              <li key={el.id}>
                <TheoryItem props={el}/>
              </li>)
            }
          </ul>
          </div>
        </div>
  )
}

export default TheoryList;