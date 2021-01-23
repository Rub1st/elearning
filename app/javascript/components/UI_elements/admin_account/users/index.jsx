import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  destroyDataElement,
  getData,
} from "../../../../main_redux/actions/server_connections";
import EntitiesList from "../entities_list";
import UserItem from "./userItem";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AdminModeEmptyField from "../../../utils/empty_fields/admin_mode_emty_field";
import NoSearchResultsField from "../../../utils/empty_fields/no_search_results_field";
import { getUsers } from "../../../../main_redux/actions/users";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1550,
  },
}));

let userFilter = (users, status) =>
  users.filter((el) => el.user_status === status);

const Users = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    props.set("admin/users", getUsers);
  }, []);

  console.log(props.users);

  return (
    <div>
      <EntitiesList
        label={"Users"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        path={"admin/users"}
        setter={getUsers}
      >
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label="Approved Users"
                className="case-tab"
                onClick={() => setValue(0)}
              />
              <Tab
                label="Blocked Users"
                className="case-tab"
                onClick={() => setValue(1)}
              />
            </Tabs>
          </AppBar>
        </div>
        <div className="field">
          {value === 0 ? (
            <div>
              {userFilter(props.users, "approved").length ? (
                <ul className="admin-user-list">
                  {userFilter(props.users, "approved").map((el) => (
                    <li key={el.id} className="admin-user-list-position">
                      <UserItem
                        choice={value}
                        el={el}
                        newEl={{ id: el.id, user: { user_status: 1 } }}
                      />
                    </li>
                  ))}
                </ul>
              ) : !props.users.filter((e) => e.user_status === "approved")
                  .length ? (
                <AdminModeEmptyField label={"users"} />
              ) : (
                <NoSearchResultsField label={"users"} />
              )}
            </div>
          ) : (
            <div>
              {userFilter(props.users, "blocked").length ? (
                <ul className="admin-user-list">
                  {userFilter(props.users, "blocked").map((el) => (
                    <li key={el.id} className="admin-user-list-position">
                      <UserItem
                        choice={value}
                        el={el}
                        newEl={{ id: el.id, user: { user_status: 0 } }}
                      />
                    </li>
                  ))}
                </ul>
              ) : !props.users.filter((e) => e.user_status === "blocked")
                  .length ? (
                <AdminModeEmptyField label={"users"} />
              ) : (
                <NoSearchResultsField label={"users"} />
              )}
            </div>
          )}
        </div>
      </EntitiesList>
    </div>
  );
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  (dispatch) => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Users);
