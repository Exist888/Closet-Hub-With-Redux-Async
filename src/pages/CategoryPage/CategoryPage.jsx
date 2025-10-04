import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategories, 
    selectCategoriesDataIsLoading,
    selectCategoriesError 
} from "../../store/categories/categoriesSelector.js";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { Notification } from "../../components/Notification/Notification.jsx";
import "./CategoryPage.scss";

export function CategoryPage() {
    const [products, setProducts] = useState([]);

    // Destructure category from current url param object - same variable name assigned in shop route
    const { category } = useParams();

    // Get the transformed categories object (keyed by category title) from Redux store via selector
    const categoriesObject = useSelector(selectCategories);

    const isLoading = useSelector(selectCategoriesDataIsLoading);
    const cleanErrorMsg = useSelector(selectCategoriesError);

    // Set products state when category param or categoriesObject changes
    useEffect(() => {
        // Use dynamic key to lookup products that match title in param and assign to products state
        setProducts(categoriesObject[category]);
    }, [category, categoriesObject]);

    // If products do not exist yet, map over an empty array to avoid errors
    const productsArray = products || [];

    const categoryProductsJsx = productsArray.map((product) => {
        return (
            <ProductCard key={product.id} product={product}/>
        );
    });

    // Get category titles (keys) from the categories object for display
    const categoryKeys = Object.keys(categoriesObject);
    // Ensure url param matches a real category key before rendering text
    const categoryText = categoryKeys.includes(category) && `All ${category}`;

    return (
        isLoading ? (
            <Spinner />
        ) : cleanErrorMsg ? (
            <Notification notificationClass="errorMsg">{cleanErrorMsg}</Notification>
        ) : (
            categoryText && (
                <section className="shop-section elements-container">
                    <div className="page-title-container category-page-title-container">
                        <h1>{categoryText}</h1>
                    </div>
                    <div className="category-container">
                        {categoryProductsJsx }
                    </div>
                </section>
            )
        )
    );
}