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
import DeleteIcon from '@material-ui/icons/Delete';
import image from '../../../../../photos/ruby.jpg'
import { connect } from 'react-redux';
import { destroyDataElement, updateDataElement } from '../../../../../main_redux/actions/server_connections';
import { dropCourse, updateCourseApproveStatus } from '../../../../../main_redux/actions/courses';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { DateFormat } from '../../../../utils/helpful_functions';

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
}));

const CourseItem = (props) => {
  let {el} = props

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
              el.author.login[0]
            }
          </Avatar>
        }
        action={
          <div>
            {el.mark === null ? 'no' : el.mark}
          </div>
        }
        title={el.label}
        subheader={DateFormat(el.created_at)}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
          author: {el.author.login}
        </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
          access type: {el.access_type}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          organization: {el.organization === null ? 'no' : el.organization.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          usage count: {el.uses_count}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          success rate: {el.success_rate}%
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
          {
            (props.choice === 0 || props.choice === 1) &&
            <IconButton onClick={() => props.put(props.newEl, 'courses', updateCourseApproveStatus)}>
              <DeleteIcon/>
            </IconButton>
          }
          {
            (props.choice === 0 || props.choice === 2) &&
            <IconButton onClick={() => props.put(props.choice === 2 ? props.newEl : props.newEl2, 'courses', updateCourseApproveStatus)}>
              <FavoriteBorderOutlinedIcon/>
            </IconButton>
          }
           <IconButton onClick={() => props.drop(el.id, 'courses', dropCourse)}>
              <DeleteForeverOutlinedIcon/>
            </IconButton>
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
          {el.why_content}
        </Typography>
          <Typography paragraph>Will learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {el.will_content}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>

  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
  }),
  dispatch => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter))
  })
  )(CourseItem)


