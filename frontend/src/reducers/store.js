import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import rootReducer from '../reducers/index';

// config to persisit the redux store.
const persistConfig = {
  key: 'root',
  storage: storage,
  // blacklist: ['product'],
  stateReconciler: hardSet // see "Merge Process" section for details.
};

// initial state
const initialState = {};

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, initialState, enhancer);
export const persistor = persistStore(store);