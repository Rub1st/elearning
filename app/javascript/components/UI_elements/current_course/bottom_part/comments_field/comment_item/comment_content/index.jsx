import { Avatar, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react'
import { DateFormat } from '../../../../../../utils/helpful_functions';
import './comment_content.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  reply: {
    width: 345,
  }
}));

const CommentContent = ({props}) => {
  const classes = useStyles();

  return(
    <>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {
              props.author.login[0]
            }
          </Avatar>
        }
        action={
          <Typography variant="body2" color="textSecondary" component="p">
            {DateFormat(props.created_at)}
          </Typography>
        }
        title={props.author.login}
      />
      <CardContent className='comment__content'>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
      </CardContent>
    </>
  )
}

export default CommentContent;