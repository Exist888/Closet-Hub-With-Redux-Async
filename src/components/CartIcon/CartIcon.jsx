import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cart/cartSelector.js";
import ShoppingBag from "../../assets/shopping-bag.svg?react";
import "./CartIcon.scss";

// Use forwardRef and inner component because we will pass this into a sibling via the Header parent
export function CartIconInner({ toggleDropdown, isDropdownClicked }, ref) {
    const cartCount = useSelector(selectCartCount);

    return (
        <button 
            ref={ref}
            onClick={toggleDropdown} 
            className={`cart-icon-container ${isDropdownClicked ? "on" : ""}`} 
            aria-label="Toggle shopping cart"
            >
            <ShoppingBag className="shopping-bag-icon" aria-hidden="true" />
            <span className="item-count">{cartCount}</span>
        </button>
    );
}

export const CartIcon = forwardRef(CartIconInner);