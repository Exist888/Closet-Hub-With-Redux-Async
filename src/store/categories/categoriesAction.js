import { createAction } from "../../utils/reducer/reducerUtils.js";
import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";
import { getCategoriesAndDocuments } from "../../services/firebase/firebase.js";

// FOR THUNK: Create an action for each of the three async-related types
export function fetchCategoriesStart() {
    // Start does not return a payload - only changes isLoading to true in the reducer
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export function fetchCategoriesSuccess(categoryObjectsArray) {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoryObjectsArray);
}

export function fetchCategoriesFail(error) {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);
}

// FOR THUNK: Create the thunk - function that returns an async function that dispatches 3 fetch stages
export function fetchCategoriesAsync() {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());

        try {
            const categoryObjectsArray = await getCategoriesAndDocuments();
            dispatch(fetchCategoriesSuccess(categoryObjectsArray));
        } catch (error) {
            dispatch(fetchCategoriesFail(error));
        }
    }
}