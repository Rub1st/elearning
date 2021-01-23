import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./course_info.css";

const CourseInfo = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="course-page__course-info">
      <div>
        {t("CurrentCourse.18")} {props.currentUserCourse.course.label}
      </div>
      <div>
        {t("CurrentCourse.19")} {props.currentCourse.author.login}
      </div>
    </div>
  );
};

export default connect((state) => ({
  currentCourse: state.courses.currentCourse,
  currentUserCourse: state.userCourses.currentUserCourse,
}))(CourseInfo);
