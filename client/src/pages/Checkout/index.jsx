/* eslint-disable no-unused-vars */
// Desc: Checkout page for Stripe
// Used the followings as reference:
// https://stripe.com/docs/payments/quickstart
// https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#fetch-updates
// https://stripe.com/docs/payments/payment-element
// https://stripe.com/docs/stripe-js/react
// https://stripe.com/docs/videos/global-payments?video=card
// ============================================================

// Import Dependencies and Components
// ============================================================
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useMutation, useQuery } from '@apollo/client';
// import { Spinner } from '@chakra-ui/react';
import { QUERY_STRIPE_CLIENT_KEY } from '../../utils/queries';
import { ADD_CHECKOUT } from '../../utils/mutations';
import CheckoutForm from '../../components/CheckoutForm';
import useStateContext from '../../utils/payment-logic/UseStateContext';
// import './Checkout.css';
// ============================================================

// Checkout Function
// ============================================================
const Checkout = () => {

    // Define all the states
    // ============================================================
    const [state] = useStateContext();
    const [clientSecret, setClientSecret] = useState('');
    const [message, setMessage] = useState(null);
    const [addCheckout, { data }, error] = useMutation(ADD_CHECKOUT, {
        variables: { donations: state.cart.slice(-1) },
    });
    // ============================================================

    // Fetch the Stripe client key from the server
    // ============================================================
    const { loading, error: stripKeyError, data: clientKeyData } = useQuery(QUERY_STRIPE_CLIENT_KEY);
    // Check if the data is loaded and is a string before calling loadStripe
    const stripePromise = (!loading && clientKeyData && typeof clientKeyData.getStripeClientKey.stripeClientKey === 'string')
        ? loadStripe(clientKeyData.getStripeClientKey.stripeClientKey)
        : null;
    if (stripKeyError) {
        console.error(`Error fetching Stripe client key: ${stripKeyError.message}`);
    }
    // ============================================================

    // Add checkout to the database
    // ============================================================
    useEffect(() => {

        async function fetchClientSecret() {

            const isValidPrice = state.cart.every(item => typeof item.price === 'number' && !isNaN(item.price));

            if (!isValidPrice) {
                console.error('Invalid price found in cart items');
                return;
            }

            await addCheckout();
        }
        fetchClientSecret();

    }, [addCheckout, state.cart]);
    // ============================================================

    // Set the client secret
    // ============================================================
    useEffect(() => {

        if (error) {
            setMessage(`Payment failed: ${error.message}`);
            return;
        } else if (data) {
            setClientSecret(data.addCheckout.clientSecret);
        }

    }, [data, error]);
    // ============================================================

    // Set the appearance
    // ============================================================
    const appearance = {
        theme: 'night',
        labels: 'floating',
        // variables: { colorPrimaryText: '#fff' }
    };
    const options = {
        clientSecret,
        appearance,
    };
    // ============================================================

    return (
        <div className="Checkout">
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm clientSecret={clientSecret} appearance={appearance} />
                </Elements>
            )}
            {message && <div id="payment-message">{message}</div>}
        </div>
    );
};
// ============================================================

// Export Checkout Function
// ============================================================
export default Checkout;
// ============================================================