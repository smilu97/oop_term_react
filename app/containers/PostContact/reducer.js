/*
 *
 * PostContact reducer
 *
 */

import { fromJS } from 'immutable';
import {
  POST_CONTACT,
  POST_CONTACT_SUCCESS,
  POST_CONTACT_FAIL,
} from './constants';

const initialState = fromJS({});

function postContactReducer(state = initialState, action) {
  switch (action.type) {
    case POST_CONTACT:
      return state.set('postContactFetching', true)
              .set('postContactError', null);
    case POST_CONTACT_SUCCESS:
      return state.set('postContactFetching', false);
    case POST_CONTACT_FAIL:
      return state.set('postContactFetching', false)
              .set('postContactError', action.error);
    default:
      return state;
  }
}

export default postContactReducer;
