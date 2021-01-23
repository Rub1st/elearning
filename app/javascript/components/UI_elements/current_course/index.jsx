import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getQuestions } from "../../../main_redux/actions/questions";
import { getDataWithQuery } from "../../../main_redux/actions/server_connections";
import { getTheories } from "../../../main_redux/actions/theories";
import BottomPart from "./bottom_part";
import "./style.css";
import TopPart from "./top_part";

const CurrentCourse = (props) => {
  useEffect(() => {
    props.set(props.currentCourse.id, "theories", getTheories);
    props.set(props.currentCourse.id, "questions", getQuestions);
  }, []);

  return (
    <div className="main-window-position">
      <div className="main-field-position">
        <TopPart />
        <BottomPart />
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    currentCourse: state.courses.currentCourse,
    theories: state.theories.theories,
    questions: state.questions.questions,
  }),
  (dispatch) => ({
    set: (id, path, setter) => dispatch(getDataWithQuery(id, path, setter)),
  })
)(CurrentCourse);
