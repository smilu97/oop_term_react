import { createSelector } from 'reselect';

/**
 * Direct selector to the postChatRoom state domain
 */
export const selectPostChatRoomDomain = () => (state) => state.get('postChatRoom');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PostChatRoom
 */

export const makeSelectPostChatRoom = () => createSelector(
  selectPostChatRoomDomain(),
  (substate) => substate.toJS()
);
export const makeSelectFetching = () => createSelector(
  selectPostChatRoomDomain(),
  (substate) => substate.get('fetching')
);
export const makeSelectError = () => createSelector(
  selectPostChatRoomDomain(),
  (substate) => substate.get('error')
);
export const makeSelectRoom = () => createSelector(
  selectPostChatRoomDomain(),
  (substate) => substate.get('room')
);

export default makeSelectPostChatRoom;
