import React from 'react'
import { connect } from 'react-redux';
import ClosedAnswer from './closed_answer';
import OpenedAnswer from './opened_answer';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import './question_item.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

const QuestionItem = (props) => {
  let {el} = props
  const classes = useStyles();

  let question = props.questions.find(e => e.id === el.id)
  return(
    <Accordion className='question__top-part-position'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon>{el.difficult}</ExpandMoreIcon>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{el.title}</Typography>
          <Typography className={classes.heading} style={{marginLeft: '450px'}}>{el.difficult}</Typography>
        </AccordionSummary>
        <div className='question__position'>
        <Typography variant="body2" color="textSecondary" paragraph className='question__description'>{el.description}</Typography>
        <Typography variant="body2" color="textSecondary" paragraph className='question__text'>{el.question_text}</Typography>
          {
            el.question_type === 'opened' ?
              <OpenedAnswer el={question}/> :
              <ClosedAnswer el={question}/>
          }
        </div>
      </Accordion>
  )
}

export default connect(
  state => ({
    questions: state.questions.questions
}),
)(QuestionItem);