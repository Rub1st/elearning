import { IconButton } from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { createReply } from '../../../../../../../../main_redux/actions/comments'
import { getData, postDataElement } from '../../../../../../../../main_redux/actions/server_connections'
import './reply_input.css'

const ReplyInput = (props) => {
  const [replyInput, setReplyInput] = useState('')

  let newReply = {
    comment_id: props.el.id,
    author_id: props.currentUser.id,
    content: replyInput
  }

  return(
    <div className='comment__reply-input-position d-flex'>
      <input onChange={(e) => setReplyInput(e.target.value)}
             value={replyInput}
             className='comment__reply-input'/>

      <IconButton className='comment__reply-input-button btn btn-light'
              onClick={() => {
                  props.post(newReply, 'replies', createReply)
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
}),
dispatch => ({
  post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
  set: (path, setter) => dispatch(getData(path, setter)),
})
)(ReplyInput)