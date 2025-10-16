import { USER_ACTION_TYPES } from "./userActionTypes.js";

const INITIAL_STATE = {
    currentUser: null
};

// 3) User reducer that takes in the state and the action that updates state
// Replaces what we used to do in React state with initial state and setter function
// In Redux, we assign a default value to state since there's no useReducer hook providing it
export function userReducer(state = INITIAL_STATE, action = {}) {
    // All reducers have a type and optional payload
    const { type, payload } = action;

    switch(type) {
        // Check whether the action type meets a condition set in user action types file
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default: 
            // Return the current state if the action type doesn't match any case
            // This ensures state updates only occur when explicitly handled
            return state;
    }
}