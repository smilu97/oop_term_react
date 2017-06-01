import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = () => (state) => state.get('login');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

const selectLoginFetching = () => createSelector(
  selectLoginDomain(),
  state => state.get('loginFetching')
)
const selectLoginError = () => createSelector(
  selectLoginDomain(),
  state => state.get('loginError')
)
const selectLogin = () => createSelector(
  selectLoginDomain(),
  state => state.get('login')
)

export default makeSelectLogin;
export {
  selectLoginDomain,
  selectLoginFetching,
  selectLoginError,
  selectLogin,
};
