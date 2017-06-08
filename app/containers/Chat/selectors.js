import { createSelector } from 'reselect';

/**
 * Direct selector to the chat state domain
 */
const selectChatDomain = () => (state) => state.get('chat');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Chat
 */

const makeSelectChat = () => createSelector(
  selectChatDomain(),
  (substate) => substate.toJS()
);
export const makeSelectFetching = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('fetching'),
);
export const makeSelectError = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('error'),
);
export const makeSelectMessages = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('messages').toJS(),
);
export const makeSelectRoom = () => createSelector(
  selectChatDomain(),
  (substate) => (substate.get('room') && substate.get('room').toJS()),
);
export const makeSelectInviting = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('inviting'),
);
export const makeSelectInviteError = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('inviteError'),
);
export const makeSelectExiting = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('exiting'),
);
export const makeSelectExitError = () => createSelector(
  selectChatDomain(),
  (substate) => substate.get('exitError'),
);


export default makeSelectChat;
