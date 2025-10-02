import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categoriesSelector.js";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import "./ShopPage.scss";

export function ShopPage() {
    // Get the transformed categories object (keyed by category title) from Redux store via selector
    const categoriesObject = useSelector(selectCategories);

    // Extract category titles (object keys) for iteration
    const categoryKeys = Object.keys(categoriesObject);

    // Map over each category title to render a preview of products
    const categoriesAndProductsJsx = categoryKeys.map((title) => {
        // Grab the first four products for the current category
        const categoryPreviewsArr = categoriesObject[title].slice(0, 4);

        // Map over the product previews to render individual ProductCard components
        const categoryProductsJsx = categoryPreviewsArr.map((product) => {
            return (
                <ProductCard key={product.id} product={product}/>
            );
        });

        // Return JSX for the category section, including title link and product previews
        return (
            <div key={title}>
                <Link className="category-link" to={title}>
                    <div className="category-title-container">
                        <div className="title-decoration"></div>
                        <h2 className="category-title">Shop {title}</h2>
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </Link>
                <div className="category-container">
                    {categoryProductsJsx}
                </div>
            </div>
        );
    });

    return (
        <section className="shop-section elements-container">
            <div className="page-title-container">
                <h1>Browse Collections</h1>
            </div>
            {categoriesAndProductsJsx}
        </section>
    );
}