import React from "react";
import InformationField from "./information_field";
import "./bottom_part.css";
import CommentsField from "./comments_field";
import StartButton from "./start_button";

const BottomPart = () => {
  return (
    <div className="course__bottom-part">
      <div className="course__info_and_start_panel">
        <InformationField />
        <StartButton />
      </div>
      <CommentsField />
    </div>
  );
};

export default BottomPart;
