/*
 *
 * HomePage actions
 *
 */

import {
  LOAD_CONTACTS,
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
} from './constants';

// load Contacts
export const loadContacts = () => ({
  type: LOAD_CONTACTS,
});
export const loadContactsSuccess = (contacts) => ({
  type: LOAD_CONTACTS_SUCCESS,
  contacts,
});
export const loadContactsFail = (error) => ({
  type: LOAD_CONTACTS_FAIL,
  error,
});
