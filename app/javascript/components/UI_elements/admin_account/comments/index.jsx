import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getComments } from '../../../../main_redux/actions/comments'
import { getData } from '../../../../main_redux/actions/server_connections'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field'
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field'
import EntitiesList from '../entities_list'
import CommentItem from './comment_item'
import './style.css'

const Comments = (props) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    props.set('admin/comments', getComments);
  }, []);

  return(
    <div>
      <EntitiesList label={'Comments'}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    path={'admin/comments'}
                    setter={getComments}>
        {
          props.comments.length ?
          <ul className='comment-list'>
          {
            props.comments.map(el => <li key={el.id} className='comment-list-item'>
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
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Comments)