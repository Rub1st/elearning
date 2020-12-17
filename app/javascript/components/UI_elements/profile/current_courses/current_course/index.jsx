import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import image from '../../../../../photos/ruby.jpg'
import { connect } from 'react-redux';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CurrentButtonShow from './current_button_show'
import { DateFormat } from '../../../../utils/helpful_functions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
}));

const CurrentCourse = (props) => {
  let {el} = props
  let course = props.courses.find(e => e.id === el.course.id);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return(
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {
              course.author.login[0]
            }
          </Avatar>
        }
        action={
          <div>
            {course.mark === null ? 'no' : course.mark}
          </div>
        }
        title={course.label}
        subheader={DateFormat(course.created_at)}
      />
      <CardMedia
        className={classes.media}
        image={course.image_url}
        title="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
          author: {course.author.login}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          organization: {course.organization === null ? 'no' : course.organization.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          usage count: {course.uses_count}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          success rate: {course.success_rate}%
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          correct: {el.correct}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          progress: {el.progress === null ? 'no' : el.progress}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          start: {DateFormat(el.created_at)}
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
            <CurrentButtonShow el={el}>
              <IconButton>
                <SearchOutlinedIcon/>
              </IconButton>
              </CurrentButtonShow>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Why learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {course.why_content}
        </Typography>
          <Typography paragraph>Will learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {course.will_content}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>

  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
    pages: state.pages.pages,
  })
  )(CurrentCourse)


