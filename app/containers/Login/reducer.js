/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN,
  WHOAMI,
  WHOAMI_SUCCESS,
  WHOAMI_FAIL,

  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from './constants';

let login = false;
if(window.localStorage.getItem('whoami_phoneNumber') != null) {
  login = true;
}

const initialState = fromJS({
  loginFetching: false,
  loginError: null,
  login,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('loginFetching', true)
              .set('loginError', null)
    case WHOAMI:
      return state.set('loginFetching', true)
              .set('loginError', null)
    case WHOAMI_SUCCESS:
      return state.set('loginFetching', false)
              .set('login', true)
    case WHOAMI_FAIL:
      return state.set('loginFetching', false)
              .set('login', false) 
              .set('loginError', action.error)
    default:
      return state;
  }
}

export default loginReducer;
