import React, { useState } from 'react'
import { connect } from 'react-redux'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field'
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field'
import EntitiesList from '../entities_list'
import ImpersonationItem from './impersonationItem'

let impersonationFilter = (impersons, searchQuery) => impersons
.filter(e => e.organization.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery.length)


const Impersonations = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  return(
    <div>
      <EntitiesList label={'Impersonations'} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <div className='field'>
        {
          impersonationFilter(props.impersonations, searchQuery).length ?
          <ul className='admin-user-list'>
          {
            impersonationFilter(props.impersonations, searchQuery).map(el =>
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
  })
)(Impersonations)