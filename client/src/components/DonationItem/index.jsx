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
        image,
        name,
        _id,
        description,
        quantity,
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
            <div>
                <img
                    src={`/images/${image}`}
                    alt={name}
                />
                <p>{name}</p>
                <h3>{description}</h3>
            </div>
            <div>
                <h4>Planting Trees: {quantity}</h4>
                <span>${price}</span>
            </div>
            <div>
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
