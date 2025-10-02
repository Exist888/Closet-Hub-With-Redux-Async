import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer.js";
import { categoriesReducer } from "./categories/categoriesReducer.js";
import { cartReducer } from "./cart/cartReducer.js";

// 2) Set up single root reducer where all reducers will live in a single global state
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});