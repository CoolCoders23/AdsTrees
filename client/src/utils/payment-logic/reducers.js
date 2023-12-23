import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    TOGGLE_CART,
    UPDATE_PURCHASE_STATUS
} from './actions';

const reducer = (state, action) => {

    switch (action.type) {

    case ADD_TO_CART:
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.donation],
            currentStatus: 'Pending'
        };

    case REMOVE_FROM_CART: {

        if (!action.donation || !action.donation._id) {
            console.error('action.donation or action.donation._id is undefined');
            return state;
        }

        let newState = state.cart.filter(donation => {
            if (!donation._id) {
                console.error('donation._id is undefined');
                return true;
            }

            return donation._id !== action._id;
        });

        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState,
            currentStatus: newState.length > 0 ? 'Pending' : 'Completed'
        };
    }

    case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: [],
            currentStatus: 'Completed'
        };

    case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };

    case UPDATE_PURCHASE_STATUS:
        return {
            ...state,
            currentStatus: action.purchaseStatus
        };

    default:
        return state;
    }

};
// ========================================================

// Export the reducer
// ========================================================
export { reducer };
