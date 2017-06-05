/*
 *
 * Chat reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ROOM,
  LOAD_ROOM_SUCCESS,
  LOAD_ROOM_FAIL,
  RECEIVE_MESSAGE,
  INIT,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: null,
  messages: [],
  room: null,
  initial: true,
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROOM:
      return state.set('fetching', true)
              .set('error', null);
    case LOAD_ROOM_SUCCESS:
      return state.set('fetching', false)
              .set('messages', fromJS(action.messages))
              .set('room', action.room);
    case LOAD_ROOM_FAIL:
      return state.set('fetching', false)
              .set('error', action.error);
    case RECEIVE_MESSAGE:
      return state.set('messages', state.get('messages').push(action.message));
    case INIT:
      return state.set('initial', false);
    default:
      return state;
  }
}

export default chatReducer;
