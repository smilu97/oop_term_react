/*
 *
 * Login actions
 *
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  WHOAMI,
  WHOAMI_SUCCESS,
  WHOAMI_FAIL,
} from './constants';

export const login = (phoneNumber, password) => ({
  type: LOGIN,
  phoneNumber,
  password,
});
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});
export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const whoami = () => ({
  type: WHOAMI,
});
export const whoamiSuccess = (user) => ({
  type: WHOAMI_SUCCESS,
  user,
});
export const whoamiFail = (error) => ({
  type: WHOAMI_FAIL,
  error,
});
