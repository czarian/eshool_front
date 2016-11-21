import { SET_COURSE_LIST, ADD_COURSE } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action = {}) => {
  switch(action.type) {
    case SET_COURSE_LIST:
      const newCourseList = _.mapKeys(action.courseList, 'id');
      return {...state, ...newCourseList };

    case ADD_COURSE:
      console.log(action);
      return {...state, [action.course.id]: action.course }

    default: return state;
  }
}
