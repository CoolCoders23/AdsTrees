// Desc: This file contains the Cart component which is responsible
// for rendering the cart and the cart items
// Used BTS Exercise Module 22 as a guide
// ========================================================

// Import dependencies
// ========================================================
import './cart.css';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import useStateContext from '../../utils/payment-logic/UseStateContext';
// ========================================================

// Define Stripe promise
// ========================================================
const stripePromise = loadStripe(
    'pk_test_51OMPjQCz0a2fboj45TkUu24b9bl32N31ebNh3TxlOySjEhe6vE5kAEMEMhug81RkbqPjEwsOIABVTsFcNdZmvuLU00mRtDnAqu');
// ========================================================

// Define Cart component
// ========================================================
const Cart = ({ toggleCart }) => {

    const [state] = useStateContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {

        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }

    }, [data]);

    // Define submitCheckout async function to handle
    // the checkout process and then clear the cart
    const submitCheckout = async () => {

        try {

            await getCheckout({
                variables: {
                    donations: [...state.cart],
                },
            });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>
                close
            </div>
            <h2>Donation Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="flex-row space-between">

                        {/* Check to see if the user is logged in. If so render a button to check out */}
                        {Auth.loggedIn() ? (
                            <button className="checkout" onClick={submitCheckout}>Checkout</button>
                        ) : (
                            <span className="message">log in to check out!</span>
                        )};
                    </div>
                </div>
            ) : (
                <h2>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                        You haven&apos;t added anything to your cart yet!
                </h2>
            )}
        </div>
    );
};
// ========================================================

// Export component
// ========================================================
export default Cart;
// ========================================================
