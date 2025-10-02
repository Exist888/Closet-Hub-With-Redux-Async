import { createAction } from "../../utils/reducer/reducerUtils.js";
import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

// Use in App.jsx to update categories state
export function setCategories(categoryObjectsArray) {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoryObjectsArray);
}