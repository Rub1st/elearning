import { IconButton, Tooltip } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { createReply } from "../../../../../../../main_redux/actions/comments";
import {
  getData,
  getDataWithQuery,
  postDataElement,
  postDataElementWithQuery,
} from "../../../../../../../main_redux/actions/server_connections";
import "./reply_input.css";
import { useTranslation } from "react-i18next";

const ReplyInput = (props) => {
  const [replyInput, setReplyInput] = useState("");

  let newReply = {
    comment_id: props.el.id,
    author_id: props.currentUser.id,
    content: replyInput,
  };

  const { t, i18n } = useTranslation();

  return (
    <div className="comment__reply-input-position d-flex">
      <TextField
        onChange={(e) => setReplyInput(e.target.value)}
        error={props.errors.content != undefined}
        label={t("CurrentCourse.Placeholders.2")}
        helperText={
          props.errors.content != undefined ? props.errors.content[0] : null
        }
        value={replyInput}
        className="comment__reply-input"
      />
      <Tooltip title={t("Tooltip.30")}>
        <IconButton
          className="comment__reply-input-button btn btn-light"
          onClick={() => {
            props.post(
              newReply,
              props.currentCourse.id,
              "replies",
              createReply
            );
            setReplyInput("");
            props.setGiveReply(false);
          }}
        >
          <SendOutlined />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
    currentCourse: state.courses.currentCourse,
    errors: state.errors.errors,
  }),
  (dispatch) => ({
    post: (obj, parrentId, path, setter) =>
      dispatch(postDataElementWithQuery(obj, parrentId, path, setter)),
  })
)(ReplyInput);
