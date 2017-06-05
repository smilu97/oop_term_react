import { takeEvery, call, put } from 'redux-saga/effects';
import api from '../../services/api';

import {
  postContactSuccess,
  postContactFail,
} from './actions';

import {
  POST_CONTACT,
} from './constants';

export function* postContact(action) {
  const res = yield call(api.postContact, action.name, action.phoneNumber);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(postContactSuccess());
    } else {
      yield put(postContactFail(data.error));
    }
  } else {
    yield put(postContactFail('인터넷 연결이 불안정합니다'));
  }
}
export function* postContactSaga() {
  yield takeEvery(POST_CONTACT, postContact);
}

// All sagas to be loaded
export default [
  postContactSaga,
];
