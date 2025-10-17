import { createAction } from "../../utils/reducer/reducerUtils.js";
import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

// Create an action for each of the three async-related types - start, success, and error
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