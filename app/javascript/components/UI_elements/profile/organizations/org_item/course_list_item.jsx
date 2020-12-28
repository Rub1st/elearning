import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { choose, setDraftCourse, updateCourseApproveStatus } from '../../../../../main_redux/actions/courses'
import { destroyDataElement, postDataElement, updateDataElement } from '../../../../../main_redux/actions/server_connections'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { setCurrentDraftPage } from '../../../../../main_redux/actions/pages'
import './style.css'
import { createReport } from '../../../../../main_redux/actions/reports'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Tooltip } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const CourseListItem = (props) => {
  let {el} = props
  const { t, i18n } = useTranslation();
  return(
    <div className='course-list-item'>
    <div style={{marginRight: '25px', marginTop: '12px'}}>
      {el.label}
    </div>
    <div style={{marginTop: '12px'}}>
      <Link style={{color: 'gray'}} className='profile__sidebar-item' to={'/'} onClick={() => props.setCurrentCourse(el.id)}>
        {props.children[0]}
      </Link>
    </div>
    <div style={{marginTop: '12px', marginLeft: '15px'}}>
      {
        el.author.id === props.currentUser.id ?
        <Link style={{color: 'gray'}} className='profile__sidebar-item' to={`/draft_course_id=${el.id}`}
        onClick={() => {props.setDraftCourse(el.id);
                        props.setCurrentDraftPage(props.pages.filter(e => e.course.id === el.id)[0].id)}}>
                          {props.children[1]}
        </Link> : null
      }
    </div>
      {
        props.manager ?
        <Tooltip title={t("Tooltip.8")}>
          <IconButton onClick={() => props.put(props.newEl, 'courses', updateCourseApproveStatus)}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
        : null
      }
      {
        props.manager ? (
          !props.showReport ?
          <Tooltip title={t("Tooltip.13")}>
             <IconButton onClick={() => {
              props.post({ course_id: el.id }, 'reports', createReport);
              props.setCurrentCourseId(el.id);
            }}>
              <AssessmentIcon/>
            </IconButton>
          </Tooltip>
          : null
        ) : null
      }
      {
        props.manager && props.reports.filter(el => el.course.id === el.id) && props.currentCourseId === el.id ? (
          !props.showReport ?
          <Tooltip title={t("Tooltip.14")}>
            <IconButton onClick={() => props.setShowReport(true)}>
              <VisibilityIcon/>
            </IconButton>
          </Tooltip> :
          <IconButton onClick={() => props.setShowReport(false)}>
            <VisibilityOffIcon/>
          </IconButton>
        ) : null
      }
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    pages: state.pages.pages,
    reports: state.reports.reports,
  }),
  dispatch => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    setCurrentCourse: (id) => dispatch(choose(id)),
    setDraftCourse: (id) => dispatch(setDraftCourse(id)),
    setCurrentDraftPage: (id) => dispatch(setCurrentDraftPage(id))
  })
  )(CourseListItem)