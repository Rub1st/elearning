import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  getOrganizations,
  setCurrentOrganization,
} from "../../../../main_redux/actions/organizations";
import {
  connectOrganizations,
  getData,
} from "../../../../main_redux/actions/server_connections";
import NoSearchResultSideBar from "../../../utils/empty_fields/no_search_result_sidebar";
import OrgItem from "./org_item";

const Organization = (props) => {
  useEffect(() => {
    props.set("organizations", getOrganizations);
  }, []);

  let filtered = props.organizations.filter(
    (el) =>
      el.registered_members.filter((el) => el.user.id === props.currentUser.id)
        .length
  );

  const { t, i18n } = useTranslation();

  return (
    <div className="profile__organization-field">
      <button
        style={{
          backgroundColor: "transparent",
          border: "transparent",
          marginBottom: "20px",
          marginLeft: "1200px",
        }}
        onClick={() =>
          props.connectOrganizations(props.currentUser.id, getOrganizations)
        }
      >
        {t("Organization.16")}
      </button>
      <ul className="profile__organization-list">
        {filtered.length ? (
          filtered.map((el) => (
            <li key={el.id} className="profile__course-item">
              <OrgItem
                el={el}
                newEl={{
                  id: el.id,
                  organization: {
                    approve_status: 1,
                    name: el.name,
                    description: el.description,
                  },
                }}
              />
            </li>
          ))
        ) : (
          <NoSearchResultSideBar entity={t("EmptyField.7")} />
        )}
      </ul>
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
    registered_members: state.registered_members.registered_members,
    organizations: state.organizations.organizations,
  }),
  (dispatch) => ({
    connectOrganizations: (id, setter) =>
      dispatch(connectOrganizations(id, setter)),
    setCurrentOrganization: (organizationId) =>
      dispatch(setCurrentOrganization(organizationId)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Organization);
