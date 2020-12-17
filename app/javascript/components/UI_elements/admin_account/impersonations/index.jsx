import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getImpersonations } from '../../../../main_redux/actions/impersonations'
import { getData } from '../../../../main_redux/actions/server_connections'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field'
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field'
import EntitiesList from '../entities_list'
import ImpersonationItem from './impersonationItem'

const Impersonations = (props) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    props.set('admin/impersonations', getImpersonations);
  }, []);

  return(
    <div>
      <EntitiesList label={'Impersonations'}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    path={'admin/impersonations'}
                    setter={getImpersonations}>
        <div className='field'>
        {
          props.impersonations.length ?
          <ul className='admin-user-list'>
          {
            props.impersonations.map(el =>
            <li key={el.id} className='admin-user-list-position'>
              <ImpersonationItem el={el}/>
            </li>)
          }
          </ul> : !props.impersonations.length ?
          <AdminModeEmptyField label={'имперсонаций'}/> :
          <NoSearchResultsField label={'имперсонаций'}/>
        }
        </div>
      </EntitiesList>
    </div>

  )
}

export default connect(
  state => ({
    impersonations: state.impersonations.impersonations
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Impersonations)