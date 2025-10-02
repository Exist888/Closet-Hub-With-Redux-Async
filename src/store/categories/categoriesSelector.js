import { createSelector } from "reselect"; // Library for memoizing selectors

// Select the slice of Redux state containing the categories reducer
function selectCategoryReducer(state) {
    return state.categories;
}

// Memoize the array of category objects from Firebase
const selectCategoryObjectsArray = createSelector(
    [selectCategoryReducer], 
    (categoriesSlice) => {
        return categoriesSlice.categoryObjectsArray;
    }
);

// Memoize the tranformed data
export const selectCategories = createSelector(
    [selectCategoryObjectsArray], 
    (categoriesArray) => {
        // Transform categories into an object keyed by lowercase category title for quick lookup
        const updatedCategoriesObj = categoriesArray.reduce((acc, categoryObj) => {
            // Destructure title and items from the document data
            const { title, items } = categoryObj;
            // Insert lowercase title as key in accumulator object and assign items array as value
            acc[title.toLowerCase()] = items;
            // Return the updated accumulator object
            return acc;
        }, {});

        return updatedCategoriesObj;
    }
);