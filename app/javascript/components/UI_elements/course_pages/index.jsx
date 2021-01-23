import React, { useState } from "react";
import { connect } from "react-redux";
import { updateDataElement } from "../../../main_redux/actions/server_connections";
import { updateUserCourse } from "../../../main_redux/actions/user_courses";
import CoursePage from "./course_page";
import FinalPage from "./final_page";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import "./course_pages.css";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const CoursePages = (props) => {
  const classes = useStyles();

  let selectedPages = props.pages
    .filter((el) => el.course.id === props.currentCourse.id)
    .sort((a, b) => a.order - b.order);

  const steps = selectedPages.map((el) => el.title);

  let pageCount = selectedPages.length;

  const [slider, setSlider] = useState(
    props.currentUserCourse.current_page > pageCount
      ? 1
      : props.currentUserCourse.current_page
  );

  const handleBack = () => {
    setSlider((prevSlider) => prevSlider - 1);
  };

  let updatedUserCourse = {
    id: props.currentUserCourse.id,
    user_course: {
      current_page: slider + 1,
      progress: Math.round((slider / pageCount) * 100, 2),
    },
  };

  let currentPage = selectedPages.find((el) => el.order === slider);

  const { t, i18n } = useTranslation();

  return (
    <div>
      {slider > pageCount ? (
        <FinalPage />
      ) : (
        <>
          <CoursePage el={currentPage} />
          <div className={classes.root}>
            <div className="d-flex page-footer">
              <div className="page-buttons">
                <Button
                  disabled={slider === 1}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  {t("CurrentCourse.21")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSlider(slider + 1);
                    props.put(
                      updatedUserCourse,
                      "user_courses",
                      updateUserCourse
                    );
                  }}
                >
                  {slider === steps.length
                    ? t("CurrentCourse.22")
                    : t("CurrentCourse.20")}
                </Button>
              </div>
              <Stepper
                activeStep={slider - 1}
                alternativeLabel
                className="page-stepper"
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    currentCourse: state.courses.currentCourse,
    currentUserCourse: state.userCourses.currentUserCourse,
    currentUser: state.users.currentUser,
    pages: state.pages.pages,
    questions: state.questions.questions,
    userAnswers: state.userAnswers.userAnswers,
  }),
  (dispatch) => ({
    put: (obj, path) =>
      dispatch(updateDataElement(obj, path, updateUserCourse)),
  })
)(CoursePages);
