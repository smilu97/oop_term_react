import { takeLatest, call, put } from 'redux-saga/effects';

import api from '../../services/api';

import {
  postChatroomSuccess,
  postChatroomFail,
} from './actions';

import {
  POST_CHATROOM,
} from './constants';

export function* postChatroom(action) {
  const res = yield call(api.postChatroom, action.name, action.users);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(postChatroomSuccess(data.room));
    } else {
      yield put(postChatroomFail(data.error));
    }
  } else {
    yield put(postChatroomFail('인터넷 연결이 불안정합니다'));
  }
}

export function* postChatroomSaga() {
  yield takeLatest(POST_CHATROOM, postChatroom);
}

// All sagas to be loaded
export default [
  postChatroomSaga,
];
