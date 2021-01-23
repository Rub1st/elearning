import React from "react";
import "./sidebar.css";
import { connect } from "react-redux";
import { choose, getCourses } from "../../../../main_redux/actions/courses";
import { makeStyles } from "@material-ui/core/styles";
import NoSearchResultSideBar from "../../../utils/empty_fields/no_search_result_sidebar";
import RecCourse from "../../profile/recommended_courses/rec_course";
import { getDataPagination } from "../../../../main_redux/actions/server_connections";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CourseList = (props) => {
  const classes = useStyles();
  let filtered_courses = props.courses.filter(
    (el) => el.course_status === "ready" && el.approve_status === "approved"
  );
  return (
    <div className={classes.root}>
      {filtered_courses.length ? (
        <div className="d-flex">
          <button
            className="arrow-button"
            disabled={props.currentPage <= 0}
            onClick={() => {
              props.setCurrentPage(props.currentPage - 1);
              props.setWithPagination(
                "courses",
                props.currentPage - 1,
                4,
                getCourses
              );
            }}
          >
            <ArrowBackIosIcon />
          </button>
          <ul className="course_list">
            {filtered_courses.map((el) => (
              <li key={el.id} className={"course_list-item"}>
                <RecCourse el={el} />
              </li>
            ))}
          </ul>
          <button
            className="arrow-button"
            disabled={filtered_courses.length !== 4}
            onClick={() => {
              props.setCurrentPage(props.currentPage + 1);
              props.setWithPagination(
                "courses",
                props.currentPage + 1,
                4,
                getCourses
              );
            }}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      ) : (
        <NoSearchResultSideBar />
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    courses: state.courses.courses,
    searchInput: state.courses.searchInput,
    currentCourse: state.courses.currentCourse,
  }),
  (dispatch) => ({
    changeCourse: (newID) => dispatch(choose(newID)),
    setWithPagination: (path, page, count_per_page, setter) =>
      dispatch(getDataPagination(path, page, count_per_page, setter)),
  })
)(CourseList);
