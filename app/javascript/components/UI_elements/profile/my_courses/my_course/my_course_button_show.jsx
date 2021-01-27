import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  choose,
  setDraftCourse,
} from "../../../../../main_redux/actions/courses";
import { setCurrentDraftPage } from "../../../../../main_redux/actions/pages";
import { destroyDataElement } from "../../../../../main_redux/actions/server_connections";

const MyCourseButtonShow = (props) => {
  let { el } = props;

  return (
    <>
      <Link
        style={{ color: "gray", marginLeft: "10px" }}
        className="profile__sidebar-item"
        to={`/main_page/course_id=${el.id}`}
        onClick={() => props.setCurrentCourse(el.id)}
      >
        {props.children}
      </Link>
    </>
  );
};

export default connect(
  (state) => ({
    pages: state.pages.pages,
  }),
  (dispatch) => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    setCurrentCourse: (id) => dispatch(choose(id)),
    setDraftCourse: (id) => dispatch(setDraftCourse(id)),
    setCurrentDraftPage: (id) => dispatch(setCurrentDraftPage(id)),
  })
)(MyCourseButtonShow);
