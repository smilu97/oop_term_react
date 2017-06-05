import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../../services/api';

// Import actions
import {
  signupSuccess,
  signupFail,
} from './actions';

// Import constants
import {
  SIGNUP,
} from './constants';

// All sagas to be loaded
export function* signup(action) {
  const res = yield call(api.signup, action.name, action.phoneNumber, action.password);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(signupSuccess());
    } else {
      yield put(signupFail(data.error));
    }
  } else {
    yield put(signupFail('인터넷이 불안정합니다'));
  }
}
export function* signupSaga() {
  yield takeLatest(SIGNUP, signup);
}
export default [
  signupSaga,
];
