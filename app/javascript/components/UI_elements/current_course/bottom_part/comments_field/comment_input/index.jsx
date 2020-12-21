import { IconButton } from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { createComment, updateCommentInput } from '../../../../../../main_redux/actions/comments'
import { getData, postDataElement, postDataElementWithQuery } from '../../../../../../main_redux/actions/server_connections'
import './comment_input.css'

const CommentInput = (props) => {

  let newComment = {
    course_id: props.currentCourse.id,
    author_id: props.currentUser.id,
    content: props.commentInput,
}

console.log(props.errors)


  return(
    <div className='comment__input-position'>
      <TextField className='comment__input'
                error={props.errors.content != undefined}
                multiline
                rows={3}
                variant={'outlined'}
                helperText={props.errors.content != undefined ? props.errors.content[0] : null}
                onChange={(e) => props.updateCommentInput(e.target.value)}
                value={props.commentInput}/>

      <IconButton onClick={() => props.post(newComment, props.currentCourse.id, 'comments', createComment)}
                  className='comment__input-button btn btn-light'>
        <SendOutlined/>
      </IconButton>
    </div>
  )
}

export default connect(
  state => ({
    currentCourse: state.courses.currentCourse,
    currentUser: state.users.currentUser,
    commentInput: state.comments.commentInput,
    errors: state.errors.errors
}),
dispatch => ({
  updateCommentInput: (newValue) => dispatch(updateCommentInput(newValue)),
  post: (obj, parrentId, path, setter) => dispatch(postDataElementWithQuery(obj, parrentId, path, setter)),
  set: (path, setter) => dispatch(getData(path, setter)),
})
)(CommentInput)