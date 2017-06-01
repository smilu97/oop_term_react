import { takeLatest, takeEvery, take, call, put, select } from 'redux-saga/effects';
import api from '../../services/api'
import {
  signupSuccess,
  signupFail
} from './actions'

import {
  SIGNUP,
} from './constants'

// All sagas to be loaded
export function* signup(action) {
  const res = yield call(api.signup, action.name, action.phoneNumber, action.password)
  if(res.ok) {
    if(res.data.success) {
      yield put(signupSuccess())
    }
    else {
      yield put(signupFail(res.data.error))
    }
  }
  else {
    yield put(signupFail('인터넷이 불안정합니다'))
  }
}
export function* signupSaga() {
  const signupWatcher = yield takeLatest(SIGNUP, signup)
}
export default [
  signupSaga,
];
