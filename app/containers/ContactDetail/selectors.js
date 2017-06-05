import { createSelector } from 'reselect';

/**
 * Direct selector to the contactDetail state domain
 */
export const selectContactDetailDomain = () => (state) => state.get('contactDetail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ContactDetail
 */

export const makeSelectContactDetail = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.toJS()
);
export const makeSelectFetching = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('fetching'),
);
export const makeSelectError = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('error'),
);
export const makeSelectContact = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('contact'),
);
export const makeSelectDeleting = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('deleting'),
);
export const makeSelectDeleteError = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('deleteError'),
);
export const makeSelectOtoRoom = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('otoRoom'),
);
export const makeSelectFetchingOto = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('fetchingOto'),
);
export const makeSelectOtoError = () => createSelector(
  selectContactDetailDomain(),
  (substate) => substate.get('otoError'),
);

export default makeSelectContactDetail;
