import React from 'react'
import { connect } from 'react-redux';
import CommentItem from './comment_item';
import CommentInput from './comment_input';
import './comments_field.css';
import UserModeEmptyField from '../../../../../utils/empty_fields/user_mode_empty_field';

const CommentsField = (props) => {
  let course_comments = props.comments.filter(el => el.course.id === props.currentCourse.id)
  return(
    <div className='course__comment-position'>
      <span className='course__comment-header'>feedbacks</span>
      {
        course_comments.length ?
        <ul className='course__comment-list'>
        {
          course_comments.map(el => <li key={el.id}><CommentItem props={el}/></li>)
        }
        </ul> :
        <div className='course__comment-list'>
          <UserModeEmptyField label={'комментариев'}/>
        </div>
      }
      <CommentInput/>
    </div>
  )
}

export default connect(
  state => ({
    currentCourse: state.courses.currentCourse,
    comments: state.comments.comments,
})
)(CommentsField);