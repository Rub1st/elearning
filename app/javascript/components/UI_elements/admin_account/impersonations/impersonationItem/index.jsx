import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { destroyDataElement } from "../../../../../main_redux/actions/server_connections";
import { DateFormat } from "../../../../utils/helpful_functions";

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

const ImperosnationItem = (props) => {
  let { el } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {el.organization.name[0]}
          </Avatar>
        }
        title={el.organization.name}
        subheader={DateFormat(el.organization.created_at)}
      />
      <CardContent>
        <hr />
        <Typography variant="body2" color="textSecondary" component="p">
          start: {DateFormat(el.start)}
        </Typography>
        <hr />
        <Typography variant="body2" color="textSecondary" component="p">
          end: {DateFormat(el.end)}
        </Typography>
        <hr />
        <Typography variant="body2" color="textSecondary" component="p">
          manager: {`${el.manager.login} (${el.manager.full_name})`}
        </Typography>
        <hr />
        <Typography variant="body2" color="textSecondary" component="p">
          common: {`${el.common.login} (${el.common.full_name})`}
        </Typography>
        <hr />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default connect((state) => ({
  courses: state.courses.courses,
}))(ImperosnationItem);
