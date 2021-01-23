import { IconButton, Tooltip } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import {
  createComment,
  updateCommentInput,
} from "../../../../../../main_redux/actions/comments";
import {
  getData,
  postDataElement,
  postDataElementWithQuery,
} from "../../../../../../main_redux/actions/server_connections";
import "./comment_input.css";
import { useTranslation } from "react-i18next";

const CommentInput = (props) => {
  let newComment = {
    course_id: props.currentCourse.id,
    author_id: props.currentUser.id,
    content: props.commentInput,
  };

  console.log(props.errors);

  const { t, i18n } = useTranslation();

  return (
    <div className="comment__input-position">
      <TextField
        className="comment__input"
        label={t("CurrentCourse.Placeholders.1")}
        error={props.errors.content != undefined}
        multiline
        rows={3}
        variant={"outlined"}
        helperText={
          props.errors.content != undefined ? props.errors.content[0] : null
        }
        onChange={(e) => props.updateCommentInput(e.target.value)}
        value={props.commentInput}
      />
      <Tooltip title={t("Tooltip.30")}>
        <IconButton
          onClick={() =>
            props.post(
              newComment,
              props.currentCourse.id,
              "comments",
              createComment
            )
          }
          className="comment__input-button btn btn-light"
        >
          <SendOutlined />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default connect(
  (state) => ({
    currentCourse: state.courses.currentCourse,
    currentUser: state.users.currentUser,
    commentInput: state.comments.commentInput,
    errors: state.errors.errors,
  }),
  (dispatch) => ({
    updateCommentInput: (newValue) => dispatch(updateCommentInput(newValue)),
    post: (obj, parrentId, path, setter) =>
      dispatch(postDataElementWithQuery(obj, parrentId, path, setter)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(CommentInput);
