import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { connect } from "react-redux";
import {
  destroyDataElement,
  updateDataElement,
} from "../../../../../main_redux/actions/server_connections";
import {
  dropUser,
  updateUserStatus,
} from "../../../../../main_redux/actions/users";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import BlockIcon from "@material-ui/icons/Block";
import { DateFormat } from "../../../../utils/helpful_functions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const UserItem = (props) => {
  let { el } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {el.login[0]}
          </Avatar>
        }
        action={
          <object
            src={el.certificate_template_url}
            type="application/x-pdf"
            title="SamplePdf"
            width="500"
            height="720"
          >
            <a
              href={el.certificate_template_url}
              style={{ marginRight: "15px", marginTop: "10px" }}
            >
              open
            </a>
          </object>
        }
        title={el.login}
        subheader={el.full_name}
      />
      <embed src={el.certificate_template_url} width="350" height="240" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          email: {el.email}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          registration data: {DateFormat(el.created_at)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.choice === 0 && (
          <IconButton
            onClick={() =>
              props.put(props.newEl, `admin/users`, updateUserStatus)
            }
          >
            <BlockIcon />
          </IconButton>
        )}
        {props.choice === 1 && (
          <IconButton
            onClick={() =>
              props.put(props.newEl, "admin/users", updateUserStatus)
            }
          >
            <FavoriteBorderOutlined />
          </IconButton>
        )}
        <IconButton onClick={() => props.drop(el.id, "admin/users", dropUser)}>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default connect(
  (state) => ({
    courses: state.courses.courses,
  }),
  (dispatch) => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(UserItem);
