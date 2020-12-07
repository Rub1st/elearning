import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import image from '../../../../../photos/ruby.jpg'
import { connect } from 'react-redux';
import { destroyDataElement, updateDataElement } from '../../../../../main_redux/actions/server_connections';
import { dropUser, updateUserStatus } from '../../../../../main_redux/actions/users';
import { FavoriteBorderOutlined } from '@material-ui/icons';
import BlockIcon from '@material-ui/icons/Block';
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

const UserItem = (props) => {
  let {el} = props

  const classes = useStyles();

  return(
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {
              el.login[0]
            }
          </Avatar>
        }
        title={el.login}
        subheader={el.full_name}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
          email: {el.email}
        </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
          birthday: {DateFormat(el.birthday).split(' ')[1]}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          registration data: {DateFormat(el.created_at)}
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
        {
            (props.choice === 0 || props.choice === 1) &&
            <IconButton onClick={() => props.put(props.newEl, 'users', updateUserStatus)}>
              <BlockIcon/>
            </IconButton>
          }
          {
            (props.choice === 0 || props.choice === 2) &&
            <IconButton onClick={() => props.put(props.choice === 2 ? props.newEl : props.newEl2, 'users', updateUserStatus)}>
              <FavoriteBorderOutlined/>
            </IconButton>
          }
            <IconButton onClick={() => props.drop(el.id, 'users', dropUser)}>
              <DeleteForeverOutlinedIcon/>
            </IconButton>
      </CardActions>
    </Card>

  )
}

export default connect(
  state => ({
    courses: state.courses.courses,
  }),
  dispatch => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
  )(UserItem)


