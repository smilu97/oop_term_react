import { createSelector } from 'reselect';

/**
 * Direct selector to the postContact state domain
 */
const selectPostContactDomain = () => (state) => state.get('postContact');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PostContact
 */

const makeSelectPostContact = () => createSelector(
  selectPostContactDomain(),
  (substate) => substate.toJS()
);

export const makeSelectPostContactFetching = () => createSelector(
  selectPostContactDomain(),
  (state) => state.get('postContactFetching'),
);
export const makeSelectPostContactError = () => createSelector(
  selectPostContactDomain(),
  (state) => state.get('postContactError'),
);

export default makeSelectPostContact;
export {
  selectPostContactDomain,
};
