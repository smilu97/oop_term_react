import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../../services/api';

import {
  loadContactSuccess,
  loadContactFail,
  deleteContactSuccess,
  deleteContactFail,
  loadOtoRoomSuccess,
  loadOtoRoomFail,
} from './actions';

import {
  LOAD_CONTACT,
  DELETE_CONTACT,
  LOAD_OTO_ROOM,
} from './constants';

export function* loadContact(action) {
  const res = yield call(api.loadContact, action.contactId);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(loadContactSuccess(data.contact));
    } else {
      yield put(loadContactFail(data.error));
    }
  } else {
    yield put(loadContactFail('인터넷 연결이 불안정합니다'));
  }
}
export function* loadContactSaga() {
  yield takeLatest(LOAD_CONTACT, loadContact);
}

export function* deleteContact(action) {
  const res = yield call(api.deleteContact, action.contactId);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(deleteContactSuccess());
    } else {
      yield put(deleteContactFail(data.error));
    }
  } else {
    yield put(deleteContactFail('인터넷 연결이 불안정합니다'));
  }
}
export function* deleteContactSaga() {
  yield takeLatest(DELETE_CONTACT, deleteContact);
}

export function* loadOtoRoom(action) {
  const res = yield call(api.loadOtoRoom, action.contactId);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(loadOtoRoomSuccess(data.room));
    } else {
      yield put(loadOtoRoomFail(data.error));
    }
  } else {
    yield put(loadOtoRoomFail('인터넷이 불안정합니다'));
  }
}
export function* loadOtoRoomSaga() {
  yield takeLatest(LOAD_OTO_ROOM, loadOtoRoom);
}

// All sagas to be loaded
export default [
  loadContactSaga,
  deleteContactSaga,
  loadOtoRoomSaga,
];
