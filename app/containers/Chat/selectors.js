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
  (substate) => substate.get('room'),
);

export default makeSelectChat;
