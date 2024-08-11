import types from "./types";
import { takeEvery, put } from "redux-saga/effects";

function* getScores(action) {
  yield put({
    type: types.GET_USERS_SCORES_SUCCESS,
    payload: action.payload,
  });
}

export function* getAllScoresSaga() {
  yield takeEvery(types.GET_USERS_SCORES, getScores);
}
