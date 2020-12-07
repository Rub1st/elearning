import React from 'react'
import SideBarProfile from './sidebar'
import MainPage from './main_page'
import MyCourses from './my_courses'
import DoneCourses from './done_courses'
import CurrentCourses from './current_courses'
import RecommendedCourses from './recommended_courses'
import Organizations from './organizations'
import Certificates from './certificates'
import Settings from './settings'
import FavoriteCourses from './favorite_courses'
import OrganizationManaging from './organizations/organization_managing'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css'

const Profile = (props) => {
  let path = `/user_id=${props.currentUser.id}/`
  return(
    <div className='profile-window'>
      <div className='profile-sidebar-position'>
        <SideBarProfile/>
      </div>
      <div className='profile-field'>
        <Switch>
          <Route exact path={`${path}home`} component={MainPage}/>
          <Route exact path={`${path}my_courses`} component={MyCourses}/>
          <Route exact path={`${path}done_courses`} component={DoneCourses}/>
          <Route exact path={`${path}current_courses`} component={CurrentCourses}/>
          <Route exact path={`${path}favorite_courses`} component={FavoriteCourses}/>
          <Route exact path={`${path}recomended_courses`} component={RecommendedCourses}/>
          <Route exact path={`${path}organizations`} component={Organizations}/>
          <Route exact path={`${path}certificates`} component={Certificates}/>
          <Route exact path={`${path}settings`} component={Settings}/>
          <Route exact path={`${path}manage_organization_id=${props.currentOrganization.id}`} component={OrganizationManaging}/>
        </Switch>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    currentOrganization: state.organizations.currentOrganization,
  })
)(Profile);
