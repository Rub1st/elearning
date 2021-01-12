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
import FavoriteButtonShow from './favorite_button_show';
import DeleteIcon from '@material-ui/icons/Delete';
import { getsFavoriteCourses, updateUserCourse } from '../../../../../main_redux/actions/user_courses';
import { updateDataElement } from '../../../../../main_redux/actions/server_connections';
import { DateFormat } from '../../../../utils/helpful_functions';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  collapse: {
    maxHeight: 250,
    overflowY: 'auto',
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

const FavoriteCourse = (props) => {
  let {el} = props

  const { t, i18n } = useTranslation();

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
              el.course.author.login[0]
            }
          </Avatar>
        }
        action={
          <div>
            {el.course.mark === null ? 'no' : el.course.mark}
          </div>
        }
        title={el.course.label}
        subheader={DateFormat(el.course.created_at)}
      />
      <CardMedia
        className={classes.media}
        image={el.course.image_url}
        title="Paella dish"
      />
     <CardContent>
      <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
          author
        </p>
        <p>
          {el.course.author.login}
        </p>
        </Typography>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
          organization
        </p>
        <p>
          {el.course.organization === null ? 'no' : el.course.organization.name}
        </p>
        </Typography>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
          correct
        </p>
        <p>
          {el.correct}
        </p>
        </Typography>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
          progress
        </p>
        <p>
          {el.progress === null ? 'no' : el.progress}
        </p>
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
        <Tooltip title={t("Tooltip.10")}>
          <IconButton onClick={() => props.put(props.newEl, 'user_courses', getsFavoriteCourses)}>
             <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Tooltip.3")}>
            <FavoriteButtonShow el={el}>
              <IconButton>
                <SearchOutlinedIcon/>
              </IconButton>
            </FavoriteButtonShow>
          </Tooltip>
          <Tooltip title={t("Tooltip.2")}>
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
          </Tooltip>
      </CardActions>

      <Collapse in={expanded} timeout="auto" className={classes.collapse} unmountOnExit>
        <CardContent>
          <Typography paragraph>Why learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {el.course.why_content}
        </Typography>
          <Typography paragraph>Will learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {el.course.will_content}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>

  )
}

export default connect(
  state => ({
    pages: state.pages.pages,
  }),
  dispatch => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
  )(FavoriteCourse)


