import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer, { AppState } from "./reducer";
import rootSaga from "./saga";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ['Product'],
  migration: (state: AppState) => {
    console.log('Migration Running!')
    const { Product } = state
    let newState = Product
    return Promise.resolve(newState)
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

// Use compose from Redux
const composeEnhancers = compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(
  persistedReducer,
  enhancer
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
