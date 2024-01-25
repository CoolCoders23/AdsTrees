/* eslint-disable no-unused-vars */
/* Code generated with AutoHTML Plugin for Figma */
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
import { QUERY_STRIPE_CLIENT_KEY } from '../../utils/queries';
import { ADD_CHECKOUT } from '../../utils/mutations';
import CheckoutForm from '../../components/CheckoutForm';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import { DonationSummary } from '../../components/DonationSummary';
import { useColorModeValue, useTheme } from '@chakra-ui/react';
import './Checkout.css';
// ============================================================

// Checkout Page Component
// ============================================================
const Checkout = ({ className, ...props }) => {

    // Get the donation from the state and define props
    // to be passed to donation summary component
    // ============================================================
    const [state] = useStateContext();
    const donation = state.cart.slice(-1);
    if (donation.length === 0) {
        window.location.assign('/donations');
    }
    let type = '';
    let amount = 0;
    let price = 0;
    for (const item of donation) {
        type += `${item.donationType}, `;
        amount += item.donationAmount;
        price += item.price;
    }
    const taxTag = parseFloat((price * 0.13).toFixed(2));
    const tax = parseFloat((price + taxTag).toFixed(2));
    // ============================================================

    // Define all the states
    // ============================================================
    const [clientSecret, setClientSecret] = useState('');
    const [message, setMessage] = useState(null);
    const [addCheckout, { data }, error] = useMutation(ADD_CHECKOUT, {
        variables: { donations: donation },
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
    const { colors } = useTheme();
    const colorBackground = useColorModeValue(colors.light.checkoutBg, colors.dark.checkoutBg);

    const appearance = {
        theme: 'night',
        labels: 'floating',
        variables: {
            colorBackground: colorBackground,
            colorText: '#081c15',
            colorDanger: '#f3a847',
        },
        rules: {
            '.CheckboxLabel': {
                color: '#82eb92',
            },
        },
    };
    const options = {
        clientSecret,
        appearance,
    };
    // ============================================================

    return (
        <div className={'ads-trees-donate-section-2 ' + className}>
            <div className="body">
                <div className="stepper">
                    <div className="step-2">
                        <div className="active-line"></div>
                        <div className="inactive-line"></div>
                        <div className="steps">
                            <div className="step-2-1-frame">
                                <div className="step-icon-base">
                                    <div className="content">
                                        <div className="bbackground"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording">
                                    <div className="welcome">Welcome </div>
                                </div>
                            </div>
                            <div className="step-2-2-frame">
                                <div className="step-icon-base">
                                    <div className="content">
                                        <div className="bbackground"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording">
                                    <div className="payment">Payment </div>
                                </div>
                            </div>
                            <div className="step-2-3-frame">
                                <div className="step-icon-base2">
                                    <div className="content2">
                                        <div className="dot2"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording2">
                                    <div className="confirmation">Confirmation </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="headline-frame-with-icon">
                    <div className="headline-frame">
                        <div className="headline">
                            <div className="main-title">Become a planet benefactor </div>
                            <div className="subtitle">
                                When you use your money well it does great things.{' '}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-content">
                    <div className="card">
                        <DonationSummary
                            tradeoffDescription={`${amount} trees planted`}
                            tradeoffPriceTag={price}
                            totalPriceTag={tax}
                            subtotalPriceTag={price}
                            taxPriceTag={taxTag}
                            tradeoffType={type}
                            className="donation-summary-instance"
                        />
                        <div className="security-information">
                            <svg
                                className="security-shield-icon"
                                width="32"
                                height="33"
                                viewBox="0 0 32 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_959_1371)">
                                    <path
                                        d="M16 0.673584C14.7322 0.673584 13.5872 1.27591 12.0012 2.10983C9.95901 3.18375 7.15978 4.65483 2.4225 5.69483L1.92 5.80483V6.31983C1.92 25.8174 15.593 32.3552 15.7312 32.4186L16.0137 32.5486L16.29 32.4073C16.4282 32.3369 30.08 25.1678 30.08 6.31983V5.80483L29.5775 5.69483C24.8402 4.65483 22.041 3.18375 19.9987 2.10983C18.4128 1.27591 17.2678 0.673584 16 0.673584ZM16 7.65108C18.112 7.65108 19.84 9.44258 19.84 11.6186V12.7711H20.5437C21.2477 12.7711 21.76 13.3473 21.76 13.9873V20.5148C21.76 21.1548 21.1837 21.7311 20.5437 21.7311H11.4562C10.7522 21.7311 10.24 21.1551 10.24 20.4511V13.9873C10.24 13.3473 10.7522 12.7711 11.4562 12.7711H12.16V11.6186C12.16 9.44258 13.888 7.65108 16 7.65108ZM16 8.93108C14.592 8.93108 13.44 10.1466 13.44 11.6186V12.7711H18.56V11.6186C18.56 10.1466 17.408 8.93108 16 8.93108ZM16 15.9711C15.488 15.9711 15.1037 16.3553 15.1037 16.8673C15.1037 17.1233 15.2317 17.3153 15.4237 17.5073V18.3386C15.4237 18.6586 15.68 18.9148 16 18.9148C16.32 18.9148 16.5762 18.6586 16.5762 18.3386V17.5073C16.7682 17.3153 16.8962 17.1233 16.8962 16.8673C16.8962 16.3553 16.512 15.9711 16 15.9711Z"
                                        fill="#F4FBF9"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_959_1371">
                                        <rect
                                            width="32"
                                            height="32"
                                            fill="white"
                                            transform="translate(0 0.611084)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>

                            <div className="security-shield-description">
                                We protect your payment information using encryption to provide
                                bank-level security.{' '}
                            </div>
                        </div>
                        <div className="payment-module">
                            <div className="payment-options">
                                <div className="credit-card">
                                    <div className="payment-header">
                                        <div className="content3">
                                            <svg
                                                className="checkbox-icon"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_977_7813)">
                                                    <path
                                                        d="M6.17845 0.397217C3.02063 0.397217 0.451447 2.9664 0.451447 6.12422C0.451447 9.28228 3.02063 11.8512 6.17845 11.8512C9.33651 11.8512 11.9054 9.28228 11.9054 6.12422C11.9054 2.9664 9.33651 0.397217 6.17845 0.397217ZM8.87437 4.02315L6.00813 8.24694L3.76788 6.16804C3.66703 6.07467 3.66106 5.91705 3.75468 5.8162C3.84806 5.71511 4.00592 5.70963 4.10652 5.80301L5.92173 7.48724L8.46227 3.74328C8.53971 3.62949 8.69459 3.6001 8.80814 3.67704C8.92218 3.75423 8.95181 3.90911 8.87437 4.02315Z"
                                                        fill="#F4FBF9"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_977_7813">
                                                        <rect
                                                            width="11.454"
                                                            height="11.454"
                                                            fill="white"
                                                            transform="translate(0.451447 0.397217)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <div className="content4">
                                                <div className="text-and-supporting-text">
                                                    <div className="text">Pay with Credit and Debit Card </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {clientSecret && (
                                        <Elements stripe={stripePromise} options={options}>
                                            <CheckoutForm
                                                clientSecret={clientSecret}
                                                className="payment-form"
                                            />
                                        </Elements>
                                    )}
                                    {message && <div className='error'>{message}</div>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ============================================================

// Export Checkout Page Component
// ============================================================
export default Checkout;
// ============================================================