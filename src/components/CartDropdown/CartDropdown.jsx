import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cartSelector.js";
import { CartItem } from "../CartItem/CartItem.jsx";
import { Button } from "../Button/Button.jsx";
import "./CartDropdown.scss";

export function CartDropdown({ closeDropdown, isDropdownClicked, cartIconRef }) {
    const dropdownRef = useRef(null);
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    useEffect(() => {
        function handleOutsideClick(event) {
            const clickedDropdown = (
                dropdownRef.current && dropdownRef.current.contains(event.target)
            );
            const clickedCartIcon = (
                cartIconRef.current && cartIconRef.current.contains(event.target)
            );
            const clickedProductBtn = (
                event.target.closest(".product")
            );
            const clickedCheckoutBtn = (
                event.target.closest(".checkout")
            );

            if (!clickedDropdown && !clickedCartIcon && !clickedProductBtn || clickedCheckoutBtn) {
                closeDropdown();
            }
        }

        if (isDropdownClicked) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }

    }, [isDropdownClicked, closeDropdown]);

    const cartItemsJsx = cartItems.map((cartItem) => {
        return (
            <CartItem 
                key={cartItem.id} 
                cartItem={cartItem}
                >
            </CartItem>
        );
    });

    const emptyCartMessage = (
        <div className="empty-cart-msg-container">
            <div>
                <span className="empty-cart-msg">Your cart is empty:</span>
                <span className="empty-cart-cta">Let's go shopping</span>
            </div>
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
        </div>
    );

    return (
        <section className="cart-dropdown-container" ref={dropdownRef}>
            <div className="cart-dropdown-top-container">
                <span className="title">Your Cart</span>
                <button className="close-btn" onClick={closeDropdown}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <article className="cart-items">
                {cartItems.length > 0 ? cartItemsJsx : emptyCartMessage}
            </article>
            <Button className="checkout" onClick={() => navigate("/checkout")}>
                Go to Checkout
                <i className="fa-solid fa-arrow-right"></i>
            </Button>
        </section>
    );
}