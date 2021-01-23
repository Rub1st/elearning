import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateDataElement } from "../../../main_redux/actions/server_connections";
import { setImpersonationUser } from "../../../main_redux/actions/users";

const ExitButton = (props) => {
  return (
    <>
      <Link style={{ color: "white" }} to="/">
        {props.children}
      </Link>
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
  })
)(ExitButton);
