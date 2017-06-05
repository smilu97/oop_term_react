import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../../services/api';
import {
  loginSuccess,
  loginFail,
  whoamiSuccess,
  whoamiFail,
} from './actions';
import {
  LOGIN,
  WHOAMI,
} from './constants';


export function* login(action) {
  const res = yield call(api.login, action.phoneNumber, action.password);
  const data = res.data;
  if (res.ok) {
    if (data.success) {
      yield put(loginSuccess(data.user));
      localStorage.setItem('token', data.user.token);
      api.setHeader('Authorization', `Token ${data.user.token}`);
    } else {
      yield put(loginFail(data.error));
    }
  } else {
    yield put(loginFail('인터넷이 불안정합니다'));
  }
}
export function* loginSaga() {
  yield takeLatest(LOGIN, login);
}

export function* whoami() {
  const { token } = localStorage;
  if (token) {
    api.setHeader('Authorization', `Token ${token}`);
    const res = yield call(api.whoami);
    const data = res.data;
    if (res.ok) {
      if (data.success) {
        yield put(whoamiSuccess(data.user));
      } else {
        yield put(whoamiFail(data.error));
      }
    } else {
      yield put(whoamiFail('인터넷 연결이 불안정합니다'));
    }
  } else {
    yield put(whoamiFail('로그인 되어있지 않습니다'));
  }
}

export function* whoamiSaga() {
  yield takeLatest(WHOAMI, whoami);
}

// All sagas to be loaded
export default [
  loginSaga,
  whoamiSaga,
];
