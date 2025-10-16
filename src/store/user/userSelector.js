// Resuable function to pass into useSelector wherever a component needs access to current state
// user comes from root and currentUser comes from key in state object in reducer
export function selectCurrentUser(state) {
    return state.user.currentUser;
}

//FOR SAGA:
export function selectUserError(state) {
    return state.user.error
}