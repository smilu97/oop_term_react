import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../../services/api';

// import actions
import {
  loadRoomSuccess,
  loadRoomFail,
} from './actions';

// import constants
import {
  LOAD_ROOM,
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

// All sagas to be loaded
export default [
  loadRoomSaga,
];
