// Description: This file contains the CartItem component which
// is responsible  for rendering the cart items
// ========================================================

// Import dependencies
// ========================================================
import UseStateContext from '../../utils/payment-logic/UseStateContext';
import { REMOVE_FROM_CART } from '../../utils/payment-logic/actions';
import { idbPromise } from '../../utils/payment-logic/idbHelper';
// ========================================================

// Define CartItem component
// ========================================================
const CartItem = ({ item }) => {

    const [, dispatch] = UseStateContext();

    const removeFromCart = item => {

        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });

    };

    return (
        <div className="flex-row">
            <div>
                <div>
                    <img
                        src={`/images/${item.image}`}
                        alt={item.donationType}
                    />
                    <p>{item.description}</p>
                    <div>
                        <p>Type: {item.donationType}</p>
                        <p>Donating: {item.donationAmount} Trees</p>
                        <p>Price: ${item.price}</p>
                    </div>
                </div>
                <div>
                    <span
                        role="img"
                        aria-label="trash"
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeFromCart(item)}
                    >
                        <p>Remove from cart</p> 🗑️
                    </span>
                </div>
            </div>
        </div>
    );
};
// ========================================================

// Export CartItem component
// ========================================================
export default CartItem;
// ========================================================
