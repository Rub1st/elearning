import React from "react";
import "./top_part.css";
import TextField from "./text_field";
import ImageField from "./image_field";

const TopPart = () => {
  return (
    <div className="course__top-part">
      <TextField />
      <ImageField />
    </div>
  );
};

export default TopPart;
