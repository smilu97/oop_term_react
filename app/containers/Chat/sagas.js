import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../../services/api';

// import actions
import {
  loadRoomSuccess,
  loadRoomFail,
  inviteSuccess,
  inviteFail,
  exitRoomSuccess,
  exitRoomFail,
} from './actions';

import { loadRooms } from '../../globals/room/actions';

// import constants
import {
  LOAD_ROOM,
  INVITE,
  EXIT_ROOM,
} from './constants';

export function* loadRoom(action) {
  const res = yield call(api.loadRoom, action.roomId);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(loadRoomSuccess(data.room, data.messages));
    } else {
      yield put(loadRoomFail(data.error));
    }
  } else {
    yield put(loadRoomFail('인터넷 연결이 불안정합니다'));
  }
}
export function* loadRoomSaga() {
  yield takeLatest(LOAD_ROOM, loadRoom);
}

export function* invite(action) {
  const res = yield call(api.inviteMany, action.roomId, action.users.map((user) => user.id));
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(inviteSuccess(action.users));
      yield put(loadRooms());
    } else {
      yield put(inviteFail(action.error));
    }
  } else {
    yield put('인터넷 연결이 불안정합니다');
  }
}
export function* inviteSaga() {
  yield takeLatest(INVITE, invite);
}

export function* exitRoom(action) {
  const res = yield call(api.exitRoom, action.roomId);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(exitRoomSuccess());
      yield put(loadRooms());
    } else {
      yield put(exitRoomFail(data.error));
    }
  } else {
    yield put(exitRoomFail('인터넷 연결이 불안정합니다'));
  }
}
export function* exitRoomSaga() {
  yield takeLatest(EXIT_ROOM, exitRoom);
}

// All sagas to be loaded
export default [
  loadRoomSaga,
  inviteSaga,
  exitRoomSaga,
];
