/*
 *
 * PostChatRoom reducer
 *
 */

import { fromJS } from 'immutable';
import {
  POST_CHATROOM,
  POST_CHATROOM_SUCCESS,
  POST_CHATROOM_FAIL,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: null,
  room: null,
});

function postChatRoomReducer(state = initialState, action) {
  switch (action.type) {
    case POST_CHATROOM:
      return state.set('fetching', true)
              .set('error', null);
    case POST_CHATROOM_SUCCESS:
      return state.set('fetching', false)
              .set('room', action.room);
    case POST_CHATROOM_FAIL:
      return state.set('fetching', false)
              .set('error', action.error);
    default:
      return state;
  }
}

export default postChatRoomReducer;
