/*
 *
 * Login actions
 *
 */

import {
  LOGIN,
  WHOAMI,
  WHOAMI_SUCCESS,
  WHOAMI_FAIL,
} from './constants';

export const login = (phoneNumber, password) => ({
  type: LOGIN,
  phoneNumber, password,
})
export const whoami = () => ({
  type: WHOAMI,
})
export const whoamiSuccess = () => ({
  type: WHOAMI_SUCCESS,
})
export const whoamiFail = (error) => ({
  type: WHOAMI_FAIL,
  error,
})