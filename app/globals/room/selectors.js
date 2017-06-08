import { createSelector } from 'reselect';

const selectRoomDomain = () => (state) => state.get('room');

export const makeSelectRoom = () => createSelector(
  selectRoomDomain(),
  (state) => state.toJS()
);

export const makeSelectRooms = () => createSelector(
  selectRoomDomain(),
  (state) => state.get('rooms')
);

export default makeSelectRoom;
