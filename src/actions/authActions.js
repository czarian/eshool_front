import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    return axios.delete('/api/v1/users/sign_out').then(res => {
      localStorage.removeItem('user');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
    });
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('api/v1/users/sign_in', data).then(res => {
      const user = { 'name': res.data.user.first_name,
                     'surname': res.data.user.last_name,
                     'role': res.data.user.role,
                     'token': res.data.token
                   };
      localStorage.setItem('user', JSON.stringify(user));
      setAuthorizationToken(user.token);
      dispatch(setCurrentUser(user));
    });
  }
}

