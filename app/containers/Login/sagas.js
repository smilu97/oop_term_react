import { takeEvery, takeLatest, take, call, put, select } from 'redux-saga/effects';
import api from '../../services/api'
import {
  whoamiSuccess,
  whoamiFail,
} from './actions'
import {
  LOGIN,
} from './constants'


export function* login(action) {
  const auth = 'Basic ' + btoa(action.phoneNumber + ':' + action.password)
  api.setHeader('Authorization', auth)
  const res = yield call(api.whoami)
  const data = res.data
  if(res.ok) {
    if(data.success) {
      yield put(whoamiSuccess())
      window.localStorage.setItem("whoami_phoneNumber", action.phoneNumber)
      window.localStorage.setItem("whoami_password", action.password)
    }
    else {
      yield put(whoamiFail(data.error))
    }
  }
  else {
    yield put(whoamiFail('인터넷이 불안정합니다'))
  }
}
export function* loginSaga() {
  const loginWatcher = yield takeLatest(LOGIN, login)
}

// All sagas to be loaded
export default [
  loginSaga,
];
