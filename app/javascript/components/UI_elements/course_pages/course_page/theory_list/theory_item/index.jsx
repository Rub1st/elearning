import React from 'react'
import './theory_item.css'
import image from '../../../../../../photos/ruby.jpg'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const TheoryItem = ({props}) => {
  const classes = useStyles();

  const {title, content, image_url} = props
  return(
    <Accordion className='theory__item-position'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <div className='theory__position'>
        <Typography variant="body2" color="textSecondary" component="p">{content}</Typography>
          <div className='theory__picture-position'>
            <img className='theory-picture' src={image_url} alt=''/>
          </div>
        </div>
      </Accordion>
  )
}

export default TheoryItem;