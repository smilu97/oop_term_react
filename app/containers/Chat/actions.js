/*
 *
 * Chat actions
 *
 */

import {
  LOAD_ROOM,
  LOAD_ROOM_SUCCESS,
  LOAD_ROOM_FAIL,
  RECEIVE_MESSAGE,
  INIT,
} from './constants';

export function loadRoom(roomId) {
  return {
    type: LOAD_ROOM,
    roomId,
  };
}
export function loadRoomSuccess(room, messages) {
  return {
    type: LOAD_ROOM_SUCCESS,
    room,
    messages,
  };
}
export function loadRoomFail(error) {
  return {
    type: LOAD_ROOM_FAIL,
    error,
  };
}
export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}
export function initAction() {
  return {
    type: INIT,
  };
}
