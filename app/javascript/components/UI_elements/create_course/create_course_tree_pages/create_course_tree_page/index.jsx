import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCourseStatus } from "../../../../../main_redux/actions/courses";
import {
  createPage,
  updatePage,
} from "../../../../../main_redux/actions/pages";
import { dropQuestion } from "../../../../../main_redux/actions/questions";
import {
  destroyDataElement,
  postDataElement,
  updateDataElement,
} from "../../../../../main_redux/actions/server_connections";
import { dropTheory } from "../../../../../main_redux/actions/theories";
import CreatePracticeElement from "./create_practice_element";
import CreateTheoryElement from "./create_theory_element";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../../../../photos/ruby.jpg";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import "./style.css";
import { DeleteForeverOutlined } from "@material-ui/icons";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Checkbox from "@material-ui/core/Checkbox";
import { IconButton, Paper, TextField, Tooltip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  greate: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const CreateCourseTreePage = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("Introduction");

  const { t, i18n } = useTranslation();

  let filtredPages = props.pages.filter(
    (e) => e.course.id === props.currentDraftCourse.id
  );

  let certainTheories = props.theories.filter(
    (e) => e.page.id === props.currentDraftPage.id
  );
  let certainQuestions = props.questions
    .filter((e) => e.page.id === props.currentDraftPage.id)
    .filter((e) => e.variants.filter((v) => v.is_correct).length);

  return (
    <div className="draft-page-create-field">
      <div className="create-course-first-column">
        <div className="paper-create-theory">
          <div>{t("Course.14")}</div>
          <CreateTheoryElement />
        </div>
        <div className="paper-create-question">
          <div>{t("Course.15")}</div>
          <CreatePracticeElement />
        </div>
      </div>
      <Paper className="create-course-middle-column">
        <div className="create-course-page-info">
          {`${t("Course.16")} ${props.currentDraftPage.order}, ${t(
            "Course.16"
          )} ${props.currentDraftCourse.label}`}
        </div>
        <div className="draft-page-edit-title">
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={props.errors.title != undefined}
            helperText={
              props.errors.title != undefined ? props.errors.title[0] : null
            }
            label="title"
          />
          <Tooltip title={t("Tooltip.29")}>
            <IconButton
              onClick={() =>
                props.put(
                  {
                    id: props.currentDraftPage.id,
                    page: {
                      title: title,
                    },
                  },
                  "pages",
                  updatePage
                )
              }
            >
              <CheckCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="create-course-created-theory">
          <div style={{ color: "rgb(163, 157, 157)" }}>{t("Course.18")}</div>
          <div className={classes.root}>
            <ul className="create-course-created-theory-list">
              {certainTheories.length ? (
                certainTheories.map((el) => (
                  <li
                    key={el.id}
                    style={{ display: "flex", marginBottom: "2.5px" }}
                  >
                    <Accordion className="theory__item-position">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="d-flex"
                      >
                        <Typography className={classes.heading}>
                          {el.title}
                        </Typography>
                      </AccordionSummary>
                      <div className="theory__position">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {el.content}
                        </Typography>
                        <div className="theory__picture-position">
                          <img
                            className="theory-picture"
                            src={el.image_url}
                            alt=""
                          />
                        </div>
                      </div>
                    </Accordion>
                    <Tooltip title={t("Tooltip.25")}>
                      <IconButton
                        onClick={() =>
                          props.drop(el.id, "theories", dropTheory)
                        }
                      >
                        <DeleteForeverOutlined />
                      </IconButton>
                    </Tooltip>
                  </li>
                ))
              ) : (
                <div className="empty_field">{t("EmptyField.3")}</div>
              )}
            </ul>
          </div>
        </div>
        <div className="create-course-created-practice">
          <div style={{ color: "rgb(163, 157, 157)" }}>{t("Course.19")}</div>
          <ul className="create-course-created-practice-list">
            {certainQuestions.length ? (
              certainQuestions.map((el) => (
                <li
                  key={el.id}
                  style={{ display: "flex", marginBottom: "2.5px" }}
                >
                  <Accordion className="question__top-part-position">
                    <AccordionSummary
                      expandIcon={
                        <div className="d-flex">
                          <Typography className={classes.heading}>
                            {el.difficult}
                          </Typography>
                          <ExpandMoreIcon />
                        </div>
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {el.title}
                      </Typography>
                    </AccordionSummary>
                    <div className="question__position">
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                        className="question__description"
                      >
                        {el.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                        className="question__text"
                      >
                        {el.question_text}
                      </Typography>
                      <div>
                        <ul>
                          {el.variants
                            .filter((e) => e.question.id === el.id)
                            .map((e) => (
                              <li
                                style={{
                                  listStyle: "none",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                                key={e.id}
                              >
                                <Checkbox
                                  checked={e.is_correct}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                />
                                <span>{e.value}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </Accordion>
                  <Tooltip title={t("Tooltip.26")}>
                    <IconButton
                      onClick={() =>
                        props.drop(el.id, "questions", dropQuestion)
                      }
                    >
                      <DeleteForeverOutlined />
                    </IconButton>
                  </Tooltip>
                </li>
              ))
            ) : (
              <div className="empty_field">{t("EmptyField.4")}</div>
            )}
          </ul>
        </div>
      </Paper>
      <div className="create-course-last-column">
        <div className="create-course-create-new-page">
          <Tooltip title={t("Tooltip.27")}>
            <IconButton
              disabled={!certainQuestions.length && !certainTheories.length}
              onClick={() => {
                props.post(
                  {
                    course_id: props.currentDraftCourse.id,
                    title: title,
                    order: filtredPages.length
                      ? filtredPages.sort((a, b) => a.order - b.order)[
                          filtredPages.length - 1
                        ].order + 1
                      : 1,
                  },
                  "pages",
                  createPage
                );
              }}
            >
              <ControlPointIcon className={classes.large} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="create-course-finish-button">
          {certainQuestions.length || certainTheories.length ? (
            <Tooltip title={t("Tooltip.28")}>
              <IconButton>
                <Link
                  to={`/`}
                  onClick={() =>
                    props.put(
                      {
                        id: props.currentDraftCourse.id,
                        course: {
                          course_status: 1,
                          approve_status: 0,
                        },
                      },
                      "courses",
                      updateCourseStatus
                    )
                  }
                >
                  <CheckCircleOutlineIcon className={classes.greate} />
                </Link>
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton
              disabled={!certainQuestions.length && !certainTheories.length}
            >
              <CheckCircleOutlineIcon className={classes.greate} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    currentDraftCourse: state.courses.currentDraftCourse,
    currentDraftPage: state.pages.currentDraftPage,
    theories: state.theories.theories,
    questions: state.questions.questions,
    pages: state.pages.pages,
    errors: state.errors.errors,
  }),
  (dispatch) => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
  })
)(CreateCourseTreePage);
