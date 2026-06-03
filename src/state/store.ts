import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import { getAllScoresSaga } from "./getAllScoresSaga";

const sagaMiddleware = createSagaMiddleware();

// @ts-expect-error TS(2769): No overload matches this call.
export default createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(getAllScoresSaga);
