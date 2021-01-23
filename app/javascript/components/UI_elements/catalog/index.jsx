import React, { useEffect, useState } from "react";
import CourseList from "./course_list";
import {
  getData,
  getDataPagination,
} from "../../../main_redux/actions/server_connections";
import { getCourses } from "../../../main_redux/actions/courses";
import { getTags } from "../../../main_redux/actions/tags";
import "./catalog.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getUsers } from "../../../main_redux/actions/users";
import { getOrganizations } from "../../../main_redux/actions/organizations";
import { getUserCourses } from "../../../main_redux/actions/user_courses";

const Catalog = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    props.setWithPagination("courses", currentPage, 4, getCourses);
    props.set("tags", getTags);
    props.set("user_courses", getUserCourses);
    props.set("users", getUsers);
    props.set("organizations", getOrganizations);
  }, []);

  return (
    <div className="catalog__position">
      {!props.connect_status ? (
        <CircularProgress />
      ) : (
        <div className="catalog__list">
          <CourseList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    courses: state.courses.courses,
    connect_status: state.courses.connect_status,
    organizations: state.organizations.organizations,
  }),
  (dispatch) => ({
    set: (path, setter) => dispatch(getData(path, setter)),
    setWithPagination: (path, page, count_per_page, setter) =>
      dispatch(getDataPagination(path, page, count_per_page, setter)),
  })
)(Catalog);
