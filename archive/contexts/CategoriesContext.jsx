import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../services/firebase/firebase.js";

// Create context for products so we can easily pass products into any part of the app
export const CategoriesContext = createContext({
    categoriesMap: {}
});

export function CategoriesProvider({ children }) {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        async function getCategoriesMap() {
            const categories = await getCategoriesAndDocuments();
            setCategoriesMap(categories);
        }
        getCategoriesMap();
    }, []);

    // Wrap products array in object to pass into Provider
    const value = { categoriesMap };
    
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}