import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { choose, getCourses } from "../../../../main_redux/actions/courses";
import { getDoneCourses } from "../../../../main_redux/actions/server_connections";
import NoSearchResultSideBar from "../../../utils/empty_fields/no_search_result_sidebar";
import { getsDoneCourses } from "../../../../main_redux/actions/user_courses";
import DoneCourse from "./done_course";
import "./style.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const DoneCourses = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    props.set(getsDoneCourses, currentPage);
  }, []);

  console.log(props.doneCourses);

  return (
    <div className="profile__course-field">
      <div className="d-flex">
        <button
          className="arrow-button"
          disabled={currentPage <= 0}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            props.set(getsDoneCourses, currentPage - 1);
          }}
        >
          <ArrowBackIos />
        </button>
        <ul className="profile__course-list">
          {props.doneCourses.length ? (
            props.doneCourses.map((el) => (
              <li key={el.id} className="profile__course-item">
                <DoneCourse el={el} />
              </li>
            ))
          ) : (
            <NoSearchResultSideBar />
          )}
        </ul>
        <button
          className="arrow-button"
          disabled={props.doneCourses.length !== 3}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            props.set(getsDoneCourses, currentPage + 1);
          }}
        >
          <ArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
    doneCourses: state.userCourses.doneCourses,
    userCourses: state.userCourses.userCourses,
  }),
  (dispatch) => ({
    setCurrentCourse: (courseId) => dispatch(choose(courseId)),
    set: (setter, currentPage) => dispatch(getDoneCourses(setter, currentPage)),
  })
)(DoneCourses);
