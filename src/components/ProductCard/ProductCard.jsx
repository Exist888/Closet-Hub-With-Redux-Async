import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cartSelector.js";
import { addItemToCart } from "../../store/cart/cartAction.js";
import { Button } from "../Button/Button.jsx";
import "./ProductCard.scss";

export function ProductCard({ product }) {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const { imageUrl, name, price } = product;

    function addProductToCart() {
        dispatch(addItemToCart(cartItems, product));
    }

    return (
        <article className="product-card">
            <img src={imageUrl} alt={`photo of ${name}`}/>
            <Button buttonClass="product" onClick={addProductToCart}>
                <div>
                    <i className="fa-solid fa-cart-plus"></i>
                    <span>Add to cart</span>
                </div>
            </Button>
            <div className="product-card-text">
                <span className="name">{name}</span>
                <span className="price">{price} USD</span>
            </div>
        </article>
    );
}