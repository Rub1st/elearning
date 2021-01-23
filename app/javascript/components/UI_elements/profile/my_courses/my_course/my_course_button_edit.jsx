import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  choose,
  setDraftCourse,
} from "../../../../../main_redux/actions/courses";
import {
  getPages,
  setCurrentDraftPage,
} from "../../../../../main_redux/actions/pages";
import {
  destroyDataElement,
  getData,
  getDataWithQuery,
} from "../../../../../main_redux/actions/server_connections";

const MyCourseButtonEdit = (props) => {
  let { el } = props;
  console.log(el);
  return (
    <>
      <Link
        style={{ color: "gray", marginLeft: "20px" }}
        className="profile__sidebar-item"
        to={`/draft_course_id=${el.id}`}
        onClick={() => {
          props.setDraftCourse(el.id);
          props.setCurrentDraftPage(
            props.pages.filter((e) => e.course.id === el.id)[0].id
          );
        }}
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
    set: (id, path, setter) => dispatch(getDataWithQuery(id, path, setter)),
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    setCurrentCourse: (id) => dispatch(choose(id)),
    setDraftCourse: (id) => dispatch(setDraftCourse(id)),
    setCurrentDraftPage: (id) => dispatch(setCurrentDraftPage(id)),
  })
)(MyCourseButtonEdit);
