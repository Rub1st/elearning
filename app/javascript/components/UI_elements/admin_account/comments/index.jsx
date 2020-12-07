import React, { useState } from 'react'
import { connect } from 'react-redux'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field'
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field'
import EntitiesList from '../entities_list'
import CommentItem from './comment_item'
import './style.css'

let commentsFilter = (comments, searchQuery) => comments
.filter(e => e.content.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery.length)

const Comments = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  return(
    <div>
      <EntitiesList label={'Comments'} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        {
          commentsFilter(props.comments, searchQuery).length ?
          <ul className='comment-list'>
          {
            commentsFilter(props.comments, searchQuery).map(el => <li key={el.id} className='comment-list-item'>
            <CommentItem el={el}/>
            </li>)
          }
          </ul> : !props.comments.length ?
          <AdminModeEmptyField label={'комментариев'}/> :
          <NoSearchResultsField label={'комментариев'}/>
        }
        </EntitiesList>
    </div>

  )
}

export default connect(
  state => ({
    comments: state.comments.comments,
  }),
)(Comments)