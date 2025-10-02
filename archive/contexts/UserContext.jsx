// While state management in this file is not complex enough to require useReducer,
// I am using this file to practice using a reducer before moving on to more complex state management
import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../services/firebase/firebase.js";
import { createAction } from "../utils/reducer/reducerUtils.js";

export const UserContext = createContext();

// FOR REDUCER:
// Create an object that defines acceptable types to be passed into the reducer
// Usually for multiple types
// Using constants avoids hard-coded strings and helps catch typos early
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
};

// FOR REDUCER:
// Set initial state as an object here rather than using useState
const INITIAL_STATE = {
    currentUser: null
};

// FOR REDUCER:
// Create the reducer function for this specific context
// Always takes in state and action as parameters
function userReducer(state, action) {
    // Destructure type and optional payload from action - all reducer functions work like this
    const { type, payload } = action;

    // Note: Reducers almost always use switch case for conditional logic - convention, readability
    switch(type) {
        // Check whether string passed in matches value at this prop in the USER_ACTION_TYPES object
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            // Return all properties in current state and update currentUser to the payload
            return { ...state, currentUser: payload };
        default: 
            throw new Error(`Unhandled type ${type} in userReducer.`);
    }
}

export function UserProvider({ children }) {
    // FOR REDUCER: 
    // Replace useState with useReducer that sets initial state and action that updates state
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    // Destructure currentUser from state - state still handles currentUser
    const { currentUser } = state;

    // Wrap user and setter function in object to pass into Provider
    const value = { currentUser, setCurrentUser };

    // FOR REDUCER: 
    // Create action (replace setter function) that updates user state when correct action type is passed in
    function setCurrentUser(user) {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    useEffect(() => {
        // Call listener to track auth state changes throughout app
        // Argument for user parameter is passed in automatically by Firebase - see services/firebase.js
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        // Stop listener on unmount
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}