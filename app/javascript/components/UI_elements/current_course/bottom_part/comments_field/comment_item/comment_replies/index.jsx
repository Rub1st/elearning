import React from 'react'
import './comment_replies.css'
import ReplyItem from './reply_item'

const CommentReplies = ({replies}) => (
  <div className='comment__reply-list-position'>
    <ul className='comment__reply-list'>
      {
        replies.map(el =>
          <li key={el.id}>
            <ReplyItem el={el}/>
          </li>)
      }
    </ul>
  </div>
)

export default CommentReplies;