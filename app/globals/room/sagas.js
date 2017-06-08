import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../../services/api';

import {
  loadRoomsSuccess,
  loadRoomsFail,
} from './actions';

import {
  LOAD_ROOMS,
} from './constants';

export function* loadRooms() {
  const res = yield call(api.loadRooms);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(loadRoomsSuccess(data.rooms));
    } else {
      yield put(loadRoomsFail(data.error));
    }
  } else {
    yield put(loadRoomsFail('인터넷 연결이 불안정합니다'));
  }
}
export function* loadRoomsSaga() {
  yield takeLatest(LOAD_ROOMS, loadRooms);
}

export default [
  loadRoomsSaga,
];
