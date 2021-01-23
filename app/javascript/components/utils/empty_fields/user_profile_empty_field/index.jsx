import React from "react";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    borderRadius: "30px",
  },
}));

const UserProfileEmptyField = ({ label }) => {
  const classes = useStyles();
  return (
    <div className="admin_empty_field">
      <h3 className="admin_empty_content">У вас пока что нет {label}</h3>
      <SentimentDissatisfiedIcon className={classes.large} />
    </div>
  );
};

export default UserProfileEmptyField;
