// Desc: This file contains the Success page component
// ======================================================

// Import Components and Packages
// ======================================================
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { ADD_PURCHASE } from '../utils/mutations';
import { idbPromise } from '../utils/payment-logic/idbHelper';
import { UPDATE_CURRENT_STATUS } from '../utils/payment-logic/actions';
import useStateContext from '../utils/payment-logic/UseStateContext';
import checkIcon from '../assets/image/check-icon.svg';
// ======================================================

// Define Success page component
// ======================================================
const Success = () => {

    const [, dispatch] = useStateContext();
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

            dispatch({ type: UPDATE_CURRENT_STATUS, currentStatus: 'Completed' });

            setTimeout(() => {
                window.location.assign('/');
            }, 3000);

        }

        saveOrder();

    }, [addPurchase, dispatch]);

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

            {Auth.loggedIn() ? (
                <div>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </div>
            ) : (
                <div>
                    <Link to="/">Go to Login</Link>
                </div>
            )}

        </div>

    );

};
// ======================================================

// Export Success page component
// ======================================================
export default Success;
// ======================================================
