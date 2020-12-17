import React from 'react'
import { connect } from 'react-redux'
import { dropPage, setCurrentDraftPage } from '../../../../../main_redux/actions/pages'
import { destroyDataElement } from '../../../../../main_redux/actions/server_connections'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    height: 400,
    width: 300,
    paddingRight: 10,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CreateCourseTreeSideBar = (props) => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  let certainPages = props.pages.filter(el => el.course.id === props.currentDraftCourse.id).sort((a,b) => a.order - b.order);
  return(
    <div className={classes.root}>
      <div>{t('Course.24')}</div>
    <ul style={{listStyle: 'none'}}>
      {
        certainPages.map(el =>
            <ListItem button className={'profile__sidebar-item'} key={el.id} onClick={() => props.setCurrentDraftPage(el.id)}>
              <ListItemText primary={el.order}/>
              <ListItemText primary={el.title}/>
              <IconButton onClick={() => props.drop(el.id, 'pages', dropPage)}>
                <DeleteForeverOutlined/>
              </IconButton>
            </ListItem>
          )
      }
    </ul>
  </div>
  )
}


export default connect(
  state => ({
    pages: state.pages.pages,
    currentDraftCourse: state.courses.currentDraftCourse,
  }),
  dispatch => ({
    setCurrentDraftPage: (pageId) => dispatch(setCurrentDraftPage(pageId)),
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter))
  })
)(CreateCourseTreeSideBar)