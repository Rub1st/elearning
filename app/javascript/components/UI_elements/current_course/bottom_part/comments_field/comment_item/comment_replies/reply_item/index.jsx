import { IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import { dropReply } from '../../../../../../../../main_redux/actions/comments'
import { destroyDataElementWithQuery } from '../../../../../../../../main_redux/actions/server_connections'
import { DateFormat } from '../../../../../../../utils/helpful_functions'
import './reply_item.css'

const ReplyItem = (props) => {
  let {el} = props
  console.log(props)
  return(
    <div className='comment__position'>
      <div className='d-flex comment__top-field'>
        <div className='comment__auhtor'>
          {el.author.login}
        </div>
        <div className='comment__datetime'>
          {DateFormat(el.created_at)}
        </div>
        {
          props.currentUser.id === el.author.id ?
          <IconButton onClick={() => props.drop(el.id, props.currentCourse.id, 'replies', dropReply)}>
          <Delete/>
        </IconButton> : null
        }
      </div>
      <div className='comment__content'>
        {el.content}
      </div>
    </div>
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
)(ReplyItem);