import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { choose, setDraftCourse } from '../../../../../main_redux/actions/courses'
import { setCurrentDraftPage } from '../../../../../main_redux/actions/pages'
import { destroyDataElement } from '../../../../../main_redux/actions/server_connections'

const MyCourseButtonEdit = (props) => {
  let {el} = props
  return(
    <>
            <Link style={{color: 'gray', marginLeft: '20px'}} className='profile__sidebar-item' to={`/draft_course_id=${el.id}`}
                    onClick={() => {props.setDraftCourse(el.id);
                                    props.setCurrentDraftPage(props.pages.filter(e => e.course.id === el.id)[0].id)}}>
                                      {props.children}
                                    </Link>
    </>
  )
}

export default connect(
  state => ({
    pages: state.pages.pages,
  }),
  dispatch => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    setCurrentCourse: (id) => dispatch(choose(id)),
    setDraftCourse: (id) => dispatch(setDraftCourse(id)),
    setCurrentDraftPage: (id) => dispatch(setCurrentDraftPage(id))
  })
  )(MyCourseButtonEdit)