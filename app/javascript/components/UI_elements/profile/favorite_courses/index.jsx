import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { choose } from '../../../../main_redux/actions/courses';
import { getFavoriteCourses } from '../../../../main_redux/actions/server_connections';
import { getsFavoriteCourses } from '../../../../main_redux/actions/user_courses';
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar';
import FavoriteCourse from './favorite_course'

const FavoriteCourses = (props) => {

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    props.set(getsFavoriteCourses, currentPage);
  }, []);


  return(
    <div className='profile__course-field'>
      <div className="d-flex">
          <button className="arrow-button" disabled={currentPage <= 0} onClick={() => {
              setCurrentPage(currentPage - 1);
              props.set(getsFavoriteCourses, currentPage - 1)
            }}>
            <ArrowBackIos/>
          </button>
          <ul className='profile__course-list'>
          {
            props.favoriteCourses.length ? props.favoriteCourses.map(el =>
            <li key={el.id} className='profile__course-item'>
              <FavoriteCourse el={el} newEl={{ id: el.id, user_course: { is_favorite: false, current_page: el.current_page, progress: el.progress }}}/>
            </li>)  : <NoSearchResultSideBar/>
          }
        </ul>
        <button className="arrow-button" disabled={props.favoriteCourses.length !== 3} onClick={() => {
              setCurrentPage(currentPage + 1);
              props.set(getsFavoriteCourses, currentPage + 1)
            }}>
              <ArrowForwardIos/>
            </button>
      </div>
    </div>

  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    userCourses: state.userCourses.userCourses,
    favoriteCourses: state.userCourses.favoriteCourses,
  }),
  dispatch => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
    set: (setter, currentPage) => dispatch(getFavoriteCourses(setter, currentPage))
  })
)(FavoriteCourses)