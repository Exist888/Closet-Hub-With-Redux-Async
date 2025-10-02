import { CategoryCard } from "../../components/CategoryCard/CategoryCard.jsx";
import { categories } from "../../data/categories.js";
import "./HomePage.scss";

export function HomePage() {
    const categoriesJsx = categories.map((category) => {
        return (
            <CategoryCard key={category.id} category={category} />
        ); 
    });

    return (
        <section className="categories-section">
            <div className="elements-container">
                {categoriesJsx}
            </div>
        </section>
    );
}