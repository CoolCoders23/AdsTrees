// Desc: This file contains the DonationList component
// which will be used to display a list of donation items
// =========================================================

// Import dependencies
// =========================================================
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DONATIONS } from '../../utils/queries';
import { idbPromise } from '../../utils/payment-logic/idbHelper';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import { UPDATE_DONATIONS } from '../../utils/payment-logic/actions';
import DonationItem from '../DonationItem';
import { Spinner } from '@chakra-ui/react';
// =========================================================

// Define component
// =========================================================
const DonationList = () => {

    // Destructure state and dispatch from context
    const [state, dispatch] = useStateContext();

    // Define query
    const { loading, data } = useQuery(QUERY_DONATIONS);

    // Define useEffect hook
    useEffect(() => {

        // If there is data to be stored
        if (data) {

            // Store data in global state object
            dispatch({
                type: UPDATE_DONATIONS,
                donations: data.donations
            });

            // Store data in IndexedDB
            data.donations.forEach((donation) => {
                idbPromise('donations', 'put', donation);
            });

        } else if (!loading) {

            // If offline, get data from IndexedDB
            idbPromise('donations', 'get')

                .then((donations) => {
                // Store data retrieved from IndexedDB in global state object
                    dispatch({
                        type: UPDATE_DONATIONS,
                        donations: donations
                    });
                });

        }

    }, [data, loading, dispatch]);

    // Return JSX
    return (
        <div>
            <h2>How many trees do you want to plant?</h2>
            <p>Do good, be great, plant trees</p>
            {state.donations.length ? (
                <div>
                    {state.donations.map((donation) => (
                        <DonationItem
                            key={donation._id}
                            _id={donation._id}
                            donationType={donation.donationType}
                            description={donation.description}
                            image={donation.image}
                            donationAmount={donation.donationAmount}
                            price={donation.price}
                        />
                    ))}
                </div>
            ) : (
                !loading && <h3>No donations yet!</h3>
            )}
            {loading ? <Spinner size="xl" /> : null}
        </div>
    );

};
// =========================================================

// Export component
// =========================================================
export default DonationList;
// =========================================================