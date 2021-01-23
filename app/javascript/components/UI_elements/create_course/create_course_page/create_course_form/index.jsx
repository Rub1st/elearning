import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  Chip,
  IconButton,
  InputBase,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { connect } from "react-redux";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  createCourse,
  updateCourseStatus,
} from "../../../../../main_redux/actions/courses";
import { createPage } from "../../../../../main_redux/actions/pages";
import {
  postDataElement,
  searchData,
  updateDataElement,
} from "../../../../../main_redux/actions/server_connections";
import { getTags, plug } from "../../../../../main_redux/actions/tags";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { serialize } from "object-to-formdata";
import "./style.css";
import { useTranslation } from "react-i18next";
import UserModeEmptyField from "../../../../utils/empty_fields/user_mode_empty_field";
import NoSearchProfileField from "../../../../utils/empty_fields/noSearchProfileField";
import { getUsers } from "../../../../../main_redux/actions/users";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
    marginLeft: -30,
  },
  large: {
    width: theme.spacing(10, 25),
    height: theme.spacing(5),
    borderRadius: "30px",
  },
  tagIcon: {
    marginLeft: "-5px",
    width: theme.spacing(3.6),
    height: theme.spacing(3.6),
  },
  approve: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        borderBottom: "1px solid gray",
      },
    },
  },
}));

const CreateCourseForm = (props) => {
  const classes = useStyles();

  let managedOrganizations = props.organizations
    .filter((el) =>
      el.registered_members
        .filter((e) => e.member_role === "manager")
        .map((e) => e.user.id)
        .includes(props.currentUser.id)
    )
    .filter((e) => e.approve_status === "approved");
  let accessTypes = [
    { id: 1, name: "private" },
    { id: 0, name: "public" },
    { id: 2, name: "individual" },
  ];

  const [accessType, setAccessType] = useState("public");
  const [organization, setOrganization] = useState("myself");
  const [persons, setPersons] = useState([]);
  const [tags, setTags] = useState([]);
  const [whyContent, setWhyContent] = useState("");
  const [willContent, setWillContent] = useState("");
  const [label, setLabel] = useState("");
  const [slider, setSlider] = useState(1);
  const [image, setImage] = useState(null);

  const [showTakenTags, setShowTakenTags] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  const { t, i18n } = useTranslation();

  let selectedOrganization =
    organization !== "myself"
      ? managedOrganizations.find((el) => el.name === organization)
      : {};

  let newCourse = {
    label: label,
    author_id: props.currentUser.id,
    why_content: whyContent,
    will_content: willContent,
    image: image,
  };

  let formData = serialize({
    course: newCourse,
  });

  let updatedCourse = {
    id: props.currentDraftCourse.id,
    course: {
      organization_id:
        selectedOrganization.id === undefined ? null : selectedOrganization.id,
      access_type:
        accessType === "public" ? 0 : accessType === "private" ? 1 : 2,
    },
  };

  let newPage = {
    course_id: props.currentDraftCourse.id,
    order: 1,
    title: "Introduction",
  };

  const user_enter_listener = (event) => {
    if (event.key === "Enter") {
      props.search(userSearch, "users", getUsers);
    }
  };

  const tag_enter_listener = (event) => {
    if (event.key === "Enter") {
      props.search(tagSearch, "tags", getTags);
    }
  };

  return (
    <div className="create-course-window">
      {slider === 1 ? (
        <div className="create-course-item">
          <div className="create-course-item-top-row">
            <TextField
              style={{ width: "60%" }}
              variant="outlined"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              error={props.errors.label != undefined}
              helperText={
                props.errors.label != undefined ? props.errors.label[0] : null
              }
              label={t("Course.Placeholders.1")}
            />
            <div className="d-flex">
              <input
                accept="image/*"
                className={classes.input}
                onChange={(e) => setImage(e.target.files[0])}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Avatar
                className={classes.approve}
                alt={props.currentUser.login}
                src={image}
              />
            </div>
          </div>
          <div className="create-course-item-text-row">
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              rows={5}
              multiline
              value={whyContent}
              onChange={(e) => setWhyContent(e.target.value)}
              error={props.errors.why_content != undefined}
              helperText={
                props.errors.why_content != undefined
                  ? props.errors.why_content[0]
                  : null
              }
              label={t("Course.Placeholders.2")}
            />
          </div>
          <div className="create-course-item-text-row">
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              rows={5}
              multiline
              value={willContent}
              onChange={(e) => setWillContent(e.target.value)}
              error={props.errors.will_content != undefined}
              helperText={
                props.errors.will_content != undefined
                  ? props.errors.will_content[0]
                  : null
              }
              label={t("Course.Placeholders.3")}
            />
          </div>
          <div className="create-course-item-bottom-row">
            <div className="create-course-slider-info">{slider + "/3"}</div>
            <Tooltip title={t("Tooltip.5")}>
              <IconButton
                onClick={() => {
                  props.post(formData, "courses", createCourse);
                  label.length &&
                    whyContent.length &&
                    willContent.length &&
                    setSlider(slider + 1);
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ) : slider === 2 ? (
        <div className="create-course-item">
          {managedOrganizations.length ? (
            <div className="create-course-item-top-row">
              <div className="create-course-select-list">
                <div>{t("Course.8")}</div>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                    setPersons([]);
                  }}
                >
                  <MenuItem value={"myself"}>myself</MenuItem>
                  {managedOrganizations.map((el) => (
                    <MenuItem value={el.name} key={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          ) : null}
          <div className="create-course-select-list">
            <div>{t("Course.9")}</div>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
            >
              {accessTypes
                .filter(
                  (el) => el.name !== "private" || organization !== "myself"
                )
                .map((el) => (
                  <MenuItem value={el.name} key={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div className="create-course-middle-item">
            {
              <>
                {accessType === "individual" && organization !== "myself" ? (
                  <>
                    <div className="d-flex">
                      <div>{t("Course.10")}</div>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder={t("Search.1")}
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          onChange={(e) => setUserSearch(e.target.value)}
                          value={userSearch}
                          inputProps={{ "aria-label": "search" }}
                        />
                      </div>
                    </div>
                    <ul className="create-course-user-list">
                      {selectedOrganization.registered_members
                        .filter(
                          (e) =>
                            e.user.login
                              .toLowerCase()
                              .includes(userSearch.toLowerCase()) ||
                            !userSearch.length
                        )
                        .map((el) => (
                          <ListItem key={el.id} button>
                            <Checkbox
                              color="primary"
                              onChange={() =>
                                setPersons(
                                  persons.includes(el.user)
                                    ? persons.filter((e) => e.id !== el.user.id)
                                    : [...persons, el.user]
                                )
                              }
                            />
                            <ListItemText>
                              {el.user.login}
                              {` (${el.user.full_name})`}
                            </ListItemText>
                          </ListItem>
                        ))}
                    </ul>
                  </>
                ) : accessType === "individual" ? (
                  <>
                    <div className="d-flex">
                      <div>{t("Course.10")}</div>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search… 1"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          onKeyPress={user_enter_listener}
                          onChange={(e) => setUserSearch(e.target.value)}
                          value={userSearch}
                          inputProps={{ "aria-label": "search" }}
                        />
                      </div>
                    </div>
                    <ul className="create-course-user-list">
                      {props.users.map((el) => (
                        <ListItem key={el.id} button>
                          <Checkbox
                            color="primary"
                            onChange={() =>
                              setPersons(
                                persons.includes(el)
                                  ? persons.filter((e) => e.id !== el.id)
                                  : [...persons, el]
                              )
                            }
                          />
                          <ListItemText>
                            {el.login}
                            {` (${el.full_name})`}
                          </ListItemText>
                        </ListItem>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div>{t("Course.11")}</div>
                )}
              </>
            }
          </div>
          <div className="create-course-item-bottom-row">
            <div>{slider + "/3"}</div>
            <Tooltip title={t("Tooltip.5")}>
              <IconButton
                disabled={accessType === "individual" && !persons.length}
                onClick={() => {
                  props.put(updatedCourse, "courses", updateCourseStatus);
                  props.post(newPage, "pages", createPage);
                  setSlider(slider + 1);
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ) : (
        <div className="create-course-item">
          <div className="create-course-item-top-row">
            <div className="create-course-tags-title">{t("Course.12")}</div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={t("Search.1")}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={tag_enter_listener}
                onChange={(e) => setTagSearch(e.target.value)}
                value={tagSearch}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Switch
              checked={showTakenTags}
              onChange={(e) => setShowTakenTags(!showTakenTags)}
              color={"primary"}
              name="show taken tags"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          {props.tags.filter((el) => (showTakenTags ? tags.includes(el) : true))
            .length ? (
            <ul className="create-course-tags-list">
              {props.tags
                .filter((el) => (showTakenTags ? tags.includes(el) : true))
                .map((el) => (
                  <div key={el.id} className="create-course-tags-item">
                    <Chip
                      className={classes.large}
                      icon={
                        tags.includes(el) ? (
                          <HighlightOffIcon className={classes.tagIcon} />
                        ) : (
                          <AddCircleOutlineIcon className={classes.tagIcon} />
                        )
                      }
                      label={el.name}
                      onClick={() =>
                        setTags(
                          tags.includes(el)
                            ? tags.filter((e) => e.id !== el.id)
                            : [...tags, el]
                        )
                      }
                      color={tags.includes(el) ? "primary" : "default"}
                      variant="outlined"
                    />
                  </div>
                ))}
            </ul>
          ) : !props.tags.length ? (
            <UserModeEmptyField width={""} label={"тегов"} />
          ) : (
            <NoSearchProfileField width={""} label={"тегов"} />
          )}
          <div className="create-course-item-bottom-row">
            <div>{slider + "/3"}</div>
            <Link
              to={`/draft_course_id=${props.currentDraftCourse.id}`}
              onClick={() => {
                tags.map((el) =>
                  props.post(
                    { course_id: props.currentDraftCourse.id, tag_id: el.id },
                    "course_tags",
                    plug
                  )
                );
                persons.map((el) =>
                  props.post(
                    { course_id: props.currentDraftCourse.id, user_id: el.id },
                    "course_members",
                    plug
                  )
                );
              }}
            >
              {t("Course.13")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    currentUser: state.users.currentUser,
    currentDraftCourse: state.courses.currentDraftCourse,
    users: state.users.common_users,
    tags: state.tags.tags,
    organizations: state.organizations.organizations,
    errors: state.errors.errors,
  }),
  (dispatch) => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    search: (obj, path, setter) => dispatch(searchData(obj, path, setter)),
  })
)(CreateCourseForm);
