import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
);
export const makeSelectContactsFetching = () => createSelector(
  selectHomePageDomain(),
  state => state.get('contactsFetching'),
);
export const makeSelectContactsError = () => createSelector(
  selectHomePageDomain(),
  state => state.get('contactsError'),
);
export const makeSelectContacts = () => createSelector(
  selectHomePageDomain(),
  state => state.get('contacts'),
);

export default makeSelectHomePage;
