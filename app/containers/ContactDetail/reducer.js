/*
 *
 * ContactDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CONTACT,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_FAIL,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  LOAD_OTO_ROOM,
  LOAD_OTO_ROOM_SUCCESS,
  LOAD_OTO_ROOM_FAIL,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: null,
  contact: null,

  deleting: false,
  deleteError: null,

  otoRoom: null,
  fetchingOto: false,
  otoError: null,
});

function contactDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTACT:
      return state.set('fetching', true)
              .set('error', null)
              .set('contact', null);
    case LOAD_CONTACT_SUCCESS:
      return state.set('fetching', false)
              .set('contact', action.contact);
    case LOAD_CONTACT_FAIL:
      return state.set('fetching', false)
              .set('error', action.error);
    case DELETE_CONTACT:
      return state.set('deleting', true)
              .set('deleteError', null);
    case DELETE_CONTACT_SUCCESS:
      return state.set('deleting', false);
    case DELETE_CONTACT_FAIL:
      return state.set('deleting', false)
              .set('deleteError', action.error);
    case LOAD_OTO_ROOM:
      return state.set('fetchingOto', true)
              .set('otoError', null);
    case LOAD_OTO_ROOM_SUCCESS:
      return state.set('fetchingOto', false)
              .set('otoRoom', action.otoRoom);
    case LOAD_OTO_ROOM_FAIL:
      return state.set('fetchingOto', false)
              .set('otoError', action.error);
    default:
      return state;
  }
}

export default contactDetailReducer;
