import axios from 'axios';
import { SET_COURSE_LIST, ADD_COURSE } from './types';


export function setCourseList(courseList) {
  return {
    type: SET_COURSE_LIST,
    courseList
  };
}

export function addCourse(course){
  return {
    type: ADD_COURSE,
    course
  }

}

export function getCourseList() {
  return dispatch => {
    return axios.get('api/v1/courses').then(res => {
      const courseList = res.data
      dispatch(setCourseList(courseList));
    });
  }
}


export function createCourseRequest(courseData) {
  return dispatch => {
    return axios.post('api/v1/courses', courseData).then(res => {
      const course = res.data;
      dispatch(addCourse(course));
    });
  }
}


