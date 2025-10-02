import { createContext, useMemo, useCallback, useReducer } from "react";
import { createAction } from "../utils/reducer/reducerUtils.js";

export const CartContext = createContext();

function addCartItem(cartItems, productToAdd) {
    // Check whether current array includes product to add
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });

    if (existingCartItem) {
        const updatedCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                // Return all properties of cart item but increment quantity by 1
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            } else {
                return cartItem;
            }
        });

        return updatedCartItems;

    } else {
        // Return all cart items plus new product with initial quantity of 1
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
}

function removeCartItem(cartItems, productToRemove) {
    // Filter out the product to remove based on id - 
    // Filter is better than map here, as it returns only items that pass the condition
    const updatedCartItems = cartItems.filter((cartItem) => {
        return cartItem.id !== productToRemove.id;
    });
    return updatedCartItems;
}

function decrementCartItem(cartItems, productToDecrement) {
    // If quantity before decrementing is 1, remove item completely
    if (productToDecrement.quantity === 1) {
        return removeCartItem(cartItems, productToDecrement);
    }

    // Otherwise decrement the quantity by 1 for the matching product
    const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === productToDecrement.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
        } else {
            return cartItem;
        }
    });

    return updatedCartItems;
}

// FOR REDUCER: Define action types - names for how initial state will be modified
export const CART_ACTION_TYPES = {
    ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
    REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
    DECREMENT_ITEM_FROM_CART: "DECREMENT_ITEM_FROM_CART"
} 

// FOR REDUCER: Define initial state object
const INITIAL_STATE = {
    cartItems: []
};

// FOR REDUCER: Create the reducer that defines conditional updates to state
// And call the functions that make updates to initial state 
function cartReducer (state, action) {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            return { cartItems: addCartItem(state.cartItems, payload) }; 
        case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
            return { cartItems: removeCartItem(state.cartItems, payload) };
        case CART_ACTION_TYPES.DECREMENT_ITEM_FROM_CART:
            return { cartItems: decrementCartItem(state.cartItems, payload) };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer.`);
    }
}

export function CartProvider({ children }) {
    // FOR REDUCER: Replace useState with useReducer
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    // FOR REDUCER: Destructure value from state that will be updated
    const { cartItems } = state;

    // Replace useEffect with useMemo since cartCount is a derived value
    const cartCount = useMemo(() => {
        // Params include incrementing total and current item being iterated through
        return cartItems.reduce((totalCount, cartItem) => {
            // Add current item quantity to total
            return totalCount + cartItem.quantity
        // Include starting value
        }, 0);
    }, [cartItems]);

    const cartTotalPrice = useMemo(() => {
        return cartItems.reduce((totalPrice, cartItem) => {
            return totalPrice + (cartItem.price * cartItem.quantity);
        }, 0);
    }, [cartItems]);

    // FOR REDUCER: replace state setter function with dispatch of the actions that update state
    // Implement useCallback on these functions so React does not need to re-compute on each render
    const addItemToCart = useCallback((productToAdd) => {
        dispatch(createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, productToAdd));
    }, []);

    const removeItemFromCart = useCallback((productToRemove) => {
        dispatch(createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, productToRemove));
    }, []);

    const decrementItemCount = useCallback((productToDecrement) => {
        dispatch(createAction(CART_ACTION_TYPES.DECREMENT_ITEM_FROM_CART, productToDecrement));
    }, []);

    // Implement useMemo on this object so React can store values until they change
    const value = useMemo(() => ({ 
        cartItems, 
        cartCount,
        cartTotalPrice,
        addItemToCart, 
        removeItemFromCart, 
        decrementItemCount 
    // Remove cartCount and cartTotal price from dependency array since they are derived from cartItems
    }), [cartItems, addItemToCart, removeItemFromCart, decrementItemCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}