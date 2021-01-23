import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getData,
  updateDataElement,
} from "../../../../main_redux/actions/server_connections";
import EntitiesList from "../entities_list";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./style.css";
import CourseItem from "./course_item";
import AdminModeEmptyField from "../../../utils/empty_fields/admin_mode_emty_field";
import NoSearchResultsField from "../../../utils/empty_fields/no_search_results_field";
import { getCourses } from "../../../../main_redux/actions/courses";
import { getComments } from "../../../../main_redux/actions/comments";
import { getTags } from "../../../../main_redux/actions/tags";
import { getImpersonations } from "../../../../main_redux/actions/impersonations";
import { getUsers } from "../../../../main_redux/actions/users";
import { getOrganizations } from "../../../../main_redux/actions/organizations";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1550,
  },
}));

let coursesFilter = (courses, status) =>
  courses.filter((el) => el.approve_status === status);

const Courses = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.set("admin/users", getUsers);
    props.set("admin/organizations", getOrganizations);
    props.set("admin/courses", getCourses);
  }, []);

  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <EntitiesList
        label={"Courses"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        path={"admin/courses"}
        setter={getCourses}
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
                label="Pending Courses"
                className="button"
                onClick={() => setValue(0)}
              />
              <Tab
                label="Approved Courses"
                className="button"
                onClick={() => setValue(1)}
              />
              <Tab
                label="Rejected Courses"
                className="button"
                onClick={() => setValue(2)}
              />
            </Tabs>
          </AppBar>
        </div>
        <div className="field">
          {value === 0 ? (
            <div>
              {coursesFilter(props.courses, "pending").length ? (
                <ul className="admin-course-list">
                  {coursesFilter(props.courses, "pending").map((el) => (
                    <li key={el.key} className="admin-course-list-position">
                      <CourseItem
                        el={el}
                        choice={value}
                        newEl2={{ id: el.id, course: { approve_status: 2 } }}
                        newEl={{ id: el.id, course: { approve_status: 1 } }}
                      />
                    </li>
                  ))}
                </ul>
              ) : !props.courses.filter((e) => e.approve_status === "pending")
                  .length ? (
                <AdminModeEmptyField label={"courses"} />
              ) : (
                <NoSearchResultsField label={"courses"} />
              )}
            </div>
          ) : value === 1 ? (
            <div>
              {coursesFilter(props.courses, "approved").length ? (
                <ul className="admin-course-list">
                  {coursesFilter(props.courses, "approved").map((el) => (
                    <li key={el.key} className="admin-course-list-position">
                      <CourseItem
                        el={el}
                        choice={value}
                        newEl={{ id: el.id, course: { approve_status: 1 } }}
                      />
                    </li>
                  ))}
                </ul>
              ) : !props.courses.filter((e) => e.approve_status === "approved")
                  .length ? (
                <AdminModeEmptyField label={"courses"} />
              ) : (
                <NoSearchResultsField label={"courses"} />
              )}
            </div>
          ) : (
            <div>
              {coursesFilter(props.courses, "rejected").length ? (
                <ul className="admin-course-list">
                  {coursesFilter(props.courses, "rejected").map((el) => (
                    <li key={el.key} className="admin-course-list-position">
                      <CourseItem
                        el={el}
                        choice={value}
                        newEl={{ id: el.id, course: { approve_status: 2 } }}
                      />
                    </li>
                  ))}
                </ul>
              ) : !props.courses.filter((e) => e.approve_status === "rejected")
                  .length ? (
                <AdminModeEmptyField label={"courses"} />
              ) : (
                <NoSearchResultsField label={"courses"} />
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
    courses: state.courses.courses,
  }),
  (dispatch) => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Courses);
