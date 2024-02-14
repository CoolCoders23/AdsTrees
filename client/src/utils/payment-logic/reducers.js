// Desc: This file contains the reducer function for the payment logic
// ========================================================

// Import dependencies
// ========================================================
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_DONATIONS
} from './actions';
// ========================================================

// Define the reducer function
// ========================================================
const reducer = (state, action) => {

    switch (action.type) {

    case ADD_TO_CART:
        return {
            ...state,
            cart: [...state.cart, action.donation],
        };

    case REMOVE_FROM_CART: {

        let newState = state.cart.filter(donation => {
            return donation._id !== action._id;
        });

        return {
            ...state,
            cart: newState,
        };
    }

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
