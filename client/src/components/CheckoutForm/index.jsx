/* eslint-disable no-unused-vars */
// Desc: Checkout form to be used in Checkout page
// ============================================================

// Import Dependencies
// ============================================================
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import './CheckoutForm.css';
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
        layout: {
            type: 'tabs',
            defaultCollapsed: false,
        },
    };

    return (
        <div className={'checkout-form ' + className}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />

                {Auth.loggedIn() ? (
                    <div >
                        <div className='terms'>
                            <div className='terms-and-conditions'>
                                By donating you accept our Privacy &amp; Terms Policy{' '}
                            </div>
                        </div>
                        <button
                            disabled={isLoading || !stripe || !elements}
                            id="submit"
                            className='button'
                        >
                            <span id="button-text">
                                {isLoading
                                    ? <div className='spinner' id="spinner"></div>
                                    : <div className='children'>Donate</div>}
                            </span>
                        </button>
                    </div>
                ) : (
                    <span className='message'>log in to confirm the donation.</span>
                )}

                {message && <div className='error'>{message}</div>}
            </form>
        </div>
    );
};
// ============================================================

// Export Checkout Form Function
// ============================================================
export default CheckoutForm;
// ============================================================