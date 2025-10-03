import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

// FOR THUNK: add isLoading and error properties to initial state
const INITIAL_STATE = {
    categoryObjectsArray: [],
    isLoading: false,
    error: null
};

// Must set default value of action to empty object to avoid an error
// FOR THUNK: check for all three async-related action types and return relevant state properties
export function categoriesReducer(state = INITIAL_STATE, action = {}) {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categoryObjectsArray: payload, isLoading: false }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
            return { ...state, error: payload, isLoading: false }
        default:
            return state;
    }
}