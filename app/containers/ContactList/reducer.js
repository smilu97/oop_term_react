/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CONTACTS,
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
} from './constants';

const initialState = fromJS({
  contactsFetching: false,
  contactsError: null,
  contacts: null,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTACTS:
      return state.set('contactsFetching', true)
              .set('contactsError', null);
    case LOAD_CONTACTS_SUCCESS:
      return state.set('contactsFetching', false)
              .set('contacts', action.contacts);
    case LOAD_CONTACTS_FAIL:
      return state.set('contactsFetching', false)
              .set('contactsError', action.error);
    default:
      return state;
  }
}

export default homePageReducer;
