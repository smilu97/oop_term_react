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
  INVITE,
  INVITE_SUCCESS,
  INVITE_FAIL,
  EXIT_ROOM,
  EXIT_ROOM_FAIL,
  EXIT_ROOM_SUCCESS,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: null,
  messages: [],
  room: null,
  initial: true,

  inviting: false,
  inviteError: null,
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROOM:
      return state.set('fetching', true)
              .set('error', null);
    case LOAD_ROOM_SUCCESS:
      return state.set('fetching', false)
              .set('messages', fromJS(action.messages))
              .set('room', fromJS(action.room));
    case LOAD_ROOM_FAIL:
      return state.set('fetching', false)
              .set('error', action.error);
    case RECEIVE_MESSAGE:
      return state.set('messages', state.get('messages').push(action.message));
    case INIT:
      return state.set('initial', false);
    case INVITE:
      return state.set('inviting', true)
              .set('inviteError', null);
    case INVITE_SUCCESS:
      return state.set('inviting', false)
              .setIn(['room', 'users'], state.get('room').get('users').concat(fromJS(action.users)));
    case INVITE_FAIL:
      return state.set('inviting', false)
              .set('inviteError', action.error);
    case EXIT_ROOM:
      return state.set('exiting', true)
              .set('exitError', null);
    case EXIT_ROOM_SUCCESS:
      return state.set('exiting', false);
    case EXIT_ROOM_FAIL:
      return state.set('exiting', false)
              .set('exitError', action.error);
    default:
      return state;
  }
}

export default chatReducer;
