import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./user_info.css";

const UserInfo = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="course-page__user-info">
      <div>
        {t("CurrentCourse.16")}{" "}
        {props.currentUserCourse.progress === 100
          ? 0
          : props.currentUserCourse.progress}
        %
      </div>
      <div>
        {t("CurrentCourse.17")}{" "}
        {props.currentUserCourse.correct === null
          ? 0
          : props.currentUserCourse.correct}
        %
      </div>
    </div>
  );
};

export default connect((state) => ({
  currentUserCourse: state.userCourses.currentUserCourse,
}))(UserInfo);
