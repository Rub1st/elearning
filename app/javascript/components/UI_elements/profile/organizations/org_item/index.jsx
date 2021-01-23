import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import image from "../../../../../photos/ruby.jpg";
import { connect } from "react-redux";
import { updateDataElement } from "../../../../../main_redux/actions/server_connections";
import ManagingButton from "./managing_button";
import { updateOrganization } from "../../../../../main_redux/actions/organizations";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import CourseListItem from "./course_list_item";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { DateFormat } from "../../../../utils/helpful_functions";
import { Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  collapse: {
    maxHeight: 250,
    overflowY: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    avatar: {
      backgroundColor: red[500],
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const OrgItem = (props) => {
  let { el } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(1);
  const [showReport, setShowReport] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { t, i18n } = useTranslation();

  console.log(el);

  let existed = el.registered_members.filter(
    (e) => e.member_role === "manager" && e.user.id === props.currentUser.id
  );

  let currentReport = props.reports.find(
    (el) => el.course.id === currentCourseId
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        title={el.name}
        subheader={DateFormat(el.created_at)}
        action={
          <object
            src={el.certificate_template_url}
            type="application/x-pdf"
            title="SamplePdf"
            width="500"
            height="720"
          >
            <a
              href={el.certificate_template_url}
              style={{ marginRight: "15px", marginTop: "10px" }}
            >
              {t("General.2")}
            </a>
          </object>
        }
      />
      {!showReport ? (
        <>
          <embed src={el.certificate_template_url} width="350" height="240" />
          <CardContent>
            <Tooltip title={el.description}>
              <Typography variant="body2" color="textSecondary" component="p">
                {el.description.length > 38
                  ? el.description.slice(0, 48) + "..."
                  : el.description}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              color="textSecondary"
              className="for_course_text_field"
              component="p"
            >
              <p>approve status</p>
              <p>{el.approve_status}</p>
            </Typography>
          </CardContent>
        </>
      ) : (
        <>
          <hr />
          <Typography variant="body2" color="textSecondary" component="p">
            {DateFormat(currentReport.created_at)}
          </Typography>
          <CardContent>
            <hr />
            <Typography
              variant="body2"
              color="textSecondary"
              className="for_course_text_field"
              component="p"
            >
              <p>course</p>
              <p>{currentReport.course.label}</p>
            </Typography>
            <hr />
            <Typography
              variant="body2"
              color="textSecondary"
              className="for_course_text_field"
              component="p"
            >
              <p>count try</p>
              <p>{currentReport.count_try}</p>
            </Typography>
            <hr />
            <Typography
              variant="body2"
              color="textSecondary"
              className="for_course_text_field"
              component="p"
            >
              <p>count failed</p>
              <p>{currentReport.count_failed}</p>
            </Typography>
            <hr />
            <Typography
              variant="body2"
              color="textSecondary"
              className="for_course_text_field"
              component="p"
            >
              <p>count complete</p>
              <p>{currentReport.count_complete}</p>
            </Typography>
            <hr />
            <Typography
              variant="body2"
              color="textSecondary"
              className="for_course_text_field"
              component="p"
            >
              <p>average mark</p>
              <p>{currentReport.average_mark}</p>
            </Typography>
          </CardContent>
          <hr />
        </>
      )}
      <CardActions disableSpacing>
        {existed.length ? (
          <Tooltip title={t("Tooltip.8")}>
            <IconButton
              onClick={() =>
                props.put(props.newEl, "organizations", updateOrganization)
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {existed.length ? (
          <ManagingButton el={el}>
            <Tooltip title={t("Tooltip.11")}>
              <IconButton>
                <SportsEsportsIcon />
              </IconButton>
            </Tooltip>
          </ManagingButton>
        ) : null}
        {props.courses
          .filter((e) => e.organization !== null)
          .filter(
            (e) =>
              e.organization.id === el.id && e.approve_status === "approved"
          ).length ? (
          <Tooltip title={t("Tooltip.12")}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        className={classes.collapse}
        unmountOnExit
      >
        <CardContent>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {props.courses
              .filter((e) => e.organization !== null)
              .filter(
                (e) =>
                  e.organization.id === el.id && e.approve_status === "approved"
              )
              .map((e) => (
                <li key={e.id}>
                  <hr />
                  <CourseListItem
                    showReport={showReport}
                    setShowReport={setShowReport}
                    el={e}
                    manager={existed.length}
                    newEl={{ id: e.id, course: { approve_status: 1 } }}
                    setCurrentCourseId={setCurrentCourseId}
                    currentCourseId={currentCourseId}
                  >
                    <Tooltip title={t("Tooltip.3")}>
                      <IconButton>
                        <SearchOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("Tooltip.8")}>
                      <IconButton>
                        <CreateOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </CourseListItem>
                </li>
              ))}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default connect(
  (state) => ({
    courses: state.courses.courses,
    currentUser: state.users.currentUser,
    registered_members: state.registered_members.registered_members,
    organizations: state.organizations.organizations,
    reports: state.reports.reports,
  }),
  (dispatch) => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(OrgItem);
