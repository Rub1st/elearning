import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { connect } from "react-redux";
import { destroyDataElement } from "../../../../../main_redux/actions/server_connections";
import {
  dropComment,
  dropReply,
} from "../../../../../main_redux/actions/comments";
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
  reply: {
    width: 345,
    maxHeight: 250,
    overflowY: "auto",
  },
}));

const CommentItem = (props) => {
  let { el } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {el.author.login[0]}
          </Avatar>
        }
        title={el.author.login}
        subheader={el.course.label}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {el.content}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {DateFormat(el.created_at)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => props.drop(el.id, "admin/comments", dropComment)}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
        {el.replies.length !== 0 && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <hr />
        <CardContent className={classes.reply}>
          <ol style={{ marginLeft: "0px" }}>
            {el.replies.map((e) => (
              <li>
                <CardContent className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {e.author.login[0]}
                      </Avatar>
                    }
                    title={e.author.login}
                    subheader={DateFormat(e.created_at)}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {e.content}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() =>
                        props.drop(e.id, "admin/replies", dropReply)
                      }
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </CardActions>
                </CardContent>
                <hr />
              </li>
            ))}
          </ol>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default connect(
  (state) => ({
    courses: state.courses.courses,
  }),
  (dispatch) => ({
    drop: (id, path, setter) => dispatch(destroyDataElement(id, path, setter)),
  })
)(CommentItem);
