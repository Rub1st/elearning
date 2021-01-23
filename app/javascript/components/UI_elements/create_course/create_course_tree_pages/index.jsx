import React from "react";
import { connect } from "react-redux";
import CreateCourseTreePage from "./create_course_tree_page";
import CreateCourseTreeSideBar from "./course_tree_sidebar";
import "./style.css";

const CreateCourseTreePages = (props) => {
  return (
    <div className="draft-course-position">
      <CreateCourseTreeSideBar />
      <CreateCourseTreePage />
    </div>
  );
};

export default connect((state) => ({
  currentDraftCourse: state.courses.currentDraftCourse,
}))(CreateCourseTreePages);
