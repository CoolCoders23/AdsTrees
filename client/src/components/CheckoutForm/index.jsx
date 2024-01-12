/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

const CheckoutForm = ({ clientSecret, appearance }) => {

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
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
            history.push('/success');
        }
    };

    const paymentElementOptions = {
        appearance: appearance,
        layout: {
            type: 'tabs',
            defaultCollapsed: false,
        },
        business: {
            name: 'AdsTrees',
            product: 'AdsTrees Donation',
        },
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <label htmlFor="card-element">Enter your payment details:</label>
            <CardElement
                id="card-element"
                options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : 'Donate'}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;