import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { updateDataElement } from "../../../../../main_redux/actions/server_connections";
import { editTag } from "../../../../../main_redux/actions/tags";
import TextField from "@material-ui/core/TextField";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const TagItem = (props) => {
  let { el } = props;

  const classes = useStyles();
  const [tag, setTag] = useState(el.name);

  return (
    <Card className={classes.root}>
      <CardHeader title={el.name} subheader={el.created_at} />
      <CardActions disableSpacing>
        <TextField
          label={"edit tag"}
          value={tag}
          variant="outlined"
          onChange={(e) => setTag(e.target.value)}
        />
        {el.name !== tag && (
          <IconButton
            onClick={() =>
              props.put(
                { id: el.id, tag: { name: tag } },
                "admin/tags",
                editTag
              )
            }
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default connect(
  (state) => ({
    organizations: state.organizations.organizations,
  }),
  (dispatch) => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(TagItem);
