import { takeEvery, takeLatest, take, call, put, select } from 'redux-saga/effects';
import api from '../../services/api'

import {
    loadContactsSuccess,
    loadContactsFail,
} from './actions'

import {
    LOAD_CONTACTS,
} from './constants'

export function* loadContacts (action) {
    const res = yield call(api.loadContactsAll)
    const data = res.data
    console.log(data)
    if(res.ok) {
        if(data.success) {
            yield put(loadContactsSuccess(data.contacts))
        }
        else {
            yield put(loadContactsFail(data.error))
        }
    }
    else {
        yield put(loadContactsFail('인터넷 연결이 불안정합니다'))
    }
}
export function* loadContactsSaga() {
    const loadContactsWatcher = yield takeLatest(LOAD_CONTACTS, loadContacts)
}

export default [
    loadContactsSaga,
]