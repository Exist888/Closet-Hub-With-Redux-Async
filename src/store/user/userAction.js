import { createAction } from "../../utils/reducer/reducerUtils.js";
import { USER_ACTION_TYPES } from "./userActionTypes.js";

// 5) This is the action that replaces "setter functions" we used in React state (use in App.jsx)
export function setCurrentUser(user) {
    // When there is a matching action type, assigns user to the payload 
    // I.e. updates current state to the current user
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}

// Keep this even after moving Saga to archive
export function clearUserError() {
    return createAction(USER_ACTION_TYPES.CLEAR_USER_ERROR)
}

// FOR SAGA: Create more actions for saga to handle
export function checkUserSession() {
    return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
}

export function googleSignInStart() {
    return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
}

export function emailSignInStart(email, password) {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
}

export function signInSuccess(user) {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
}

export function signInFailed(error) {
    return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
}

export function signUpStart(email, password, displayName) {
    return createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });
}

export function signUpSuccess(user, additionalDetails) {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, { user, additionalDetails });
}

export function signUpFailed(error) {
    return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
}

export function signOutStart() {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
}

export function signOutSuccess() {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
}

export function signOutFailed(error) {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
}