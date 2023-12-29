// Desc: This file contains the Success page component
// ======================================================

// Import Components and Packages
// ======================================================
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PURCHASE } from '../utils/mutations';
import { idbPromise } from '../utils/payment-logic/idbHelper';
import checkIcon from '../assets/image/check-icon.svg';
// ======================================================

// Define Success page component
// ======================================================
const Success = () => {

    const [addPurchase] = useMutation(ADD_PURCHASE);

    useEffect(() => {

        async function saveOrder() {

            const cart = await idbPromise('cart', 'get');
            const donations = cart.map((item) => item._id);

            if (donations.length) {

                const { data } = await addPurchase({ variables: { donations } });
                const donationData = data.addPurchase.donations;

                donationData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });

            }

            setTimeout(() => {
                window.location.assign('/user-profile');
            }, 5000);

        }

        saveOrder();

    }, [addPurchase]);

    return (

        <div>

            <div>
                <h1>You are Awesome</h1>
                <p>Thank you for your donation</p>
            </div>
            <div>
                <img src={checkIcon} alt="checkmark" aria-label='checkmark' />
                <p>We will do great things together</p>
            </div>

        </div>

    );

};
// ======================================================

// Export Success page component
// ======================================================
export default Success;
// ======================================================
