/*
 *
 * SignUp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from './constants';

const initialState = fromJS({
  signupFetching: false,
  signupError: null,
});

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return state.set('signupFetching', true)
              .set('signupError', null);
    case SIGNUP_SUCCESS:
      return state.set('signupFetching', false);
    case SIGNUP_FAIL:
      return state.set('signupFetching', false)
              .set('signupError', action.error);
    default:
      return state;
  }
}

export default signUpReducer;
