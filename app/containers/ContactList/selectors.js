import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectContactListDomain = () => (state) => state.get('contactList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

export const makeSelectContactList = () => createSelector(
  selectContactListDomain(),
  (substate) => substate.toJS()
);
export const makeSelectContactsFetching = () => createSelector(
  selectContactListDomain(),
  (state) => state.get('contactsFetching'),
);
export const makeSelectContactsError = () => createSelector(
  selectContactListDomain(),
  (state) => state.get('contactsError'),
);
export const makeSelectContacts = () => createSelector(
  selectContactListDomain(),
  (state) => state.get('contacts'),
);


export default makeSelectContactList;
