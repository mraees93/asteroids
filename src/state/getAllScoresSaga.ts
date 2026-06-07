import types from "./types";
import { takeEvery, put, StrictEffect } from "redux-saga/effects";
import { GameAction } from "./reducer";

function* getScores(action: GameAction): Generator<StrictEffect, void, unknown> {
  yield put({
    type: types.GET_USERS_SCORES_SUCCESS,
    payload: action.payload,
  });
}

export function* getAllScoresSaga(): Generator<StrictEffect, void, unknown> {
  yield takeEvery(types.GET_USERS_SCORES, getScores);
}
