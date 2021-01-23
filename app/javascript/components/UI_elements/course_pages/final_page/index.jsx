import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createCertificate } from "../../../../main_redux/actions/certificates";
import {
  postDataElement,
  updateDataElement,
} from "../../../../main_redux/actions/server_connections";
import { updateUserCourse } from "../../../../main_redux/actions/user_courses";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import win_fon from "../../../../../assets/images/win_fon.jpg";
import lose_fon from "../../../../../assets/images/lose_fon.jpg";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import "./final_page.css";
import { plug } from "../../../../main_redux/actions/tags";

const marks = [
  {
    id: 0,
    value: -10,
  },
  {
    id: 1,
    value: -9,
  },
  {
    id: 2,
    value: -8,
  },
  {
    id: 3,
    value: -7,
  },
  {
    id: 4,
    value: -6,
  },
  {
    id: 5,
    value: -5,
  },
  {
    id: 6,
    value: -4,
  },
  {
    id: 7,
    value: -3,
  },
  {
    id: 8,
    value: -2,
  },
  {
    id: 9,
    value: -1,
  },
  {
    id: 10,
    value: 0,
  },
  {
    id: 11,
    value: 1,
  },
  {
    id: 12,
    value: 2,
  },
  {
    id: 13,
    value: 3,
  },
  {
    id: 14,
    value: 4,
  },
  {
    id: 15,
    value: 5,
  },
  {
    id: 16,
    value: 6,
  },
  {
    id: 17,
    value: 7,
  },
  {
    id: 18,
    value: 8,
  },
  {
    id: 19,
    value: 9,
  },
  {
    id: 20,
    value: 10,
  },
];

const FinalPage = (props) => {
  console.log(props.currentUserCourse);
  return (
    <div className="final-window">
      {props.currentUserCourse.correct > 90 ? (
        <div>
          <div className="final-message">
            You has successufly finished course "
            {props.currentUserCourse.course.label}"
          </div>
          <div className="final-message">
            Your result: {props.currentUserCourse.correct}%
          </div>
          <div className="final-message">
            Take our congratulations, {props.currentUserCourse.user.login}
          </div>
          <img className="final-certificate" src={win_fon} alt={"win fon"} />
        </div>
      ) : (
        <>
          <div className="final-message">
            You has ruined course "{props.currentUserCourse.course.label}"
          </div>
          <div className="final-message">
            Your result: {props.currentUserCourse.correct}%
          </div>
          <div className="final-message">
            We are sorry, {props.currentUserCourse.user.login}
          </div>
          <Link to={`/`}>Click for trying one more time</Link>
          <img className="final-certificate" src={lose_fon} alt={"lose fon"} />
        </>
      )}
      <div className="final-mark-field">
        <div className="final-mark-title">mark please this course</div>
        <ul
          style={{ paddingLeft: 0, listStyle: "none" }}
          className="final-mark-list"
        >
          {marks.map((el) => (
            <li key={el.id}>
              <Link
                className="final-mark-item"
                to={`/user_id=${props.currentUser.id}/done_courses`}
              >
                <FormControlLabel
                  onClick={() => {
                    props.put(
                      {
                        id: props.currentUserCourse.id,
                        user_course: {
                          mark: el.value,
                          progress: 100,
                          current_page: props.currentUserCourse.current_page,
                        },
                      },
                      "user_courses",
                      updateUserCourse
                    );
                  }}
                  control={
                    <Checkbox
                      icon={<StarBorderIcon />}
                      checkedIcon={<StarIcon />}
                      name="add to favorite"
                    />
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
    currentUserCourse: state.userCourses.currentUserCourse,
  }),
  (dispatch) => ({
    createCertificate: (newCertificate) =>
      dispatch(createCertificate(newCertificate)),
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(FinalPage);
