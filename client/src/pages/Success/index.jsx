/* eslint-disable no-unused-vars */
/* Code generated with AutoHTML Plugin for Figma */
// Desc: This file contains the Success page component
// ======================================================

// Import Components and Packages
// ======================================================
import './index.css';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PURCHASE } from '../../utils/mutations';
import { idbPromise } from '../../utils/payment-logic/idbHelper';
import { QUERY_STRIPE_PAYMENT_INTENT } from '../../utils/queries';
// ======================================================

// Component Function
// ======================================================
const Success = ({ className, ...props }) => {

    const [addPurchase] = useMutation(ADD_PURCHASE);
    const { loading, data: paymentIntentData } = useQuery(QUERY_STRIPE_PAYMENT_INTENT);
    const [status, setStatus] = useState('incomplete');
    const [paymentId, setPaymentId] = useState('');

    useEffect(() => {

        async function saveOrder() {

            // Get all items and last item in cart
            // ======================================================
            const cart = await idbPromise('cart', 'get');
            const donations = cart.map((item) => item._id);
            const lastDonation = donations.slice(-1);
            // ======================================================

            // Get all items in donations collection in indexedDB
            // ======================================================
            const donationsInDb = await idbPromise('donations', 'get');
            const donationsInDbIds = donationsInDb.map((item) => item._id);
            // ======================================================

            if (donations.length && status !== 'incomplete' && paymentId !== '') {

                await addPurchase({
                    variables: {
                        donations: lastDonation,
                        status,
                        paymentId
                    }
                });

                donations.forEach((item) => {
                    idbPromise('cart', 'delete', { _id: item });
                });

                donationsInDbIds.forEach((item) => {
                    idbPromise('donations', 'delete', { _id: item });
                });

            }

        }

        if (!loading && paymentIntentData) {
            setStatus(paymentIntentData.getStripePaymentIntent.status);
            setPaymentId(paymentIntentData.getStripePaymentIntent.id);
            saveOrder();
        }

        setTimeout(() => {
            window.location.assign('/user-profile');
        }, 4000);

    }, [addPurchase, loading, paymentIntentData, status, paymentId]);

    return (
        <div className={'ads-trees-donate-section-3 ' + className}>
            <div className="body">
                <div className="frame-37271">
                    <div className="stepper">
                        <div className="step-3">
                            <div className="active-line"></div>
                            <div className="active-line2"></div>
                            <div className="steps">
                                <div className="step-3-1-frame">
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
                                <div className="step-3-2-frame">
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
                                <div className="step-3-3-frame">
                                    <div className="step-icon-base">
                                        <div className="content">
                                            <div className="bbackground"></div>
                                            <div className="dot"></div>
                                        </div>
                                    </div>
                                    <div className="step-icon-wording">
                                        <div className="confirmation">Confirmation </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-37265">
                        <div className="headline">
                            <div className="you-are-awesome">You are awesome </div>
                            <div className="thank-you-for-your-payment">
                                Thank you for your payment.{' '}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-content">
                    <div className="feedback-frame">
                        <div className="feedback-frame-content">
                            <div className="card-mockup">
                                <svg
                                    className="check-icon"
                                    width="121"
                                    height="121"
                                    viewBox="0 0 121 121"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.5"
                                        y="0.221313"
                                        width="120"
                                        height="120"
                                        rx="60"
                                        fill="#D0FFD7"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M85.982 37.1714L50.182 71.7214L40.682 61.5714C38.932 59.9214 36.182 59.8214 34.182 61.2214C32.232 62.6714 31.682 65.2214 32.882 67.2714L44.132 85.5714C45.232 87.2714 47.132 88.3214 49.282 88.3214C51.332 88.3214 53.282 87.2714 54.382 85.5714C56.182 83.2214 90.532 42.2714 90.532 42.2714C95.032 37.6714 89.582 33.6214 85.982 37.1214V37.1714Z"
                                        fill="#33C481"
                                    />
                                </svg>
                            </div>
                            <div className="feedback">
                                <div className="feedback-text">
                                    We will do great things together{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ======================================================

// Export Component
// ======================================================
export default Success;
// ======================================================
