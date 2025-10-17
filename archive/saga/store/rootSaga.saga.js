// FOR SAGA: create a rootSaga - simimilar to having a root reducer
import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categoriesSaga.js";
import { userSaga } from "./user/userSaga.js";

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga)]);
}