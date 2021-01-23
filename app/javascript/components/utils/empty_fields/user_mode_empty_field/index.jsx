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
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: "30px",
  },
}));

const UserModeEmptyField = ({ label }) => {
  const classes = useStyles();
  return (
    <div>
      <h5>Здесь пока что нет {label}</h5>
      <SentimentDissatisfiedIcon className={classes.large} />
    </div>
  );
};

export default UserModeEmptyField;
