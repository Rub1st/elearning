import React, { useEffect } from "react";
import { connect } from "react-redux";
import CommentItem from "./comment_item";
import CommentInput from "./comment_input";
import "./comments_field.css";
import UserModeEmptyField from "../../../../utils/empty_fields/user_mode_empty_field";
import { getComments } from "../../../../../main_redux/actions/comments";
import { getDataWithQuery } from "../../../../../main_redux/actions/server_connections";
import { useTranslation } from "react-i18next";
import { getPages } from "../../../../../main_redux/actions/pages";
import { makeStyles } from "@material-ui/core";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: "30px",
  },
}));

const CommentsField = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.set(props.currentCourse.id, "comments", getComments);
    props.set(props.currentCourse.id, "pages", getPages);
  }, []);

  const { t, i18n } = useTranslation();

  let course_comments = props.comments.filter(
    (el) => el.course.id === props.currentCourse.id
  );
  return (
    <div className="course__comment-position">
      <span className="course__comment-header">{t("CurrentCourse.3")}</span>
      {course_comments.length ? (
        <ul className="course__comment-list">
          {course_comments.map((el) => (
            <li key={el.id}>
              <CommentItem props={el} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="course__comment-list">
          <div className="comment_empty_field">
            <div>
              <h5>Здесь пока что нет комментариев</h5>
            </div>
            <SentimentDissatisfiedIcon className={classes.large} />
          </div>
        </div>
      )}
      <CommentInput />
    </div>
  );
};

export default connect(
  (state) => ({
    currentCourse: state.courses.currentCourse,
    comments: state.comments.comments,
  }),
  (dispatch) => ({
    set: (id, path, setter) => dispatch(getDataWithQuery(id, path, setter)),
  })
)(CommentsField);
