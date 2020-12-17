import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import image from '../../../../../photos/ruby.jpg'
import { connect } from 'react-redux';
import { updateDataElement } from '../../../../../main_redux/actions/server_connections';
import { DateFormat } from '../../../../utils/helpful_functions';
import { CardContent, Typography } from '@material-ui/core';

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

const Certificate = (props) => {
  let {el} = props

  const classes = useStyles();

  return(
    <Card className={classes.root}>
      <CardHeader
        title={el.course.label}
      />
          <CardMedia className={classes.media} image={el.certificate_pdf_url} title="Paella dish"/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {DateFormat(el.created_at)}
        </Typography>
      </CardContent>
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
  )(Certificate)


