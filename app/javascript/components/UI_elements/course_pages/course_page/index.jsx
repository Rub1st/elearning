import React, { useEffect } from "react";
import CourseInfo from "./course_info";
import UserInfo from "./user_info";
import "./course_page.scss";
import QuestionsList from "./questions_list";
import TheoryList from "./theory_list";
import { connect } from "react-redux";

const CoursePage = (props) => {
  return (
    <div className="course-page__position">
      <div className="course-page__top-panel-position">
        <UserInfo />
        <div className="course-page__title">{props.title}</div>
        <CourseInfo />
      </div>
      <div className="course-page__middle-panel-position">
        <TheoryList theoryList={props.el.theories} />
        <QuestionsList practiceList={props.el.questions} />
      </div>
    </div>
  );
};

export default connect((state) => ({
  currentUserCourse: state.userCourses.currentUserCourse,
  currentCourse: state.courses.currentCourse,
}))(CoursePage);
