import React from "react";
import { connect } from "react-redux";
import "./image_field.css";
import image from "../../../../../photos/ruby.jpg";

const ImageField = (props) => {
  console.log(props.currentCourse);
  return (
    <div className="course__image">
      <img
        className="image-size"
        src={props.currentCourse.image_url}
        alt="name"
      />
    </div>
  );
};

export default connect((state) => ({
  currentCourse: state.courses.currentCourse,
}))(ImageField);
