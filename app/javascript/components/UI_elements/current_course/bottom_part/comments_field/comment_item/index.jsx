import { Card } from "@material-ui/core";
import React, { useState } from "react";
import CommentButtons from "./comment_buttons";
import CommentContent from "./comment_content";
import "./comment_item.css";
import CommentReplies from "./comment_replies";
import ReplyInput from "./reply_input";

const CommentItem = ({ props }) => {
  const [giveReply, setGiveReply] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);

  let replyCount = props.replies.length;

  return (
    <>
      <Card className="comment__position">
        <CommentContent props={props} />
        <CommentButtons
          replyCount={replyCount}
          giveReply={giveReply}
          viewReplies={viewReplies}
          setGiveReply={setGiveReply}
          setViewReplies={setViewReplies}
          comment={props}
        />
      </Card>
      {giveReply ? <ReplyInput setGiveReply={setGiveReply} el={props} /> : null}
      {viewReplies ? <CommentReplies replies={props.replies} /> : null}
    </>
  );
};

export default CommentItem;
