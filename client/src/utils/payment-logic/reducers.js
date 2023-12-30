// Desc: This file contains the reducer function for the payment logic
// ========================================================

// Import dependencies
// ========================================================
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    TOGGLE_CART,
    UPDATE_DONATIONS,
} from './actions';
// ========================================================

// Define the reducer function
// ========================================================
const reducer = (state, action) => {

    switch (action.type) {

    case ADD_TO_CART:
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.donation],
        };

    case REMOVE_FROM_CART: {

        let newState = state.cart.filter(donation => {
            return donation._id !== action._id;
        });

        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState,
        };
    }

    case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: [],
        };

    case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };

    case UPDATE_DONATIONS:
        return {
            ...state,
            donations: [...action.donations],
        };

    default:
        return state;
    }

};
// ========================================================

// Export the reducer
// ========================================================
export { reducer };
// ========================================================
