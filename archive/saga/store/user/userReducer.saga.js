import { USER_ACTION_TYPES } from "./userActionTypes.js";

const INITIAL_STATE = {
    currentUser: null,
    // FOR SAGA: add initial state for isLoading and error
    isLoading: false,
    error: null
};

// User reducer that takes in the state and the action that updates state
// Replaces what we used to do in React state with initial state and setter function
// In Redux, we assign a default value to state since there's no useReducer hook providing it
export function userReducer(state = INITIAL_STATE, action = {}) {
    // All reducers have a type and optional payload
    const { type, payload } = action;

    switch(type) {
        // Check whether the action type meets a condition set in user action types file
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        // FOR SAGA:
        case USER_ACTION_TYPES.CLEAR_USER_ERROR: 
            return { ...state, error: null }
        // FOR SAGA: Add case for sign in success and error
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload, error: null };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        default: 
            // Return the current state if the action type doesn't match any case
            // This ensures state updates only occur when explicitly handled
            return state;
    }
}