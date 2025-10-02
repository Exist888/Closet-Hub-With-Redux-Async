import { CART_ACTION_TYPES } from "./cartActionTypes.js";

const INITIAL_STATE = {
    cartItems: [],
}

export function cartReducer(state = INITIAL_STATE, action = {}) {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return { ...state, cartItems: payload }
        default: 
            return state;
    }
}