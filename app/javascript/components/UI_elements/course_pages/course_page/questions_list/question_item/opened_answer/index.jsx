import React, { useState } from "react";
import { getUserAnswers } from "../../../../../../../main_redux/actions/user_answers";
import { connect } from "react-redux";
import { postDataElement } from "../../../../../../../main_redux/actions/server_connections";
import Checkbox from "@material-ui/core/Checkbox";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import IconButton from "@material-ui/core/IconButton";

const OpenedAnswer = (props) => {
  const [userAnswers, setUserAnswers] = useState([]);
  return (
    <div>
      <ul>
        {props.el.variants.map((el) => (
          <li style={{ listStyle: "none" }} key={el.id}>
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={() =>
                setUserAnswers(
                  userAnswers.includes(el)
                    ? userAnswers.filter((e) => e.id !== el.id)
                    : [...userAnswers, el]
                )
              }
            />
            <span>{el.value}</span>
          </li>
        ))}
      </ul>
      <IconButton
        disabled={!userAnswers.length}
        onClick={() =>
          userAnswers.map((e) =>
            props.post(
              {
                question_id: props.el.id,
                user_id: props.currentUser.id,
                answer: e.value,
                is_correct: e.is_correct,
              },
              "user_answers",
              getUserAnswers
            )
          )
        }
      >
        <SendOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
  }),
  (dispatch) => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
  })
)(OpenedAnswer);
