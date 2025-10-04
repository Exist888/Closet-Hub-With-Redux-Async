import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cartSelector.js";
import { addItemToCart } from "../../store/cart/cartAction.js";
import { Button } from "../Button/Button.jsx";
import { Notification } from "../Notification/Notification.jsx";
import "./ProductCard.scss";

export function ProductCard({ product }) {
    const [isClicked, setIsClicked] = useState(false);

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const { imageUrl, name, price } = product;

    function addProductToCart() {
        dispatch(addItemToCart(cartItems, product));
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
        }, 2000);
    }

    // Use a dynamic key to force notification remount so animation restarts on each click
    return (
        <Fragment>
            {isClicked && (
                <Notification key={Date.now()} notificationClass="itemAddedMsg">
                    {"+ Added to cart"}
                </Notification>
            )}
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
        </Fragment>
    );
}