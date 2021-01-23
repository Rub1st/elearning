import React from "react";
import { Link } from "react-router-dom";
import "./left_bar.css";
import "../../style/utils.css";
import { connect } from "react-redux";
import { getData } from "../../../../main_redux/actions/server_connections";
import { useTranslation } from "react-i18next";

const LeftBar = (props) => {
  const { t, i18n } = useTranslation();

  const items = [
    { id: 0, label: "Catalog.1", link: "/" },
    { id: 1, label: "Course.1", link: "/create_course" },
    { id: 2, label: "Organization.1", link: "/create_organization" },
  ];

  return (
    <div className="left_bar_position">
      {items.map((el) => (
        <Link to={el.link} className="link_position link" key={el.id}>
          {t(el.label)}
        </Link>
      ))}
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
)(LeftBar);
