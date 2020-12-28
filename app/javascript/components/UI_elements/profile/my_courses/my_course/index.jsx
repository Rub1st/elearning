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
import { updateDataElement } from '../../../../../main_redux/actions/server_connections';
import { choose, setDraftCourse, updateCourseApproveStatus } from '../../../../../main_redux/actions/courses';
import { setCurrentDraftPage } from '../../../../../main_redux/actions/pages';
import MyCourseButtonShow from './my_course_button_show'
import MyCourseButtonEdit from './my_course_button_edit'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
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

const MyCourse = (props) => {
  let {el} = props

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { t, i18n } = useTranslation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return(
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {
              el.label[0]
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
        image={el.image_url}
        title="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
          approve status
        </p>
        <p>
          {el.approve_status}
        </p>
        </Typography>
      <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
          access type
        </p>
        <p>
          {el.access_type}
        </p>
        </Typography>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
          <p>
          organization
        </p>
        <p>
          {el.organization === null ? 'no' : el.organization.name}
        </p>
        </Typography>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
          <p>
          course status
        </p>
        <p>
        {el.course_status}
        </p>
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
          <Tooltip title={t("Tooltip.8")}>
            <IconButton onClick={() => props.put(props.newEl, 'courses', updateCourseApproveStatus)}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
            <MyCourseButtonShow el={el}>
            <Tooltip title={t("Tooltip.3")}>
              <IconButton>
                <SearchOutlinedIcon/>
              </IconButton>
              </Tooltip>
            </MyCourseButtonShow>
            <MyCourseButtonEdit el={el}>
            <Tooltip title={t("Tooltip.9")}>
              <IconButton>
                <CreateOutlinedIcon/>
              </IconButton>
              </Tooltip>
            </MyCourseButtonEdit>
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
    pages: state.pages.pages,
  }),
  dispatch => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    setCurrentCourse: (id) => dispatch(choose(id)),
    setDraftCourse: (id) => dispatch(setDraftCourse(id)),
    setCurrentDraftPage: (id) => dispatch(setCurrentDraftPage(id))
  })
  )(MyCourse)


