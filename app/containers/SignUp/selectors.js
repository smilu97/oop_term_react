import { createSelector } from 'reselect';

/**
 * Direct selector to the signUp state domain
 */
export const selectSignUpDomain = () => (state) => state.get('signUp');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignUp
 */

export const makeSelectSignUp = () => createSelector(
  selectSignUpDomain(),
  (substate) => substate.toJS()
);

export const makeSelectSignUpFetching = () => createSelector(
  selectSignUpDomain(),
  (state) => state.get('signupFetching')
);

export const makeSelectSignUpError = () => createSelector(
  selectSignUpDomain(),
  (state) => state.get('signupError')
);

export default makeSelectSignUp;
