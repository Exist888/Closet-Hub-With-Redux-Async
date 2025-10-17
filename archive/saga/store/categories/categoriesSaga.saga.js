// FOR SAGA: create the categoriesSaga file to handle async behavior
import { takeLatest, all, call, put } from "redux-saga/effects";
// Import the async function we will use in our action from Firebase
import { getCategoriesAndDocuments } from "../../services/firebase/firebase.js";
// Import the non-async actions from categoriesAction as our async action is defined here
import { fetchCategoriesSuccess, fetchCategoriesFail } from "./categoriesAction.js";
// Import all action types
import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

// Commented out code is from previouslu used Thunk which was in action file - for comparison
export function* fetchCategoriesAsync() {
    try {
        // FOR SAGA: call(fn, arg) is used instead of just calling fn(arg) 
        // so Saga can better manage execution, errors, testing, and cancellation.
        const categoryObjectsArray = yield call(getCategoriesAndDocuments, "categories");
        yield put(fetchCategoriesSuccess(categoryObjectsArray));
    } catch (error) {
        // Pass in clean error string to avoid leading sensitive info in component
        yield put(fetchCategoriesFail("Sorry, items did not load. Please try again later."));
    }
}

export function* onFetchCategories() {
    // yield keyword "returns" the specified line then pauses wihout stopping the entire function
    // takeLatest method cancels previous runs of the action and processes the latest run of the action
    // This is useful for requests like fetching categories where you only care about most recent result
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
} 

export function* categoriesSaga() {
    // all keyword requires every function in array to run before next line can run
    yield all([call(onFetchCategories)]);
}