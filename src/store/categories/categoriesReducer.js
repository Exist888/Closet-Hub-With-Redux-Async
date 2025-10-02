import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

const INITIAL_STATE = {
    categoryObjectsArray: []
};

// Must set default value of action to empty object to avoid an error
export function categoriesReducer(state = INITIAL_STATE, action = {}) {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return { ...state, categoryObjectsArray: payload };
        default:
            return state;
    }
}