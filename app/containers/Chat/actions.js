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
  INVITE,
  INVITE_SUCCESS,
  INVITE_FAIL,
  EXIT_ROOM,
  EXIT_ROOM_SUCCESS,
  EXIT_ROOM_FAIL,
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
export function invite(roomId, users) {
  return {
    type: INVITE,
    roomId,
    users,
  };
}
export function inviteSuccess(users) {
  return {
    type: INVITE_SUCCESS,
    users,
  };
}
export function inviteFail(error) {
  return {
    type: INVITE_FAIL,
    error,
  };
}
export function exitRoom(roomId) {
  return {
    type: EXIT_ROOM,
    roomId,
  };
}
export function exitRoomSuccess() {
  return {
    type: EXIT_ROOM_SUCCESS,
  };
}
export function exitRoomFail(error) {
  return {
    type: EXIT_ROOM_FAIL,
    error,
  };
}
