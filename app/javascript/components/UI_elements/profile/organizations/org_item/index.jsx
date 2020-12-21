import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import image from '../../../../../photos/ruby.jpg'
import { connect } from 'react-redux';
import { updateDataElement } from '../../../../../main_redux/actions/server_connections';
import ManagingButton from './managing_button'
import { updateOrganization } from '../../../../../main_redux/actions/organizations';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import CourseListItem from './course_list_item'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { DateFormat } from '../../../../utils/helpful_functions';
import { Tooltip } from '@material-ui/core';

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

const OrgItem = (props) => {
  let {el} = props

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(1);
  const [showReport, setShowReport] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let existed = el.registered_members.map(e => e.member_role === 'manager' && e.user.id === props.currentUser.id)

  let currentReport = props.reports.find(el => el.course.id === currentCourseId)

  return(
    <Card className={classes.root}>
      <CardHeader
        title={el.name}
        subheader={DateFormat(el.created_at)}
      />
      {
        !showReport ?
        <>
          <CardMedia className={classes.media}
                     image={el.certificate_template_url}
                     title="Paella dish"/>
          <CardContent>
            <Tooltip title={el.description}>
              <Typography variant="body2" color="textSecondary" component="p">
                {el.description.length > 38 ? el.description.slice(0, 48) + '...' : el.description}
              </Typography>
            </Tooltip>
            <Typography variant="body2" color="textSecondary" component="p">
              approve status: {el.approve_status}
            </Typography>
          </CardContent>
        </> :
        <>
          <hr/>
          <Typography variant="body2" color="textSecondary" component="p">
              {DateFormat(currentReport.created_at)}
            </Typography>
          <CardContent>
            <hr/>
            <Typography variant="body2" color="textSecondary" component="p">
              course: {currentReport.course.label}
            </Typography>
            <hr/>
            <Typography variant="body2" color="textSecondary" component="p">
              count try: {currentReport.count_try}
            </Typography>
            <hr/>
            <Typography variant="body2" color="textSecondary" component="p">
              count failed: {currentReport.count_failed}
            </Typography>
            <hr/>
            <Typography variant="body2" color="textSecondary" component="p">
              count complete: {currentReport.count_complete}
            </Typography>
            <hr/>
            <Typography variant="body2" color="textSecondary" component="p">
              average mark: {currentReport.average_mark}
            </Typography>
          </CardContent>
          <hr/>
        </>
      }
        <CardActions disableSpacing>
           {
             existed.length ?
            <IconButton onClick={() => props.put(props.newEl, 'organizations', updateOrganization)}>
              <DeleteIcon/>
            </IconButton> : null
            }
            {
              existed.length ?
              <ManagingButton el={el}>
                <IconButton>
                  <SportsEsportsIcon/>
                </IconButton>
              </ManagingButton> : null
            }
            {
              props.courses.filter(e => e.organization !== null).filter(e => e.organization.id === el.id && e.approve_status === 'approved').length ?
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton> : null
            }
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
              {
                props.courses.filter(e => e.organization !== null).filter(e => e.organization.id === el.id && e.approve_status === 'approved').map(e =>
                <li key={e.id}>
                  <hr/>
                  <CourseListItem showReport={showReport} setShowReport={setShowReport} el={e}
                                  manager={existed.length} newEl={{id: e.id, course:{ approve_status: 1}}}
                                  setCurrentCourseId={setCurrentCourseId} currentCourseId={currentCourseId}>
                    <IconButton>
                      <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                      <CreateOutlinedIcon/>
                    </IconButton>
                    </CourseListItem>
                </li>)
              }
            </ul>
          </CardContent>
      </Collapse>
    </Card>

  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
    currentUser: state.users.currentUser,
    registered_members: state.registered_members.registered_members,
    organizations: state.organizations.organizations,
    reports: state.reports.reports,
  }),
  dispatch => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
  )(OrgItem)


