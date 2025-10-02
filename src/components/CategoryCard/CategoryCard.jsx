import { Link } from "react-router-dom";
import "./CategoryCard.scss";

export function CategoryCard({ category }) {
    const { title, imageUrl } = category;
    return (
        <Link className="category-card" to={`shop/${title}`}>
            <article>
                <div 
                    className="background-image" 
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                />
                <div className="category-title-and-cta-box">
                    <h2>{title}</h2>
                    <div className="category-cta-container">
                        <p>Shop Now</p>
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>
            </article>
        </Link>
    ); 
}