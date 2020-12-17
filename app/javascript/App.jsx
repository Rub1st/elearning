import React, { useEffect } from "react"
import Wrapper from './components/utils/wrapper';
import CreateCourse from './components/UI_elements/create_course'
import Profile from './components/UI_elements/profile'
import Catalog from './components/UI_elements/catalog'
import { Switch, Route } from 'react-router-dom';
import CreateOrganization from './components/UI_elements/create_organization';
import CoursePages from './components/UI_elements/course_pages';
import CreateCourseTreePages from './components/UI_elements/create_course/create_course_tree_pages'
import { connect } from 'react-redux';
import AdminAccount from './components/UI_elements/admin_account';
import Courses from './components/UI_elements/admin_account/courses';
import Users from './components/UI_elements/admin_account/users';
import Organizations from './components/UI_elements/admin_account/organizations';
import Tags from './components/UI_elements/admin_account/tags';
import Comments from './components/UI_elements/admin_account/comments';
import Impersonations from './components/UI_elements/admin_account/impersonations';
import CurrentCourse from './components/UI_elements/current_course'
import { setCurrentUser } from "./main_redux/actions/users";

function App(props){

  useEffect(() => {
    props.setCurrentUser(props.current_user);
  }, []);

    return(
      <div>
            {
              props.current_user.user_role === 'common' ?
              (
                <Wrapper>
                  <Switch>
                    <Route exact path='/' component={Catalog}/>
                    <Route path='/create_course' component={CreateCourse}/>
                    <Route path='/create_organization' component={CreateOrganization}/>
                    <Route path={`/user_id=${props.currentUser.id}`} component={Profile}/>
                    <Route path={`/main_page/course_id=${props.currentCourse.id}`} component={CurrentCourse}/>
                    <Route path={`/course_id=${props.currentCourse.id}`} component={CoursePages}/>
                    <Route path={`/draft_course_id=${props.currentDraftCourse.id}`} component={CreateCourseTreePages}/>
                  </Switch>
                </Wrapper>
                ) :
                (
                  <Switch>
                    <Route exact path='/' component={AdminAccount}/>
                    <Route exact path={`/catalog/courses`} component={Courses}/>
                    <Route exact path={`/catalog/users`} component={Users}/>
                    <Route exact path={`/catalog/organizations`} component={Organizations}/>
                    <Route exact path={`/catalog/tags`} component={Tags}/>
                    <Route exact path={`/catalog/comments`} component={Comments}/>
                    <Route exact path={`/catalog/impersonations`} component={Impersonations}/>
              </Switch>
                )
            }
      </div>
    )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    currentCourse: state.courses.currentCourse,
    currentDraftCourse: state.courses.currentDraftCourse,
}),
dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})
)(App)
