import { IconButton } from '@material-ui/core'
import { Delete, ExpandMore } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import { dropComment } from '../../../../../../../main_redux/actions/comments'
import { destroyDataElement, destroyDataElementWithQuery } from '../../../../../../../main_redux/actions/server_connections'
import CommentIcon from '@material-ui/icons/Comment';
import './comment_buttons.css'

const CommentButtons = (props) => {

  const {replyCount, giveReply, setGiveReply, viewReplies, setViewReplies} = props

  return(
    <>
        <div className='d-flex'>
          <IconButton className='comment__give-reply-button' onClick={() => setGiveReply(!giveReply)}>
            <CommentIcon/>
          </IconButton>
          {
            replyCount ?
            (<IconButton onClick={() => setViewReplies(!viewReplies)}>
              <ExpandMore />
            </IconButton>) : null
          }
          {
            props.currentUser.id === props.comment.author.id ?
            <IconButton onClick={() => props.drop(props.comment.id, props.currentCourse.id, 'comments', dropComment)}>
              <Delete/>
            </IconButton> : null
          }
        </div>
    </>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    currentCourse: state.courses.currentCourse,
  }),
  dispatch =>({
    drop: (id, parrentId, path, setter) => dispatch(destroyDataElementWithQuery(id, parrentId, path, setter)),
  })
)(CommentButtons);