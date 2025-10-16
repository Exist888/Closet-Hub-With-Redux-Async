import { createAction } from "../../utils/reducer/reducerUtils.js";
import { USER_ACTION_TYPES } from "./userActionTypes.js";

// 5) This is the action that replaces "setter functions" we used in React state (use in App.jsx)
export function setCurrentUser(user) {
    // When there is a matching action type, assigns user to the payload 
    // I.e. updates current state to the current user
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}