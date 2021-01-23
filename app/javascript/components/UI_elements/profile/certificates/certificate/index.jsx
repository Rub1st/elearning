import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { updateDataElement } from "../../../../../main_redux/actions/server_connections";
import { DateFormat } from "../../../../utils/helpful_functions";
import { CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
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
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Certificate = (props) => {
  let { el } = props;

  console.log(el);

  const { t, i18n } = useTranslation();

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={el.course.label}
        action={
          <object
            src={el.certificate_pdf_url}
            type="application/x-pdf"
            title="SamplePdf"
            width="500"
            height="720"
          >
            <a
              href={el.certificate_pdf_url}
              style={{ marginRight: "15px", marginTop: "10px" }}
            >
              {t("General.2")}
            </a>
          </object>
        }
      />
      <embed
        src={el.certificate_pdf_url}
        width="350"
        height="240"
        type="application/pdf"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {DateFormat(el.created_at)}
        </Typography>
      </CardContent>
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
)(Certificate);
