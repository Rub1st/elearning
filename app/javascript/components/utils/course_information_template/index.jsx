import React from "react";
import "./course_information_template.css";

const CourseInformationTemplate = (props) => {
  return (
    <div className="course__info_template-position">
      <span className="course__info-template-header">{props.header}</span>
      <div className="course__info-template-content">{props.children}</div>
      <span className="course__info-template-label">{props.label}</span>
    </div>
  );
};

export default CourseInformationTemplate;
