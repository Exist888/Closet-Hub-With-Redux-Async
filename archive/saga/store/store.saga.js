import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
// FOR SAGA: import the following two lines
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga.js";
import { rootReducer } from "./rootReducer.js";

// FOR SAGA: Initialize sagaMiddleware with imported function from Saga for easy local use
const sagaMiddleware = createSagaMiddleware();

// FOR SAGA: import above and add it to the middleWares array
const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleware
].filter(Boolean);

// Use Redux DevTools Extension in development, fallback to default compose in production
const composeEnhancer = ((
    process.env.NODE_ENV !== "production"
    && typeof window !== "undefined"
    ) ? (
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) : (
        compose
    )
);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// Create persist configuration object (blaclist user as Firebase handles persist for user)
const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["cart"]
}

// Pass rootReducer into persistedReducer and pass new persistedReducer into store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE SETUP: 1) Set up Redux store - pass into Provider in index.jsx, dispatch actions in components
export const store = createStore(persistedReducer, undefined, composedEnhancers);

// FOR SAGA: apply the run method to sageMiddleware and pass in rootSaga as a param
// NOTE: this must be called after createStore() as Sagas are linked to the store lifecycle
sagaMiddleware.run(rootSaga);

// Pass persistor as prop into PersistGate in index.jsx
export const persistor = persistStore(store);