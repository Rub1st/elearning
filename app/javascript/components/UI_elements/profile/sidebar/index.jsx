import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import { getData } from "../../../../main_redux/actions/server_connections";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    height: 400,
    width: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const elements = [
  { id: 0, label: "Profile.1", to: "/home" },
  { id: 1, label: "Profile.2", to: "/my_courses" },
  { id: 2, label: "Profile.3", to: "/done_courses" },
  { id: 3, label: "Profile.4", to: "/current_courses" },
  { id: 4, label: "Profile.5", to: "/favorite_courses" },
  { id: 5, label: "Profile.6", to: "/recomended_courses" },
  { id: 6, label: "Profile.7", to: "/organizations" },
  { id: 7, label: "Profile.8", to: "/certificates" },
  { id: 8, label: "Profile.9", to: "/settings" },
];

const SideBarProfile = (props) => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  return (
    <div className={classes.root}>
      <ul>
        {elements.map((el) => (
          <Link
            className={"profile__sidebar-item"}
            key={el.id}
            to={`/user_id=${props.currentUser.id}${el.to}`}
          >
            <ListItem button>
              <ListItemText primary={t(el.label)} />
            </ListItem>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
  }),
  (dispatch) => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(SideBarProfile);
