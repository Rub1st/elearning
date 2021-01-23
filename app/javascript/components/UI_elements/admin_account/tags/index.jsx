import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TagItem from "./tag_item";
import {
  getData,
  postDataElement,
  updateDataElement,
} from "../../../../main_redux/actions/server_connections";
import { createTag, getTags } from "../../../../main_redux/actions/tags";
import EntitiesList from "../entities_list";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import "./style.css";
import AdminModeEmptyField from "../../../utils/empty_fields/admin_mode_emty_field";
import NoSearchResultsField from "../../../utils/empty_fields/no_search_results_field";

const Tags = (props) => {
  const [tag, setTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    props.set("admin/tags", getTags);
  }, []);

  return (
    <div>
      <EntitiesList
        label={"Tags"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        path={"admin/tags"}
        setter={getTags}
      >
        <div className="create-tag">
          <TextField
            style={{ marginLeft: "10px" }}
            value={tag}
            label={"create new tag"}
            variant="outlined"
            onChange={(e) => setTag(e.target.value)}
          />
          <IconButton
            style={{ marginLeft: "10px" }}
            onClick={() => {
              props.post({ name: tag }, "admin/tags", createTag);
              setTag("");
            }}
          >
            <CreateOutlinedIcon />
          </IconButton>
          <hr />
        </div>
        <div>
          {props.tags.length ? (
            <ul className="tag-list">
              {props.tags.map((el) => (
                <li key={el.id} className="tag-list-item">
                  <TagItem el={el} />
                </li>
              ))}
            </ul>
          ) : !props.tags.length ? (
            <AdminModeEmptyField label={"tags"} />
          ) : (
            <NoSearchResultsField label={"tags"} />
          )}
        </div>
      </EntitiesList>
    </div>
  );
};

export default connect(
  (state) => ({
    tags: state.tags.tags,
  }),
  (dispatch) => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Tags);
