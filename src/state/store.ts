import { createStore, applyMiddleware, Store } from "redux";
import reducer, { GameState, GameAction } from "./reducer";
import createSagaMiddleware from "redux-saga";
import { getAllScoresSaga } from "./getAllScoresSaga";

const sagaMiddleware = createSagaMiddleware();

const store: Store<GameState, GameAction> = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(getAllScoresSaga);

export type RootState = GameState;
export type AppDispatch = typeof store.dispatch;

export default store;
