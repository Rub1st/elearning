import { IconButton } from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { createReply } from '../../../../../../../main_redux/actions/comments'
import { getData, getDataWithQuery, postDataElement, postDataElementWithQuery } from '../../../../../../../main_redux/actions/server_connections'
import './reply_input.css'

const ReplyInput = (props) => {
  const [replyInput, setReplyInput] = useState('')

  let newReply = {
    comment_id: props.el.id,
    author_id: props.currentUser.id,
    content: replyInput
  }

  console.log(props.errors)

  return(
    <div className='comment__reply-input-position d-flex'>
      <TextField onChange={(e) => setReplyInput(e.target.value)}
                 error={props.errors.content != undefined}
                 helperText={props.errors.content != undefined ? props.errors.content[0] : null}
                 value={replyInput}
                 className='comment__reply-input'/>

      <IconButton className='comment__reply-input-button btn btn-light'
              onClick={() => {
                  props.post(newReply, props.currentCourse.id, 'replies', createReply)
                  setReplyInput('');
                  props.setGiveReply(false);
                }
              }>
                <SendOutlined/>
              </IconButton>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    currentCourse: state.courses.currentCourse,
    errors: state.errors.errors
}),
dispatch => ({
  post: (obj, parrentId, path, setter) => dispatch(postDataElementWithQuery(obj, parrentId, path, setter)),
})
)(ReplyInput)