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
import RecButtonShow from './rec_button_show';
import { updateDataElement } from '../../../../../main_redux/actions/server_connections';
import { DateFormat } from '../../../../utils/helpful_functions';
import './style.css'
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

const RecCourse = (props) => {
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
        image={el.image_url}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
          <p>
            organization
          </p>
          <p>
            {el.organization === null ? 'no' : el.organization.name}
          </p>
        </Typography>
        <Typography variant="body2" className='for_course_text_field' color="textSecondary" component="p">
        <p>
          usage count
        </p>
        <p>
          {el.uses_count}
        </p>
        </Typography>
        <Typography variant="body2" color="textSecondary" className='for_course_text_field' component="p">
        <p>
        success rate
        </p>
        <p>
          {el.success_rate}%
        </p>
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
          <RecButtonShow el={el}>
          <Tooltip title={t("Tooltip.3")}>
            <IconButton>
              <SearchOutlinedIcon/>
            </IconButton>
            </Tooltip>
          </RecButtonShow>
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
  })
  )(RecCourse)


