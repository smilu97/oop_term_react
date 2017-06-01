/*
 *
 * SignUp actions
 *
 */

import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from './constants';

export const signup = (name, phoneNumber, password) => ({
  type: SIGNUP,
  name, phoneNumber, password,
})
export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
})
export const signupFail = (error) => ({
  type: SIGNUP_FAIL,
  error,
})