/* eslint-disable no-unused-vars */
// Desc: Checkout page for Stripe
// ============================================================

// Import Dependencies and Components
// ============================================================
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useMutation, useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';
import { QUERY_STRIPE_CLIENT_KEY } from '../../utils/queries';
import { ADD_CHECKOUT } from '../../utils/mutations';
import CheckoutForm from '../../components/CheckoutForm';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import './Checkout.css';
// ============================================================

// Retrieve Stripe Client Key
// ============================================================
const ClientKey = () => {
    const { loading, data } = useQuery(QUERY_STRIPE_CLIENT_KEY);
    if (loading) {
        return (
            <Spinner size="xl" />
        );
    }
    const stripe = data?.stripeClientKey;
    return stripe;
};
const stripePromise = loadStripe(ClientKey());
// ============================================================

// Checkout Function
// ============================================================
const Checkout = () => {

    const [state] = useStateContext();
    const [clientSecret, setClientSecret] = useState('');
    const [message, setMessage] = useState(null);
    const [addCheckout, { data }, error] = useMutation(ADD_CHECKOUT, {
        variables: { donations: [...state.cart] },
    });

    useEffect(() => {

        async function fetchClientSecret() {
            await addCheckout();
        }
        fetchClientSecret();

    }, [addCheckout]);

    useEffect(() => {

        if (error) {
            setMessage(`Payment failed: ${error.message}`);
            return;
        } else if (data) {
            setClientSecret(data.clientSecret);
        }

    }, [data, error]);

    const appearance = {
        theme: 'night',
        variables: { colorPrimaryText: '#262626' }
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Checkout">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
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