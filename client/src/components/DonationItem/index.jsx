// Desc: This file contains the DonationItem component
// which will be used to display a single donation item
// =========================================================

// Import dependencies
// =========================================================
import useStateContext from '../../utils/payment-logic/UseStateContext';
import { ADD_TO_CART } from '../../utils/payment-logic/actions';
import { idbPromise } from '../../utils/payment-logic/idbHelper';
// =========================================================

// Define component
// =========================================================
const DonationItem = (item) => {

    // Destructure state and dispatch from context
    const [state, dispatch] = useStateContext();

    // Destructure item prop
    const {
        _id,
        donationType,
        description,
        price,
    } = item;

    const { cart } = state;

    // Define addToCart function
    const addToCart = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        if (itemInCart) {
            idbPromise('cart', 'put', { ...itemInCart });
        } else {
            dispatch({
                type: ADD_TO_CART,
                donation: { ...item }
            });
            idbPromise('cart', 'put', { ...item });
        }

    };

    // Return JSX
    return (
        <div>
            <p>{donationType}</p>
            <h3>{description}</h3>
            <div>
                <span>${price}</span>
                <button onClick={addToCart}>Add to cart</button>
            </div>
        </div>
    );
};
// =========================================================

// Export component
// =========================================================
export default DonationItem;
// =========================================================