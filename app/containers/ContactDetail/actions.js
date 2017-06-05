/*
 *
 * ContactDetail actions
 *
 */

import {
  LOAD_CONTACT,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_FAIL,

  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,

  LOAD_OTO_ROOM,
  LOAD_OTO_ROOM_SUCCESS,
  LOAD_OTO_ROOM_FAIL,
} from './constants';

export function loadContact(contactId) {
  return {
    type: LOAD_CONTACT,
    contactId,
  };
}
export function loadContactSuccess(contact) {
  return {
    type: LOAD_CONTACT_SUCCESS,
    contact,
  };
}
export function loadContactFail(error) {
  return {
    type: LOAD_CONTACT_FAIL,
    error,
  };
}
export function deleteContact(contactId) {
  return {
    type: DELETE_CONTACT,
    contactId,
  };
}
export function deleteContactSuccess() {
  return {
    type: DELETE_CONTACT_SUCCESS,
  };
}
export function deleteContactFail(error) {
  return {
    type: DELETE_CONTACT_FAIL,
    error,
  };
}
export function loadOtoRoom(contactId) {
  return {
    type: LOAD_OTO_ROOM,
    contactId,
  };
}
export function loadOtoRoomSuccess(otoRoom) {
  return {
    type: LOAD_OTO_ROOM_SUCCESS,
    otoRoom,
  };
}
export function loadOtoRoomFail(error) {
  return {
    type: LOAD_OTO_ROOM_FAIL,
    error,
  };
}
