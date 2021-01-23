import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import CourseInformationTemplate from "../../../../../utils/course_information_template";

const UsesCountField = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <CourseInformationTemplate
      label={t("CurrentCourse.13")}
      header={t("CurrentCourse.12")}
    >
      <span>{props.uses_count}</span>
    </CourseInformationTemplate>
  );
};

export default connect((state) => ({
  uses_count: state.courses.currentCourse.uses_count,
}))(UsesCountField);
