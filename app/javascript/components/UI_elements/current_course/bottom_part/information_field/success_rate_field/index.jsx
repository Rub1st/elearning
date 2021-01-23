import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import CourseInformationTemplate from "../../../../../utils/course_information_template";

const SuccesRateField = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <CourseInformationTemplate
      label={t("CurrentCourse.11")}
      header={t("CurrentCourse.10")}
    >
      <span>{props.success_rate}</span>
    </CourseInformationTemplate>
  );
};

export default connect((state) => ({
  success_rate: state.courses.currentCourse.success_rate,
}))(SuccesRateField);
