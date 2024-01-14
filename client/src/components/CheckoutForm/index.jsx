/* eslint-disable no-unused-vars */
// Desc: Checkout form to be used in Checkout page
// ============================================================

// Import Dependencies
// ============================================================
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
// ============================================================

// Checkout Form Function
// ============================================================
const CheckoutForm = ({ clientSecret, appearance, className }) => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const paymentElement = elements.getElement(PaymentElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                element: paymentElement,
            },
        });

        if (error) {
            setMessage(`Payment failed: ${error.message}`);
            setIsLoading(false);
            return;
        } else if (paymentIntent.status === 'succeeded') {
            setMessage(
                `Successful payment of $${(paymentIntent.amount / 100).toFixed(2)} : ${paymentIntent.id}`
            );
            setIsLoading(false);
            navigate('/success');
        }
    };

    const paymentElementOptions = {
        appearance: appearance,
        layout: {
            type: 'tabs',
            defaultCollapsed: false,
        },
    };

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit} style={{ color: 'white' }}>
                <PaymentElement id="payment-element" />

                {Auth.loggedIn() ? (
                    <button disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">
                            {isLoading ? <div className={className + 'spinner'} id="spinner"></div> : 'Donate'}
                        </span>
                    </button>
                ) : (
                    <span className={className + 'message'}>log in to confirm the donation.</span>
                )}

                {message && <div className={className + 'payment-message'}>{message}</div>}
            </form>
        </>
    );
};
// ============================================================

// Export Checkout Form Function
// ============================================================
export default CheckoutForm;
// ============================================================