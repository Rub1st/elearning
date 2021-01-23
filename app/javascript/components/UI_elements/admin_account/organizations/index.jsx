import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getData, updateDataElement } from '../../../../main_redux/actions/server_connections'
import EntitiesList from '../entities_list'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrganizationItem from './organizationItem'
import './style.css'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field';
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field';
import { getOrganizations } from '../../../../main_redux/actions/organizations';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1550
  },
}));

let orgFilter = (orgs, status) => orgs.filter(el => el.approve_status === status)

const Organizations = (props) => {

  const classes = useStyles();
  const [value, setValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    props.set('admin/organizations', getOrganizations);
  }, []);

  return(
    <div>
      <EntitiesList label={'Organizations'}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    path={'admin/organizations'}
                    setter={getOrganizations}>
      <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Pending Organizations" className='case-tab' onClick={() => setValue(0)}/>
          <Tab label="Approved Organizations" className='case-tab' onClick={() => setValue(1)}/>
          <Tab label="Rejected Organizations" className='case-tab' onClick={() => setValue(2)}/>
        </Tabs>
      </AppBar>
    </div>
    <div className='field'>
      {
        value === 0 ?
        <div>
          {
            orgFilter(props.organizations, 'pending').length ?
            <ul className='admin-org-list'>
            {
              orgFilter(props.organizations, 'pending').map(el =>
              <li key={el.id} className='admin-course-list-position'>
                <OrganizationItem choice={value} el={el} newEl2={{ id: el.id, organization: {approve_status: 2}}} newEl={{ id: el.id, organization: {approve_status: 1}}}/>
              </li>)
            }
            </ul> : !props.organizations.filter(e => e.approve_status === 'pending').length ?
            <AdminModeEmptyField label={'organizations'}/> :
            <NoSearchResultsField label={'organizations'}/>
          }
        </div> :
      value === 1 ?
      <div>
        {
          orgFilter(props.organizations, 'approved').length ?
          <ul className='admin-org-list'>
          {
            orgFilter(props.organizations, 'approved').map(el =>
            <li key={el.id} className='admin-course-list-position'>
              <OrganizationItem choice={value} el={el} newEl={{ id: el.id, organization: {approve_status: 1}}}/>
            </li>)
          }
          </ul> : !props.organizations.filter(e => e.approve_status === 'approved').length ?
           <AdminModeEmptyField label={'organizations'}/> :
           <NoSearchResultsField label={'organizations'}/>
        }
      </div> :
      <div>
      {
        orgFilter(props.organizations, 'rejected').length ?
        <ul className='admin-org-list'>
        {
          orgFilter(props.organizations, 'rejected').map(el =>
          <li key={el.id} className='admin-course-list-position'>
            <OrganizationItem choice={value} el={el} newEl={{ id: el.id, organization: {approve_status: 2}}}/>
          </li>)
        }
        </ul> : !props.organizations.filter(e => e.approve_status === 'rejected').length ?
         <AdminModeEmptyField label={'organizations'}/> :
         <NoSearchResultsField label={'organizations'}/>
      }
    </div>
      }
    </div>
    </EntitiesList>
    </div>

  )
}

export default connect(
  state => ({
    organizations: state.organizations.organizations,
  }),
  dispatch => ({
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Organizations)