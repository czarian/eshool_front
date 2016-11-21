import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import courses from './reducers/courses';

export default combineReducers({
  flashMessages,
  auth,
  courses
});
