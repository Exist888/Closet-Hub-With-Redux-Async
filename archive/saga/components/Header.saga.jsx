import { Link } from "react-router-dom";
import { useState, useRef } from "react";
// FOR SAGA: useDispatch
import { useSelector, useDispatch } from "react-redux"; // For Redux, replace useContext with useSelector
import { selectCurrentUser } from "../../store/user/userSelector.js"; // Returns current state from Redux
import { signOutStart } from "../../store/user/userAction.js"; // FOR SAGA
import { CartIcon } from "../../components/CartIcon/CartIcon.jsx";
import { CartDropdown } from "../../components/CartDropdown/CartDropdown.jsx";
import logo from "../../assets/logo.png";
import "./Header.scss";

export function Header() {
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    // Set up ref for CartIcon where it will be assigned using forwardRef so it can be sent to a sibling
    const cartIconRef = useRef(null);

    // FOR SAGA:
    const dispatch = useDispatch();

    // Get current user state from Redux store
    const currentUser = useSelector(selectCurrentUser);

    function toggleDropdown() {
        setIsDropdownClicked(!isDropdownClicked);
    }

    function closeDropdown() {
        setIsDropdownClicked(false);
    }

    function signOutHandler() {
        // FOR SAGA:
        dispatch(signOutStart());
    }

    return (
        <header>
            <nav className="elements-container" aria-label="Main Navigation">
                <Link to="/" className="logo">
                    <img src={logo} alt="Closet Hub Logo" />
                </Link>
                <div className="menu-container">
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        {currentUser ? (
                            <li><span onClick={signOutHandler} className="link">Sign Out</span></li>
                        ) : (
                            <li><Link to="/auth">Sign In</Link></li>
                        )}
                    </ul>
                    <CartIcon 
                        ref={cartIconRef}
                        toggleDropdown={toggleDropdown} 
                        isDropdownClicked={isDropdownClicked}
                    />
                </div>
                {isDropdownClicked && (
                    <CartDropdown 
                        closeDropdown={closeDropdown}
                        isDropdownClicked={isDropdownClicked}
                        cartIconRef={cartIconRef}
                    />
                )}
            </nav>
        </header>
    );
}