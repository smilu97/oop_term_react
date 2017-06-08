/*
 *
 * PostChatRoom actions
 *
 */

import {
  POST_CHATROOM,
  POST_CHATROOM_SUCCESS,
  POST_CHATROOM_FAIL,
} from './constants';

export const postChatroom = (name, users) => ({
  type: POST_CHATROOM,
  name,
  users,
});
export const postChatroomSuccess = (room) => ({
  type: POST_CHATROOM_SUCCESS,
  room,
});
export const postChatroomFail = (error) => ({
  type: POST_CHATROOM_FAIL,
  error,
});

