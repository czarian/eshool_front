import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import SignupPage from './containers/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import Courses from './components/courses/Courses';
import CourseList from './containers/courses/CourseList';
import NewCourse from './containers/courses/NewCourse';
/*import NewEventPage from './components/events/NewEventPage';
*/

import requireAuth from './containers/auth/AuthorizedContainer';
//*<Route path="new-event" component={requireAuth(NewEventPage)} />*/
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route roles={['admin']} name="courses" path="courses" component={requireAuth(Courses)} >
      <Route name="newCourse" path="/newCourse" component={requireAuth(NewCourse)} />
      <Route roles={['regullar']} name="courseList" path="/courseList" component={requireAuth(CourseList)} />
    </Route>


  </Route>
)
