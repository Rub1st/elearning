import React from "react";
import { Link } from "react-router-dom";
import "./profile_bar.css";
import "../../style/utils.css";
import { connect } from "react-redux";
import { getData } from "../../../../main_redux/actions/server_connections";

const ProfileBar = (props) => {
  return (
    <div className="profile-bar">
      <Link to={`/user_id=${props.currentUser.id}/home`} className="link">
        <span className="profile-label">{props.currentUser.login}</span>
      </Link>
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
)(ProfileBar);
