
import {
  LOAD_ROOMS,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAIL,
  NEW_MESSAGE,
  CHECK_ROOM,
} from './constants';

export const loadRooms = () => ({
  type: LOAD_ROOMS,
});
export const loadRoomsSuccess = (rooms) => ({
  type: LOAD_ROOMS_SUCCESS,
  rooms,
});
export const loadRoomsFail = (error) => ({
  type: LOAD_ROOMS_FAIL,
  error,
});
export const newMessage = (roomId) => ({
  type: NEW_MESSAGE,
  roomId,
});
export const checkRoom = (roomId) => ({
  type: CHECK_ROOM,
  roomId,
});

