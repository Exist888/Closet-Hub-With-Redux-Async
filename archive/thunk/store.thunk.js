import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk"; // FOR THUNK: import thunk from library
import { rootReducer } from "./rootReducer.js";

// FOR THUNK (replacing now): import above and add it to the middleWares array
const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    thunk
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

// Pass persistor as prop into PersistGate in index.jsx
export const persistor = persistStore(store);