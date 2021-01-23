import { IconButton } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateImpersonation } from "../../../main_redux/actions/impersonations";
import {
  stopImpersonating,
  updateDataElement,
} from "../../../main_redux/actions/server_connections";
import { setImpersonationUser } from "../../../main_redux/actions/users";

const UpdateImpersonationButton = (props) => {
  return (
    <>
      <IconButton
        style={{ color: "gray", marginLeft: "10px" }}
        onClick={() => {
          props.stopImpersonation();
        }}
      >
        {props.children}
      </IconButton>
    </>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
    pages: state.pages.pages,
    currentImpersonation: state.impersonations.currentImpersonation,
  }),
  (dispatch) => ({
    setImpersonationUser: (user) => dispatch(setImpersonationUser(user)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    stopImpersonation: () => dispatch(stopImpersonating()),
  })
)(UpdateImpersonationButton);
