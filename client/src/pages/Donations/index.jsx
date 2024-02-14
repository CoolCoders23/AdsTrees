/* Code generated with AutoHTML Plugin for Figma */
// Desc: This file contains the DonationList component
// which will be used to display a list of donation items
// =========================================================

// Import dependencies
// =========================================================
import './index.css';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DONATIONS } from '../../utils/queries.js';
import { idbPromise } from '../../utils/payment-logic/idbHelper';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import { UPDATE_DONATIONS } from '../../utils/payment-logic/actions';
import { Spinner } from '@chakra-ui/react';
import { PictoDisplayGarden } from '../../components/PictoDisplayGarden/PictoDisplayGarden.jsx';
import { PictoDisplayWood } from '../../components/PictoDisplayWood/PictoDisplayWood.jsx';
import { PricingCard } from '../../components/PricingCard/PricingCard.jsx';
import { PictoDisplayForest } from '../../components/PictoDisplayForest/PictoDisplayForest.jsx';
// =========================================================

// Define component
// =========================================================
const Donations = ({ className, ...props }) => {

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

    //create a mapping object for donation types
    // and their corresponding image components
    const donationTypeToImageComponent = {
        Garden: PictoDisplayGarden,
        Wood: PictoDisplayWood,
        Forest: PictoDisplayForest,
    };

    return (
        <main className={'ads-trees-donate-section-1 ' + className}>
            <div className="body">
                <div className="stepper">
                    <div className="step-1">
                        <div className="active-line"></div>
                        <div className="inactive-line"></div>
                        <div className="steps">
                            <div className="step-1-1-frame">
                                <div className="bbackground"></div>
                                <div className="step-icon-base">
                                    <div className="content">
                                        <div className="dot"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording">
                                    <div className="welcome">Welcome </div>
                                </div>
                            </div>
                            <div className="step-1-2-frame">
                                <div className="step-icon-base2">
                                    <div className="content2">
                                        <div className="dot2"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording2">
                                    <div className="payment">Payment </div>
                                </div>
                            </div>
                            <div className="step-1-3-frame">
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
                <div className="headline-frame">
                    <div className="headline">
                        <div className="main-title">
                            How many trees do you want to plant?{' '}
                        </div>
                        <div className="subtitle">Do good, be great, plant trees. </div>
                    </div>
                </div>

                {state.donations.length ? (
                    <div className="pricing">
                        {state.donations.map((donation) => {
                            const ImageComponent = donationTypeToImageComponent[donation.donationType];
                            return (
                                <PricingCard
                                    key={donation._id}
                                    _id={donation._id}
                                    donationType={donation.donationType}
                                    description={donation.description}
                                    donationAmount={donation.donationAmount}
                                    imageComponent={ImageComponent
                                        ? <ImageComponent className="picto" display={donation.donationType}/>
                                        : null}
                                    image={donation.image}
                                    price={donation.price}
                                    className="pricing-card-instance"
                                />
                            );
                        })}
                    </div>
                ) : (
                    !loading && <h3>No donations yet!</h3>
                )}
                {loading ? <Spinner size="xl" /> : null}

            </div>
        </main>
    );
};
// =========================================================

// Export component
// =========================================================
export default Donations;
// =========================================================
