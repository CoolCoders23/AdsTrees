/* eslint-disable no-unused-vars */
// Desc: Checkout form to be used in Checkout page
// ============================================================

// Import Dependencies
// ============================================================
import React, { useState } from 'react';
import { PaymentElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
// ============================================================

// Checkout Form Function
// ============================================================
const CheckoutForm = ({ clientSecret, appearance }) => {

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
                <label htmlFor="payment-element">Enter your payment details:</label>
                <PaymentElement id="payment-element" options={paymentElementOptions} />

                {Auth.loggedIn() ? (
                    <button disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">
                            {isLoading ? <div className="spinner" id="spinner"></div> : 'Donate'}
                        </span>
                    </button>
                ) : (
                    <span className='message'>log in to confirm the donation.</span>
                )}

                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
};
// ============================================================

// Export Checkout Form Function
// ============================================================
export default CheckoutForm;
// ============================================================