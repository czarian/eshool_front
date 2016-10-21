import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import SignupPage from './containers/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
/*import NewEventPage from './components/events/NewEventPage';
*/

//import requireAuth from './utils/requireAuth';
//*<Route path="new-event" component={requireAuth(NewEventPage)} />*/
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />

  </Route>
)
