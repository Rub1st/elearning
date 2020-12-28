import { IconButton, Tooltip } from '@material-ui/core'
import { Delete, ExpandMore } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import { dropComment } from '../../../../../../../main_redux/actions/comments'
import { destroyDataElement, destroyDataElementWithQuery } from '../../../../../../../main_redux/actions/server_connections'
import CommentIcon from '@material-ui/icons/Comment';
import './comment_buttons.css'
import { useTranslation } from 'react-i18next'

const CommentButtons = (props) => {

  const {replyCount, giveReply, setGiveReply, viewReplies, setViewReplies} = props

  const { t, i18n } = useTranslation();

  return(
    <>
        <div className='d-flex'>
          <Tooltip title={t("Tooltip.34")}>
            <IconButton className='comment__give-reply-button' onClick={() => setGiveReply(!giveReply)}>
              <CommentIcon/>
            </IconButton>
          </Tooltip>
          {
            replyCount ?
            (
            <Tooltip title={t("Tooltip.31")}>
              <IconButton onClick={() => setViewReplies(!viewReplies)}>
                <ExpandMore />
              </IconButton>
            </Tooltip>
            ) : null
          }
          {
            props.currentUser.id === props.comment.author.id ?
            <Tooltip title={t("Tooltip.32")}>
              <IconButton onClick={() => props.drop(props.comment.id, props.currentCourse.id, 'comments', dropComment)}>
                <Delete/>
              </IconButton>
            </Tooltip>
               : null
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