import React from 'react'
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
import { destroyDataElement, updateDataElement } from '../../../../../main_redux/actions/server_connections';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { getOrganizations, updateOrganization } from '../../../../../main_redux/actions/organizations';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { DateFormat } from '../../../../utils/helpful_functions';

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
    transform: 'rotauser_status: 1,te(0deg)',
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

const OrganizationItem = (props) => {
  let {el} = props

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
    <Card className={classes.root}>
      <CardHeader
        title={el.name}
        subheader={DateFormat(el.created_at)}
        action={
          <object src={el.certificate_template_url} type="application/x-pdf" title="SamplePdf" width="500" height="720">
            <a href={el.certificate_template_url} style={{marginRight: '15px', marginTop: '10px'}}>open</a>
          </object>
        }
      />
      <embed src={el.certificate_template_url} width="350" height="240"/>
        <CardActions disableSpacing>
          {
            (props.choice === 0 || props.choice === 1) &&
            <IconButton onClick={() => props.put(props.newEl, 'admin/organizations', updateOrganization)}>
              <DeleteIcon/>
            </IconButton>
          }
          {
            (props.choice === 0 || props.choice === 2) &&
            <IconButton onClick={() => props.put(props.choice === 2 ? props.newEl : props.newEl2, 'admin/organizations', updateOrganization)}>
              <FavoriteBorderOutlinedIcon/>
            </IconButton>
          }
           <IconButton onClick={() => props.drop(el.id, 'admin/organizations', getOrganizations)}>
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

      <Collapse in={expanded} timeout="auto" className={classes.collapse} unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {el.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

  )
}

export default connect(
  state => ({
    organizations: state.organizations.organizations,
  }),
  dispatch => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
  )(OrganizationItem)


