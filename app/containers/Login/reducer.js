/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  WHOAMI,
  WHOAMI_SUCCESS,
  WHOAMI_FAIL,
} from './constants';

const initialState = fromJS({
  loginFetching: false,
  loginError: null,

  whoamiFetching: false,

  user: null,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('loginFetching', true)
              .set('loginError', null);
    case LOGIN_SUCCESS:
      return state.set('loginFetching', false)
              .set('user', action.user);
    case LOGIN_FAIL:
      return state.set('loginFetching', false)
              .set('loginError', action.error);
    case LOGOUT:
      return state.set('user', null);
    case WHOAMI:
      return state.set('whoamiFetching', false);
    case WHOAMI_SUCCESS:
      return state.set('whoamiFetching', true);
    case WHOAMI_FAIL:
      return state.set('whoamiFetching', true);
    default:
      return state;
  }
}

export default loginReducer;
