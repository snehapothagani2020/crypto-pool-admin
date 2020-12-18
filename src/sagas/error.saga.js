/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */
import {CRUD_CREATE_FAILURE} from "react-admin";
import {stopSubmit} from "redux-form";
import {put, takeEvery} from "redux-saga/effects";

export default function* errorSagas() {
    yield takeEvery(CRUD_CREATE_FAILURE, crudCreateFailure);
}

export function* crudCreateFailure(action) {
    let json = action.payload;
    yield put(stopSubmit('record-form', json));
}
